const pool = require("../db/connectDB");
const jwt = require("jsonwebtoken");
const brcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    loginUser = `SELECT id, full_name,password, email,contact FROM tbluser WHERE email=?`;
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

    const token = await jwt.sign(
      { email: result[0].email, id: result[0].id },
      process.env.JWT_KEY
    );
    const data = result;

    return res.json({
      status: 200,
      message: "User loggedIn Success",
      data: result,
    });
  } catch (error) {
    return res.json({ status: 500, message: `${error.message}` });
  }
};
const signupController = async (req, res) => {
  try {
    // console.log(req.body);
    // let imageUrl;
    // if (!req.file.filename) {
    // } else {
    //   imageUrl = req.file.filename;
    //   req.body.imageUrl = imageUrl;
    // }
    const salt = await brcrypt.genSalt(10);
    const { email, password, fullName, phone } = req.body;
    const adminId = CryptoJS.AES.decrypt(
      referral,
      process.env.JWT_KEY
    ).toString(CryptoJS.enc.Utf8);
    console.log(`adminId ${adminId}`);
    // return res.json("testing");
    const status = false;
    const hashedPassword = await brcrypt.hash(password, salt);
    isEmailExist = `SELECT * FROM tbluser WHERE email=?`;
    let result;
    result = await pool.query(isEmailExist, [email]);
    // return res.json(result);
    if (result[0].length > 0) {
      return res.status(402).json({
        status: 402,
        message: "Email already existed please choose another account",
      });
    }
    signUser = `INSERT INTO tbluser(email,password,full_name,contact) VALUES(?,?,?,?)`;
    [result] = await pool.query(signUser, [
      email,
      hashedPassword,
      fullName,
      phone,
    ]);
    if (!result) {
      return res.status(500).json({
        status: 500,
        message: "user not created successfully",
      });
    }

    return res.json({
      status: 200,
      message: "user created succcessfully",
      data: result,
    });
  } catch (error) {
    return res.json({ status: 500, message: `${error.message}` });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    let { userId, newPassword } = req.body;
    console.log(req.body);
    if (newPassword) {
      const salt = await brcrypt.genSalt(10);
      const encrypPassword = await brcrypt.hash(newPassword, salt);
      console.log(encrypPassword);
      const updatequery = `
        UPDATE tbluser SET password=? WHERE id=?
        `;
      let [result] = await pool.query(updatequery, [encrypPassword, userId]);
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
module.exports = { loginController, signupController, updateUserPassword };
