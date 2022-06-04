import React, {useEffect, useState} from 'react'
import {Typography, Form, Select, Col, Button} from 'antd';
import Axios from 'axios';
import { useLocation } from "react-router-dom";
import axios from "axios";
const { Title } = Typography;
// const { TextArea } = Input;
function UpdateStudent(props) {
    const [ID,setId] = useState("");
    const [Student1Name, setStudent1Name] = useState("");
    const [Student2Name, setStudent2Name] = useState("");
    const [Student3Name, setStudent3Name] = useState("");
    const [Student4Name, setStudent4Name] = useState("");
    const [PanelMember1Name, setPanelMember1Name] = useState("");
    const [PanelMember2Name, setPanelMember2Name] = useState("");
    const [PanelMember3Name, setPanelMember3Name] = useState("");
    const [PanelMember4Name, setPanelMember4Name] = useState("");

    const[Supervisor,setSupervisor] = useState([]);

    const location = useLocation();

    useEffect(() =>{
        setId(location.state.studentPanel._id)
        setStudent1Name(location.state.studentPanel.N1StudentName)
        setStudent2Name(location.state.studentPanel.N2StudentName)
        setStudent3Name(location.state.studentPanel.N3StudentName)
        setStudent4Name(location.state.studentPanel.N4StudentName)
    },[location])

    // const handleSupervisor = (value) => {
    //     console.log(`selected ${value}`);
    //     setSupervisorName(value);
    // };

    const handlePanelMember1Name = (value) => {
        console.log(`selected ${value}`);
        setPanelMember1Name(value);
    };

    const handlePanelMember2Name = (value) => {
        console.log(`selected ${value}`);
        setPanelMember2Name(value);
    };

    const handlePanelMember3Name = (value) => {
        console.log(`selected ${value}`);
        setPanelMember3Name(value);
    };

    const handlePanelMember4Name = (value) => {
        console.log(`selected ${value}`);
        setPanelMember4Name(value);
    };


    useEffect(() => {
        axios.get('http://localhost:8080/user/getSupervisors')
            .then(response => {
                console.log(response.data);
                setSupervisor(response.data.Supervisor);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    const onSubmit = (event) => {

        event.preventDefault();

        if (!setPanelMember1Name || !setPanelMember2Name || !setPanelMember3Name || !setPanelMember4Name) {
            return alert('fill all the fields first!')
        }
        const variables = {
            ID:ID,
            N1StudentName: Student1Name,
            N2StudentName: Student2Name,
            N3StudentName: Student3Name,
            N4StudentName: Student4Name,
            panel_member1: PanelMember1Name,
            panel_member2: PanelMember2Name,
            panel_member3: PanelMember3Name,
            panel_member4: PanelMember4Name,
        }
        console.log(variables);
        Axios.put(`http://localhost:8080/studentGroup/update/${ID}`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Panel members added')
                    props.history.push('/allocatePanelMembers')
                } else {
                    alert('Failed to add Panel members')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>  Allocate panel members </Title>
            </div>
            <Form onSubmit={onSubmit} >

                <br />
                <label> Leader name : {Student1Name} </label>
                <br />
                <br />
                <label>Student 2 Name : {Student2Name}</label>
                <br />
                <br />
                <label>Student 3 Name : {Student3Name}</label>
                <br />
                <br />
                <label>Student 4 Name : {Student4Name}</label>
                <br />
                <br />

                <Col className="gutter-row" span={8}>
                    <label>Panel member 1 :</label>
                    <br/>
                    <Select
                        id="supervisorID"
                        defaultValue="Select Supervisor"

                        onChange={handlePanelMember1Name}
                        style={{
                            width: 170,
                        }}
                    >
                        {Supervisor.filter(Supervisor =>
                            Supervisor.isPanelMember === "true"
                        ).map((item2,index) => (
                            <Option key={index.toString()} value={item2.username}>{item2.username}</Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <label>Panel member 2 :</label>
                    <br/>
                    <Select
                        id="supervisorID"
                        defaultValue="Select Supervisor"
                        style={{
                            width: 170,
                        }}
                        onChange={handlePanelMember2Name}
                    >
                        {Supervisor.filter(Supervisor =>
                            Supervisor.isPanelMember === "true"
                        ).map((item3,index) => (
                            <Option key={index.toString()} value={item3.username}>{item3.username}</Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <label>Panel member 3 :</label>
                    <br/>
                    <Select
                        id="supervisorID"
                        defaultValue="Select Supervisor"

                        onChange={handlePanelMember3Name}
                        style={{
                            width: 170,
                        }}
                    >
                        {Supervisor.filter(Supervisor =>
                            Supervisor.isPanelMember === "true"
                        ).map((item4,index) => (
                            <Option key={index.toString()} value={item4.username}>{item4.username}</Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <label>Panel member 4 :</label>
                    <br/>
                    <Select
                        id="supervisorID"
                        defaultValue="Select Supervisor"

                        onChange={handlePanelMember4Name}
                        style={{
                            width: 170,
                        }}
                    >
                        {Supervisor.filter(Supervisor =>
                            Supervisor.isPanelMember === "true"
                        ).map((item5,index) => (
                            <Option key={index.toString()} value={item5.username}>{item5.username}</Option>
                        ))}
                    </Select>
                    <br/><br/>
                </Col>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
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
