const db = require('../models')
const Joi = require('joi')

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
            }).then((response) => resolve(response))
                .catch((err) => reject(err))
        }
    })
}


// // get projet by id 
exports.getbyId_projet = (id) => {
    return new Promise((resolve, reject) => {
        db.Projet.findOne({ where: { id: id } }).then(projet => {
            if (!projet) {
                reject("aucun projet")
            } else {

                db.Normes.findOne({ where: { id: projet.NormeId } }).then(norme => {
                    if (!norme) {
                        reject("aucun Normes")
                    } else {
                        db.Chapitres.findOne({ where: { NormeId: projet.NormeId } }).then(chapitre => {
                            if (!chapitre) {
                                reject("aucun chapitre")
                            } else {
                                db.Articles.findOne({ where: { ChapitreId: chapitre.id } }).then(article => {
                                    if (!article) {
                                        reject("aucun Article")
                                    } else {
                                        db.Questions.findOne({ where: { ArticleId: article.id } }).then(question => {
                                            if (!question) {
                                                reject("aucun question")
                                            } else {
                                                resolve({ norme , chapitre , article , question })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })
}








