/**
 * Edited: the route structure is changed
 */

const {Router} =require("express");
const staffMemberRouter =require("./staffMembers.routes") ;
const submittedProjectRouter = require("./submittedProjects.routes");
const submittedTopicRouter = require("./submittedTopics.routes");
const chatRouter = require("./chat.routes");
// const userRoute =require("./User.route")
// const submissionType =require("./SubmissionType.route")

const router = Router()

router.use("/staff",staffMemberRouter)
router.use("/topic",submittedTopicRouter)
router.use("/project",submittedProjectRouter)
router.use("/chat", chatRouter);
// router.use('/user',userRoute());
// router.use('/submissionT',submissionType());

module.exports=router