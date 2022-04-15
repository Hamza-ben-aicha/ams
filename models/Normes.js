module.exports = (sequelize, Datatype) => { 
  const Normes = sequelize.define("Normes", {
    norme: {
      type: Datatype.STRING,
      allowNull: false
    }
  })
 
  Normes.associate = models => {
    Normes.hasMany(models.Chapitres, {
      onDelete: "cascade"
    })
    Normes.hasOne(models.Projet,{
      onDelete:"cascade"
  }) 
  } 
  return Normes
}  
