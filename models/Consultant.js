module.exports = (sequelize, Datatype) => {

    const Consultant=sequelize.define("Consultant",{
       
        disponibilité:{
            type:Datatype.BOOLEAN,
            allowNull:false
        }
        
    })
    Consultant.associate=models=>{
        Consultant.belongsTo(models.Users,{
            onDelete:"cascade"
        })
    }
    return Consultant 
}  
