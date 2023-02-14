// 三 使用koa-router
// 导入koa-router 包
const koaRouter= require('koa-router')
// 实例化路由对象
const router=new koaRouter({prefix:'/api'});  //{prefix:'/users'}这样 就可以省略掉路由规则中的/users

const {upload,PublishGoods,updateGoods,removeGoods,restore,findAll} =require('../controller/goods.controller')
const {auth,hadAdminPermission}=require('../middleware/auth.middleware')
const {Validator}=require('../middleware/goods.middleware')
// 上传图片的接口
router.post('/goods/upload',auth,hadAdminPermission,upload)
// 发布商品的接口
router.post('/goods/release',auth,hadAdminPermission,Validator,PublishGoods)
// 修改商品接口
router.put('/goods/release/:id',auth,hadAdminPermission,Validator,updateGoods)
// 硬删除商品的接口
// router.delete('/goods/delete/:id',auth,hadAdminPermission,removeGoods)

// 下架商品的接口
router.post('/goods/:id/off',auth,hadAdminPermission,removeGoods)
// 上架商品的接口
router.post('/goods/:id/on',auth,hadAdminPermission,restore)

// 获取商品列表
router.get('/goods/find',findAll)
module.exports=router;