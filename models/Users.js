module.exports = (sequelize, Datatype) => {

    const Users=sequelize.define("Users",{
        nom:{
          type:Datatype.STRING,
          allowNull:false
        },
        prenom:{
            type:Datatype.STRING,
            allowNull:false
        },
        telephone:{
            type:Datatype.INTEGER,
            allowNull:false
        },
        email:{
            type:Datatype.STRING,
            allowNull:false
        },
        password:{
            type:Datatype.STRING,
            allowNull:false
        },
        adress:{
            type:Datatype.STRING,
            allowNull:false
        },
        role:{
            type:Datatype.STRING,
            allowNull:false
        } 
    })
    
    Users.associate=models=>{
        Users.hasOne(models.Admin,{
            onDelete:"cascade"
        })
        Users.hasOne(models.Consultant,{
            onDelete:"cascade"
        })
        Users.hasOne(models.Entreprise,{
            onDelete:"cascade"
        })
    }
    return Users 
}  
