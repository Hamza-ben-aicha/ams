module.exports = (sequelize, Datatype) => {

    const Admin=sequelize.define("Admin",{
       
    })
    Admin.associate=models=>{
        Admin.belongsTo(models.Users,{
            onDelete:"cascade"
        })
    }
    return Admin 
}  
