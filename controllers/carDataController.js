const pool = require("../db/connectDB");
const jwt = require("jsonwebtoken");

const getUserCarsData = async (req, res) => {
  try {
    const userId = req.params.id;
    const getAllCars = `SELECT * FROM tblcar WHERE user_id=?`;
    const [result] = await pool.query(getAllCars, [userId]);
    if (result.length <= 0) {
      return res
        .status(404)
        .json({ status: 404, message: "collection is empty" });
    }
    return res
      .status(200)
      .json({ status: 200, message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ status: 500, message: `${error.message}` });
  }
};
const getUserCarsDataWithStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const getAllCars = `select t1.*
    from tblcar AS t1
   join tbladmincars as t2 on t1.car_id=t2.car_id
   where t1.user_id=?`;
    const [result] = await pool.query(getAllCars, [userId]);
    if (result.length <= 0) {
      return res
        .status(404)
        .json({ status: 404, message: "collection is empty" });
    }
    return res
      .status(200)
      .json({ status: 200, message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ status: 500, message: `${error.message}` });
  }
};

const getCarImagesByCarId = async (req, res) => {
  try {
    const car_id = req.params.id;
    // const getAllCarImages = `SELECT * FROM tblimages WHERE car_id= ? ORDER BY image_id DESC
    // LIMIT 1,99999999`;
    const getAllCarImages = `SELECT * FROM tblimages WHERE car_id= ?`;
    const [result] = await pool.query(getAllCarImages, [car_id]);
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
const getCarDetailsByCarId = async (req, res) => {
  try {
    const car_id = req.params.id;
    // const getAllCarImages = `SELECT * FROM tblimages WHERE car_id= ? ORDER BY image_id DESC
    // LIMIT 1,99999999`;
    const getAllCarImages = `SELECT * FROM tblcar WHERE car_id= ?`;
    const [result] = await pool.query(getAllCarImages, [car_id]);
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

const createCarController = async (req, res) => {
  try {
    const { year, make, color, model, details, user_id, sold } = req.body;
    const userId = parseInt(user_id);
    const soldStatus = parseInt(sold);
    const imageFiles = req.files;
    console.log("userId=>", user_id);
    console.log("Body=>", req.body);
    const mainImageUrl = imageFiles[0].filename;
    console.log("imageUrl===>", imageFiles);
    let result;
    const createCar = `INSERT INTO tblcar(year,make,color,model,details,imageUrl,user_id) VALUES(?,?,?,?,?,?,?)`;
    [result] = await pool.query(createCar, [
      year,
      make,
      color,
      model,
      details,
      mainImageUrl,
      userId,
      soldStatus,
    ]);
    const car_id = result.insertId;
    const insertImages = `INSERT INTO tblimages(car_id,imageUrl) VALUES(?,?)`;
    filename = await Promise.all(
      imageFiles.map(async (item) =>
        pool.query(insertImages, [car_id, item.filename])
      )
    );

    console.log("Result=>", result);
    if (!result) {
      return res.status(500).json({ status: 500, message: "Operation Failed" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "data created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: 500, message: `${error.message}` });
  }

  /*

    // const { year, make, color, model, details } = req.body;
    // const imageUrl = req.file.filename;
    // console.log("ImageUrl=>", imageUrl);
    // console.log("Body=>", req.body);
    // let result;
    // const createCar = `INSERT INTO tblcar(year,make,color,model,details) VALUES(?,?,?,?,?)`;
    // [result] = await pool.query(createCar, [year, make, color, model, details]);
    // console.log("Result=>", result);
    // if (!result) {
    //   return res.status(500).json({ status: 500, message: "Operation Failed" });
    // }

    // return res
    //   .status(200)
    //   .json({ status: 200, message: "data created successfully" });

    */
};

const deleteCarController = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deleteCar = "DELETE FROM tblcar WHERE id=?";
    let result;
    [result] = await pool.query(deleteCar, [id]);
    if (!result) {
      return res.status(500).json({ status: 500, message: "operation failed" });
    }
    return res
      .status(200)
      .json({ status: 200, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: `${error.message}` });
  }
};

const updateCarController = async (req, res) => {
  if (!req.file) {
    console.log("image not choosen to be updated");
  } else {
    const imageUrl = req.file.filename;
    req.body.imageUrl = imageUrl;
  }
  const { name, varient, model } = req.body;
  const updateCar = `UPDATE tblcar 
  SET name = ?, varient= ?,imageUrl=? WHERE id=?`;
  let result;
  [result] = await pool.query(updateCar, []);
};

const updateUserAuctioneerCarsList = async (req, res) => {
  try {
    const { admin_id, car_ids, status } = req.body;
    console.log(req.body);

    // return res.json(req.body);
    // return;
    let result;
    const updateStatus = "UPDATE tblcar SET status=? WHERE car_id=?";
    const adminListQuery = `INSERT INTO tbladmincars (admin_id, car_id,status) VALUES (?, ?,?)`;

    car_ids.map(async (item) => {
      [result] = await pool.query(adminListQuery, [admin_id, item, status]);
      [result] = await pool.query(updateStatus, [status, item]);
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
  createCarController,
  deleteCarController,
  getUserCarsData,
  updateCarController,
  getCarImagesByCarId,
  getCarDetailsByCarId,
  updateUserAuctioneerCarsList,
  getUserCarsDataWithStatus,
};
