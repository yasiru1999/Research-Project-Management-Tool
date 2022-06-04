import { SupervisorDocumentEval } from "./SupervisorDocumentEval";
import SuperviserChatTab from "./SupervisorChatTab";
import { SupervisorTopicTab } from "./SupervisorTopicTab";
import useMediaQuery from "../../utils/providers/useMediaQuery";

const SupervisorMainTabs = ({ tab }) => {
    const quary = useMediaQuery("(min-width:465px)");
    return (
        <div style={{ margin: quary ? "32px" : "3px", width: "100%" }}>
            {/* <Tabs defaultActiveKey="1" centered type="card"> */}
            {tab === "chat" && (
                <div>
                    <h2
                        style={{
                            color: "#33333",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        }}
                    >
                        Chats
                    </h2>
                    <SuperviserChatTab />
                </div>
                // <TabPane
                //     tab={
                //         <span>
                //             <FcSms size={!quary ? 30 : 20} />
                //             {quary && "Group Chat"}
                //         </span>
                //     }
                //     key="1"
                // >
                //     <SuperviserChatTab />
                // </TabPane>
            )}
            {(tab === "topics-pending" || tab === "topics-marked") && (
                <div>
                    <h2
                        style={{
                            color: "#33333",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        }}
                    >
                        Student Topics
                    </h2>
                    <SupervisorTopicTab />
                </div>
                // <TabPane
                //     tab={
                //         <span>
                //             <FcPlanner size={!quary ? 30 : 20} />
                //             {quary && "Student Topics"}
                //         </span>
                //     }
                //     key="2"
                // >
                //     <SupervisorTopicTab />
                // </TabPane>
            )}
            {tab === "projects" && (
                <div>
                    <h2
                        style={{
                            color: "#33333",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        }}
                    >
                        Student Documents
                    </h2>
                    <SupervisorDocumentEval />
                </div>
                // <TabPane
                //     tab={
                //         <span>
                //             <FcDocument size={!quary ? 30 : 20} />
                //             {quary && "Document Evaluation"}
                //         </span>
                //     }
                //     key="3"
                // >
                //     <SupervisorDocumentEval />
                // </TabPane>
            )}
            {/* </Tabs> */}
        </div>
    );
};

export default SupervisorMainTabs;
