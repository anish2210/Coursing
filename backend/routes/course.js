const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { purchasesModel, courseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchasesModel.create({
      userId,
      courseId,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.json({
        message:"Something is wrong with your purchase"
    })
  }
});

courseRouter.get("/preview", async(req, res) => {
    try {    
        const allCourses = await courseModel.find({});

        res.json({
            allCourses
        })
      } catch (error) {
        console.error("Error: ", error);
        res.json({
            message:"Something is wrong!"
        })
      }
});

module.exports = {
  courseRouter,
};
