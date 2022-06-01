import React, {  useState } from 'react'
import { Typography, Button, Form, Input,DatePicker } from 'antd';
import Axios from 'axios';
// import DatePicker from 'react-date-picker'


const { Title } = Typography;
const { TextArea } = Input;

function AddSubmissionType(props) {


    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [StartDate, setStartDate] = useState(new Date());


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

    function handleSelectDate(event) {
        setStartDate(event.currentTarget.value)
        console.log(event.currentTarget.value.toString())
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
            Exp_Date:StartDate,
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
                <label>
                    Select a Exp Date:
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
