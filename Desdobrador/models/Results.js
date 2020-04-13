const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ResultSchema =  new Schema ({
    name : { 
        type : String,
        required :true
    },
    vector : {
        type : [Number],
        required : true
    },
    user : {
        type : String,
        required: true
    },
    tipo : {
        type : Number,
        required : true
    }
})

module.exports = Result = mongoose.model('result',ResultSchema)