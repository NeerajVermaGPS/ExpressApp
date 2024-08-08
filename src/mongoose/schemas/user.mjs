import mongoose from "mongoose";

const { String } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayname: String,
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)

export default User