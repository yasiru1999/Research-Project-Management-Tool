import React, {  useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';


const { Title } = Typography;
const { TextArea } = Input;

function AddStudentSubmission(props) {


    const [GroupIDValue, setGroupIDValue] = useState("");
    const [DriveLinkValue, setDriveLinkValue] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [StartDate, setStartDate] = useState(new Date());


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
        console.log(event.currentTarget.value.toString())
    }


    const onSubmit = (event) => {
        event.preventDefault();

        if (!GroupIDValue || !DriveLinkValue || !isFilePicked) {
            return alert('fill all the fields first!')
        }

        const variables = {
            GroupID: GroupIDValue,
            link: selectedFile.name,
            driveLink:DriveLinkValue,
            author: localStorage.getItem('userid'),
            Submitted_Date:StartDate,
            isApproved: false,
            isPaid: false
        }

        const formData = new FormData();
        formData.append('file',selectedFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post('http://localhost:8080/studentSubmission', variables)
            .then(response => {
                Axios.post("http://localhost:8080/studentSubmission/StudentUploadFile",formData,config)
                    .then(() => {
                        if (response.data.success) {
                            alert('Submission Type Successfully Uploaded')
                            props.history.push('/uploadSubmissionType')
                            console.log(variables.Exp_Date);
                        } else {
                            alert('Failed to upload Submission type')
                        }

                    }).catch((error) => {
                    alert(error.message);
                });

            })

    }



    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Add Submission </Title>
            </div>

            <Form onSubmit={onSubmit} >

                <label>Add Submission Details Paper</label>
                <Input
                    type={"file"}
                    name="file"
                    onChange={fileChangeHandler}
                />
                <br />
                <br />
                <label>Group ID</label>
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
                    Submitted date:
                </label>
                <input type="datetime-local" value={StartDate} onChange={handleSelectDate}/>
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

export default AddStudentSubmission;
