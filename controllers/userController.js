const pool = require("../db/connectDB");
const updateUserProfile = async (req, res) => {
  try {
    console.log(req.body);
    let { fullName, email, phone, id } = req.body;
    const updatequery = `
        UPDATE tbluser SET full_name=?, email=?, contact=? WHERE id=?
        `;
    let [result] = await pool.query(updatequery, [fullName, email, phone, id]);
    console.log(result);
    if (result.length <= 0) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
    {
      return res.json({
        status: 200,
        message: "profile updated",
        data: result,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: `${error.message}` });
  }
};

const userAuctioneerListById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const adminListQuery = `SELECT t1.full_name,t1.admin_id FROM 
    tbladmin as t1 
    join tbladminusers as t2 on  t2.admin_id=t1.admin_id
    where t2.user_id=?`;
    // "SELECT admin_id,full_name FROM tbladmin where user_id=?";
    let [result] = await pool.query(adminListQuery, [adminId]);

    if (result.length <= 0) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
    return res.json({ status: 200, data: result });
  } catch (error) {
    return res.json(error.message);
  }
};
const getAllCarsByAuctioneerId = async (req, res) => {
  try {
    const { admin_id, user_id } = req.body;

    console.log(req.body);

    const adminListQuery = `
      select t1.*
 from tblcar AS t1
join tbladmincars as t2 on t1.car_id=t2.car_id
where t2.admin_id=? AND t1.user_id=?
      `;
    let [result] = await pool.query(adminListQuery, [admin_id, user_id]);

    if (result.length <= 0) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
    return res.json({ status: 200, data: result });
  } catch (error) {
    return res.json(error.message);
  }
};

const getAllAuctioneerList = async (req, res) => {
  try {
    const adminId = req.params.id;
    const adminListQuery = "SELECT admin_id,full_name ,status FROM tbladmin";
    let [result] = await pool.query(adminListQuery);

    if (result.length <= 0) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
    return res.json({ status: 200, data: result });
  } catch (error) {
    return res.json(error.message);
  }
};

// const updateUserAuctioneerList = async (req, res) => {
//   try {
//     const { userId, admin_ids } = req.body;
//     console.log(req.body);
//     let result;
//     const adminListQuery = "UPDATE tbladmin SET user_id=? WHERE admin_id=?";
//     admin_ids.map(async (item) => {
//       [result] = await pool.query(adminListQuery, [userId, item]);
//       if (result.length <= 0) {
//         return res.status(404).json({ status: 404, message: "Not Found" });
//       }
//     });

//     return res.json({ status: 200, data: result });
//   } catch (error) {
//     return res.json(error.message);
//   }
// };

const updateUserAuctioneerList = async (req, res) => {
  try {
    // const adminListQuery = "UPDATE tbladmin SET user_id=? WHERE admin_id=?";
    const { admin_ids, userId } = req.body;
    console.log(req.body);

    // return res.json(req.body);
    // return;
    let result;
    const adminListQuery = `INSERT INTO tbladminusers (user_id, admin_id) VALUES (?, ?)`;

    admin_ids.map(async (item) => {
      [result] = await pool.query(adminListQuery, [userId, item]);
      if (result.length <= 0) {
        return res.status(404).json({ status: 404, message: "Not Found" });
      }
    });

    return res.json({ status: 200, data: result });
  } catch (error) {
    return res.json(error.message);
  }
};
module.exports = {
  updateUserProfile,
  userAuctioneerListById,
  getAllAuctioneerList,
  updateUserAuctioneerList,
  getAllCarsByAuctioneerId,
};
