const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Jogo = require('../../models/Jogo')
const User = require('../../models/User')


router.post('/',auth,(req,res) => {
    
    const {matrix,vector,name,user} = req.body


    if(!matrix || !vector || !name || !user ){
        return res.status(400).json({msg :"Dados Incompletos"})
    }

    const type = vector.lenght

    const jogoNovo = new Jogo({
        matriz,
        dezenas,
        type,
        name,
        user : req.user
    })

    jogoNovo.save().then(jogo => {
        return res.json(jogo)
    })

})

router.delete('/:id',auth ,(req,res) => {
    
})

router.put('/:id',auth,(req,res) => {
    

    
})

router.get('/',auth,(req,res) => {
    
    Jogo.find({user : req.user },(docs,err)=>{
        if (err) throw err
        
        if(!docs) return res.json({msg:"Nenhum jogo para mostrar"})
        
        return res.send(docs)

    })

})


module.exports = router