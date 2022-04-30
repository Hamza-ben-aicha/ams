const db = require('../models')
const Joi = require('joi')
const sequelize = require("sequelize")


// Register for projet
// exports.ajoute_projet = (date_deb, date_fin, ConsultantId, EntrepriseId, NormeId) => {
//   return new Promise((resolve, reject) => {
//     let validation = SchemaValidation.validate({ date_deb, date_fin, ConsultantId, EntrepriseId, NormeId })
//     if (validation.error) {
//       reject(validation.error.details[0].message)
//     } else {
//       db.Projet.create({
//         date_deb: date_deb,
//         date_fin: date_fin,
//         ConsultantId: ConsultantId,
//         EntrepriseId: EntrepriseId,
//         NormeId: NormeId,
//       }).then((response) => {
//         db.sequelize
//           .query(
//             `insert into resquestions(id_question) select id from questions where ArticleId in (select a.id from (articles a ,chapitres c, normes n) where a.ChapitreId=c.id and n.id=${response.NormeId} and c.NormeId=n.id)`
//           )
//           .then((res_q) => {
//                 resolve(res_q);
//           })
//       })
//         .catch((err) => reject(err))
//     }
//   })
// }
// update user 


// exports.getbyId_projet = (id) => {
//     return new Promise((resolve, reject) => {
//       db.Projet.findOne({ where: { id: id } }).then((projet) => {
//         if (!projet) {
//           reject("aucun projet");
//         } else {
//           db.Normes.findOne({ where: { id: projet.NormeId } }).then((norme) => {
//             if (!norme) {
//               reject("aucun Normes");
//             } else {
//               db.Chapitres.findAll({ where: { NormeId: projet.NormeId } }).then(
//                 (chapitre) => {
//                   if (!chapitre) {
//                     reject("aucun chapitre");
//                   } else {
//                     db.sequelize
//                       .query(
//                         `select * from articles where ChapitreId in (select c.id from (chapitres c ,normes n) where n.id=${projet.NormeId} and c.NormeId=n.id)`
//                       )
//                       .then((article) => {
//                         if (!article) {
//                           reject("aucun article");
//                         } else {
//                           db.sequelize
//                             .query(
//                               `select * from questions where ArticleId in (select a.id from (articles a ,chapitres c, normes n) where a.ChapitreId=c.id and n.id=${projet.NormeId} and c.NormeId=n.id)`
//                             )
//                             .then((question) => {
//                               if (!question) {
//                                 reject("aucun question");
//                               } else {
//                                 const questions = question[0];
//                                 const articles = article[0];
//                                 resolve({ norme, chapitre, articles, questions });
//                               }
//                             });
//                         }
//                       });
//                   }
//                 }
//               );
//             }
//           });
//         }
//       });
//     });
//   }


// exports.update_res = (id, evaluation, observation, note) => {
//     return new Promise((resolve, reject) => {  
//         db.ResQuestions.findAll({ where: { id: id } }).then(doc => {

//                     db.ResQuestions.update({
//                         evaluation: evaluation,
//                         observation: observation,
//                         note: note,

//                     }, { where: { id: id } }).then((response) => {
//                         if (!response) {
//                             reject("error for update")
//                         } else {
//                             resolve("update success")
//                         }
//                     }).catch((err) => reject(err))

//         })

//     })
// }

// Conforme :100 % , Acceptable :66%, Aaméliorer :33%, Non-conforme :0%, Exclus (NA) :NA 
exports.update_res = (table_objet) => {
    return new Promise((resolve, reject) => {
        table_objet.map((item)=> {
            // console.log(item.id);
            if(item.evaluation == "Conforme"){
                db.sequelize
            .query(
              `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="100" where id=${item.id} `
            ).then((res) => {
                console.log(res);
            })
            } else if(item.evaluation == "Acceptable"){
                db.sequelize
                .query(
                  `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="66" where id=${item.id} `
                )
                .then((res) => {
                    console.log(res);
                })
            } else if(item.evaluation == "Aaméliorer"){
                db.sequelize
                .query(
                  `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="33" where id=${item.id} `
                )
                .then((res) => {
                    console.log(res);
                })
            }else if(item.evaluation == "Non-conforme"){
                db.sequelize
                .query(
                  `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="0" where id=${item.id} `
                )
                .then((res) => {
                    console.log(res); 
                })
            }else{
                db.sequelize
                .query(
                  `UPDATE resquestions SET evaluation="Exclus(NA)",observation="${item.observation}", note="NA" where id=${item.id} `
                )
                .then((res) => {
                    console.log(res);
                })
            }
        }) 
    })
}
