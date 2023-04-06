const express=require("express")
const router=express.Router()
const ROLES_LIST=require("../../config/roles_list")
const employeesController=require("../../controllers/employeeController")
const verifyRoles=require("../../middleware/verifyRoles")

router.route('/')
    .get( employeesController.get_all_employyes)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.create_new_employee)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.update_employee)
    .delete(verifyRoles(ROLES_LIST.Admin),employeesController.delete_employee)



router.route('/:id/:firstname/:lastname')
    .get(employeesController.get_employee)



module.exports=router