import React, {  useState } from 'react'
import { Typography, Button, Form, Input,DatePicker } from 'antd';
import Axios from 'axios';
// import DatePicker from 'react-date-picker'


const { Title } = Typography;
const { TextArea } = Input;

function AddSubmissionType(props) {


    const [MarkingName, setMarkingName] = useState("");
    // const [DescriptionValue, setDescriptionValue] = useState("");
    const [DriveLinkValue, setDriveLinkValue] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [StartDate, setStartDate] = useState(new Date());


    const fileChangeHandler = (event) => {

        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const onMarkingNameChange = (event) => {
        setMarkingName(event.currentTarget.value)
    }

    // const onDescriptionChange = (event) => {
    //     setDescriptionValue(event.currentTarget.value)
    // }

    const onDriveLinkChange = (event) => {
        setDriveLinkValue(event.currentTarget.value)
    }

    function handleSelectDate(event) {
        setStartDate(event.currentTarget.value)
        console.log(event.currentTarget.value.toString())
    }


    const onSubmit = (event) => {
        event.preventDefault();

        if (!MarkingName || !DriveLinkValue || !isFilePicked) {
            return alert('fill all the fields first!')
        }

        const variables = {
            MarkingName: MarkingName,
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

        Axios.post('http://localhost:8080/marking', variables)
            .then(response => {
                Axios.post("http://localhost:8080/marking/markingUpload",formData,config)
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
                <Title level={2}> Add Marking Schemes </Title>
            </div>

            <Form onSubmit={onSubmit} >

                <label>Add Marking Details Paper</label>
                <Input
                    type={"file"}
                    name="file"
                    onChange={fileChangeHandler}
                />
                <br />
                <br />
                <label>Marking Schemes Title</label>
                <Input
                    onChange={onMarkingNameChange}
                    value={MarkingName}
                />
                <br />
                <br />
                {/*<label>Description</label>*/}
                {/*<TextArea*/}
                {/*    onChange={onDescriptionChange}*/}
                {/*    value={DescriptionValue}*/}
                {/*/>*/}
                <br/>
                <br/>
                <label>Drive Link</label>
                <TextArea
                    onChange={onDriveLinkChange}
                    value={DriveLinkValue}
                />
                <br/>
                <br/>
                <label>
                    Select a Submitted Date:
                </label>
                <input type="datetime-local" value={StartDate} onChange={handleSelectDate}/>
                <br />
                {/*<DatePicker value={StartDate} onChange={handleSelectDate} />*/}
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
