module.exports=(error,ctx)=>{
    let status =500
    switch(error.code){
        case "10001":status=400
                     error.code=status   
         break
        case "10002":status=409
        error.code=status   
         break
         default:status=500 
         break
    }
   ctx.status=200
    
   ctx.body=error
}