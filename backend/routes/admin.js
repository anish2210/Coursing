const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { adminMiddleware } = require("../middleware/admin");
dotenv.config();
const ADMIN_JWT_SIGN = process.env.ADMIN_JWT_SIGN;

adminRouter.post("/signup", async (req, res) => {
  try {
    // Input validation using Zod
    const adminInputValidation = z.object({
      firstName: z.string().max(20),
      lastName: z.string().max(20),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const parsedAdminData = adminInputValidation.safeParse(req.body);

    if (!parsedAdminData.success) {
      console.log("User Input not valid");
      res.json({
        message: "User Input not valid",
        error: parsedAdminData.error,
      });
      return;
    }

    const { firstName, lastName, email, password } = req.body;

    // Hashing password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await adminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "Admin account created successfully.",
    });
  } catch (error) {
    console.error("Admin not created: ", error);
    res.status(500).json({
      message: "Error while signUp",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({
      email,
    });
    if (!admin) {
      return res.json({
        message: "invalid email or password!",
      });
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.json({
        error: "invalid email or password!",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      ADMIN_JWT_SIGN
    );

    res.json({
      token: token,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.json({
      error: "Something is not good with this endpoint",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, imgUrl, price } = req.body;

    const course = await courseModel.create({
      title,
      description,
      imgUrl,
      price,
      creatorId: adminId,
    });

    res.json({
      message: "Course created successfully",
      courseId: course._id,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.json({
      error: "Something is not good with Course endpoint",
    });
  }
});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/course/bulk", (req, res) => {});

module.exports = {
  adminRouter,
};
