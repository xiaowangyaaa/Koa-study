const{createOrder,finAllOrder,updateOrder}=require("../service/order.service")
class OrderController{
    async create(ctx){
        const user_id=ctx.state.user.id
        const {address_id,goods_info,total}=ctx.request.body

        const order_number="CSC" + Date.now();

        const res= await createOrder({
            user_id,
            address_id,
            goods_info,
            total,
            order_number
        })

        ctx.body={
            code:"200",
            message:'创建订单成功',
            result:res
        }

    }
    async finAll(ctx){
        // get请求的方式不能用body了  要用query
        const {pageNum=1,pageSize=10,status=0}=ctx.request.query;

        const user_id=ctx.state.user.id;

        const res=await finAllOrder(user_id,pageNum,pageSize,status);

        ctx.body={
            code:"200",
            message:'获取订单列表成功',
            result:res
        }

    }
    async update(ctx){
        const id=ctx.request.params.id;
        const status=ctx.request.body.status;
        const res= await updateOrder(id,status);

        ctx.body={
            code:'200',
            message:'更新订单成功',
            result:res
        }
    }
}

module.exports=new OrderController();