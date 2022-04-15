const express=require('express')
const route=express.Router()
const question_Controller=require('../controllers/questionController')


route.post('/ajoute_question',(req,res,next)=>{
    question_Controller.ajoute_questions(req.body.Questions, req.body.ArticleId)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.get('/getAll_question',(req,res,next)=>{
    question_Controller.getAll_questions()
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.get('/getbyId_question/:id',(req,res,next)=>{
    question_Controller.getbyId_question(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

route.patch('/update_question/:id',(req,res,next)=>{
    question_Controller.update_question(req.params.id,req.body.Questions, req.body.ArticleId)  
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/delete_question/:id',(req,res,next)=>{
    question_Controller.delete_question(req.params.id)
    .then(response=>res.status(200).json(response))
    .catch((err)=>res.status(400).json({err:err}))
})

module.exports=route 
