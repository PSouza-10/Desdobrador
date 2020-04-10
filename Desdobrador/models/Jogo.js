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
        type : Number,
        required : true
        
    },
    name : {
        type :String,
        default : "Desdobramento"
       
    },
    user : {
        type : String,
        required: true
    }
})

module.exports = Game = mongoose.model('game',GameSchema)