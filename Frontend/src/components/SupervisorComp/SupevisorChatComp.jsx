import { Typography, Avatar, Input, Tooltip, Button } from "antd2";
import { useState, useEffect } from "react";
import { FcExpand } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";

const { Text } = Typography;

import PaperCard from "../Common/PaperCard";
import Container from "../Common/Container";
import useMediaQuery from "../../utils/providers/useMediaQuery";
import { sendChat } from "../../utils/api/supervisor";
import useAuth from "../../utils/providers/AuthProvider";

function SupervisorChatComp({ grp_name, rec_message, sent_message, grp_id }) {
    const [msg, setmsg] = useState("");
    const [chatList, setchatList] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const socket = io("http://localhost:8080", {
            path: "/socket/chat",
            auth: {
                id: grp_id,
            },
        });

        socket.on("connect", (skt) => {
            console.log("Connected");
        });
        socket.on("client-chats", (data) => {
            if (data && Array.isArray(data)) {
                setchatList(data);
            }
        });
    }, []);

    const [opened, setOpen] = useState(false);
    const quary = useMediaQuery("(min-width:580px)");
    return (
        <div>
            <>
                <PaperCard style={{ flexDirection: "column" }}>
                    <Container position="left">
                        <Avatar size="md" radius="xl">
                            {grp_name.slice(0, 2)}
                        </Avatar>

                        {/* <MediaQuery largerThan="xs" styles={{ width: "300px" }}> */}
                        <Text
                            strong
                            style={{
                                marginLeft: "3em",
                                marginRight: "3em",
                                textAlign: "center",
                                width: quary ? "300px" : "auto",
                            }}
                        >
                            {grp_name}
                        </Text>
                        {/* </MediaQuery> */}

                        <Button
                            shape="circle"
                            type="link"
                            icon={<FcExpand size={30} />}
                            size="large"
                            style={{ textAlign: "center", margin: "5px" }}
                            onClick={() => setOpen((o) => !o)}
                        />
                    </Container>

                    <div
                        style={{
                            height: opened ? "auto" : "0",
                            transition: " height 2s",
                            // transitionDuration:"300ms"
                        }}
                    >
                        <div
                            style={{
                                display: opened || "none",
                                marginTop: "1em",
                                borderTop: "solid gray 0.5px",
                                padding: "0.5em",
                            }}
                        >
                            <div
                                sx={{
                                    borderRadius: "50px",
                                }}
                            >
                                {chatList &&
                                    chatList.map((chatItem) => (
                                        <Container
                                            style={{
                                                width: "100%",
                                                justifyContent:
                                                    user.role ===
                                                    chatItem.sender
                                                        ? "end"
                                                        : "start",
                                            }}
                                        >
                                            <Avatar radius="xl">
                                                {chatItem.sender ===
                                                "supervisor"
                                                    ? "Sv"
                                                    : "St"}
                                            </Avatar>
                                            <Text
                                                style={{
                                                    textAlign: "left",
                                                    backgroundImage:
                                                        "linear-gradient(to right, #DBF3FA , white )",
                                                    borderRadius: "10px",
                                                    paddingLeft: "20px",
                                                    paddingRight: "20px",
                                                    paddingTop: "8px",
                                                    paddingBottom: "8px",
                                                }}
                                            >
                                                {chatItem.message}
                                            </Text>
                                        </Container>
                                    ))}
                            </div>

                            <div
                                sx={{
                                    marginTop: "1em",
                                }}
                            >
                                <Container style={{ justifyContent: "right" }}>
                                    <Input
                                        placeholder="Reply"
                                        size="large"
                                        value={msg}
                                        style={{ width: "300px" }}
                                        onChange={(e) => setmsg(e.target.value)}
                                    ></Input>
                                    <Tooltip title="Send">
                                        <Button
                                            shape="circle"
                                            type="link"
                                            icon={<IoMdSend size={30} />}
                                            onClick={async () => {
                                                await sendChat(
                                                    msg,
                                                    "supervisor",
                                                    grp_id
                                                );
                                                setmsg("");
                                            }}
                                            size="large"
                                            style={{
                                                textAlign: "center",
                                                margin: "5px",
                                            }}
                                        />
                                    </Tooltip>
                                </Container>
                            </div>
                        </div>
                    </div>
                </PaperCard>
            </>
        </div>
    );
}

export default SupervisorChatComp;
