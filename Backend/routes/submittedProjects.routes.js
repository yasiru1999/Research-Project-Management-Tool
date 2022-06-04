const {Router} =require("express")
const { addProject,
      getProjectsBySupervisor,
      gradeProject} =require("../Controllers/submittedProjects.controller")

const submittedProjectRouter =Router()

submittedProjectRouter.post("/add",addProject)
submittedProjectRouter.get("/get/:supervisor",getProjectsBySupervisor)
submittedProjectRouter.post("/grade/",gradeProject)


module.exports=submittedProjectRouter