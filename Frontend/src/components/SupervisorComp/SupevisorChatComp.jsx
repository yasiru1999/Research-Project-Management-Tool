import { Typography, Avatar, Input, Tooltip, Button } from "antd2";
import { useState } from "react";
import { FcExpand } from "react-icons/fc";
import { IoMdSend } from "react-icons/io";

const { Text } = Typography;

import PaperCard from "../Common/PaperCard";
import Container from "../Common/Container";
import useMediaQuery from "../../utils/providers/useMediaQuery";

function SupervisorChatComp({ grp_name, rec_message, sent_message }) {
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
                <Container style={{ width: "100%", justifyContent: "start" }}>
                  <Avatar radius="xl">{grp_name.slice(0, 2)}</Avatar>
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
                    {rec_message}
                  </Text>
                </Container>
              </div>
              <div>
                <Container style={{ width: "100%", justifyContent: "end" }}>
                  <Text
                    style={{
                      textAlign: "right",
                      backgroundImage:
                        "linear-gradient(to left, #DBF3FA , white )",
                      borderRadius: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    }}
                  >
                    {sent_message}
                  </Text>
                  <Avatar radius="xl">Me</Avatar>
                </Container>
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
                    style={{ width: "300px" }}
                  ></Input>
                  <Tooltip title="Send">
                    <Button
                      shape="circle"
                      type="link"
                      icon={<IoMdSend size={30} />}
                      size="large"
                      style={{ textAlign: "center", margin: "5px" }}
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
