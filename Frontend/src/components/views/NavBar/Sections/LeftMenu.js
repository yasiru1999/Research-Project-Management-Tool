import React from 'react';
import { Menu } from 'antd';
import {Link} from "react-router-dom";
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  const userType = localStorage.getItem('userType');

  if (userType === "admin") {
      console.log(userType);
    return (
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <a href="/">Home</a>
          </Menu.Item>

          <SubMenu key="UserManagement" title="User Management">
            <Menu.Item key="UserManagement">
              <a href="/userManagement">Update/Delete Users</a>
            </Menu.Item>
            <Menu.Item key="UserManagement">
              <a href="/approvedSupervisor">Approved Supervisors</a>
            </Menu.Item>
              <Menu.Item key="UserManagement">
                  <a href="/addPanelMembers">Add panel members </a>
              </Menu.Item>
              <Menu.Item key="UserManagement">
                  <a href="/allocatePanelMembers">Allocate panel members </a>
              </Menu.Item>
          </SubMenu>

            <SubMenu key="submission" title="Submission">
                <Menu.Item key="submission">
                    <a href="/uploadSubmissionType">Submission</a>
                </Menu.Item>
                <Menu.Item key="addSubmission">
                    <a href="/addSubmissionType">Add Submission Type</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="Markings" title="Markings">
                <Menu.Item key="templates">
                    <a href="/DisplayMarking">Marking Schemes</a>
                </Menu.Item>
                <Menu.Item key="templates">
                    <a href="/AddMarking">Add Marking Schemes</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="downloads" title="Downloads">
                <Menu.Item key="templates">
                    <a href="/DisplayTemplates">Templates</a>
                </Menu.Item>
                <Menu.Item key="templates">
                    <a href="/AddTemplates">Add Templates</a>
                </Menu.Item>
            </SubMenu>

        </Menu>
    )
  }else if (userType === "Student") {
      console.log(userType);
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>

            <SubMenu key="groups" title="Groups">
                <Menu.Item key="groupReg">
                    <a href="/addGroup">Register Your Group</a>
                </Menu.Item>
                <Menu.Item key="groupView">
                    <a href="/viewGroup">My Group</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="topic" title="Topics">
                <Menu.Item key="TopicReg">
                    <a href="/topicSubmit">Submit Your Topic</a>
                </Menu.Item>
                <Menu.Item key="TopicView">
                    <a href="/assignTopic">Submitted Topic</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="submission" title="Submission">
                <Menu.Item key="submission">
                    <a href="/uploadSubmissionType">Submission</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="downloads" title="Downloads">
                <Menu.Item key="templates">
                    <a href="/DisplayTemplates">Templates</a>
                </Menu.Item>
            </SubMenu>

            <Menu.Item key="chat">
                <a href="/">Chat</a>
            </Menu.Item>
        </Menu>
    )
   }
      else if (userType === "supervisor") {
      console.log("---", userType);
      return (
          <Menu mode={props.mode}>
              <Menu.Item key="mail">
                  <a href="/">Home</a>
              </Menu.Item>
              <SubMenu key="paper" title="Topics">
                  <Menu.Item key="maked">
                      <Link to="/staff/topics-marked">Marked Topics</Link>
                  </Menu.Item>
                  <Menu.Item key="pending">
                      <Link to="/staff/topics-pending">Pending Topics</Link>
                  </Menu.Item>
              </SubMenu>
              <Menu.Item key="docuemnts">
                  <Link to="/staff/projects">Documents</Link>
              </Menu.Item>
              <Menu.Item key="chats">
                  <Link to="/staff/chat">Chats</Link>
              </Menu.Item>
          </Menu>
      );
  }
      else if(userType === "CoSupervisor") {
      console.log(userType);
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>

            <SubMenu key="workshop" title="Workshops">
                <Menu.Item key="workshops">
                    <a href="/workshops">Workshops</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="paper" title="Researches">
                <Menu.Item key="papers">
                    <a href="/papers">Research Papers</a>
                </Menu.Item>
            </SubMenu>

            <Menu.Item key="downloads">
                <a href="/downloads">Downloads</a>
            </Menu.Item>
        </Menu>
    )
  }else if(userType === "panelMember") {
      console.log(userType);
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>

            <SubMenu key="" title="">
                <Menu.Item key="">
                    <a href="/"></a>
                </Menu.Item>
                <Menu.Item key="">
                    <a href="/">Add Workshop</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="" title="">
                <Menu.Item key="">
                    <a href="/">Research Papers</a>
                </Menu.Item>
            </SubMenu>

            <Menu.Item key="downloads">
                <a href="/">Downloads</a>
            </Menu.Item>
        </Menu>
    )
  }else{
      console.log(userType);
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
        </Menu>
    )
  }
}

export default LeftMenu

