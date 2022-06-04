import React, {useEffect, useState} from 'react'
import { Typography, Button, Form, Input  } from 'antd';
import Axios from 'axios';
import { useLocation } from "react-router-dom";
const { Title } = Typography;
const { TextArea } = Input;
function UpdateStudent(props) {
    const [ID,setId] = useState("");
    const [id, setID] = useState("");
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();

    useEffect(() =>{
        setId(location.state.student._id)
        setID(location.state.student.id)
        setStudentName(location.state.student.StudentName)
        setEmail(location.state.student.Email)
        setPassword(location.state.student.password)
    },[location])

    const onIDChange = (event) => {
        setID(event.currentTarget.value)
    }
    const onNameChange = (event) => {
        setStudentName(event.currentTarget.value)
    }
    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmit = (event) => {

        event.preventDefault();

        if (!setID || !setStudentName || !setEmail || !setPassword) {
            return alert('fill all the fields first!')
        }
        const variables = {
            ID:ID,
            id: id,
            StudentName: StudentName,
            Email: Email,
            password: password
        }
        console.log(variables);
        Axios.put(`http://localhost:8080/user/updateStudent/${ID}`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Conference Successfully Edited')
                    props.history.push('/userManagement')
                } else {
                    alert('Failed to edit Conference')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>  Edit conference details </Title>
            </div>
            <Form onSubmit={onSubmit} >

                <br />
                <label> Student ID</label>
                <Input
                    onChange={onIDChange}
                    value={id}
                />
                <br />
                <br />
                <label>Student Name</label>
                <TextArea
                    onChange={onNameChange}
                    value={StudentName}
                />
                <br />
                <br />
                <label>Email</label>
                <Input
                    onChange={onEmailChange}
                    value={Email}
                />
                <br />
                <br />
                <label>password</label>
                <Input
                    onChange={onPasswordChange}
                    value={password}
                />
                <br />
                <br />
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default UpdateStudent;
