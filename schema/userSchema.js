const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String
        },

        email:{
            type:String
        },

        password:{
            type:String,
        }
    }
)
const User = mongoose.model("USER",userSchema)
module.exports = User