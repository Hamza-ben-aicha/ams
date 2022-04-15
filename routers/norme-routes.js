const express=require('express')
const route=express.Router()
const norme_Controller=require('../controllers/normeController')

route.post('/ajoute_norme',(req,res,next)=>{
    norme_Controller.ajoute_norme(req.body.norme)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.get('/getAll_norme',(req,res,next)=>{
    norme_Controller.getAll_normes()
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.get('/getbyId_norme/:id',(req,res,next)=>{
    norme_Controller.getbyId_norme(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.patch('/update_norme/:id',(req,res,next)=>{
    norme_Controller.update_norme(req.params.id,req.body.norme) 
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/delete_norme/:id',(req,res,next)=>{
    norme_Controller.delete_norme(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

module.exports=route 