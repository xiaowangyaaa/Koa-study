// 导入koa-router
const Router=require('koa-router')
// 中间件
const {auth,hadAdminPermission}=require('../middleware/auth.middleware')
const{Validator}=require('../middleware/cart.middleware')

// 控制器
const {add,findAll,update,removeCart,selectAll,unselectAll}=require('../controller/cart.controller')

// 实例化router对象
const router=new Router({prefix:'/api/carts'})


// 编写路由
// 添加到购物车
router.post('/',auth,Validator( {goods_id:"number"}),add)
// 获取购物车列表
router.get('/',auth,findAll)
//更新购物车
router.patch('/:id',auth,Validator({number:{type:"number",required:false},
    selected:{type:"bool",required:false},
}),update) 

// 删除购物车
router.delete('/',auth,Validator({ids:{type:"array",required:true}}),removeCart)
// 全选 购物车
router.post('/selectAll',auth,selectAll)
// 全不选 购物车
router.post('/unselectAll',auth,unselectAll)
module.exports=router