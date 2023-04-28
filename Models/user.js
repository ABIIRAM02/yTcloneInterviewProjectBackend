const mongoose = require('mongoose')

let userStructute = mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    }
})

module.exports = mongoose.model( 'user' , userStructute )