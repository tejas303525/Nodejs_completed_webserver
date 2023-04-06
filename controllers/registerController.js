const User=require("./../model/User")

const bcrypt=require("bcrypt")

const handNewUser=async (req,res)=>{
    const {user,pwd}=req.body 
    if(!user || !pwd){return res.status(400).json({"message":"Username and password required"})} //badreq
    const duplicate=await User.findOne({username:user}).exec()
    if(duplicate){ return res.sendStatus(409)}//conflict
    try{
        //encrypt the password 
        const hashpwd=await bcrypt.hash(pwd,10)
        const result= await User.create({
            "username":user,
            "password":hashpwd
        })
        console.log(result)
        res.status(201).json({"success":`new user ${user} created`})
    }
    catch (err){
        res.status(500).json({"message":err.message})
    }

}


module.exports={handNewUser}
