import React from 'react';
import { Menu } from 'antd';
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
              <a href="/workshops">Update/Delete Users</a>
            </Menu.Item>
            <Menu.Item key="UserManagement">
              <a href="/uploadWorkshop">Approved Supervisors</a>
            </Menu.Item>
              <Menu.Item key="UserManagement">
                  <a href="/uploadWorkshop">Add panel members </a>
              </Menu.Item>
              <Menu.Item key="UserManagement">
                  <a href="/uploadWorkshop">Allocate panel members </a>
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

          <SubMenu key="paper" title="Researches">
            <Menu.Item key="papers">
              <a href="/papers">Research Papers</a>
            </Menu.Item>
            <Menu.Item key="addWorkshop">
              <a href="/uploadPaper">Call for papers</a>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="downloads">
            <a href="/downloads">Downloads</a>
          </Menu.Item>

          <SubMenu key="moderate" title="Moderate">
            <Menu.Item key="editConf">
              <a href="/conferenceEdit">Edit Conference Details</a>
            </Menu.Item>
            <Menu.Item key="appConf">
              <a href="/conferenceReview">Approve Conference Details</a>
            </Menu.Item>
            <Menu.Item key="review">
              <a href="/reviewResearches">Review Papers</a>
            </Menu.Item>
              <Menu.Item key="reviewwr">
                  <a href="/reviewWorkshops">Review Workshops</a>
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
                    <a href="/viewGroup">Registered Groups</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="topic" title="Topics">
                <Menu.Item key="TopicReg">
                    <a href="/">Submit Your Topic</a>
                </Menu.Item>
                <Menu.Item key="TopicView">
                    <a href="/">Topics</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="downloads" title="Downloads">
                <Menu.Item key="templates">
                    <a href="/">Templates</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="moderate" title="Moderate">
                <Menu.Item key="review">
                    <a href="/reviewResearches">Review Papers</a>
                </Menu.Item>
                <Menu.Item key="reviewwr">
                    <a href="/reviewWorkshops">Review Workshops</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
  }else if (userType === "editor") {
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

            <SubMenu key="moderate" title="Moderate">
                <Menu.Item key="editConf">
                    <a href="/conferenceEdit">Edit Conference Details</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
  }else if(userType === "attendee") {
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
  }else if(userType === "presenter") {
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
                <Menu.Item key="addWorkshop">
                    <a href="/uploadWorkshop">Add Workshop</a>
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
  }else if(userType === "researcher") {
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
                <Menu.Item key="addWorkshop">
                    <a href="/uploadPaper">Call for papers</a>
                </Menu.Item>
            </SubMenu>

            <Menu.Item key="downloads">
                <a href="/downloads">Downloads</a>
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

            <SubMenu key="workshop" title="Topics">
                <Menu.Item key="workshops">
                    <a href="/workshops">Topics</a>
                </Menu.Item>
            </SubMenu>

            <SubMenu key="paper" title="Documents">
                <Menu.Item key="papers">
                    <a href="/papers">Documents</a>
                </Menu.Item>
            </SubMenu>

            <Menu.Item key="downloads">
                <a href="/downloads">Templates</a>
            </Menu.Item>
        </Menu>
    )
  }
}

export default LeftMenu

