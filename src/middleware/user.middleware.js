const bcrypt=require('bcryptjs')
const {createUser,getUserInfo}= require('../service/user.service')
const {userFormateError,
   userAlreadyExists
   ,UserDoesNotExist,
   UserLoginDefeated,
   UserPasswordDefeated,
   UserPasswordRepeat,
   userCreateDefeated}=require('../constants/err.type')
const userValidator= async (ctx,next)=>{
         // 1.获取数据
         const {user_name,password}=ctx.request.body
     // 合法性
     if(!user_name||!password){
        console.error("用户名或密码为空",ctx.request.body);
        ctx.app.emit('error',userFormateError,ctx)
        // ctx.status=400
        // ctx.body={
        //     code:"10001",
        //     message:'用户名或密码为空',
        //     result:"",
        // }
        return
    }
       await next();
}
const verifyUser= async(ctx,next)=>{
     // 1.获取数据
     const {user_name,password}=ctx.request.body
     try {
        const res=await getUserInfo({user_name})
        //  合理性
     if( res){
            
        console.error("用户名已存在",ctx.request.body);
        ctx.app.emit('error',userAlreadyExists,ctx)
        // 已经注册 409
        // ctx.status=409
        // ctx.body={
        //     code:"10002",
        //     message:'用户名已存在',
        //     result:"",
        // }
            return
    } 
     } catch (error) {
        console.log("获取错误信息",error);
        ctx.app.emit('error',userCreateDefeated,ctx)
        return
     }       
    await next();

}
const cryptPassword= async(ctx,next)=>{
    // 1.获取数据
 const {user_name,password}=ctx.request.body
 var salt = bcrypt.genSaltSync(10);
//  hash 保存的是密文
var hash = bcrypt.hashSync(password, salt);
//  把加密完的数据 挂载到body上
ctx.request.body.password=hash

await next();
}
 
// 登录验证方法
const verifyLogin=async (ctx,next)=>{
       // 1.获取数据
 const {user_name,password}=ctx.request.body

 //  2判断用户是否存在
 try {
   const res=await getUserInfo({user_name})
   if(!res){
     console.error("用户名不存在",{user_name});
     ctx.app.emit('error',UserDoesNotExist,ctx)
     return
   }
   //  3密码是否正确
// const pas=bcrypt.compareSync(password, hash);
// password 是从ctx.request.body解构出来的  
// res.password 是从getUserInfo 查到的
// console.log(password,res.password);
if(!bcrypt.compareSync(password, res.password)){
   ctx.app.emit('error',UserPasswordDefeated,ctx)
   return

}
 } catch (error) {
   console.log("获取错误信息",error);
   ctx.app.emit('error',UserLoginDefeated,ctx)
   return
 }

await next();
}
const repeatPassword=async(ctx,next)=>{
   // 1 获取数据
const {id}=ctx.state.user 
const {password}=ctx.request.body
const res=await getUserInfo({id})
// console.log(password,res.password);
if(bcrypt.compareSync(password, res.password)){
   ctx.app.emit('error',UserPasswordRepeat,ctx)
   return
}
await next();
}


module.exports={userValidator,verifyUser,cryptPassword,verifyLogin,repeatPassword}