import React,  {useEffect, useState, Fragment} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import download from 'downloadjs';
import {Typography, Divider } from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import DateCountdown from 'react-date-countdown-timer';

const { Title, Text } = Typography;

function SubmissionType(props){

    const[Submission,setSubmissions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/submissionT/')
            .then(response => {
                console.log(response.data);
                setSubmissions(response.data.submissiontypes);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    const downloadFile = async(link) => {
        console.log(link);
        await axios.get(`http://localhost:8080/submissionTypeUpload/`+link)
            .then(response => {

                console.log(response);
                return download(response.data);

            }).catch(error => {
                console.log(error);
            })
    }

    let deadlinex = Submission

    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Submissions </Title>
            </div>
            {Submission.length > 0 && Submission.map((item,index) => (
                <Fragment key={index}>
                    <Divider />
                    <Title level={4}>
                        {item.topic}
                    </Title>
                    <p>
                        {item.description}
                    </p>
                    <p>
                    <a>
                        <DownloadOutlined onClick={() => downloadFile(item.link)}/>
                    </a>
                        |Download Submission
                    </p>
                    <a href={""}>Submission Upload Link</a>
                    <br/>
                    <br/>
                    <Text strong>
                        Submission Expire Date: {item.Exp_Date}
                    </Text>
                    <DateCountdown dateTo={item.Exp_Date.toISOString()}  />

                </Fragment>
            ))}

        </div>
    )
}

export default withRouter(SubmissionType);
