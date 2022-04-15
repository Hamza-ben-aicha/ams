module.exports = (sequelize, Datatype) => {

    const Questions=sequelize.define("Questions",{
        Questions:{
          type:Datatype.STRING,
          allowNull:false
        } 
    })
    Questions.associate=models=>{
        Questions.belongsTo(models.Articles,{
            onDelete:"cascade"
        })
    }
    return Questions 
}  
