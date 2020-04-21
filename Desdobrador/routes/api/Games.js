const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Jogo = require('../../models/Jogo')
const User = require('../../models/User')
const Result = require('../../models/Results')

router.post('/',auth,(req,res) => {
    
    const {matrix,vector,name} = req.body
    const user = req.user.id

    if(!matrix || !vector || !name  ){
        return res.status(400).json({msg :"Dados Incompletos"})
    }

    
    const tipo = vector.length
 
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
        if (err) throw err

        
        return res.send(doc)
    })
    
})

router.get('/',auth,(req,res) => {
    
    const user = req.user.id

    Jogo.find({user : user},(err,docs)=>{
        if (err) throw err
        
        if(!docs) return res.json({msg:"Nenhum jogo para mostrar"})
        
        return res.send(docs)

    })

})

//Rotas de resultado

router.post('/resultados',auth,(req,res) => {
    
    const {vector,name} = req.body
    const user = req.user.id

    

    if( !vector || !name || !user ){
        return res.status(400).json({msg :"Por favor insira o resultado e seu nome"})
    }

    
    const tipo = vector.length
 
    const resultadoNovo = new Result({
        vector,
        tipo,
        name,
        user
    })

    resultadoNovo.save().then(result => {
        return res.json(result)
    })

})

router.delete('/resultados/:id',auth ,(req,res) => {
    const id = req.params.id

    Result.findByIdAndDelete(id,(err,doc)=>{
        if(err) throw err

        return res.json(id)
    })
})

router.get('/resultados',auth,(req,res) => {
    
    const id = req.user.id

   Result.find({'user' : id},(err,docs) => {
    
    if(err) throw err

    if(!docs) return res.json({msg:'No results found'})
    
    return res.json(docs)
   })

})

module.exports = router