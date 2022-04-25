module.exports = (sequelize, Datatype) => {

    const ResQuestions=sequelize.define("ResQuestions",{
        id_question:{
          type:Datatype.STRING,
          allowNull:false
        },
        // id_article:{
        //     type:Datatype.STRING,
        //     allowNull:false
        // },
        // id_chapitre:{
        //     type:Datatype.STRING,
        //     allowNull:false
        // },
        // id_projet:{
        //     type:Datatype.STRING,
        //     allowNull:false
        // },
        // evaluation:{
        //     type:Datatype.STRING,
        //     allowNull:false
        // },
        // observation:{
        //     type:Datatype.STRING,
        //     allowNull:false
        // },
        // note:{
        //     type:Datatype.STRING,
        //     allowNull:false
        // }
    })
    ResQuestions.associate=models=>{
        ResQuestions.belongsTo(models.Projet,{
            onDelete:"cascade"
        })
        
    }
    return ResQuestions 
}  
