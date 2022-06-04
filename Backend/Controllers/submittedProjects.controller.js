const submittedProjects = require("../models/submittedProjects.model");

async function addProject(req, res) {
    try {
        const { topic, groupID, pdfLink, supervisor,Submitted_Date } = req.body;
        const _doc = await submittedProjects.create({
            Submitted_Date,
            topic,
            groupID,
            pdfLink,
            supervisor,
        });
        return res.json(_doc);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function getProjectsBySupervisor(req, res) {
    try {
        const { supervisor } = req.params;
        const _docs = await submittedProjects
            .find({ supervisor })
            .populate("groupID", "groupName");

        return res.json(_docs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
async function gradeProject(req, res) {
    try {
        const { projectid, grade } = req.body;
        const _doc = await submittedProjects.findByIdAndUpdate(
            projectid,
            { isGraded: true, grade: grade },
            { new: true }
        );
        return res.json({ msg: "success", _doc });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    addProject,
    getProjectsBySupervisor,
    gradeProject,
};
