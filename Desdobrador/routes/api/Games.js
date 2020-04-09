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

    
    const tipo = vector.lenght

    const jogoNovo = new Jogo({
        matrix,
        vector,
        tipo,
        name,
        user
    })

    jogoNovo.save().then(jogo => {
        return res.json(jogo)
    })

})

router.delete('/:id',auth ,(req,res) => {
    const id = req.params.id

    Jogo.findByIdAndDelete(id,(err,doc)=>{
        if(err) throw err

        return res.json({id : doc._id})
    })
})

router.put('/:id',auth,(req,res) => {
    
    const id = req.params.id
    

    Jogo.findByIdAndUpdate(id,req.body,{useFindAndModify : false, new : true},(err,doc)=>{
        // if (err) throw err

        console.log(doc)
        return res.send(doc)
    })
    
})

router.get('/:id',auth,(req,res) => {
    
    Jogo.find({user : req.params.id },(err,docs)=>{
        if (err) throw err
        
        if(!docs) return res.json({msg:"Nenhum jogo para mostrar"})
        
        return res.send(docs)

    })

})


module.exports = router