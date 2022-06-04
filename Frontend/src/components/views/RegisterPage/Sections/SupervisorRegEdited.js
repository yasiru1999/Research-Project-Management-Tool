import React, { useState } from "react";
import { Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import useAuth from "../../../../utils/providers/AuthProvider";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const options = [
    { value: "Supervisor", label: "Supervisor" },
    { value: "CoSupervisor", label: "Co-Supervisor" },
];
const ResearchFields = [
    { value: "IOT", label: "IOT" },
    { value: "AI", label: "AI" },
];

function SupervisorReg(props) {
    const { signUp } = useAuth();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [Field, setField] = useState("");

    return (
        <Formik
            initialValues={{
                title: "",
                username: "",
                name: "",
                email: "",
                university: "",
                department: "",
                ResearchField: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required("ID is required"),
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                    .email("Email is invalid")
                    .required("Email is required"),
                university: Yup.string().required("University is required"),
                department: Yup.string().required("Department is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                const test = {...values,ResearchField:Field.value,title:title.value}
                console.log(test);
                const is = await signUp(test);
                if (is) {
                    history.push("/staff-login");
                }
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return (
                    <div className="container">
                        <br />
                        <Form
                            style={{ minWidth: "375px" }}
                            {...formItemLayout}
                            onSubmit={handleSubmit}
                        >
                            <Form.Item required label="Title">
                                <Select
                                    id="title"
                                    options={options}
                                    hasValue
                                    setValue={values.title}
                                    onBlur={handleBlur}
                                    className={
                                        "basic-multi-select " + errors.title &&
                                        touched.title
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                    onChange={setTitle}
                                />
                                {errors.title && touched.title && (
                                    <div className="input-feedback">
                                        {errors.title}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Supervisor Username">
                                <Input
                                    id="username"
                                    placeholder="Enter your Username"
                                    type="text"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.username && touched.username
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.username && touched.username && (
                                    <div className="input-feedback">
                                        {errors.username}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Name">
                                <Input
                                    id="name"
                                    placeholder="Enter your Name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="Email"
                                hasFeedback
                                validateStatus={
                                    errors.email && touched.email
                                        ? "error"
                                        : "success"
                                }
                            >
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="University">
                                {
                                    <Input
                                        id="university"
                                        placeholder="Enter University"
                                        type="text"
                                        value={values.university}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.university &&
                                            touched.university
                                                ? "text-input error"
                                                : "text-input"
                                        }
                                    />
                                }
                                {errors.university && touched.university && (
                                    <div className="input-feedback">
                                        {errors.university}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Department">
                                {
                                    <Input
                                        id="department"
                                        placeholder="Enter Department"
                                        type="text"
                                        value={values.department}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.department &&
                                            touched.department
                                                ? "text-input error"
                                                : "text-input"
                                        }
                                    />
                                }
                                {errors.department && touched.department && (
                                    <div className="input-feedback">
                                        {errors.department}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Research Field">
                                <Select
                                    id="ResearchField"
                                    options={ResearchFields}
                                    hasValue
                                    setValue={values.ResearchField}
                                    onBlur={handleBlur}
                                    className={
                                        "basic-multi-select " +
                                            errors.ResearchField &&
                                        touched.ResearchField
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                    onChange={setField}
                                />
                                {errors.ResearchField &&
                                    touched.ResearchField && (
                                        <div className="input-feedback">
                                            {errors.ResearchField}
                                        </div>
                                    )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="Password"
                                hasFeedback
                                validateStatus={
                                    errors.password && touched.password
                                        ? "error"
                                        : "success"
                                }
                            >
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="Confirm Password"
                                hasFeedback
                            >
                                <Input
                                    id="confirmPassword"
                                    placeholder="Re-Enter your Password"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <div className="input-feedback">
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    onClick={handleSubmit}
                                    type="primary"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default withRouter(SupervisorReg);
