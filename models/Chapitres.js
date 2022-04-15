module.exports = (sequelize, Datatype) => {

    const Chapitres=sequelize.define("Chapitres",{
        Chapitres:{
          type:Datatype.STRING,
          allowNull:false
        } 
    })
    Chapitres.associate=models=>{
        Chapitres.belongsTo(models.Normes,{
            onDelete:"cascade"
        })
        Chapitres.hasMany(models.Articles, {
            onDelete: "cascade"
        })
    }
    return Chapitres 
}  
