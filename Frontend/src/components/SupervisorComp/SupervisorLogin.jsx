import { Button, Form, Input, Spin } from "antd2";
import { useState } from "react";
import useAuth from "../../utils/providers/AuthProvider";
import PaperCard from "../Common/PaperCard";
import Center from "../Common/Center"

const SupervisorLogin = () => {
  const [isLoading, setisLoading] = useState(false);
  const [togleType, settogleType] = useState("signin");
  const {signIn,signUp} =useAuth()

  const onFinish =async (values) => {
    if (togleType==="signin") {
      setisLoading(true)
      await signIn(values.username,values.password)
      setisLoading(false)
    } else {
      setisLoading(true)
      await signUp(values.username,values.password,values.email)
      setisLoading(false)
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <PaperCard>
      <Spin spinning={isLoading}>
        <Center style={{flexDirection:"column"}}>

      <h3 style={{fontWeight:600}}>Staff Login</h3>
      </Center>
      <Form
        name="basic"
        style={{paddingLeft:"32px",paddingRight:"32px"}}
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        initialvalues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* <Center style={{flexDirection:"column"}}> */}

        <Form.Item
          
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {togleType === "signup" && (
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

       
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <div>
          <Button type="link" size="small" onClick={()=>settogleType(p=>p==="signup"?"signin":"signup")}>
          {togleType === 'signup'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Button>
        </div>
       
      </Form>
  
      </Spin>

    </PaperCard>
  );
};

export default SupervisorLogin;
