const {cartFormatErr}=require('../constants/err.type')
// 验证格式
// 传一个参数进来  参数就是要校验的规则
const Validator=(rules)=>{
    return async(ctx,next)=>{
        // 需要koa-parameter 挂载到ctx上
        // console.log(ctx.request.body);
        try {
            // ctx.verifyParams({
            //     // 类型要求 string  必填： 是
            //     goods_id:"number",
          
            // })
            
            // 改写规则 复用该组件
            ctx.verifyParams(rules)
        } catch (error) {
            console.error(error);
            cartFormatErr.result=error
            return ctx.app.emit('error',cartFormatErr,ctx)
        }
        await next();
        
    }
}

module.exports={Validator}