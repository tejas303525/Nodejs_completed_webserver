const express=require("express")
const router=express.Router()
const authController=require("./../controllers/AuthenticationController")

router.route("/")
    .post(authController.handleLogin)


module.exports=router