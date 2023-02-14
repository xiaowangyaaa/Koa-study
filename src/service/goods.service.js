const Goods=require('../model/goods.model')
class GoodsService{
   async createGoods(goods){
  const res= await Goods.create(goods);
  return res.dataValues
    }
    async updateGoods(id,goods){
        const res= await Goods.update(goods,{
            where:{id}
        })
        return res[0]>0
    }
    async removeGood(id){
     const res=  await Goods.destroy({where:{id:id}})
   
     return res>0
    }
    async restoreGood(id){
        const res= await Goods.restore({where:{id:id}})
        return res>0
    }
    async findGoods(pageNum,pageSize){
        // 1获取总数
    //   const count=await  Goods.count();
    // //   console.log(count);
    //   const offset=(pageNum-1)*pageSize;
    //     // 2获取分页的数据 
    //     // 跳过offset个实例,然后获取limit个实例
    //   const rows=  await Goods.findAll({offset:offset , limit:pageSize});
    //   console.log(rows);
    const offset=(pageNum-1)*pageSize;
    const {count,rows}=  await Goods.findAndCountAll({offset:offset , limit:pageSize});
    return{
        pageNum,
        pageSize,
        total: count,
        list: rows
    }
    }
}
module.exports=new GoodsService();