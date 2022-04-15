const express=require('express')
const route=express.Router()
const projet_Controller=require('../controllers/projetController')

route.post('/ajoute_projet',(req,res,next)=>{
    projet_Controller.ajoute_projet(req.body.date_deb,req.body.date_fin,req.body.ConsultantId,req.body.EntrepriseId,req.body.NormeId)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.get('/getbyId_projet/:id',(req,res,next)=>{
    projet_Controller.getbyId_projet(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

module.exports=route 