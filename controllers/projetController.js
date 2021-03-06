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
                        // if (!aj_y_n) {
                        //   resolve("erreur d'ajoute")
                        // } else {

                        // }
                      })
                    aj_prj_q.map((item) => {
                      db.sequelize
                        .query(
                          `update db_ams.resquestions set ChapitreId = (select id from db_ams.chapitres where id = (select ChapitreId from db_ams.articles where id = (select ArticleId from db_ams.questions where id = ${item.id_question}))) where ProjetId = ${response.id} and id_question = ${item.id_question}`
                        )
                        .then((reschap) => {
                          resolve(item.id_question)
                        })
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

exports.get_projet = () => {
  return new Promise((resolve, reject) => {
    db.Projet.findAll().then((projet) => {
      if (!projet) {
        reject("aucun projet");
      } else {
        // resolve(projet)

        db.sequelize
        .query(
          `select norme from normes where id=${projet.NormeId}`
        )
        .then((norme) => {
            
                resolve(norme)
                //     db.Chapitres.findAll({ where: { NormeId: projet.NormeId } }).then(
                //       (chapitre) => {
                //         if (!chapitre) {
                //           reject("aucun chapitre");
                //         } else {
                //         }
                //       }
                //     );
        });
      }
    });
  });
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


const oneEntre = async (id) => {
  const variable = await db.Users.findOne({ where: { id: id } }).then((res) => {
    return res?.username;
  });
  return variable;
};

const oneNorme = async (id) => {
  const variable = await db.Normes.findOne({ where: { id: id } }).then((result) => {
    return result.norme
  })
  return variable;
}
// get projet by id consultant

exports.getProjectByIdC = async (req, res, next) => {
  try {
    const projects = await db.Projet.findAll({
      where: { ConsultantId: req.params.id },
    }).then((result) => {
      if (result.length == 0) {
        res.status(400).json({ message: "no Project found for that consultant" });
      } else {
        return result;
      }
    });
    let EntrepriseNames = [];
    let Normes = [];
    let index = 0;
    projects.forEach(async (element) => {
      EntrepriseNames.push(await oneEntre(element.EntrepriseId));
      Normes.push(await oneNorme(element.NormeId))
      if (index == projects.length - 1) {
        res.json({ projects, EntrepriseNames, Normes });
      }
      index++;
    })


  } catch (error) {
  }
};