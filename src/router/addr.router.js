// 导入Koa-router包
const Router=require('koa-router')
// 实例化对象
const router=new Router({prefix:'/api/address'})
// 导入验证中间件
const {auth}=require('../middleware/auth.middleware')
const {AddrValidator}=require('../middleware/addr.middleware')

const {create,findAllAddr,update,remove,setDefault}=require('../controller/addr.controller')

// 编写路由规则
//手机号正则 /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
// 添加地址信息
router.post('/',auth,AddrValidator({
    consignee:'string',
    phone:{type:"string",format:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/},
    address:"string",

}),create)
// 获取地址列表
router.get('/',auth,findAllAddr)

// 更新 修改地址
router.put('/:id',auth,AddrValidator({
    consignee:'string',
    phone:{type:"string",format:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/},
    address:"string",

}),update)
// 删除地址
router.delete('/:id',auth,remove)

// 设置默认地址
router.patch('/:id',auth,setDefault)
module.exports=router