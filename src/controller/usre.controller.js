
const jwt=require('jsonwebtoken')
const {createUser,getUserInfo,updateById}= require('../service/user.service')
const {userCreateDefeated,userLoginDefeated}=require('../constants/err.type')
const{JWT_SECRET}=require('../config/congif.default')
class UserController{
    async register(ctx,next){
        // 1.获取数据
        const {user_name,password}=ctx.request.body
//    2操作数据库
try {
    const res =await createUser(user_name,password );
    //        3返回结果
          // 需要安装koa-body 中间件来 把数据挂载到ctx.request.body
        //   模拟插入错误  输出不存在的变量
        // console.log(aaa);
  console.log(res);
  ctx.body={
    code:200,
    message:"用户注册成功",
    result:{
        id:res.id,
        user_name:user_name
    }
  }
} catch (error) {
    console.log(error);
ctx.app.emit("error",userCreateDefeated,ctx)

}


    }

   
   async  login(ctx,next){
        const {user_name,password}=ctx.request.body
        // 1 获取用户信息(在token的payload中，记录id, user_ name, is_ _admin)

        try {
            const res =await getUserInfo({user_name});
            // 从返回结果对象中剔除password属性，将剩下的属性放到resUser对象
            const{password,...resUser}=res;

            console.log(user_name);
            console.log(res);
            ctx.body={
                code:200,
                message:"登录成功",
                result:{
                    // resUSer(用户信息) JWT_SECRET加密 {expiresIn：过期时间}
                    token:jwt.sign(resUser,JWT_SECRET,{expiresIn:"1d"}),
                    
                }
              }
            // console.log(user_name);
        
        } catch (error) {
            console.error("用户登录失败"+error);
            ctx.app.emit("error",userLoginDefeated,ctx)
        }
       
    //   await  next();
    }
    async changePassword(ctx,next){
// 1 获取数据
const {id}=ctx.state.user 
const {password}=ctx.request.body
// console.log(id,password);
//  2操作数据库
const res= await updateById({id,password})
console.log(res);
// 3 返回结果
if(res>0){
ctx.body={
    code:'200',
    message:"密码修改成功",
    result:''
}
}
    }
}
module.exports=new UserController();