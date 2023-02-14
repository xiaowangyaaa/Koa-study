// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx,next) => {
    // ctx: context http请求的上下文
  console.log(111);
  next();
  console.log(222);
}).use((ctx,next) => {
  // ctx: context http请求的上下文
console.log(333);
next();
console.log(444);
}).use((ctx,next) => {
  // ctx: context http请求的上下文
  console.log(555);
  ctx.body="完成"

})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

