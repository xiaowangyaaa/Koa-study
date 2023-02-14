const User = require('../model/user.model')
const bcrypt = require('bcryptjs')

class UserService {
    // 创建用户
    async createUser(user_name, password) {
        // 写入到数据库 xxx
        const res = await User.create({
            // 表的字段
            user_name: user_name,
            password: password
        })
        return res
    }
    async updateById({ id, user_name, password, isAdmin }) {
        // 查询条件
        const whereOpt = { id }
        const newUser = {}
        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        isAdmin && Object.assign(newUser, { isAdmin })
        // console.log(newUser,whereOpt);
        const res = await User.update(newUser,
            {
                where: whereOpt
            })
        console.log(res);
        return res[0]
    }
    async getUserInfo({ id, user_name, password, isAdmin }) {
        // 查询条件
        const whereOpt = {}
        //    如果id存在 就把id拷贝到whereOpt 中
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        isAdmin && Object.assign(whereOpt, { isAdmin })

        // console.log(whereOpt);
        // 查询
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'isAdmin'],
            where: whereOpt
        })
        // console.log(res);
        return res ? res.dataValues : null

    }
}
module.exports = new UserService();