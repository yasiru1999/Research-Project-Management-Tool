import { useEffect, useState } from "react";
import { Avatar, Spin, Typography, Button, notification } from "antd2";
import { FiCheckCircle } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";

import {
    acceptTopic,
    getMakedTopicListBySupervisor,
    getTopicListBySupervisor,
    rejectTopic,
} from "../../utils/api/supervisor";
import useAuth from "../../utils/providers/AuthProvider";
import Container from "../Common/Container";
import useMediaQuery from "../../utils/providers/useMediaQuery";
import { useParams } from "react-router-dom";

const { Text } = Typography;

export function SupervisorTopicTab() {
    const { comp } = useParams();
    const { user } = useAuth();
    const quary = useMediaQuery("(max-width:430px)");
    const [data, setdata] = useState([]);
    const [dataMaked, setdataMaked] = useState([]);
    const showMakedTopics = comp === "topics-marked";

    const [uiUpdated, setuiUpdated] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            // TODO:add supervisorid from authstate
            const supervisor = user._id;
            setisLoading(true);
            const _data = await getTopicListBySupervisor(supervisor);
            setisLoading(false);
            if (_data.err || !Array.isArray(_data)) {
                notification.error({
                    className: "custom-class",
                    style: {
                        width: 400,
                    },
                    placement: "bottomRight",
                    title: "Request Faild",
                    message: _data.err && _data.msg.message,
                    color: "red",
                });
            } else {
                setdata(_data);
            }
        }
        if (!showMakedTopics) {
            getData();
        }
    }, [uiUpdated, showMakedTopics]);

    useEffect(() => {
        async function getData() {
            // TODO:add supervisorid from authstate
            const supervisor = user._id;
            setisLoading(true);
            const _dataMarked = await getMakedTopicListBySupervisor(supervisor);

            setisLoading(false);
            if (_dataMarked.err || !Array.isArray(_dataMarked)) {
                notification.error({
                    className: "custom-class",
                    style: {
                        width: 400,
                    },
                    placement: "bottomRight",
                    title: "Request Faild",
                    message: _dataMarked.err && _dataMarked.msg.message,
                    color: "red",
                });
            } else {
                setdataMaked(_dataMarked);
            }
        }
        if (showMakedTopics) {
            getData();
        }
    }, [uiUpdated, showMakedTopics]);

    const rows = data.map((item) => {
        return (
            <tr key={item._id}>
                <td style={{ paddingRight: "12px" }}>
                    <Container vertical={quary}>
                        <Avatar
                            size={28}
                            style={{
                                paddingBottom: "-2px",
                                margin: "2px",
                                fontSize: "small",
                            }}
                        >
                            {item.groupID && item.groupID.StudentName && item.groupID.StudentName}
                        </Avatar>
                        <Text style={{ fontWeight: "bolder" }}>
                            {item.groupID && item.groupID.StudentName && item.groupID.StudentName}
                        </Text>
                    </Container>
                </td>
                <td style={{ paddingRight: "12px" }}>
                    <Text strong>{item.topic && item.topic}</Text>
                </td>
                <td style={{ paddingRight: "12px" }}>
                    <Container vertical={quary}>
                        <Button
                            style={{
                                backgroundColor: "green",
                                color: "#FFF",
                                margin: "5px",
                                minWidth: "110px",
                            }}
                            icon={
                                <FiCheckCircle
                                    style={{ marginRight: "6px" }}
                                ></FiCheckCircle>
                            }
                            styles={{ root: { margin: 5, minWidth: 110 } }}
                            onClick={async () => {
                                setisLoading(true);

                                const _res = await acceptTopic(item._id);
                                setisLoading(false);
                                if (_res.msg !== "success" || !_res.err) {
                                    setuiUpdated((p) => !p);
                                } else {
                                    notification.error({
                                        className: "custom-class",
                                        style: {
                                            width: 400,
                                        },
                                        placement: "bottomRight",
                                        title: "Oparation Faild",
                                        message: _res.err && _res.msg.message,
                                        color: "red",
                                    });
                                }
                            }}
                        >
                            Accept
                        </Button>

                        <Button
                            style={{
                                backgroundColor: "red",
                                color: "#FFF",
                                margin: "5px",
                                minWidth: "110px",
                            }}
                            icon={
                                <FiXCircle
                                    style={{ marginRight: "6px" }}
                                ></FiXCircle>
                            }
                            styles={{ root: { margin: 5, minWidth: 110 } }}
                            onClick={async () => {
                                setisLoading(true);

                                const _res = await rejectTopic(item._id);
                                setisLoading(false);
                                if (_res.msg !== "success" || !_res.err) {
                                    setuiUpdated((p) => !p);
                                } else {
                                    notification.error({
                                        className: "custom-class",
                                        style: {
                                            width: 400,
                                        },
                                        placement: "bottomRight",
                                        title: "Oparation Faild",
                                        message: _res.err && _res.msg.message,
                                        color: "red",
                                    });
                                }
                            }}
                        >
                            Reject
                        </Button>
                    </Container>
                </td>
            </tr>
        );
    });
    const makedRow = dataMaked.map((item) => {
        return (
            <tr key={item._id}>
                <td style={{ paddingRight: "12px" }}>
                    <Container vertical={quary}>
                        <Avatar
                            size={28}
                            style={{
                                paddingBottom: "-2px",
                                margin: "2px",
                                fontSize: "small",
                            }}
                        >
                            {item.groupID && item.groupID.StudentName && item.groupID.StudentName}
                        </Avatar>
                        <Text style={{ fontWeight: "bolder" }}>
                            {item.groupID && item.groupID.StudentName && item.groupID.StudentName}
                        </Text>
                    </Container>
                </td>
                <td style={{ paddingRight: "12px" }}>
                    <Text strong>{item.topic && item.topic}</Text>
                </td>
                <td style={{ paddingRight: "12px" }}>
                    {(item.approval && <Text type="success">Approved</Text>) ||
                        (item.rejected && <Text type="danger">Rejected</Text>)}
                </td>
            </tr>
        );
    });

    return (
        <div>
            <Spin spinning={isLoading}>
                {/* <Button
                    style={{ marginBottom: "12px" }}
                    onClick={() => {
                        setshowMakedTopics((ea) => !ea);
                    }}
                >
                    {showMakedTopics
                        ? "Show Pending Topics"
                        : "Show Marked Topics"}
                </Button> */}
                <table style={{ width: "100%" }}>
                    <thead style={{ borderBottom: "2px solid #f1f1f1" }}>
                        <tr>
                            <th
                                style={{
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                }}
                            >
                                Group ID
                            </th>
                            <th
                                style={{
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                }}
                            >
                                Topic
                            </th>
                            <th
                                style={{
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>{showMakedTopics ? makedRow : rows}</tbody>
                </table>
            </Spin>
        </div>
    );
}
