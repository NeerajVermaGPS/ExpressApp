import mongoose from "mongoose";

const { String } = mongoose.Schema.Types
const { Number } = mongoose.Schema.Types

const githubUser = new mongoose.Schema({
    githubID:{
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    displayName: {
        type: String
    }
})

const GithubUser = mongoose.model("GithubUser", githubUser)

export default GithubUser