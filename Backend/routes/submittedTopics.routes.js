const { Router } = require("express");
const {
    addTopics,
    getTopicsBySupervisor,
    rejectTopic,
    approveTopic,
    getApprovedTopicsBySupervisor,
} = require("../controllers/submittedTopics.controller");

const submittedTopicRouter = Router();

submittedTopicRouter.post("/add", addTopics);
submittedTopicRouter.get("/get/:supervisor", getTopicsBySupervisor);
submittedTopicRouter.get(
    "/getMarked/:supervisor",
    getApprovedTopicsBySupervisor
);
submittedTopicRouter.post("/accept/:topicid", approveTopic);
submittedTopicRouter.post("/reject/:topicid", rejectTopic);

module.exports = submittedTopicRouter;
