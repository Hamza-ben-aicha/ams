// const db = require('../models')
// const Joi = require('joi')
// const sequelize = require("sequelize")


// exports.ajoute_resquestion = (NormeId) => {
//     return new Promise((resolve, reject) => {
//         db.sequelize
//         .query(
//           `select id from questions where ArticleId in (select a.id from (articles a ,chapitres c, normes n) where a.ChapitreId=c.id and n.id=${response.NormeId} and c.NormeId=n.id)`
//         ).then((question) => {
//           if (!question) {
//             reject("aucun question");
//           } else {
//             const list_id = question[0];
//               db.ResQuestions.create({
//                 id_question: list_id,
//                 ProjetId: response.id,
//               }).then((res) => {
//                 if (!res) {
//                   reject("erreur d'ajoute question de projet")
//                 } else {
//                   resolve(res)
//                 }
//               })
//           }
//         })
//           .catch((err) => reject(err))
//     })
//   }


