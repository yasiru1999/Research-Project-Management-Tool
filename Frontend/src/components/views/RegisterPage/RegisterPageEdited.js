import React, { useState } from "react";
import { Radio } from "antd";
import StudentReg from "./Sections/StudentReg";
import SupervisorReg from "./Sections/SupervisorRegEdited";
import CoSupervisorReg from "./Sections/CoSupervisorReg";

function RegisterPage(props) {
    const [regType, setRegType] = useState(0);

    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setRegType(e.target.value);
    };

    return (
        <div className="app">
            <h2>Sign Up</h2>
            <Radio.Group
                /*options={options}*/
                onChange={onChange}
                value={regType}
                optionType="button"
                defaultValue="0"
                buttonStyle="solid"
            >
                <Radio.Button value="0">Student</Radio.Button>
                <Radio.Button value="1">
                    Supervisor / Co-Supervisor
                </Radio.Button>
            </Radio.Group>

            {regType == "0" ? (
                <>
                    <StudentReg />
                </>
            ) : null}
            {regType == "1" ? (
                <>
                    <SupervisorReg />
                </>
            ) : null}
        </div>
    );
}

export default RegisterPage;
