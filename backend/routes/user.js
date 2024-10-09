const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");

userRouter.post("/signup", async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;

    await userModel.create({
        firstName,
        lastName,
        email,
        password
    })

    res.json({
        message:"user account created successfully."
    })
})

userRouter.post("/signin", (req, res)=>{
})

userRouter.get("/purchases", (req, res)=>{
    res.json({
        message:"hi from signin"
    })    
})

module.exports = {
    userRouter
}