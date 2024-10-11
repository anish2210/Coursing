const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const USER_JWT_SIGN = process.env.USER_JWT_SIGN;

userRouter.post("/signup", async (req, res) => {
  try {
    // Input validation using Zod
    const userInputValidation = z.object({
      firstName: z.string().max(20),
      lastName: z.string().max(20),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const parsedUserData = userInputValidation.safeParse(req.body);

    if (!parsedUserData.success) {
      console.log("User Input not valid");
      res.json({
        message: "User Input not valid",
        error: parsedUserData.error,
      });
      return;
    }

    const { firstName, lastName, email, password } = req.body;

    // Hashing password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "user account created successfully.",
    });
  } catch (error) {
    console.error("User not created: ", error);
    res.status(500).json({
      message: "Error while signUp",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email
    });
    if (!user) {
      return res.json({
        message:"invalid email or password!"
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      return res.json({
        error: "invalid email or password!"
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      USER_JWT_SIGN);
    
    res.json({
      token: token
    })

  } catch (error) {
    console.error("Error: ", error);
    res.json({
      error: "Something is not good with this endpoint",
    });
  }
});

userRouter.get("/purchases", (req, res) => {
  
});

module.exports = {
  userRouter,
};
