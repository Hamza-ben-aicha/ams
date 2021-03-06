const db = require('../models')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SchemaValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    telephone: Joi.number().min(11111111).max(99999999).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    adress: Joi.string().required(),
    mobile: Joi.number().min(11111111).max(99999999),
    contact: Joi.string(),
    web: Joi.string()
})

// Register for entreprise
exports.register_entreprise = (username, telephone, email, password, adress, mobile, contact, web) => {
    return new Promise((resolve, reject) => {
        let validation = SchemaValidation.validate({ username, telephone, email, password, adress })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }else{

        
        db.Users.count({ where: { email: email } }).then(doc => {
            if (doc != 0) {
                reject("This email is used")
            }
            else {
                bcrypt.hash(password, 10).then(hashedPassord => {
                    db.Users.create({
                        username: username,
                        telephone: telephone,
                        email: email,
                        password: hashedPassord,
                        adress: adress,
                        role: "entreprise",
                    }).then((response) => {
                        if (response) {
                            db.Entreprise.create({
                                mobile: mobile,
                                contact: contact,
                                web: web,
                                UserId: response.id,
                            }).then((user) => resolve({ user: response, contact: user }))
                        } else {
                            reject("error for insertion")
                        }
                    }).catch((err) => reject(err))
                })
            }
        })
    }
    })
}

// Register for consultant 
exports.register_consultant = (username, telephone, email, password, adress,) => {
    return new Promise((resolve, reject) => {

        let validation = SchemaValidation.validate({ username, telephone, email, password, adress })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        else {
            db.Users.count({ where: { email: email } }).then(doc => {
                if (doc != 0) {
                    reject("This email is used")
                }
                else {
                    bcrypt.hash(password, 10).then(hashedPassord => {
                        db.Users.create({
                            username: username,
                            telephone: telephone,
                            email: email,
                            password: hashedPassord,
                            adress: adress,
                            role: "consultant",
                        }).then((response) => {
                            if (response) {
                                db.Consultant.create({
                                    disponibilit??: true,
                                    UserId: response.id
                                }).then((user) => resolve({ user: response, disponibilit??: user }))
                            } else {
                                reject("error for insertion")
                            }
                        }).catch((err) => reject(err))
                    })
                }
            })
        }

    })
}

const PrivateKey = process.env.PRIVETKEY

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        db.Users.findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                reject("invalid email");
            } else {
                bcrypt.compare(password, user.password).then((same) => {
                    if (same) {
                        let token = jwt.sign(
                            { id: user.id, username: user.email, role: user.role },
                            PrivateKey,
                            {
                                expiresIn: "24h",
                            }
                        );
                        const id = user.id;
                        const role = user.role;
                        switch (role) {
                            case "consultant":
                                db.Consultant.findOne({ where: { UserId: id } }).then(
                                    (consultant) => {
                                        user = { ...user.dataValues, subInfo: consultant };
                                        resolve({ user, token });
                                    }
                                );
                            case "entreprise":
                                db.Entreprise.findOne({ where: { UserId: id } }).then(
                                    (entreprise) => {
                                        user = { ...user.dataValues, subInfo: entreprise };
                                        resolve({ user, token });
                                    }
                                );
                            case "admin":
                                db.Admin.findOne({ where: { UserId: id } }).then((admin) => {
                                    user = { ...user.dataValues, subInfo: admin };
                                    resolve({ user, token });
                                });
                        }
                    } else {
                        reject("invalid password");
                    }
                });
            }
        });
    });
};

// login admin or consultant or entreprise 
// const PrivateKey = "eijnekv,evkznjzkveffznzivnz,feizivnafjafnmjf"
// exports.login = (email, password) => {
//     return new Promise((resolve, reject) => {
//         db.Users.findOne({ where: { email: email } }).then(user => {
//             if (!user) {
//                 reject("invalid email and password")
//             } else {
//                 bcrypt.compare(password, user.password).then(same => {
//                     if (same) {
//                         let token = jwt.sign({ id: user.id, username: user.id, role: "userrole" }, PrivateKey, {
//                             expiresIn: "24h"
//                         })
//                         resolve(token)
//                     } else {
//                         reject("invalid email and password")
//                     }
//                 })
//             }
//         })
//     })
// }
// get user by id 
exports.getbyId_consultant = (id) => {
    return new Promise((resolve, reject) => {
        db.Users.findOne({ where: { id: id, role: "consultant" } }).then(user => {
            if (!user) {
                reject("aucun user")
            } else {
                resolve(user)
            }
        })
    })
}

exports.getbyId_entreprise = (id) => {
    return new Promise((resolve, reject) => {
        db.Users.findOne({ where: { id: id, role: "entreprise" } }).then(user => {
            db.Entreprise.findOne({ where: { UserId: id } }).then(user_c => {
                if (!user_c) {
                    reject("aucun user")
                } else {
                    user = { ...user.dataValues, subInfo: user_c };
                    resolve(user);
                }
            })
        })
    })
}

// get All users
exports.getAll_users = () => {
    return new Promise((resolve, reject) => {
        db.Users.findAll().then(users => {
            if (!users) {
                reject("aucun users")
            } else {
                resolve(users)
            }
        })
    })
}

// get All consultant
exports.getAll_consultant = () => {
    return new Promise((resolve, reject) => {
        db.Users.findAll({ where: { role: "consultant" } }).then(users => {
            if (!users) {
                reject("aucun users")
            } else {
                resolve(users)
            }
        })
    })
}

// get All entreprise
exports.getAll_entreprise = () => {
    return new Promise((resolve, reject) => {
        db.Users.findAll({ where: { role: "entreprise" } }).then(users => {
            // console.log(users);
            if (!users) {
                reject("aucun users")
            } else {
                resolve(users)
            }
        })
    })
}

// update user 
exports.update_user = (id, username, telephone, email, password, adress) => {
    return new Promise((resolve, reject) => {
        let valide = SchemaValidation.validate({ username, telephone, email, password, adress })
        if (valide.error) {
            reject(valide.error.details[0].message)
        }
        db.Users.count({ where: { email: email } }).then(doc => {
            if (doc == 0) {
                bcrypt.hash(password, 10).then(hashedPassord => {
                    db.Users.update({
                        username: username,
                        telephone: telephone,
                        email: email,
                        password: hashedPassord,
                        adress: adress,
                    }, { where: { id: id } }).then((response) => {
                        if (!response) {
                            reject("error for update")
                        } else {
                            resolve("update success")
                        }
                    }).catch((err) => reject(err))
                })
            } else if (doc != 0) {
                db.Users.findOne({ where: { id: id } }).then(user => {
                    if (user.email == email) {
                        bcrypt.hash(password, 10).then(hashedPassord => {
                            db.Users.update({
                                username: username,
                                telephone: telephone,
                                email: email,
                                password: hashedPassord,
                                adress: adress,
                            }, { where: { id: id } }).then((response) => {
                                if (!response) {
                                    reject("error for update")
                                } else {
                                    resolve("update success")
                                }
                            }).catch((err) => reject(err))
                        })
                    } else {
                        reject("This email is used")
                    }
                })
            }
        })

    })
}

// delete user 
exports.delete_user = (id) => {
    return new Promise((resolve, reject) => {
        db.Users.destroy({ where: { id: id } }).then(user => {
            if (!user) {
                reject("erorr for delete thes is user")
            } else {
                resolve({ Success: true, message: "user is delete by Success" })
            }
        })
    })
}




