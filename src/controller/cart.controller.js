const {createOrUpdate,findCarts,updateCarts,removeCarts,selectAllCart,unselectAllCart}=require('../service/cart.service')
const {cartFormatErr}=require('../constants/err.type')
class CartController{
    async add(ctx,next){
        // 添加到购物车
        // 1.解析user_ id, goods_ id
const user_id = ctx.state.user.id
const goods_id = ctx.request.body.goods_id
// console.log(user_id,goods_id);
//    操作数据库
        const res=await createOrUpdate(user_id,goods_id);
        // 返回结果
        ctx.body={
            code:200,
            messages:'添加购物车成功',
            result:res
        }

    }
    async findAll(ctx,next){
        // 解析参数
        const {pageNum=1,pageSize=10}=ctx.request.query
        // 操作数据库
        const res= await findCarts(pageNum,pageSize);
        // 返回结果
        ctx.body={
            code:200,
            messages:'获取购物车列表成功',
            result:res
        }

        
    }
    async update(ctx,next){
        // 1 解析参数
        const {id}=ctx.request.params;
        const {number,selected}=ctx.request.body
        if(number===undefined&&selected===undefined){
            cartFormatErr.message="number和selected不能同时为空"
            return ctx.app.emit('error',cartFormatErr,ctx)
        }
        // 2 操作数据库
const res=await updateCarts({id,number,selected})
        // 3返回结果
        ctx.body={
            code:"200",
            message:"更新购物车成功",
            result:res
        }

    }
    async removeCart(ctx,next){
        const {ids}=ctx.request.body

        const res=await removeCarts(ids);

        if(res>0){

            ctx.body={
                code:"200",
                message:"删除购物车成功",
                result:res
    
            }
        }else{
            ctx.body={
                code:"201",
                message:"删除购物车失败",
                result:"未找到这个id"
    
            }
        }
    }
    async selectAll(ctx,next){
        const user_id=ctx.state.user.id
        const res=await selectAllCart(user_id);

        ctx.body={
            code:"200",
            message:"全部选中",
            result:res
        }

    }
    async unselectAll(ctx,next){
        const user_id=ctx.state.user.id
        const res=await unselectAllCart(user_id);

        ctx.body={
            code:"200",
            message:"取消全选中",
            result:res
        }
    }
}

module.exports=new CartController();