const mongoose = require('mongoose')

const Schema = mongoose.Schema

//create schema

const UserSchema = new Schema({
    name : {
        type: String,
        maxlength:30,
        required : true
    },
    email: {
        type :String,
        required : true,
        unique : true
    },
    password: {
        type :String,
        minlength:8,
        maxlength: 15,
        required : true
        
    } 
})

module.exports = User = mongoose.model('Users', UserSchema)