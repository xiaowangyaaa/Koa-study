// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
//在app.use中只能接受一个函数做为参数
app.use((ctx,next) => {
    // ctx: context http请求的上下文
    console.log("头");
    next();
}).use((ctx,next) => {
  // ctx: context http请求的上下文
  console.log("身体");
  next();
}).use((ctx) => {
  // ctx: context http请求的上下文
  console.log("尾部 完成");
 ctx.body="wancehng";

})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

