const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type:String, unique: true},
    password: String
});
const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type:String, unique: true},
    password: String
});
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imgUrl: String,
    creatorId: ObjectId
});
const purchasesSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchasesModel = mongoose.model("purchases", purchasesSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchasesModel
}

