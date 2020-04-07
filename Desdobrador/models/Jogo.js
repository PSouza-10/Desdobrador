const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GameSchema =  new Schema ({
    matrix : { 
        type : [[Number]],
        required :true
    },
    vector : {
        type : [Number],
        required : true
    },
    tipo:{
        type : Number
        
    },
    name : {
        type :String,
        default : "Desdobramento",
        unique : true
    },
    user : {
        type : String,
        required: true
    }
})

module.exports = Game = mongoose.model('game',GameSchema)