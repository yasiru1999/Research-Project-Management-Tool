import React, {useEffect, useState, Fragment} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Typography, Divider,Row,Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ViewGroup(props) {

    const[StuGroups, setStuGroups] = useState([]);
    const loggedInUserID = localStorage.getItem('id');
    console.log(loggedInUserID);
    useEffect(() => {
        axios.get('http://localhost:8080/studentGroup')
            .then(response => {
                console.log(response.data);
                setStuGroups(response.data.stuGroup);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    return(
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>My Group</Title>
            </div>
            {StuGroups.length > 0 && StuGroups.filter(StuGroups =>
                StuGroups.N1StudentID == loggedInUserID ||
                StuGroups.N2StudentID == loggedInUserID ||
                StuGroups.N3StudentID == loggedInUserID ||
                StuGroups.N4StudentID == loggedInUserID
            ).map((item,index) => (
                <Fragment key={index}>
                    <Divider/>
                    <Row gutter={16}>
                        <Title level={4}>Group ID : {item._id}</Title>
                        <Col className="gutter-row" span={6}>
                            <Title level={4}>Student 1</Title>
                            <p>
                                {item.N1StudentID}
                            </p>
                            <p>
                                {item.N1StudentName}
                            </p>
                            <p>
                                {item.N1StudentSpecial}
                            </p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Title level={4}>Student 2</Title>
                            <p>
                                {item.N2StudentID}
                            </p>
                            <p>
                                {item.N2StudentName}
                            </p>
                            <p>
                                {item.N2StudentSpecial}
                            </p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Title level={4}>Student 3</Title>
                            <p>
                                {item.N3StudentID}
                            </p>
                            <p>
                                {item.N3StudentName}
                            </p>
                            <p>
                                {item.N3StudentSpecial}
                            </p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Title level={4}>Student 4</Title>
                            <p>
                                {item.N4StudentID}
                            </p>
                            <p>
                                {item.N4StudentName}
                            </p>
                            <p>
                                {item.N4StudentSpecial}
                            </p>
                        </Col>
                    </Row>
                </Fragment>
            ))}
        </div>
    )

}
export default withRouter(ViewGroup);