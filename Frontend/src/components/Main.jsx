import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
// import RegisterPage from "./views/RegisterPage/RegisterPage.js";
//devindi
import RegisterPageEdited from "./views/RegisterPage/RegisterPageEdited";
import SupervisorDashboard from "../pages/SupervisorDashboard";
import { AuthProvider } from "../utils/providers/AuthProvider";
import LoginPageEdited from "./views/LoginPage/LoginPageEdited";
import SupervisorChatTab from "../components/SupervisorComp/SupervisorChatTab";
import { SupervisorTopicTab } from "../components/SupervisorComp/SupervisorTopicTab"
import { SupervisorDocumentEval } from "../components/SupervisorComp/SupervisorDocumentEval";

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
import DisplayMarking from "./views/makingSchemes/Marking";
import AddMarking from "./views/makingSchemes/addMarking";

function Main() {
    return (
            <AuthProvider>
                <NavBar />

                <div style={{ paddingTop: '100px', minHeight: 'calc(100vh - 60px)' }}>
                    <Switch >
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/login" component={LoginPage} />
                        {/*<Route path="/register" component={RegisterPage} />*/}
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
                        <Route path="/AddMarking" component={AddMarking} />
                        <Route path="/DisplayMarking" component={DisplayMarking} />

                        {/*devindi*/}
                        <Route path="/register" component={RegisterPageEdited} />
                        <Route path="/staff-login" component={LoginPageEdited} />
                        <Route
                            path="/staff/:comp"
                            component={SupervisorDashboard}
                        />

                        {/*<Route*/}
                        {/*    path="/submissionType"*/}
                        {/*    component={AddSubmissionType}*/}
                        {/*/>*/}
                        <Route path="/groupChat" component={SupervisorChatTab} />
                        <Route
                            path="/studentTopics"
                            component={SupervisorTopicTab}
                        />
                        <Route
                            path="/documentEvaluation"
                            component={SupervisorDocumentEval}
                        />
                    </Switch>
                </div>
                <Footer />
            </AuthProvider>


    );
}

export default Main;