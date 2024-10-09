const express = require("express");
const app = express();

const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const { adminRouter } = require("./routes/admin");

const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const dbURI = process.env.DB_URI;

app.use(express.json());

mongoose
    .connect(dbURI)
    .then(() => {
        console.log("Successfully Connected to DB");

        app.listen(PORT,()=>{
            console.log(`App is listed on PORT:${PORT}`);
        });

    }).catch((err) => {
        console.error("Error while connecting to the DB", err);
    });

app.get("/", (req, res)=>{
    res.send("this is the testing route");
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);

