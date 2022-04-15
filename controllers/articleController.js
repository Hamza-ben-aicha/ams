const db = require('../models')
const Joi = require('joi')
const res = require('express/lib/response')

const SchemaValidation = Joi.object({
    Articles: Joi.string().min(3).required(),
    ChapitreId: Joi.number().required(),
})
// Register for articles
exports.ajoute_articles = (Articles, ChapitreId) => {
    return new Promise((resolve, reject) => {
        let validation = SchemaValidation.validate({ Articles, ChapitreId })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        db.Articles.count({ where: { Articles: Articles } }).then(doc => {
            if (doc != 0) {
                reject("This Article disponible")
            }
            else {
                db.Articles.create({
                    Articles: Articles,
                    ChapitreId: ChapitreId,
                }).then((response) => {
                    resolve(response)
                }).catch((err) => reject(err))
            }
        })

    })
}


// get article by id 
exports.getbyId_article = (id) => {
    return new Promise((resolve, reject) => {
        db.Articles.findOne({ where: { id: id } }).then(article => {
            if (!article) {
                reject("aucun Article")
            } else {
                resolve(article)
            }
        })
    })
}

// get All articles
exports.getAll_articles = () => {
    return new Promise((resolve, reject) => {
        db.Articles.findAll().then(articles => {
            if (!articles) {
                reject("aucun articles")
            } else {
                resolve(articles)
            }
        })
    })
}

// update Article 
exports.update_article = (id, Articles, ChapitreId) => {
    return new Promise((resolve, reject) => {
        let valide = SchemaValidation.validate({ Articles, ChapitreId })
        if (valide.error) {
            reject(valide.error.details[0].message)
        }
        db.Articles.count({ where: { Articles: Articles } }).then(doc => {
            if (doc == 0) {
                db.Articles.update({
                    Articles: Articles,
                    ChapitreId: ChapitreId,
                }, { where: { id: id } }).then((response) => {
                    if (!response) {
                        reject("error for update")
                    } else {
                        resolve("update success")
                    }
                }).catch((err) => reject(err))
            } else if (doc != 0) {
                db.Articles.findOne({ where: { id: id } }).then(res => {
                    if (res.Articles == Articles) {
                        db.Articles.update({
                            Articles: Articles,
                            ChapitreId: ChapitreId,
                        }, { where: { id: id } }).then((response) => {
                            if (!response) {
                                reject("error for update")
                            } else {
                                resolve("update success")
                            }
                        }).catch((err) => reject(err))
                    } else {
                        reject("This Article is used")
                    }
                })
            }
        })

    })
}

// delete Article
exports.delete_article = (id) => {
    return new Promise((resolve, reject) => {
        db.Articles.destroy({ where: { id: id } }).then(article => {
            if (!article) {
                reject("erorr for delete thes is article")
            } else {
                resolve({ Success: true, message: "article is delete by Success" })
            }
        })
    })
}