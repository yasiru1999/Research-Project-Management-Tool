import { useState, useEffect } from "react";
import SupervisorChatComp from "./SupevisorChatComp";
import useAuth from "../../utils/providers/AuthProvider";
import { getChatGroups } from "../../utils/api/supervisor";

function SuperviserChatTab() {
    const [data, setdata] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        async function getUserData() {
            const res = await getChatGroups(user._id);
            if (res && Array.isArray(res)) {
                setdata(res);
            }
        }
        getUserData();
    }, []);
    const chats = data.map((item, index) => {
        return (
            <div key={index} style={{ maxWidth: "500px", margin: "auto" }}>
                <SupervisorChatComp
                    grp_name={item.student.StudentName}
                    grp_id={item._id}
                ></SupervisorChatComp>
                <br></br>
            </div>
        );
    });
    return <div>{chats}</div>;
}

export default SuperviserChatTab;
