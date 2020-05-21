const mongoose = require('mongoose')
const Jogo = require('./Jogo')
const Schema = mongoose.Schema

const GrupoSchema =  new Schema ({
    nome : {
        type : String,
        required : true
    },
    jogos : [String],
    user : {
        type:  String,
        required : true
    }
})

module.exports = Group = mongoose.model('group',GrupoSchema)