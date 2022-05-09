const db = require('../models')
const Joi = require('joi')
const sequelize = require("sequelize")



// Conforme :100 % , Acceptable :66%, Aaméliorer :33%, Non-conforme :0%, Exclus (NA) :NA 
exports.update_res = (table_objet) => {
    return new Promise((resolve, reject) => {
        table_objet.map((item) => {
            // console.log(item.id);
            if (item.evaluation == "Conforme") {
                db.sequelize
                    .query(
                        `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="100" where id=${item.id} `
                    ).then((res) => {
                        resolve(res);
                    })
            } else if (item.evaluation == "Acceptable") {
                db.sequelize
                    .query(
                        `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="66" where id=${item.id} `
                    )
                    .then((res) => {
                        resolve(res);
                    })
            } else if (item.evaluation == "Aaméliorer") {
                db.sequelize
                    .query(
                        `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="33" where id=${item.id} `
                    )
                    .then((res) => {
                        resolve(res);
                    })
            } else if (item.evaluation == "Non-conforme") {
                db.sequelize
                    .query(
                        `UPDATE resquestions SET evaluation="${item.evaluation}",observation="${item.observation}", note="0" where id=${item.id} `
                    )
                    .then((res) => {
                        resolve(res);
                    })
            } else {
                db.sequelize
                    .query(
                        `UPDATE resquestions SET evaluation="Exclus(NA)",observation="${item.observation}", note="NA" where id=${item.id} `
                    )
                    .then((res) => {
                        resolve(res);
                    })
            }
        })
    })
}




exports.res_chap = (table_objet_id, id) => {
    return new Promise((resolve, reject) => {
        // db.ResQuestions.findAll({ where: { ProjetId: id } }).then((projet) => {

        //      resolve(projet)
        //     // projet.map((item) => {
        //     //     resolve(item)

        //     // })

        // });
        table_objet_id.map((item) => {
        db.sequelize
            .query(
                `select avg( note ) from resquestions where ProjetId=${id} and ChapitreId=${item.id} and note =! "NA" `
            )
            .then((projet) => {
        //         //  resolve(projet[0].id)
        //         // var res=0;
        //         // projet[0].map((item) => {

        //         //  projet[0].map((item) => {
        //         //     // var res=0;
        //         //       table_objet_id.map((tab_id) => {
        //         //           if(item.id==tab_id.id){
        //         //             res += item.note;
                              console.log(projet)
        //         //           }

                        })
        // table_objet_id.map((item) => {
        //     console.log(item.id)
        })


        //     // });
        // })
    });
}
