const express = require("express");
require("dotenv").config();
const app = express();
const handler = require("./utils/app-exports");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static("uploads"));
app.use("/profile", express.static("profile"));
app.use("/api/v1/auth", handler.authRoute);
app.use("/api/v1/car", handler.carDataRoute);
app.use("/api/v1/admin", handler.adminRoute);
app.use("/api/v1/user", handler.userRoute);
// app.use("/api/v1/user", handler.adminRoute);

// Define an API route for image uploads
/*
app.post("/upload", upload.array("imageUrl"), async (req, res) => {
  console.log("Next controller called");

  try {
    const { year, make, color, model, details } = req.body;
    const imageFiles = req.files;
    // console.log("ImageUrl=>", imageUrl);
    // console.log("Body=>", req.body);

    console.log("imageUrl===>", imageFiles);
    let result;
    const createCar = `INSERT INTO tblcar(year,make,color,model,details) VALUES(?,?,?,?,?)`;
    [result] = await pool.query(createCar, [year, make, color, model, details]);
    const car_id = result.insertId;
    const insertImages = `INSERT INTO tblimages(car_id,image_url) VALUES(?,?)`;
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
});
*/

app.listen(5000, () => console.log(`server started at PORT 5000`));
