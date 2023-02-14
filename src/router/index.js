// 导入koa-router 包
const Router= require('koa-router')

const fs=require('fs')
const router = new Router()
fs.readdirSync(__dirname).forEach(file=>{
    if(file!=="index.js"){
      let r=  require('./'+file)
      router.use(r.routes());
    }
})
module.exports=router