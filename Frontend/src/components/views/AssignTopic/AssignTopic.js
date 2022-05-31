import React, {useEffect, useState, Fragment} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Typography, Divider,Row,Col } from "antd";

const { Title, Text } = Typography;

function AssignTopic(props) {

    const[Topics, setTopics] = useState([]);
    const loggedInUserID = localStorage.getItem('id');
    console.log(loggedInUserID);
    useEffect(() => {
        axios.get('http://localhost:8080/TopicSubmit/getTopic')
            .then(response => {
                console.log(response.data);
                setTopics(response.data.topicDetails);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    return(
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Topic</Title>
                <Text>(Only Group Leader Can Assign Supervisor)</Text>
            </div>
            {Topics.length > 0 && Topics.map((item,index) => (
                <Fragment key={index}>
                    <Divider/>
                    <Row gutter={16}>
                        <Title level={4}>Topic : {item.topic}</Title>
                        <Col className="gutter-row" span={12}>
                            <p>
                                Group ID : {item.groupID}
                            </p>
                            <p>
                                Research Area : {item.field}
                            </p>
                            <p>
                                Submitted By(Leader ID) : {item.submittedBy}
                            </p>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <p>
                                {item.groupID}
                            </p>
                            <p>
                                {item.field}
                            </p>
                            <p>
                                {item.submittedBy}
                            </p>
                        </Col>
                    </Row>
                </Fragment>
            ))}
        </div>
    )

}
export default withRouter(AssignTopic);