const {Router} =require("express")
const {signIn, signUp} =require("../Controllers/staffMembers.controller")

const staffMemberRouter =Router()

staffMemberRouter.post("/signIn",signIn)
staffMemberRouter.post("/signUp",signUp)

module.exports=staffMemberRouter