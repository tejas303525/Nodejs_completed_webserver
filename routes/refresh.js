const express=require("express")
const router=express.Router()
const refreshTokencontroller=require("./../controllers/refreshTokencontroller")

router.route("/")
    .get(refreshTokencontroller.handleRefreshToken)


module.exports=router