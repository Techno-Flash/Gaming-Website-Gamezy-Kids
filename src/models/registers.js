const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : Number,
        required : true
    }
})

// bcrypt systeam of hashing password
// playlistSchema.pre("save", async function(next) { 

//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 3);
//     }
//     next();
// })

const Register = new mongoose.model("Database",playlistSchema);

module.exports = Register;