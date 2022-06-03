import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import AddSubmissionType from "./views/AddSubmissionType/AddSubmissionType";
import DisplaySubmissions from "./views/SubmissionType/SubmissionType";
import ManageUsers from "./views/UserManagment/userManagemnet";
import AddGroup from "./views/AddGroup/AddGroup";
import ViewGroup from "./views/ViewGroup/ViewGroup";
import UpdateStudent from "./views/UpdateUsers/UpdateStudent";
import UpdateSupervisor from "./views/UpdateUsers/UpdateSupervisor";
import ApprovedSupervisors from "./views/UserManagment/ApprovedSupervisors";
import TopicSubmit from "./views/TopicSubmit/TopicSubmit";
import AssignTopic from "./views/AssignTopic/AssignTopic";
import AddPanelMembers from "./views/UserManagment/AddPanelMembers";
import AllocatePanelMembers from "./views/UserManagment/AllocatePanelMembers"
import AllocatingMembersToGroup from "./views/UserManagment/AllocatingMembersToGroup";
import AddStudentSubmission from "./views/AddStudentSubmission/AddStudentSubmission";
import DisplayStudentSubmissions from "./views/StudentSubmission/StudentSubmission";
import AddTemplates from "./views/AddTemplate/AddTemplate";
import DisplayTemplates from "./views/TemplateDownload/TemplateDownload";

function Main() {
    return (
            <BrowserRouter>
                <NavBar />

                <div style={{ paddingTop: '100px', minHeight: 'calc(100vh - 60px)' }}>
                    <Switch >
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/addSubmissionType" component={AddSubmissionType} />
                        <Route path="/uploadSubmissionType" component={DisplaySubmissions} />
                        <Route path="/userManagement" component={ManageUsers} />
                        <Route path="/addGroup" component={AddGroup} />
                        <Route path="/viewGroup" component={ViewGroup} />
                        <Route path="/topicSubmit" component={TopicSubmit} />
                        <Route path="/assignTopic" component={AssignTopic} />
                        <Route path="/updateStudent" component={UpdateStudent} />
                        <Route path="/updateSupervisor" component={UpdateSupervisor} />
                        <Route path="/approvedSupervisor" component={ApprovedSupervisors} />
                        <Route path="/addPanelMembers" component={AddPanelMembers} />
                        <Route path="/allocatePanelMembers" component={AllocatePanelMembers} />
                        <Route path="/allocatingMembersToGroup" component={AllocatingMembersToGroup} />
                        <Route path="/AddStudentSubmission" component={AddStudentSubmission} />
                        <Route path="/StudentSubmission" component={DisplayStudentSubmissions} />
                        <Route path="/AddTemplates" component={AddTemplates} />
                        <Route path="/DisplayTemplates" component={DisplayTemplates} />
                    </Switch>
                </div>
                <Footer />
            </BrowserRouter>


    );
}

export default Main;