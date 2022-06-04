// import {   Slider ,  } from "@mantine/core";

import { Spin, Button, Typography, Slider, Divider, notification } from "antd2";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { gradeProject } from "../../utils/api/supervisor";
import Container from "../Common/Container";
const { Text } = Typography;
function SupervisorGradingFrom({
    id,
    index,
    pdfLink,
    popoverHandler,
    gradeToggle,
    isGraded,
    grade,
}) {
    const [docGrade, setdocGrade] = useState(isGraded ? grade : 0);
    const [isloading, setisloading] = useState(false);

    return (
        <div>
            <Spin spinning={isloading}>
                <Container
                    vertical={true}
                    style={{
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        minWidth: "250px",
                    }}
                >
                    <Text
                        style={{
                            fontSize: "12pt",
                            color: "#33333",
                            fontWeight: "700",
                        }}
                    >
                        Submit Grade
                    </Text>
                    <Divider>Marks: {docGrade}</Divider>
                    <Button type="primary" href={pdfLink} target="_blank">
                        View Report
                    </Button>
                    <div style={{ width: "100%" }}>
                        <Slider
                            defaultValue={isGraded ? grade : 0}
                            onAfterChange={(val) => {
                                setdocGrade(val);
                            }}
                        />
                        <Button
                            style={{ float: "right" }}
                            type="default"
                            icon={<FaCheck style={{ marginRight: "6px" }} />}
                            onClick={async () => {
                                setisloading(true);
                                const _res = await gradeProject(id, docGrade);
                                setisloading(false);
                                if (_res.msg !== "success" || _res.err) {
                                    notification.error({
                                        className: "custom-class",
                                        style: {
                                            width: 400,
                                        },
                                        placement: "bottomRight",

                                        title: "Oparation Faild",
                                        message: _res.err && _res.msg.message,
                                    });
                                } else {
                                    gradeToggle(index, docGrade);
                                    popoverHandler(index, false);
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </Container>
            </Spin>
        </div>
    );
}

export default SupervisorGradingFrom;
