import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import useAuth from "../../../utils/providers/AuthProvider";

const { Title } = Typography;

function LoginPage(props) {
    const { signIn } = useAuth();
    const history = useHistory();

    const rememberMeChecked = localStorage.getItem("rememberMe");

    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMe = () => {
        let remember = false;
        if (!rememberMe) {
            remember = true;
            localStorage.setItem("rememberMe", "true");
        }
        setRememberMe(remember);
    };

    useEffect(() => {
        if (rememberMeChecked) {
            setRememberMe(true);
        }
    }, []);

    let initialId = null;

    if (rememberMe === "true") initialId = localStorage.getItem("id");

    return (
        <Formik
            initialValues={{
                id: initialId,
                password: "",
            }}
            validationSchema={Yup.object().shape({
                id: Yup.string().required("ID is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                const is = await signIn(values.id, values.password);
                if (is) {
                    history.push("/staff/chat");
                }
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                return (
                    <div className="app">
                        <Title level={2}>Staff Log In</Title>
                        <form
                            onSubmit={handleSubmit}
                            style={{ width: "350px" }}
                        >
                            <Form.Item required>
                                <Input
                                    id="id"
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Enter your ID"
                                    type="text"
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.id && touched.id
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.id && touched.id && (
                                    <div className="input-feedback">
                                        {errors.id}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id="password"
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Enter your Password"
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

                            {formErrorMessage && (
                                <label>
                                    <p
                                        style={{
                                            color: "#ff0000bf",
                                            fontSize: "0.7rem",
                                            border: "1px solid",
                                            padding: "1rem",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {formErrorMessage}
                                    </p>
                                </label>
                            )}

                            <Form.Item>
                                <Checkbox
                                    id="rememberMe"
                                    onChange={handleRememberMe}
                                    defaultChecked={rememberMe}
                                    checked={rememberMe}
                                >
                                    Remember me
                                </Checkbox>
                                <a
                                    className="login-form-forgot"
                                    href="/reset_user"
                                    style={{ float: "right" }}
                                >
                                    forgot password
                                </a>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        style={{ minWidth: "100%" }}
                                        disabled={isSubmitting}
                                        onSubmit={handleSubmit}
                                    >
                                        Log in
                                    </Button>
                                </div>
                                Or <a href="/register">register now!</a>
                                <br />
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default withRouter(LoginPage);
