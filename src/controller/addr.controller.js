const {createAddr,findAllAddr,updateAddr,setDefaultAddr,removeAddr}=require('../service/addr.service')
class AddrController{

    async create(ctx){
        // 解析user_id consignee phone address
        const user_id=ctx.state.user.id;
        const {consignee,phone,address}=ctx.request.body
// 操作数据库
        const res=await createAddr({user_id,consignee,phone,address})
// 返回结果
ctx.body={
    code:"200",
    message:'添加地址成功',
    result:res
}
        
    }
    async findAllAddr(ctx){
        const user_id=ctx.state.user.id;

        const res=await findAllAddr(user_id);
        ctx.body={
            code:"200",
            message:'获取地址列表成功',
            result:res
        }
    }
    async update(ctx){
          // 解析id consignee phone address
          const id=ctx.request.params.id;
          const {consignee,phone,address}=ctx.request.body

          const res=await updateAddr(id,{consignee,phone,address})

          ctx.body={
            code:'200',
            message:"更新地址成功",
            result:res
          }
    }
    async remove(ctx){
    
        const id=ctx.request.params.id;

        const res=await removeAddr(id);

        ctx.body={
            code:'200',
            message:'删除成功',
            result:res
        }
    }
    async setDefault(ctx){
        const user_id=ctx.state.user.id;
        const id=ctx.request.params.id;
        const res= await setDefaultAddr(user_id,id);

        ctx.body={
            code:'200',
            message:"设置默认地址",
            result:res
        }
    }

}
module.exports=new AddrController()