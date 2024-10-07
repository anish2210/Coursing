const express = require("express");
const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const { adminRouter } = require("./routes/admin");
const app = express();
const PORT = 3000;

app.get("/", (req, res)=>{
    res.send("this is the testing route");
})

app.use('api/v1/user', userRouter);
app.use('api/v1/admin', adminRouter);
app.use('api/v1/course', courseRouter);


app.listen(PORT,()=>{
    console.log(`App is listed on PORT:${PORT}`);
});