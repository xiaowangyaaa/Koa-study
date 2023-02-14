const { DataTypes } = require('sequelize')
const seq=require('../db/seq')

const ORder=seq.define("orders",{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    address_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'地址id'
    },
    goods_info:{
        type:DataTypes.TEXT,
        allowNull:false,
        comment:'商品信息'
    },
    total:{
        // 长度10 小数点两位
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        comment:'订单总金额'
    },
    order_number:{
        type:DataTypes.CHAR(16),
        allowNull:false,
        comment:'订单编号'
    },
    status:{
        type:DataTypes.TINYINT,
        allowNull:false,
        // 默认0 未支付
        // 0:未支付,1:已支付，2:已发货，3:已签收，4:取消
        defaultValue:0,
        comment:'订单状态'
    }

})
// 建表
ORder.sync({
    // force:true
})

module.exports=ORder