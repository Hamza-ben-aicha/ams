const db = require('../models')
const Joi = require('joi')
const sequelize = require("sequelize")

const SchemaValidation = Joi.object({
  date_deb: Joi.date().required(),
  date_fin: Joi.date().required(),
  ConsultantId: Joi.number().required(),
  EntrepriseId: Joi.number().required(),
  NormeId: Joi.number().required(),
})


// Register for projet
exports.ajoute_projet = (date_deb, date_fin, ConsultantId, EntrepriseId, NormeId) => {
  return new Promise((resolve, reject) => {
    let validation = SchemaValidation.validate({ date_deb, date_fin, ConsultantId, EntrepriseId, NormeId })
    if (validation.error) {
      reject(validation.error.details[0].message)
    } else {
      db.Projet.create({
        date_deb: date_deb,
        date_fin: date_fin,
        ConsultantId: ConsultantId,
        EntrepriseId: EntrepriseId,
        NormeId: NormeId,
      }).then((response) => {
        db.sequelize
          .query(
            `insert into resquestions(id_question) select id from questions where ArticleId in (select a.id from (articles a ,chapitres c, normes n) where a.ChapitreId=c.id and n.id=${response.NormeId} and c.NormeId=n.id)`
          )
          .then((res_q) => {
            if (!res_q) {
              resolve("erreur")
            } else {
              db.ResQuestions.findAll({ where: { ProjetId: null } })
                .then((aj_prj_q) => {
                  if (!aj_prj_q) {
                    resolve("erreur d'ajoute")
                  } else {
                    db.sequelize
                      .query(
                        `UPDATE resquestions SET ProjetId=${response.id} where ProjetId IS NULL `
                      )
                      .then((aj_y_n) => {
                        resolve(aj_y_n)
                      })
                  }

                })
            }

          })
      })
        .catch((err) => reject(err))
    }
  })
}


exports.getbyId_projet = (id) => {
  return new Promise((resolve, reject) => {
    db.Projet.findOne({ where: { id: id } }).then((projet) => {
      if (!projet) {
        reject("aucun projet");
      } else {
        db.Normes.findOne({ where: { id: projet.NormeId } }).then((norme) => {
          if (!norme) {
            reject("aucun Normes");
          } else {
            db.Chapitres.findAll({ where: { NormeId: projet.NormeId } }).then(
              (chapitre) => {
                if (!chapitre) {
                  reject("aucun chapitre");
                } else {
                  db.sequelize
                    .query(
                      `select * from articles where ChapitreId in (select c.id from (chapitres c ,normes n) where n.id=${projet.NormeId} and c.NormeId=n.id)`
                    )
                    .then((article) => {
                      if (!article) {
                        reject("aucun article");
                      } else {
                        db.sequelize
                          .query(
                            `select * from questions where ArticleId in (select a.id from (articles a ,chapitres c, normes n) where a.ChapitreId=c.id and n.id=${projet.NormeId} and c.NormeId=n.id)`
                          )
                          .then((question) => {
                            if (!question) {
                              reject("aucun question");
                            } else {
                              const questions = question[0];
                              const articles = article[0];
                              resolve({ norme, chapitre, articles, questions });
                            }
                          });
                      }
                    });
                }
              }
            );
          }
        });
      }
    });
  });
}

