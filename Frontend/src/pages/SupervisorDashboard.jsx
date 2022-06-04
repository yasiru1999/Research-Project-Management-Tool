import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import SupervisorMainTabs from "../components/SupervisorComp/SupervisorMainTabs";
import SupervisorHeader from "../components/SupervisorComp/SupervisorHeader";
import useAuth from "../utils/providers/AuthProvider";

function SupervisorDashboard() {
    const { comp } = useParams();

    const { user } = useAuth();
    // const [isRederect, setisRederect] = useState(false);

    // useEffect(() => {
    //     // setTimeout(() => {
    //     setFromCache();
    //     setFromCache();
    //     if (user) {
    //         setisRederect(false);
    //     } else {
    //         setisRederect(true);
    //     }
    //     console.count("logoutCount");
    //     // }, 100);
    // }, []);

    return (
        <div>
            {user ? (
                <>
                    <SupervisorHeader></SupervisorHeader>
                    <SupervisorMainTabs tab={comp}></SupervisorMainTabs>
                </>
            ) : (
                // <Redirect to="/staff-login"></Redirect>
                <div style={{ padding: 10 }}>
                    <h3>
                        Please sign in again. <a href="/staff-login">Click</a>
                    </h3>
                </div>
            )}
        </div>
    );
}

export default SupervisorDashboard;
