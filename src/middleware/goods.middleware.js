const {goodsFormatError}=require('../constants/err.type')
// 验证上传的格式
const Validator=async(ctx,next)=>{
    // 需要koa-parameter 挂载到ctx上
    try {
        ctx.verifyParams({
            // 类型要求 string  必填： 是
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',required:true},
            goods_num:{type:'number',required:true},
            goods_img:{type:'string',required:true},

        })
        
    } catch (error) {
        console.error(error);
        goodsFormatError.result=error
        return ctx.app.emit('error',goodsFormatError,ctx)
    }
    await next();
    
}

module.exports={Validator}