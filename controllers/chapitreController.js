const db = require('../models')
const Joi = require('joi')

const SchemaValidation = Joi.object({
    Chapitres: Joi.string().min(3).required(),
    NormeId: Joi.number().required(),
})
// Register for chapitre
exports.ajoute_chapitres = (Chapitres, NormeId) => {
    return new Promise((resolve, reject) => {
        let validation = SchemaValidation.validate({ Chapitres, NormeId })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        db.Chapitres.count({ where: { Chapitres: Chapitres } }).then(doc => {
            if (doc != 0) {
                reject("This Chapitre disponible")
            }
            else {
                db.Chapitres.create({
                    Chapitres: Chapitres,
                    NormeId: NormeId,
                }).then((response) => {
                    resolve(response)
                }).catch((err) => reject(err))
            }
        })

    })
}

// get chapitre by id 
exports.getbyId_chapitre = (id) => {
    return new Promise((resolve, reject) => {
        db.Chapitres.findOne({ where: { id: id } }).then(chapitre => {
            if (!chapitre) {
                reject("aucun chapitre")
            } else {
                resolve(chapitre)
            }
        })
    })
}

// getby_idnorme
exports.getchp_byidnorme= (id) => {
    return new Promise((resolve, reject) => {
        db.Chapitres.findAll({ where: { NormeId: id } }).then(chapitre => {
            if (!chapitre) {
                reject("aucun chapitre")
            } else {
                resolve(chapitre)
            }
        })
    })
}

// get All chapitres
exports.getAll_chapitres = () => {
    return new Promise((resolve, reject) => {
        db.Chapitres.findAll().then(chapitre => {
            if (!chapitre) {
                reject("aucun chapitres")
            } else {
                resolve(chapitre)
            }
        })
    })
}



// update chapitre 
exports.update_chapitre = (id, Chapitres, NormeId) => {
    return new Promise((resolve, reject) => {
        let valide = SchemaValidation.validate({ Chapitres, NormeId })
        if (valide.error) {
            reject(valide.error.details[0].message)
        }
        db.Chapitres.count({ where: { Chapitres: Chapitres } }).then(doc => {
            if (doc == 0) {
                db.Chapitres.update({
                    Chapitres: Chapitres,
                    NormeId: NormeId,
                }, { where: { id: id } }).then((response) => {
                    if (!response) {
                        reject("error for update")
                    } else {
                        resolve("update success")
                    }
                }).catch((err) => reject(err))
            } else if (doc != 0) {
                db.Chapitres.findOne({ where: { id: id } }).then(res => {
                    if (res.Chapitres == Chapitres) {
                        db.Chapitres.update({
                            Chapitres: Chapitres,
                            NormeId: NormeId,
                        }, { where: { id: id } }).then((response) => {
                            if (!response) {
                                reject("error for update")
                            } else {
                                resolve("update success")
                            }
                        }).catch((err) => reject(err))
                    } else {
                        reject("This Chapitre is used")
                    }
                })
            }
        })

    })
}

// delete chapitre
exports.delete_chapitre = (id) => {
    return new Promise((resolve, reject) => {
        db.Chapitres.destroy({ where: { id: id } }).then(chapitre => {
            if (!chapitre) {
                reject("erorr for delete thes is chapitre")
            } else {
                resolve({ Success: true, message: "chapitre is delete by Success" })
            }
        })
    })
}
