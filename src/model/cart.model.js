// 导入sequelize的连接
const seq=require('../db/seq')
// 导入类型
const {DataTypes}= require('sequelize')
// 导入Goods模型 建立关联关系
const Goods=require('./goods.model')
// 定义cart模型
const Cart=seq.define("cart",{
    goods_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品的id'
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户的id'
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'商品的数量'
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
        comment:'是否选中'
    }
})
// 同步数据 (建表)
Cart.sync(
    {
        // alter: true 
    }
    )
// 建立关联关系  cart中的goods-id指向Goods中的id
Cart.belongsTo(Goods,
    {
        // 外键名称
        foreignKey:"goods_id",
        // 别名
        as:"goods_info"
    })
// 导出koa模型
module.exports=Cart
