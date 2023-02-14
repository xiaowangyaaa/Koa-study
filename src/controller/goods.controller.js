const path =require('path')
const fs=require('fs')
const {fileUploadErr,unSupportedType,PublishGoodsError,findGoodsIdDefine,updateGoodsDefine}=require('../constants/err.type')
const {createGoods,updateGoods,removeGood,restoreGood,findGoods}=require('../service/goods.service')
class GoodsController{
async upload(ctx,next){
    // ctx.request.files 上传的文件会挂载到这
    // console.log(ctx.request.files.ic_tou);
    const{ic_touImg}=ctx.request.files
    // console.log(ic_touImg);
    
    // 判断文件格式是否符合要求
    if(ic_touImg){
        if(ic_touImg.type!=="image/jpeg "|| ic_touImg.type!=="image/png"){
            ctx.app.emit('error',unSupportedType,ctx)
            // 删除上传的不支持的文件
            fs.unlinkSync(ic_touImg.filepath)
            return
        }
        ctx.body={
            code:200,
            message:"上传成功",
            result:{
                // 拿到文件的名字path.basename
                // 文件的路径ic_tou.filepath
                tou_img:path.basename(ic_touImg.filepath)
            }
        }
    }else{
        return ctx.app.emit('error',fileUploadErr,ctx)
    }
    
    await next();
}
async  PublishGoods(ctx){
    // 调用service方法 写入到数据库中
    try {
        
        const {createdAt,updatedAt,...res}=   await createGoods(ctx.request.body);
       
        ctx.body={
            code:200,
            message:'上传商品成功',
            result:res
        }
    } catch (error) {
        console.error("写入数据库错误"+error);
        return ctx.app.emit('error',PublishGoodsError,ctx)
    }

}
async updateGoods(ctx){
    try {
        const res= await updateGoods( ctx.params.id,ctx.request.body)
        if(res){
            ctx.body={
                code:200,
                message:'修改成功',
                result:ctx.request.body.goods_name
            }
        }else{
            ctx.app.emit('error',findGoodsIdDefine,ctx)
        }
    } catch (error) {
        console.error("修改商品失败"+error);
        ctx.app.emit('error',updateGoodsDefine,ctx)
    }


}
async removeGoods(ctx){
  
    const res=await removeGood(ctx.params.id)
    console.log(res);
    if(res){
        ctx.body={
            code:200,
            message:"下架成功",
            result:""
        }
    }else{
      return  ctx.app.emit('error',findGoodsIdDefine,ctx)
    }
    
}
async restore(ctx){
    const res=await restoreGood(ctx.params.id)
    // console.log(res);
    if(res){
        ctx.body={
            code:200,
            message:"上架成功",
            result:""
        }
    }else{
      return  ctx.app.emit('error',findGoodsIdDefine,ctx)
    }
}
async findAll(ctx){
    // 1解析pageNum 与 pageSize
    const{pageNum=1,pageSize=10}=ctx.request.body
    // 2 调用service中的方法 操作数据库
    const res= await findGoods(pageNum,pageSize)
    // 3 返回结果
    ctx.body={
        code:200,
        message:"查询成功",
        result:res
    }
}


}

module.exports=new GoodsController()