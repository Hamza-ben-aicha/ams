const express = require("express")
const app = express()
const cors = require("cors")
// const port=3000
const db = require('./models')
const user_router = require("./routers/user-routes")
const norme_router = require("./routers/norme-routes")
const chapitre_router = require("./routers/chapitre-routes")
const article_router = require("./routers/article-routes")
const question_router = require("./routers/question-routes")
const projet_router = require("./routers/projet-routes")

require('dotenv').config()

const mailer = require('./controllers/gmail')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', user_router)
app.use('/', norme_router)
app.use('/', chapitre_router)
app.use('/', article_router)
app.use('/', question_router)
app.use('/', projet_router)
// app.get('/', (req,res)=>{
//     res.send('hello World')
// })
app.post('/send-mail', async (req, res) => {
    await mailer();
    res.send('evoiye avec succes')
})

const port = process.env.PORT
// init server 
db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`))
})
