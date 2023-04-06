const jwt=require('jsonwebtoken')
require('dotenv').config()


const verifyJWT=(req,res,next)=>{
    const authHeaders=req.headers['authorization'] || req.headers.Authorization 
    if(!authHeaders?.startsWith("Bearer ")) return res.sendStatus(401) //If we do  have an authheader but it doesnt start with bearer then its gonna giv 401
    const token = authHeaders.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,    
        (err,decoded)=>{
            if(err) return res.sendStatus(403)
            req.user=decoded.UserInfo.username
            req.roles=decoded.UserInfo.roles
            next()
        }
    )

}

module.exports=verifyJWT