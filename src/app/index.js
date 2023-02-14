const path=require('path')
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三 使用koa-router
// 导入自己写好的路由
// const userRouter= require('../router/user.router')
// const goodsRouter=require('../router/goods.router')
const router=require('../router/index')
// 导入 校验插件
const parameter = require('koa-parameter');
// 导入koa-static 包
const koaStatic=require('koa-static')
// 导入koa-body 包
const { koaBody }=require('koa-body')
// 注册KoaBody中间件  解析请求体中的参数 挂载到request.body中
app.use(koaBody({
     multipart:true,
     formidable:{
        // 不能是相对路径
        uploadDir:path.join(__dirname,'../upload'),
        keepExtensions:true,
      
        
     },
   //   改写规则 让DELETE发送的数据也能挂载到 ctx.body 上
     parsedMethods:['POST',"PUT","PATCH","DELETE"]
}))
// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods())
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods()) //支持405 和501的中间件
// app.use(goodsRouter.routes())
// app.use(goodsRouter.allowedMethods()) //支持405 和501的中间件

// 注册koaStatic  参数传静态资源的路径
app.use(koaStatic(path.join(__dirname,'../upload')))

// 注册parameter 会在ctx上添加verifyParams方法 ctx.verifyParams
app.use(parameter(app))
// 统一错误处理
const ErrorHandler =require('./ErrorHandler')
app.on('error',ErrorHandler)

module.exports=app