const dotenv=require('dotenv');
dotenv.config()
console.log(process.env.APP_PROT);
module.exports=process.env;