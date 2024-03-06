 const catchasyncerror=(thfunction)=>(req,res,next)=>{
    return thfunction(req,res,next).catch(next);
}
export default catchasyncerror;
