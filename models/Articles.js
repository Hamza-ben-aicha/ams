module.exports = (sequelize, Datatype) => {

    const Articles=sequelize.define("Articles",{
        Articles:{
          type:Datatype.STRING,
          allowNull:false
        } 
    }) 
    Articles.associate=models=>{
        Articles.belongsTo(models.Chapitres,{
            onDelete:"cascade"
        }) 
        Articles.hasMany(models.Questions, {
            onDelete: "cascade"
        })
        Articles.belongsTo(models.Normes,{
            onDelete:"cascade"
        })
    } 
    return Articles 
}  
