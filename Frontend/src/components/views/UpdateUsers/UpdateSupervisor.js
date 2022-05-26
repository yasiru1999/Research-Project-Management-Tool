import React, {useEffect, useState} from 'react'
import { Typography, Button, Form, Input  } from 'antd';
import Axios from 'axios';
import { useLocation } from "react-router-dom";
const { Title } = Typography;
const { TextArea } = Input;
function UpdateSupervisor(props) {
    const [ID,setId] = useState("");
    const [title,setTitle] = useState("");
    const [id, setID] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [University, setUniversity] = useState("");
    const [department, setDepartment] = useState("");
    const [ResearchField, setResearchField] = useState("");
    const [Password, setPassword] = useState("");


    const location = useLocation();

    useEffect(() =>{
        setId(location.state.supervisor._id)
        setTitle(location.state.supervisor.title)
        setID(location.state.supervisor.id)
        setName(location.state.supervisor.name)
        setUniversity(location.state.supervisor.university)
        setDepartment(location.state.supervisor.department)
        setResearchField(location.state.supervisor.ResearchField)
        setEmail(location.state.supervisor.email)
        setPassword(location.state.supervisor.password)
    },[location])

    const onIDChange = (event) => {
        setID(event.currentTarget.value)
    }
    const onTitleChange = (event) => {
        setTitle(event.currentTarget.value)
    }
    const onNameChange = (event) => {
        setName(event.currentTarget.value)
    }
    const onUniversityChange = (event) => {
        setUniversity(event.currentTarget.value)
    }
    const onDepartmentChange = (event) => {
        setDepartment(event.currentTarget.value)
    }
    const onResearchFieldChange = (event) => {
        setResearchField(event.currentTarget.value)
    }
    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }


    const onSubmit = (event) => {

        event.preventDefault();

        if (!setID || !setTitle || !setEmail || !setPassword || !setName || !setUniversity || !setDepartment || !setResearchField) {
            return alert('fill all the fields first!')
        }
        const variables = {
            ID:ID,
            title:title,
            id: id,
            name: Name,
            email: Email,
            university:University,
            department:department,
            ResearchField:ResearchField,
            password: Password

        }
        console.log(variables);
        Axios.put(`http://localhost:8080/user/updateSupervisor/${ID}`, variables)
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
                <label> Supervisor ID </label>
                <Input
                    onChange={onIDChange}
                    value={id}
                />
                <br />
                <br />

                <label> Title </label>
                <Input
                    onChange={onTitleChange}
                    value={title}
                />
                <br />
                <br />

                <label> Name </label>
                <TextArea
                    onChange={onNameChange}
                    value={Name}
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

                <label>University</label>
                <Input
                    onChange={onUniversityChange}
                    value={University}
                />
                <br/>
                <br/>

                <label>Department</label>
                <Input
                    onChange={onDepartmentChange}
                    value={department}
                />
                <br />
                <br />
                <label>ResearchField</label>
                <Input
                    onChange={onResearchFieldChange}
                    value={ResearchField}
                />
                <br />
                <br />
                <label>password</label>
                <Input
                    onChange={onPasswordChange}
                    value={Password}
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
export default UpdateSupervisor;
