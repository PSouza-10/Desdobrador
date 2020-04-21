const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Jogo = require('../../models/Jogo')
const Result = require('../../models/Results')

router.post('/', (req,res) => {
    const {password,email} = req.body
    
    if(!password || !email){
        return res.status(400).json({msg:"Preencha os campos"})

    }

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(404).json({msg:"Nenhum usuário encontrado"})

            bcrypt.compare(password,user.password)
            .then(isMatch => {
               if (!isMatch) return res.status(400).json({msg:'Credenciais invalidas'})

                    jwt.sign(
                        {id : user.id},
                        config.get('jwtSecret'),
                        {expiresIn : '8 hours'},
                        (err, token) => {
                            if(err) throw err;

                            return res.json({
                                token,
                                user:{
                                    _id : user.id,
                                    name : user.name,
                                    email: user.email
                                    
                                }
                            })

                        }
                    )
            })
        })
})


router.post('/user',(req,res) => {
    
    const {name,password,email} = req.body

    if(!name||!password||!email){
        
        return res.status(400).json({msg:'Preencha os campos'})

    }
 
   
    User.findOne({email}).then(user => {
        if(user) return res.status(400).json({msg:'Email já registrado'})
    
        const NewUser = new User({
            name,
            email,
            password,
           
        })

        bcrypt.genSalt(10,(err,salt) =>{
            bcrypt.hash(NewUser.password, salt, (err,hash) => {
                if (err) throw err;
                NewUser.password = hash
                NewUser.save().then(New => {

                        jwt.sign(
                            {id: New.id},
                            config.get('jwtSecret'),
                            {expiresIn: '8 hours'},
                            (err,token)=>{
                                if(err) throw err;
                                res.json({
                                    token,
                                    user:{
                                        _id: New.id,
                                        name: New.name,
                                        email:New.email,    
                                    }
                                })
                            }
                        )
                        
                    })
            } )
        })

        

    })
})

router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id).select('-password')
    .then(user => res.json(user))
})

router.delete('/',auth,(req,res)=>{
    
    const user = req.user

    User.findByIdAndDelete( user, (err,user) =>{
        
        if (err) throw err
        if (!user) return res.status(400).send('Nenhum usuário encontrado')

        Jogo.deleteMany({'user' : user.id },(err) => {
            if(err) throw err
        })

        Result.deleteMany({'user' : user.id },(err) => {
            if(err) throw err
        })
        
        return res.json({msg:'Usuário deletado'})
    })


    

})



module.exports = router