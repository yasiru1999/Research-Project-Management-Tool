import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function AddSubmissionType(props) {

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
    const [targetDate, setTargetDate] = useState(
        new Date(dateTimeAfterThreeDays)
    );

    const handleChange = (event) => {
        event.preventDefault();
        if (event.target.value) {
            setTargetDate(new Date(event.target.value));
        } else {
            setTargetDate(new Date(dateTimeAfterThreeDays));
        }
    };

    console.log(targetDate);

    const fileChangeHandler = (event) => {

        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);

    };

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !isFilePicked) {
            return alert('fill all the fields first!')
        }

        const variables = {
            topic: TitleValue,
            description: DescriptionValue,
            link: selectedFile.name,
            author: localStorage.getItem('userid'),
            Exp_Date:targetDate,
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

        Axios.post('http://localhost:8080/submissionT', variables)
            .then(response => {
                Axios.post("http://localhost:8080/submissionT/uploadFile",formData,config)
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
                <label>Submission Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br/>
                <br/>
                <label htmlFor="countdown-date-time">
                    Select a Date and Time:
                </label>
                <input
                    type="datetime-local"
                    id="countdown-date-time"
                    name="countdown-date-time"
                    onChange={handleChange}

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

export default AddSubmissionType;
