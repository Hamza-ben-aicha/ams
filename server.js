const express=require("express")
const app=express() 
const port=3000
const db=require('./models')
const user_router=require("./routers/user-routes")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',user_router)
// app.get('/', (req,res)=>{
//     res.send('hello World')
// })
db.sequelize.sync().then(()=>{
    app.listen(port, ()=>console.log(`Server running on port ${port}`))
})
