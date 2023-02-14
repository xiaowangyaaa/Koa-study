// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx,next) => {
    // ctx: context http请求的上下文
    //1。ctx. request: http 请求
    // 2。ctx. response: http 响应
    if (ctx.url == '/') {
      ctx.body = '这是主页'
    } else if (ctx.url == '/users') {
      if (ctx.method == 'GET') {
        ctx.body = '这是用户列表页'
      } else if (ctx.method == 'POST') {
        ctx.body = '创建用户'
      } else {
        ctx.status = 405 // 不支持的请求方法
      }
    } else {
      ctx.status = 404
    }

  // console.log(111);
  // next();
  // console.log(222);
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

