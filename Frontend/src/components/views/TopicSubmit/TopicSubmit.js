import React, { useState } from 'react'
import { Typography, Button, Form, Input, Select } from 'antd';
import Axios from 'axios';
import {withRouter} from "react-router";

const { Title } = Typography;


function TopicSubmit(props) {

    const [Topic, setTopic] = useState("");
    const [GroupID, setGroupID] = useState("");
    const [Field, setField] = useState("");
    let user_id = localStorage.getItem('userid');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const onTopicChange = (event) => {
        setTopic(event.currentTarget.value);
    }
    const onGroupIDChange = (event) => {
        setGroupID(event.currentTarget.value);
    }
    const onFieldChange = (event) => {
        setField(event);
    }
    const fileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const onSubmit = (event) => {
        event.preventDefault();

        if (!Topic || !isFilePicked) {
            return alert('fill all the fields first!')
        }

        const variables = {
            topic: Topic,
            groupID: user_id,
            field:Field,
            link: selectedFile.name,
            submittedBy: localStorage.getItem('id'),
            isSupervisorAssigned:false,
            isCoSupervisorAssigned:false,
            RequestedSupervisor:'none',
            RequestedCoSupervisor: 'none'
        }
        console.log(variables);

        const formData = new FormData();
        formData.append('file',selectedFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post('http://localhost:8080/TopicSubmit', variables)
            .then(response => {
                Axios.post("http://localhost:8080/TopicSubmit/uploadFile",formData,config)
                    .then(() => {
                        if (response.data.success) {
                            alert('Submission Type Successfully Uploaded')
                            props.history.push('/')
                        } else {
                            alert('Failed to upload Submission type')
                        }

                    }).catch((error) => {
                    alert(error.message);
                });

            })

    }
    return (
        <div style={{ maxWidth: '300px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Topic Submission</Title>
            </div>

            <Form onSubmit={onSubmit} >
                <label>Submission Topic</label>
                <Input
                    onChange={onTopicChange}
                    value={Topic}
                />
                <br/>
                <br/>
                {/*<label>Group ID</label>*/}
                {/*<Input*/}
                {/*    onChange={onGroupIDChange}*/}
                {/*    value={GroupID}*/}
                {/*/>*/}
                <br/>
                <br/>
                <label>Research Field</label>
                <Select
                    defaultValue="MI"
                    style={{
                        width: 300,
                    }}
                    onChange={onFieldChange}
                >
                    <Option value={"MI"}>MI</Option>
                    <Option value={"AI"}>AI</Option>
                    <Option value={"IOT"}>IOT</Option>
                </Select>
                <br/>
                <br/>
                <label>Topic Submission</label>
                <Input
                    type={"file"}
                    name="file"
                    onChange={fileChangeHandler}
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

export default withRouter(TopicSubmit);
