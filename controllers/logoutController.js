// const userDB={
//     users:require("../model/users.json"),
//     setUser:function (data){this.users=data}
// }

const User=require("./../model/User")





const handleLogout=  async(req,res)=>{
    //on client delete the accessToken
    const cookie=req.cookies
    if(!cookie?.jwt) return res.sendStatus(204) 
    const refreshToken=cookie.jwt
    // const foundUser=User.find(person=>person.refreshtoken===refreshtoken)

    const foundUser=await User.findOne({refreshToken}).exec()


    if(!foundUser){
        res.clearCookie("jwt",{httpOnly:true,maxAge:24*60*60*1000})
        return res.sendStatus(204) 

    }
    foundUser.refreshToken=""
    const result =await foundUser.save()
    console.log(result)

    res.clearCookie("jwt",{httpOnly:true,maxAge:24*60*60*1000})
    res.sendStatus(204)
}


module.exports={handleLogout}