// 三 使用koa-router
// 导入koa-router 包
const koaRouter= require('koa-router')
// 实例化路由对象
const router=new koaRouter({prefix:'/api'});  //{prefix:'/users'}这样 就可以省略掉路由规则中的/users
// 导入Controller中的 方法
const {register,login,changePassword} =require('../controller/usre.controller')
// 导入middleware中的方法  错误处理 验证
const {userValidator,verifyLogin,verifyUser,repeatPassword,cryptPassword}=require('../middleware/user.middleware')
const{auth}=require('../middleware/auth.middleware')

// const db=[
//     {id:1,name:"xiaoming",age:20},
//     {id:2,name:"xiaomei",age:22},
//     {id:3,name:"xiaopang",age:25}
// ]


// 对于不同的Http请求, 需要使用不同的方式携带参数
// GET请求: 在URL中以键值对传递
// POST/PUT/PATCH/DELET请求: 在请求体中传递


// 注册接口
router.post('/users/register',userValidator,verifyUser,cryptPassword,register)
// 登录接口
router.post('/users/login',userValidator,verifyLogin,login)
// 修改密码接口
router.patch('/users/ChangePassword',auth,repeatPassword, cryptPassword,changePassword)
// 编写路由规则
// GET /users 获取所有的用户信息，返回一个数组
// router.get('/', (ctx) => {
// // 通锅ctx.query  是ctx.request.query的代理 来解析键值对参数 ？name=xx 形式
//     const {start=0,end=0}=ctx.query;
//     console.log(start,end);
//     if(start<=end){
//       ctx.throw(422)
//     }
//    const res= db.filter((item)=>item.age >= start&& item.age <= end);
//    if(res.length==0){
//     ctx.throw(404)
//    }
// console.log(res);
//   ctx.body = res
// })
// router.post('/', (ctx) => {
//   ctx.body = '创建用户页';
//   // 需要安装koa-body 中间件来 把数据挂载到ctx.request.body
//   console.log(ctx.request.body);
// })

// GET /users/:id ---- 根据id获取单个用户的信息， 返回一个对象
// router .get('/:id', (ctx)=>{
//     // 获取id的参数
//   const id=  ctx.params.id;
//   const res= db.filter((item)=>item.id==id)
//   if(!res[0]){
//     ctx.throw(422,"参数格式错误")
//    return ctx.app.emit('error',{code:404,message:"资源没找到"},ctx)
// }
//   ctx.body=res[0];
//   console.log(res[0]);

// })

module.exports=router;