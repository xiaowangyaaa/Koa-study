// 1 导入seqlize
const seq=require('../db/seq')
// 导入类型选择器
const { DataTypes } = require('sequelize')
// 2 定义建表 (字段)
const Address=seq.define('address',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    consignee:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'收件人'
    },
    phone:{
        type:DataTypes.CHAR(11),
        allowNull:false,
        comment:"收件人手机号"
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:"收货人地址"
    },
    is_default:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:"是否默认地址"
    }
})
// 3 同步 sync (建表)
Address.sync({

})
// 导出模型对象
module.exports=Address