const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signin", (req, res)=>{
})

userRouter.post("/signup", (req, res)=>{
    
})

userRouter.get("/purchases", (req, res)=>{
    res.send("HI from router file");
})

module.exports = {
    userRouter
}