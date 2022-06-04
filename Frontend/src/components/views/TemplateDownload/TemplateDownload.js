import React,  {useEffect, useState, Fragment} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import download from 'downloadjs';
import {Typography, Divider } from "antd";
import {DownloadOutlined} from '@ant-design/icons';
// import DateCountdown from 'react-date-countdown-timer';

const { Title, Text } = Typography;

function TemplateDownload(){

    const[TemplateDownload,setTemplateDownload] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/downloadTemplate/')
            .then(response => {
                console.log(response.data);
                setTemplateDownload(response.data.submissiontypes);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    const downloadFile = async(link) => {
        console.log(link);
        await axios.get(`http://localhost:8080/TemplateUpload/`+link)
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
                <Title level={2}> Download document/presentation templates </Title>
            </div>
            {TemplateDownload.length > 0 && TemplateDownload.map((item,index) => (
                <Fragment key={index}>
                    <Divider />
                    <Title level={4}>
                        {item.Template_name}
                    </Title>
                    <p>
                        <a>
                            <DownloadOutlined onClick={() => downloadFile(item.link)}/>
                        </a>
                        |Download submitted Template
                    </p>
                    <p>
                        <a href={item.driveLink}> View Submitted Template</a>
                    </p>
                    <Text strong>
                        Template submitted Date: {item.Submitted_Date}
                    </Text>
                    {/*<DateCountdown dateTo={item.Exp_Date.toISOString()}  />*/}

                </Fragment>
            ))}

        </div>
    )
}

export default withRouter(TemplateDownload);
