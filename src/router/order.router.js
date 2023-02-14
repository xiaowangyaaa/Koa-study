// 使用koa-router
// 导入koa-router 包
const koaRouter= require('koa-router');
const { auth } = require('../middleware/auth.middleware');

const {OrderValidator}=require('../middleware/order.middleware')

const {create,finAll,update}=require('../controller/oder.controller')

// 实例化路由对象
const router=new koaRouter({prefix:'/api/order'});  
//{prefix:'/users'}这样 就可以省略掉路由规则中的/users


// 提交订单
router.post('/',auth,OrderValidator({
    address_id:"int",
    goods_info:'string',
    total:'string'
}),create)

// 获取订单列表
router.get('/',auth,finAll)

// 更新订单的状态
router.patch('/:id',auth,OrderValidator({status:'number'}),update)
module.exports=router