// 导入Cart 操作数据库
const Cart=require("../model/cart.model")
const Goods=require("../model/goods.model")
// 导入操作符
const{Op}=require('sequelize')

class CartService{
    async createOrUpdate(user_id,goods_id){
        // 根据user_id和goods_id同时查找 有没有记录
    let res=  await  Cart.findOne({
            where:{
                // [Op.and] 同时查找
                [Op.and]:{
                user_id,
                goods_id
            }}
        })
    if(res){
        // 说明已经存在一条记录
        // 把字段的num加一即可
        // increment方法  number字段  by:?(加几)
       await res.increment('number',{by:1})
    //    返回更新后的数据
       return await res.reload()
    }else{
        // 不存在记录 新建一条记录
      return await  Cart.create({
            user_id,
            goods_id,
        })

    }
       

    }
    async findCarts(pageNum,pageSize){
        const offset=(pageNum-1)*pageSize;
      const {count,rows}=await  Cart.findAndCountAll({
        // attributes 要查找的字段
        attributes:["id","number","selected"],
            offset:offset,
            limit:pageSize*1,
            include:{model:Goods,as:'goods_info',
            attributes: [ 'id','goods_name', 'goods_price', 'goods_img'] ,

        }
        })
        return{
            pageNum,
            pageSize,
           total: count,
            list:rows
        }
    }
    async updateCarts(params) {
        const {id,number,selected}=params;
        // findByPk 方法使用提供的主键从表中仅获得一个条目.
        const  res=await Cart.findByPk(id)
        if(!res){
          return""
        }
        // 更新
        number!==undefined?(res.number=number):"";
        selected!==undefined?(res.selected=selected):'';

        // 返回刚更新后 的数据
        return await res.save()
    }
    async removeCarts(ids){
     return await   Cart.destroy({
            where:{
                // ids中包含这个id
                id:{[Op.in]:ids}
            }
        })
    }
    async selectAllCart(user_id){
        return await Cart.update(
            // 全选
            {selected:true},
            // 条件是user_id
            {where:{user_id:user_id}})
    }
    async unselectAllCart(user_id){
        return await Cart.update(
            // 全不选
            {selected:false},
            // 条件是user_id
            {where:{user_id:user_id}})
    }
}
module.exports=new CartService();