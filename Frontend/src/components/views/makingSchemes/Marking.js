import React,  {useEffect, useState, Fragment} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import download from 'downloadjs';
import {Typography, Divider } from "antd";
import {DownloadOutlined} from '@ant-design/icons';
// import DateCountdown from 'react-date-countdown-timer';

const { Title, Text } = Typography;

function Marking(){

    const[Marking,setMarking] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/marking/')
            .then(response => {
                console.log(response.data);
                setMarking(response.data.submissiontypes);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    const downloadFile = async(link) => {
        console.log(link);
        await axios.get(`http://localhost:8080/markingUploads/`+link)
            .then(response => {

                console.log(response);
                return download(response.data);

            }).catch(error => {
                console.log(error);
            })
    }


    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Marking Schemes</Title>
            </div>
            {Marking.length > 0 && Marking.map((item,index) => (
                <Fragment key={index}>
                    <Divider />
                    <Title level={4}>
                        {item.MarkingName}
                    </Title>
                    <p>
                        <a>
                            <DownloadOutlined onClick={() => downloadFile(item.link)}/>
                        </a>
                        |Download submitted Submission
                    </p>
                    <p>
                        <a href={item.driveLink}> View Submitted Submission</a>
                    </p>
                    <Text strong>
                        Submission submitted Date: {item.Submitted_Date}
                    </Text>
                    {/*<DateCountdown dateTo={item.Exp_Date.toISOString()}  />*/}

                </Fragment>
            ))}

        </div>
    )
}

export default withRouter(Marking);
