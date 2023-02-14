
const app=require('./app/index')
const {APP_PROT}=require('./config/congif.default')

app.use((ctx) => {
    // ctx: context http请求的上下文
  // ctx.body = 'hello Koa2322'
})
// 四. 启动服务
app.listen(APP_PROT, () => {
  console.log(`server is running on http://localhost:${APP_PROT}`)
})

