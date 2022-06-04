import axios from "axios";
const REACT_BASE_URL = process.env.REACT_BASE_URL;
//
// const _api = axios.create({ baseURL: "https://demo-sm.herokuapp.com" });
const _api = axios.create({ baseURL: "http://localhost:8080" });

//staff signIn
async function staffSignIn(username, password) {
    try {
        const res = await _api.post("/staff/signIn/", { username, password });
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}
//staff signUp
async function staffSignUp(values) {
    console.log(values);
    try {
        const res = await _api.post("/staff/signUp/", {
            ...values,
        });
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}
// Get topic list
async function getTopicListBySupervisor(superviserID) {
    try {
        const res = await _api.get("/topic/get/" + superviserID);
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}

async function getMakedTopicListBySupervisor(superviserID) {
    try {
        const res = await _api.get("/topic/getMarked/" + superviserID);
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}

// Accept the topic
async function acceptTopic(topicid) {
    try {
        const res = await _api.post("/topic/accept/" + topicid);
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}
// Reject the topic
async function rejectTopic(topicid) {
    try {
        const res = await _api.post("/topic/reject/" + topicid);
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}

async function getProjectListBySupervisor(superviserID) {
    try {
        const res = await _api.get("/project/get/" + superviserID);
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}

// Reject the topic
async function gradeProject(projectid, grade) {
    try {
        const res = await _api.post("/project/grade/", { projectid, grade });
        return res.data;
    } catch (error) {
        return { err: true, msg: error };
    }
}

export {
    staffSignIn,
    staffSignUp,
    getTopicListBySupervisor,
    getMakedTopicListBySupervisor,
    acceptTopic,
    rejectTopic,
    getProjectListBySupervisor,
    gradeProject,
};
