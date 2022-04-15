module.exports = (sequelize, Datatype) => {

    const Entreprise=sequelize.define("Entreprise",{
        mobile:{
            type:Datatype.INTEGER,
            allowNull:false
        },
        contact:{
            type:Datatype.STRING,
            allowNull:false
        },
        web:{
            type:Datatype.STRING,
            allowNull:false
        }
    })
    Entreprise.associate=models=>{
        Entreprise.belongsTo(models.Users,{
            onDelete:"cascade"
        })
        Entreprise.hasMany(models.Projet,{
            onDelete:"cascade"
        })
    }
    return Entreprise 
}  
