const {DataTypes}= require('sequelize')
const seq=require('../db/seq')

// 创建模型(koa_user -->koa_users 表名)
const User=seq.define("koa_user",{
    // id 会被sequelize 自动创建
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        comment:"唯一用户名"
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:"密码"
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:"是否管理员 0否(默认值) 1是"
    }

}
// ,{
//     // 取消时间戳字段
//     timestamps:false
// }
)

// 强制同步数据库 创建数据表 有了就删了重建
User.sync({
    // force:true
})

module.exports=User