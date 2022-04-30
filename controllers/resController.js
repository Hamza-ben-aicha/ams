const db = require('../models')
const Joi = require('joi')
const sequelize = require("sequelize")



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
