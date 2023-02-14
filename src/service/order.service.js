const Order=require('../model/order.model')
class OrderService{

    async createOrder(orderInfo){

        return await Order.create(orderInfo)
    }
    async finAllOrder(user_id,pageNum,pageSize,status){
        const {count,rows}=await Order.findAndCountAll(
            {
            attributes:['goods_info','total','order_number','status'],
            where:{ user_id,status},
            offset:(pageNum-1)*pageSize,
            limit:pageSize*1
        }
        )
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows
        }
    }
    async updateOrder(id,status){
        return await Order.update({status},{where:{id}})
    }
}

module.exports=new OrderService()