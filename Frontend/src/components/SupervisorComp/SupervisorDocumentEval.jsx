import React, { useEffect, useState } from "react";

import { Avatar, Typography, Button, Spin, Popover, notification } from "antd2";
import SupervisorGradingFrom from "./SupervisorGradingFrom";
import { FaMarker } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { getProjectListBySupervisor } from "../../utils/api/supervisor";
import useAuth from "../../utils/providers/AuthProvider";

import Container from "../Common/Container";
import useMediaQuery from "../../utils/providers/useMediaQuery";

const { Text } = Typography;

export function SupervisorDocumentEval() {
    const [data, setdata] = useState([]);
    const quary = useMediaQuery("(max-width:430px)");
    const { user } = useAuth();
    const [isLoading, setisLoading] = useState(false);
    const [clickedRow, setclickedRow] = useState("");
    const [popoverOpened, setPopoverOpened] = useState([0, false]);

    useEffect(() => {
        async function _getData() {
            // Todo:add superviser from auth
            const supervisor = user._id;
            setisLoading(true);
            const _data = await getProjectListBySupervisor(supervisor);
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
                setdata(_data.sort((a, b) => (a.isGraded ? 1 : -1)));
            }
        }
        _getData();
    }, []);

    const toggleAsMarked = (index, grade) => {
        setdata((prev) =>
            prev
                .map((item, idx) => {
                    if (idx === index) {
                        item.isGraded = true;
                        item.grade = grade || 0;
                        return item;
                    } else {
                        return item;
                    }
                })
                .sort((a, b) => (a.isGraded ? 1 : -1))
        );
    };
    const toggleAsUnMarked = (index) => {
        setdata((prev) =>
            prev
                .map((item, idx) => {
                    if (idx === index) {
                        item.isGraded = false;
                        return item;
                    } else {
                        return item;
                    }
                })
                .sort((a, b) => (a.isGraded ? 1 : -1))
        );
    };

    const rows = data.map((item, index) => {
        //     const selected = selection.includes(item.id);
        const bgColor = item.isGraded ? "#F4FCE3" : "";
        return (
            <tr key={item._id} style={{ backgroundColor: bgColor }}>
                <td style={{ paddingRight: "3px" }}>
                    {item.isGraded ? <FcApproval size={25} /> : <></>}
                </td>
                <td style={{ paddingRight: "36px" }}>
                    <Container vertical={quary}>
                        <Avatar style={{ margin: "5px" }}>
                            {item.groupID && item.groupID.StudentName && item.groupID.StudentName}
                        </Avatar>
                        <Text size="sm" weight={500}>
                            {item.groupID && item.groupID.StudentName && item.groupID.StudentName}
                        </Text>
                    </Container>
                </td>
                <td style={{ paddingRight: "36px" }}>
                    {item.topic && item.topic}
                </td>
                <td style={{ paddingRight: "36px" }}>
                    <Popover
                        visible={
                            index === popoverOpened[0] &&
                            popoverOpened[1] &&
                            clickedRow === item._id
                        }
                        onVisibleChange={(e) => setPopoverOpened([index, e])}
                        trigger="click"
                        content={
                            <div>
                                <SupervisorGradingFrom
                                    index={index}
                                    id={item._id}
                                    pdfLink={item.pdfLink}
                                    popoverHandler={setPopoverOpened}
                                    gradeToggle={toggleAsMarked}
                                    isGraded={item.isGraded}
                                    grade={item.grade}
                                ></SupervisorGradingFrom>
                            </div>
                        }
                        withArrow
                    >
                        <Button
                            m={4}
                            icon={<FaMarker style={{ marginRight: "6px" }} />}
                            style={{
                                minWidth: "100px",
                                color: "#fff",
                                backgroundColor: "green",
                            }}
                            onClick={() => {
                                setclickedRow(item._id);
                                setPopoverOpened((prev) => [index, !prev[1]]);
                            }}
                            color={"green"}
                        >
                            {item.isGraded ? "Edit" : "Grade"}
                        </Button>
                    </Popover>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <Spin spinning={isLoading}>
                <table>
                    <thead style={{ borderBottom: "2px solid #f1f1f1" }}>
                        <tr>
                            <th
                                style={{
                                    width: 40,
                                    textAlign: "start",
                                    paddingBottom: "16px",
                                }}
                            ></th>
                            <th
                                style={{
                                    textAlign: "start",
                                    paddingBottom: "16px",
                                }}
                            >
                                Group ID
                            </th>
                            <th
                                style={{
                                    textAlign: "start",
                                    paddingBottom: "16px",
                                }}
                            >
                                Topic
                            </th>
                            <th
                                style={{
                                    textAlign: "start",
                                    paddingBottom: "16px",
                                }}
                            >
                                Evaluation
                            </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </Spin>
        </div>
    );
}
