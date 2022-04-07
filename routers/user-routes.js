const express=require('express')
const route=express.Router()
const db=require('../models')
const userController=require('../controllers/userController')


route.post('/register',(req,res,next)=>{
    userController.register(req.body.nom,req.body.prenom,req.body.telephone,req.body.email,req.body.password,req.body.adress,req.body.role)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.post('/login',(req,res,next)=>{
    userController.login(req.body.email,req.body.password)
    .then(token=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json({err:err}))
})



route.get('/user/:id',(req,res,next)=>{
    db.User.findOne({where:{id:req.params.id},include:[db.Profil,db.Product]
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

    // db.User.findAll({where:{id:req.params.id}})
})

route.get('/users',(req,res,next)=>{
    db.User.findAll({include:[db.Profil,db.Product]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

})

route.patch('/user/:id',(req,res,next)=>{
    db.User.update({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

})

route.delete('/user/:id',(req,res,next)=>{
    db.User.destroy({where:{id:req.params.id}
    }).then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

    // db.User.findAll({where:{id:req.params.id}})
})

module.exports=route