// import { Avatar, Grid, MediaQuery, Paper, Text } from "@mantine/core";
import { Col, Row, Avatar, Typography } from "antd2";
import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import { BiPhoneOutgoing } from "react-icons/bi";
import useAuth from "../../utils/providers/AuthProvider";
import Container from "../Common/Container";
import useMediaQuery from "../../utils/providers/useMediaQuery";

const { Text } = Typography;

function SupervisorHeader() {
    const { user } = useAuth();
    const quary = useMediaQuery("(max-width:520px)");

    return (
        <div>
            <center>
                <div
                    p="xl"
                    style={{
                        maxWidth: "1000px",
                        width: "100%",

                        justifyContent: "end",
                        display: "flex",
                    }}
                >
                    <Container vertical={quary}>
                        <Col
                            style={{
                                justifyContent: "end",
                                paddingLeft: "32px",
                                marginBottom: "8px",
                            }}
                        >
                            <Avatar
                                // src={user && user.image}
                                size={140}
                            >{user.username && user.username.slice(0,2)}</Avatar>
                        </Col>

                        <Col
                            sm
                            style={{ textAlign: "start", paddingLeft: "32px" }}
                        >
                            <Text
                                style={{
                                    color: "#868e98",
                                    fontSize: "14pt",
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                }}
                                color="dimmed"
                            >
                                {user && user.role}
                            </Text>
                            <br></br>
                            <Text
                                style={{
                                    color: "#33333",
                                    fontSize: "14pt",
                                    fontWeight: 800,
                                }}
                            >
                                {user && (user.fullName || user.username)}
                            </Text>
                            <br></br>

                            <Text
                                style={{
                                    color: "#868e98",
                                    fontSize: "13pt",
                                    fontWeight: 600,
                                }}
                            >
                                <MdAlternateEmail />{" "}
                                {user && (user.email || user.username)}
                            </Text>
                            <br></br>

                            <Text
                                style={{
                                    color: "#868e98",
                                    fontSize: "13pt",
                                    fontWeight: 600,
                                }}
                            >
                                <BiPhoneOutgoing />{" "}
                                {user && (user.phone || "add a Phone Number")}
                            </Text>
                        </Col>
                    </Container>
                </div>
            </center>
        </div>
    );
}

export default SupervisorHeader;