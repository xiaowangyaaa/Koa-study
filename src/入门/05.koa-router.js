// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三 使用koa-router
// 导入自己写好的路由
const userRouter= require('./router/user.router')

// 导入koa-body 包
const { koaBody }=require('koa-body')
// 注册KoaBody中间件  解析请求体中的参数 挂载到request.body中
app.use(koaBody())

// 注册路由中间件
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) //支持405 和501的中间件


app.on('error', (err, ctx) =>{
  console.error(err);
  ctx.body =err
})
  

// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

