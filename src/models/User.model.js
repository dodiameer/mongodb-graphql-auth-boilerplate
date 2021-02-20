const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, uniqueCaseInsensitive: true }
})

UserSchema.plugin(uniqueValidator, { message: "Error, {PATH} already exists" })

const User = mongoose.model("User", UserSchema)
module.exports = User