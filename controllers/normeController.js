const db = require('../models')
const Joi = require('joi')

const SchemaValidation = Joi.object({
    norme: Joi.string().min(3).max(50).required(),
})
// Register for Norme
exports.ajoute_norme = (norme) => {
    return new Promise((resolve, reject) => {
        let validation = SchemaValidation.validate({ norme })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        db.Normes.count({ where: { norme: norme } }).then(doc => {
            if (doc != 0) {
                reject("This norme disponible")
            }
            else {
                db.Normes.create({
                    norme: norme,
                }).then((response) => {
                    resolve(response)
                }).catch((err) => reject(err))
            }
        })

    })
}


// get norme by id 
exports.getbyId_norme = (id) => {
    return new Promise((resolve, reject) => {
        db.Normes.findOne({ where: { id: id } }).then(norme => {
            if (!norme) {
                reject("aucun norme")
            } else {
                resolve(norme)
            }
        })
    })
}

// get All normes
exports.getAll_normes = () => {
    return new Promise((resolve, reject) => {
        db.Normes.findAll().then(norme => {
            if (!norme) {
                reject("aucun normes")
            } else {
                resolve(norme)
            }
        })
    })
}

// update Norme 
exports.update_norme = (id, norme) => {
    return new Promise((resolve, reject) => {
        let valide = SchemaValidation.validate({ norme })
        if (valide.error) {
            reject(valide.error.details[0].message)
        }
        db.Normes.count({ where: { norme: norme } }).then(doc => {
            if (doc == 0) {
                db.Normes.update({
                    norme: norme,
                }, { where: { id: id } }).then((response) => {
                    if (!response) {
                        reject("error for update")
                    } else {
                        resolve("update success")
                    }
                }).catch((err) => reject(err))
            } else if (doc != 0) {
                db.Normes.findOne({ where: { id: id } }).then(res => {
                    if (res.norme == norme) {
                        db.Normes.update({
                            norme: norme,
                        }, { where: { id: id } }).then((response) => {
                            if (!response) {
                                reject("error for update")
                            } else {
                                resolve("update success")
                            }
                        }).catch((err) => reject(err))
                    } else {
                        reject("This norme is used")
                    }
                })
            }
        })
    })
}

// delete norme
exports.delete_norme = (id) => {
    return new Promise((resolve, reject) => {
        db.Normes.destroy({ where: { id: id } }).then(norme => {
            if (!norme) { 
                reject("erorr for delete this is norme")
            } else {
                resolve({ Success: true, message: "norme is delete by Success" })
            }
        })
    })
}



