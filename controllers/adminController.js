const pool = require("../db/connectDB");
const jwt = require("jsonwebtoken");
const brcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");

const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    loginUser = `SELECT * FROM tbladmin WHERE email=?`;
    const [result] = await pool.query(loginUser, [email]);
    if (result.length <= 0) {
      return res
        .status(404)
        .json({ status: 404, message: "user does not existed" });
    }
    const isMatched = await brcrypt.compare(password, result[0].password);
    console.log("isMatched", isMatched);
    if (!isMatched) {
      return res.status(403).json({ status: 403, message: "Invalid Password" });
    }

    // const token = await jwt.sign(
    //   { email: result[0].email, id: result[0].id },
    //   process.env.JWT_KEY
    // );
    console.log(result[0].admin_id);
    const token = CryptoJS.AES.encrypt(
      result[0].admin_id.toString(),
      process.env.JWT_KEY
    ).toString();

    return res.json({
      status: 200,
      message: "User loggedIn Success",
      data: result,
      token: token,
    });
  } catch (error) {
    return res.json({ status: 500, message: `${error.message}` });
  }
};

const updateAdminPassword = async (req, res) => {
  try {
    let { adminId, newPassword } = req.body;
    console.log(req.body);
    if (newPassword) {
      const salt = await brcrypt.genSalt(10);
      const encrypPassword = await brcrypt.hash(newPassword, salt);
      console.log(encrypPassword);
      const updatequery = `
        UPDATE tbladmin SET password=? WHERE admin_id=?
        `;
      let [result] = await pool.query(updatequery, [encrypPassword, adminId]);
      console.log(result);
      if (result.length <= 0) {
        return res
          .status(404)
          .json({ status: 404, message: "password not updated" });
      }
      {
        return res
          .status(200)
          .json({ status: 200, message: "password updated" });
      }
    } else {
      return res.json({ status: 400, message: "newpassword undefined" });
    }

    // const token = await jwt.sign(
    //   { email: result[0].email, id: result[0].id },
    //   process.env.JWT_KEY
    // );
  } catch (error) {
    return res.json({ status: 500, message: `${error.message}` });
  }
};

const getUsersByAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const getAllCars = `SELECT * FROM tbluser WHERE admin_id=?`;
    const [result] = await pool.query(getAllCars, [adminId]);
    if (result.length <= 0) {
      return res
        .status(500)
        .json({ status: 500, message: "collection is empty" });
    }
    return res
      .status(200)
      .json({ status: 200, message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ status: 500, message: `${error.message}` });
  }
};

const getAllUsersByAdminId = async (req, res) => {
  try {
    // const { admin_id, user_id } = req.body;
    const admin_id = req.params.id;

    console.log(req.body);

    const adminListQuery = `
    select t1.id,t1.full_name,t2.admin_id
    from tbluser AS t1
   join tbladminusers as t2 on t1.id=t2.user_id
   where t2.admin_id= ?
      `;
    let [result] = await pool.query(adminListQuery, [admin_id]);

    if (result.length <= 0) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
    return res.json({ status: 200, data: result });
  } catch (error) {
    return res.json(error.message);
  }
};

module.exports = {
  adminLoginController,
  updateAdminPassword,
  getUsersByAdmin,
  getAllUsersByAdminId,
};
