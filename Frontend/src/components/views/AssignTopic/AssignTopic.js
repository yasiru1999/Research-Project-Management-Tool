import React, {useEffect, useState, Fragment} from "react";
import {withRouter, useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import {Typography, Divider, Row, Col, Select, Button, Form, Input} from "antd";
import 'antd/dist/antd.css';
import Axios from "axios";

const { Option } = Select;

const { Title, Text } = Typography;

function AssignTopic(props) {

    const history = useHistory();
    const location = useLocation();

    const[Topics, setTopics] = useState([]);
    const[Supervisor,setSupervisor] = useState([]);

    let loggedInUserID = localStorage.getItem('id');
    let user_id = localStorage.getItem('userid');
    const[SupervisorName,setSupervisorName] = useState('');
    const[CoSupervisorName,setCoSupervisorName] = useState('');
    const[TopicID,setTopicID] = useState('');

    const[initialMsg,setinitialMsg] = useState("");

    const[topic,settopic] = useState({});

    useEffect(() => {
        function getTopic() {
            loggedInUserID = localStorage.getItem('id');
            user_id = localStorage.getItem('userid');
            console.log(user_id);
            axios.get('http://localhost:8080/TopicSubmit/getTopic')
                .then(response => {
                    console.log(loggedInUserID);
                    const topic = response.data.topicDetails;
                    //console.log(topic);
                    const FilteredTopic = response.data.topicDetails.filter(topic =>
                        topic.submittedBy === loggedInUserID
                    )
                    setTopics(topic);
                    console.log(FilteredTopic);
                    setTopicID(FilteredTopic[0]._id);
                    settopic(FilteredTopic[0]);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        function getSupervisors() {
            axios.get('http://localhost:8080/user/getSupervisors')
                .then(response => {
                    console.log(response.data);
                    setSupervisor(response.data.Supervisor);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        getTopic();
        getSupervisors();


    },[])

    const handleSupervisor = (value) => {
        console.log(`selected ${value}`);
        setSupervisorName(value);
    };
    const onInitialMessage = (value) => {
        console.log(`selected ${value}`);
        setinitialMsg(value);
    };


    const handleCoSupervisor = (value) => {
        console.log(`selected ${value}`);
        setCoSupervisorName(value);

    };

    function onSubmit() {
        if (!SupervisorName || !CoSupervisorName){
            return alert('Assign Supervisors')
        }
        const variable = {
            TopicID: TopicID,
            groupID: user_id,
            supervisor:SupervisorName,
            Cosupervisor: CoSupervisorName
        }
        console.log(variable);
        axios.put(`http://localhost:8080/TopicSubmit/updateTopic/${TopicID}`, variable)
            .then(response => {
                if (response.data.success) {
                    alert('Conference Successfully Edited')
                    props.history.push('/')
                } else {
                    alert('Failed to edit Conference')
                }
            })
    }
    return(
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Topic</Title>
                <Text>(Only Group Leader Can Assign Supervisor)</Text>
            </div>
                    <Divider/>
            {/*{Topics.filter(Topics =>*/}
            {/*        Topics.submittedBy == loggedInUserID*/}
            {/*    ).map((item,index) => (*/}
                <Row gutter={16}>
                    <Title level={4}>Topic : {topic.topic}</Title>
                    <Col className="gutter-row" span={8}>
                        <p>
                            Group ID : {topic.groupID}
                        </p>
                        <p>
                            Research Area : {topic.field}
                        </p>
                        <p>
                            Submitted By(Leader ID) : {topic.submittedBy}
                        </p>
                        {/*<p>*/}
                        {/*    Supervisor's Decision : {topic.approval}*/}
                        {/*</p>*/}
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Select
                            id="supervisorID"
                            defaultValue="Select Supervisor"

                            onChange={handleSupervisor}
                            style={{
                                width: 170,
                            }}
                        >
                            {Supervisor.filter(Supervisor =>
                                Supervisor.ResearchField === topic.field &&
                                Supervisor.title == 'Supervisor'
                            ).map((item2,index) => (
                                <Option key={index.toString()} value={item2._id}>{item2.username}</Option>
                            ))}
                        </Select>
                        <br/><br/>
                        <Select
                            id="coSupervisorID"
                            defaultValue="Select Co-Supervisor"
                            style={{
                                width: 170,
                            }}
                            onChange={handleCoSupervisor}
                        >
                            {Supervisor.filter(Supervisor =>
                                Supervisor.ResearchField === topic.field &&
                                Supervisor.title == 'CoSupervisor'
                            ).map((item3,index) => (
                                <Option key={index.toString()} value={item3._id}>{item3.username}</Option>
                            ))}
                        </Select>
                        <br/><br/>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form onSubmit={onSubmit} >
                            <Button
                                onClick={onSubmit}
                            >
                                Submit
                            </Button>
                            <br/><br/>
                            <Button

                            >
                                Delete
                            </Button>
                        </Form>
                    </Col>
                </Row>

            <Row gutter={16}>
                <Title level={4}>Send Message</Title>
                <Col className="gutter-row" span={8}>
                    <Form onSubmit={onSubmit} >
                        <label>Message</label>
                        <Input
                             onChange={onInitialMessage}
                             value={initialMsg}
                        />
                        {/*<br/>*/}
                        {/*<br/>*/}
                        {/*<label>Group ID</label>*/}
                        {/*<Input*/}
                        {/*    // onChange={onGroupIDChange}*/}
                        {/*    // value={GroupID}*/}
                        {/*/>*/}

                        <br />
                        <br />

                        <Button
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </div>
    )

}
export default withRouter(AssignTopic);