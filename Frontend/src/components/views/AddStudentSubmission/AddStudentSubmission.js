import React, {useEffect, useState} from 'react'
import {Typography, Button, Form, Input, Select} from 'antd';
import Axios from 'axios';
import axios from "axios";


const { Title } = Typography;
const { TextArea } = Input;

function AddStudentSubmission(props) {


    const [GroupIDValue, setGroupIDValue] = useState("");
    const [DriveLinkValue, setDriveLinkValue] = useState("");
    const[Supervisor,setSupervisor] = useState([]);
    const[SupervisorName,setSupervisorName] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [StartDate, setStartDate] = useState(new Date());

    useEffect(() => {
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
        getSupervisors();


    },[])

    const handleSupervisor = (value) => {
        console.log(`selected ${value}`);
        setSupervisorName(value);
    };


    const fileChangeHandler = (event) => {

        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const onGroupIDChange = (event) => {
        setGroupIDValue(event.currentTarget.value)
    }

    const onDriveLinkChange = (event) => {
        setDriveLinkValue(event.currentTarget.value)
    }

    function handleSelectDate(event) {
        setStartDate(event.currentTarget.value)

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        document.getElementById("currentDateTime").value = dateTime;
    }


    const onSubmit = (event) => {
        event.preventDefault();

        if (!GroupIDValue || !DriveLinkValue) {
            return alert('fill all the fields first!')
        }

        const variables = {
            // GroupID: GroupIDValue,
            Submitted_Date:StartDate,
            topic: GroupIDValue,
            groupID: localStorage.getItem('userid'),
            pdfLink:DriveLinkValue,
            supervisor:SupervisorName,

            // author: localStorage.getItem('userid'),
            // Submitted_Date:StartDate,
            // isApproved: false
        }

        const formData = new FormData();
        formData.append('file',selectedFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post('http://localhost:8080/project/add', variables)
            .then(response => {
                            alert('Submission Type Successfully Uploaded')
                            props.history.push('/uploadSubmissionType')
                            // console.log(variables.Exp_Date);

                    }).catch((error) => {
                    alert(error.message);
                });



    }



    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Add Submission </Title>
            </div>

            <Form onSubmit={onSubmit} >

                {/*<label>Add Submission Details Paper</label>*/}
                {/*<Input*/}
                {/*    type={"file"}*/}
                {/*    name="file"*/}
                {/*    onChange={fileChangeHandler}*/}
                {/*/>*/}
                <br />
                <br />
                <label>Topic</label>
                <Input
                    onChange={onGroupIDChange}
                    value={GroupIDValue}
                />
                <br />
                <br />
                <label>Drive Link</label>
                <TextArea
                    onChange={onDriveLinkChange}
                    value={DriveLinkValue}
                />
                <br/>
                <br/>
                <label>
                    Submitted date : <input style={{width:400}} id="currentDateTime" value={StartDate} onChange={handleSelectDate} readOnly/>
                </label>
                <br />
                <br />
                <Select
                    id="supervisorID"
                    defaultValue="Select Supervisor"

                    onChange={handleSupervisor}
                    style={{
                        width: 170,
                    }}
                >
                    {Supervisor.map((item,index) => (
                        <Option key={index.toString()} value={item._id}>{item.username}</Option>
                    ))}
                </Select>
<br/><br/>
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default AddStudentSubmission;
