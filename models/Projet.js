module.exports = (sequelize, Datatype) => {

    const Projet=sequelize.define("Projet",{
        date_deb:{
          type:Datatype.DATE,
          allowNull:false
        },
        date_fin:{
            type:Datatype.DATE,
            allowNull:false
        },
    })
    
    Projet.associate=models=>{
        Projet.belongsTo(models.Consultant,{
            // onDelete:"cascade"
        })
        Projet.belongsTo(models.Entreprise,{   
            // onDelete:"cascade"
        })
        Projet.belongsTo(models.Normes,{  
            // onDelete:"cascade"
        })
        Projet.hasMany(models.ResQuestions,{
            onDelete:"cascade"
        }) 
    }
    return Projet 
}  
