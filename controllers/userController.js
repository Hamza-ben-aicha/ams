const db = require('../models')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const SchemaValidation = Joi.object({
    nom: Joi.string().min(3).max(30).required(),
    prenom: Joi.string().min(3).max(30).required(),
    telephone: Joi.number().min(11111111).max(99999999).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    adress: Joi.string().required(), 
    role: Joi.string().required()
})

exports.register = (nom, prenom, telephone, email, password, adress, role) => {
    return new Promise((resolve, reject) => {

        let validation = SchemaValidation.validate({ nom, prenom, telephone, email, password, adress, role })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }

        db.Users.count({ where: { email: email } }).then(doc => {
            if (doc != 0) {
                reject("This email is used")
            }
            else {
                bcrypt.hash(password, 10).then(hashedPassord => {
                    db.Users.create({
                        nom: nom,
                        prenom: prenom,
                        telephone: telephone,
                        email: email,
                        password: hashedPassord,
                        adress: adress,
                        role: role,
                    }).then((response) => resolve(response)).catch((err) => reject(err))
                    // ou  .create(req.body)
                })
            }
        })

    })
}



const PrivateKey = "eijnekv,evkznjzkveffznzivnz,feizivnafjafnmjf"
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        db.Users.findOne({ where: { email: email } }).then(user => {
            if (!user) {
                reject("invalid email and password")
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if (same) {
                        let token = jwt.sign({ id: user.id, username: user.id, role: "userrole" }, PrivateKey, {
                            expiresIn: "24h"
                        })
                        resolve(token)
                    } else {
                        reject("invalid email and password") 
                    }
                })
            }
        })
    })
}


exports.get_user = (id) => {
    return new Promise((resolve, reject) => {

        db.Users.findOne({where:{id:req.params.id} }).then(user => {
            if (!user) {
                reject("aucun user")
            } else {
                bcrypt.compare(id, user.id).then(same => {
                    if (same) {
                        resolve(user.nom)
                    } else {
                        reject("aucun user")
                    }
                })
            }
        })
    })
}
