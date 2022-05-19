const db = require('../models')
const Joi = require('joi')

const SchemaValidation = Joi.object({
    Questions: Joi.string().min(3).required(),
    ArticleId: Joi.number().required(),
})
// Register for question
exports.ajoute_questions = (Questions, ArticleId) => {
    return new Promise((resolve, reject) => {
        let validation = SchemaValidation.validate({ Questions, ArticleId })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        db.Questions.count({ where: { Questions: Questions } }).then(doc => {
            if (doc != 0) {
                reject("This Question disponible")
            }
            else {
                db.Questions.create({
                    Questions: Questions,
                    ArticleId: ArticleId,
                }).then((response) => {
                    resolve(response)
                }).catch((err) => reject(err))
            }
        })

    })
}

// get Question by id 
exports.getbyId_question = (id) => {
    return new Promise((resolve, reject) => {
        db.Questions.findOne({ where: { id: id } }).then(question => {
            if (!question) {
                reject("aucun question")
            } else {
                resolve(question)
            }
        })
    })
}

// get Question by id article
exports.getquestion_byIdarticle = (id) => {
    return new Promise((resolve, reject) => {
        db.Questions.findAll({ where: { ArticleId: id } }).then(question => {
            if (!question) {
                reject("aucun question")
            } else {
                resolve(question)
            }
        })
    })
}

// get All Questions
exports.getAll_questions = () => {
    return new Promise((resolve, reject) => {
        db.Questions.findAll().then(question => {
            if (!question) {
                reject("aucun questions")
            } else {
                resolve(question)
            }
        })
    })
}

// update question 
exports.update_question = (id, Questions, ArticleId) => {
    return new Promise((resolve, reject) => {
        let valide = SchemaValidation.validate({ Questions, ArticleId })
        if (valide.error) {
            reject(valide.error.details[0].message)
        }
        db.Questions.count({ where: { Questions: Questions } }).then(doc => {
            if (doc == 0) {
                db.Questions.update({
                    Questions: Questions,
                    ArticleId: ArticleId,
                }, { where: { id: id } }).then((response) => {
                    if (!response) {
                        reject("error for update")
                    } else {
                        resolve("update success")
                    }
                }).catch((err) => reject(err))
            } else if (doc != 0) {
                db.Questions.findOne({ where: { id: id } }).then(res => {
                    if (res.Articles == Articles) {
                        db.Questions.update({
                            Questions: Questions,
                            ArticleId: ArticleId,
                        }, { where: { id: id } }).then((response) => {
                            if (!response) {
                                reject("error for update")
                            } else {
                                resolve("update success")
                            }
                        }).catch((err) => reject(err))
                    } else {
                        reject("This Question is used")
                    }
                })
            }
        })

    })
}

// delete question
exports.delete_question = (id) => {
    return new Promise((resolve, reject) => {
        db.Questions.destroy({ where: { id: id } }).then(question => {
            if (!question) { 
                reject("erorr for delete this is question")
            } else {
                resolve({ Success: true, message: "question is delete by Success" })
            }
        })
    })
}
