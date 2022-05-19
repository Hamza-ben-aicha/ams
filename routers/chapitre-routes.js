const express=require('express')
const route=express.Router()
const chapitre_Controller=require('../controllers/chapitreController')

route.post('/ajoute_chapitres',(req,res,next)=>{
    chapitre_Controller.ajoute_chapitres(req.body.Chapitres,req.body.NormeId) 
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.get('/getAll_chapitre',(req,res,next)=>{
    chapitre_Controller.getAll_chapitres()
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.get('/getbyId_chapitre/:id',(req,res,next)=>{
    chapitre_Controller.getbyId_chapitre(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.get('/getchp_byidnorme/:id',(req,res,next)=>{
    chapitre_Controller.getchp_byidnorme(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.patch('/update_chapitre/:id',(req,res,next)=>{
    chapitre_Controller.update_chapitre(req.params.id,req.body.Chapitres,req.body.NormeId)  
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/delete_chapitre/:id',(req,res,next)=>{
    chapitre_Controller.delete_chapitre(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

module.exports=route 