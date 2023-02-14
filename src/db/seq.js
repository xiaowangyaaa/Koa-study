const { Sequelize } = require('sequelize');

const {MYSQL_HOST,MYSQL_PROT,MYSQL_USER,MYSQL_PWD,MYSQL_DB}=require('../config/congif.default')
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize("koa2", "root", "root", {
    host: 'localhost',
    timezone: '+08:00',
    dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  });
// console.log(MYSQL_HOST,MYSQL_PROT,MYSQL_USER,MYSQL_PWD,MYSQL_DB);
  try {
     sequelize.authenticate().then(()=>{
         console.log('测试连接成功.');
     })
  } catch (error) {
    console.error('测试连接失败', error);
  }

  module.exports=sequelize