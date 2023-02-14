const {DataTypes}= require('sequelize')
const seq=require('../db/seq')

// 创建模型(koa_user -->koa_users 表名)
const Goods=seq.define("koa_good",
{
    // id 会被sequelize 自动创建
    goods_name:{
        type:DataTypes.STRING,
        allowNull:false,
        // unique:true,  是否为一
        comment:"商品名称"
    },
    goods_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,  
        comment:"商品价格"
    },
    goods_num:{
        type:DataTypes.INTEGER,
        allowNull:false,  
        comment:"商品库存"
    },
    goods_img:{
        type:DataTypes.STRING,
        allowNull:false,  
        comment:"商品图片"
    },
   
    

},
// ,{
//     // 取消时间戳字段
//     timestamps:false
// }
{    //
    paranoid:true}
)

//  force:true 强制同步数据库 创建数据表 有了就删了重建
Goods.sync({
    // force:true
    // alter: true 
})

module.exports=Goods