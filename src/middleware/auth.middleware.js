const jwt=require('jsonwebtoken')
const {tokenExpiredError,jsonWebTokenError,NullToken,NotHadAdminPermission}=require('../constants/err.type')
const auth= async(ctx,next)=>{
    const {JWT_SECRET}=process.env
// 解析请求头中的 token
// const {token}=ctx.request.header
// // console.log(ctx.request.header);
// if(!token){
//     ctx.app.emit('error',NullToken,ctx)
//     return
// }
// 这两行是 解析apipost发的请求
const{authorization=""}=ctx.request.header
const token=authorization.replace('Bearer ','')
if(!authorization){
    ctx.app.emit('error',NullToken,ctx)
    return
}

try {
    // user中包含了payload中的信息(id,user_name,is_admin)
    const user=jwt.verify(token,JWT_SECRET)
    // console.log(user);
    // 挂载到ctx.state中
    ctx.state.user=user
} catch (error) {
    switch (error.name) {
        case "TokenExpiredError":
            console.error("token已过期",error);
            return ctx.app.emit("error",tokenExpiredError,ctx)
           
        case "JsonWebTokenError":

            console.error("无效token",error);
            return ctx.app.emit("error",jsonWebTokenError,ctx)
    
        default:
            break;
    }
}

    await next();
}
// 验证管理员身份
const hadAdminPermission= async(ctx,next)=>{
    const {isAdmin}=ctx.state.user
    if(!isAdmin){
        console.error("没有管理员权限",ctx.state.user);
        return ctx.app.emit('error',NotHadAdminPermission,ctx)
    }
    await next()
}

module.exports={auth,hadAdminPermission}