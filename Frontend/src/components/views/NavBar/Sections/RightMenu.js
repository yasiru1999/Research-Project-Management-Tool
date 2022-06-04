import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';

function RightMenu(props) {
  const userType = localStorage.getItem('userType');

  const logoutHandler = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userid');
    localStorage.removeItem('id');
    localStorage.removeItem('id');
      localStorage.removeItem('rememberMe');
    if(localStorage.getItem('rememberMe') === "false")
        localStorage.removeItem('id');
    props.history.push("/login");
  };

  if(userType === "admin"){
      return (
          <Menu mode={props.mode}>
              <Menu.Item key="signout">
                  <a onClick={logoutHandler}>Sign Out</a>
              </Menu.Item>
          </Menu>
      )
  }else if(userType === "Student"){
      return (
          <Menu mode={props.mode}>
              <Menu.Item key="signout">
                  <a onClick={logoutHandler}>Sign Out</a>
              </Menu.Item>
          </Menu>
      )
   }
      // else if (userType === "supervisor") {
  //     return (
  //         <Menu mode={props.mode}>
  //             <Menu.Item key="signout">
  //                 <a onClick={signOut}>Sign Out</a>
  //             </Menu.Item>
  //         </Menu>
  //     );
  // }
     else if(userType === "CoSupervisor"){
      return (
          <Menu mode={props.mode}>
              <Menu.Item key="signout">
                  <a onClick={logoutHandler}>Sign Out</a>
              </Menu.Item>
          </Menu>
      )
  }else{
      return (
          <Menu mode={props.mode}>
              <Menu.Item key="mail">
                  <a href="/login">Signin</a>
              </Menu.Item>
              <Menu.Item key="app">
                  <a href="/register">Signup</a>
              </Menu.Item>
          </Menu>
      )
  }
}

export default withRouter(RightMenu);
