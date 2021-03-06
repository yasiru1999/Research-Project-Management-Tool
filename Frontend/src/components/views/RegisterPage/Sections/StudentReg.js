import React, {useState} from "react";
import { Formik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import axios from "axios";
import { withRouter } from 'react-router';
import { Form, Input, Button} from 'antd';

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

function StudentReg(props) {

    return (

        <Formik
            initialValues={{
                id: '',
                StudentName: '',
                Email: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                id: Yup.string()
                    .required('ID is required'),
                StudentName: Yup.string()
                    .required('Full Name is required'),
                Email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        id: values.id,
                        StudentName: values.StudentName,
                        Email: values.Email,
                        password: values.password,
                        isStudent: true
                    };

                    console.log(dataToSubmit);

                    axios.post('http://localhost:8080/user/', dataToSubmit)
                        .then(response =>
                        {
                            if( response.data.success){
                                props.history.push("/login");
                                alert('success');
                            }else{
                                alert("Error while registering user");
                            }
                        }).
                    catch(err => {
                        console.log(err);
                    });

                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
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
                        <br/>
                        {/*<h2>Student Sign up</h2>*/}
                        <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                            <Form.Item required label="Student ID">
                                <Input
                                    id="id"
                                    placeholder="Enter your ID"
                                    type="text"
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.id && touched.id ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.id && touched.id && (
                                    <div className="input-feedback">{errors.id}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Name">
                                <Input
                                    id="StudentName"
                                    placeholder="Enter your Name"
                                    type="text"
                                    value={values.StudentName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.StudentName && touched.StudentName ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.StudentName && touched.StudentName && (
                                    <div className="input-feedback">{errors.StudentName}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Email" hasFeedback validateStatus={errors.Email && touched.Email ? "error" : 'success'}>
                                <Input
                                    id="Email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.Email && touched.Email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.Email && touched.Email && (
                                    <div className="input-feedback">{errors.Email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Password" hasFeedback validateStatus={errors.Password && touched.Password ? "error" : 'success'}>
                                <Input
                                    id="password"
                                    placeholder="Enter your Password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Confirm Password" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Re-Enter your Password"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default withRouter(StudentReg);
