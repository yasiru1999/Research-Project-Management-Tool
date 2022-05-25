import React, { useState } from 'react'
import {  Button, Form, Input, Col, Row } from 'antd';
import { Formik } from 'formik';
import axios from 'axios';
import Select from 'react-select';
import * as Yup from 'yup';
import {withRouter} from "react-router";
import Title from "antd/es/typography/Title";

const Specialization = [
    { value: 'SE', label: 'SE' },
    { value: 'IT', label: 'IT' },
    { value: 'DS', label: 'DS' },
    { value: 'CS', label: 'CS' }
]

function AddGroup(props) {

    const [StudentOneSpecial,setStudentOneSpecial] = useState('');
    const [StudentTwoSpecial,setStudentTwoSpecial] = useState('');
    const [StudentThreeSpecial,setStudentThreeSpecial] = useState('');
    const [StudentFourSpecial,setStudentFourSpecial] = useState('');
    return (
        <Formik
            initialValues={{
                N1StudentName:'',
                N1StudentID:'',
                N1StudentSpecial:'',
                N2StudentName:'',
                N2StudentID:'',
                N2StudentSpecial:'',
                N3StudentName:'',
                N3StudentID:'',
                N3StudentSpecial:'',
                N4StudentName:'',
                N4StudentID:'',
                N4StudentSpecial:'',
            }}
            validationSchema={Yup.object().shape({
                N1StudentName: Yup.string()
                    .required('Name is required'),
                N1StudentID: Yup.string()
                    .required('ID is required'),
                N2StudentName: Yup.string()
                    .required('Name is required'),
                N2StudentID: Yup.string()
                    .required('ID is required'),
                N3StudentName: Yup.string()
                    .required('Name is required'),
                N3StudentID: Yup.string()
                    .required('ID is required'),
                N4StudentName: Yup.string()
                    .required('Name is required'),
                N4StudentID: Yup.string()
                    .required('ID is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        N1StudentName: values.N1StudentName,
                        N1StudentID: values.N1StudentID,
                        N1StudentSpecial: StudentOneSpecial.value,
                        N2StudentName: values.N2StudentName,
                        N2StudentID: values.N2StudentID,
                        N2StudentSpecial: StudentTwoSpecial.value,
                        N3StudentName: values.N3StudentName,
                        N3StudentID: values.N3StudentID,
                        N3StudentSpecial: StudentThreeSpecial.value,
                        N4StudentName: values.N4StudentName,
                        N4StudentID: values.N4StudentID,
                        N4StudentSpecial: StudentFourSpecial.value
                    };

                    console.log(dataToSubmit);

                    axios.post('http://localhost:8080/studentGroup/', dataToSubmit)
                        .then(response =>
                        {
                            if( response.data.success){
                                props.history.push("/viewGroup");
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
                    <div style={{maxWidth: '1100px', margin: '2rem auto'}}>
                        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                            <Title level={2}>Add New Student Group</Title>
                        </div>
                        <Form onSubmit={handleSubmit}>

                            <br/>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={6}>
                                    <Form.Item required label="1st Student Name:">
                                        {<Input
                                            id="N1StudentName"
                                            placeholder="Enter Student Name"
                                            type="text"
                                            value={values.N1StudentName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N1StudentName && touched.N1StudentName ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N1StudentName && touched.N1StudentName && (
                                            <div className="input-feedback">{errors.N1StudentName}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="1st Student ID:">
                                        {<Input
                                            id="N1StudentID"
                                            placeholder="Enter Student ID"
                                            type="text"
                                            value={values.N1StudentID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N1StudentID && touched.N1StudentID ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N1StudentID && touched.N1StudentID && (
                                            <div className="input-feedback">{errors.N1StudentID}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="Specialization In:">
                                        <Select
                                            id="N1StudentSpecial"
                                            options = {Specialization}
                                            hasValue
                                            setValue={values.Field}
                                            onBlur={handleBlur}
                                            className = "basic-multi-select"
                                            onChange={setStudentOneSpecial}
                                            className={
                                                errors.N1StudentSpecial && touched.N1StudentSpecial ? 'text-input error' : 'text-input'
                                            }
                                        />
                                        {errors.N1StudentSpecial && touched.N1StudentSpecial && (
                                            <div className="input-feedback">{errors.N1StudentSpecial}</div>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Form.Item required label="2nd Student Name:">
                                        {<Input
                                            id="N2StudentName"
                                            placeholder="Enter Student Name"
                                            type="text"
                                            value={values.N2StudentName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N2StudentName && touched.N2StudentName ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N2StudentName && touched.N2StudentName && (
                                            <div className="input-feedback">{errors.N2StudentName}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="2nd Student ID:">
                                        {<Input
                                            id="N2StudentID"
                                            placeholder="Enter Student ID"
                                            type="text"
                                            value={values.N2StudentID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N2StudentID && touched.N2StudentID ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N2StudentID && touched.N2StudentID && (
                                            <div className="input-feedback">{errors.N2StudentID}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="Specialization In:">
                                        <Select
                                            id="N2StudentSpecial"
                                            options = {Specialization}
                                            hasValue
                                            setValue={values.Field}
                                            onBlur={handleBlur}
                                            className = "basic-multi-select"
                                            onChange={setStudentTwoSpecial}
                                            className={
                                                errors.N2StudentSpecial && touched.N2StudentSpecial ? 'text-input error' : 'text-input'
                                            }
                                        />
                                        {errors.N2StudentSpecial && touched.N2StudentSpecial && (
                                            <div className="input-feedback">{errors.N2StudentSpecial}</div>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Form.Item required label="3rd Student Name:">
                                        {<Input
                                            id="N3StudentName"
                                            placeholder="Enter Student Name"
                                            type="text"
                                            value={values.N3StudentName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N3StudentName && touched.N3StudentName ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N3StudentName && touched.N3StudentName && (
                                            <div className="input-feedback">{errors.N3StudentName}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="3rd Student ID:">
                                        {<Input
                                            id="N3StudentID"
                                            placeholder="Enter Student ID"
                                            type="text"
                                            value={values.N3StudentID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N3StudentID && touched.N3StudentID ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N3StudentID && touched.N3StudentID && (
                                            <div className="input-feedback">{errors.N3StudentID}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="Specialization In:">
                                        <Select
                                            id="N3StudentSpecial"
                                            options = {Specialization}
                                            hasValue
                                            setValue={values.Field}
                                            onBlur={handleBlur}
                                            className = "basic-multi-select"
                                            onChange={setStudentThreeSpecial}
                                            className={
                                                errors.N3StudentSpecial && touched.N3StudentSpecial ? 'text-input error' : 'text-input'
                                            }
                                        />
                                        {errors.N3StudentSpecial && touched.N3StudentSpecial && (
                                            <div className="input-feedback">{errors.N3StudentSpecial}</div>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Form.Item required label="4th Student Name:">
                                        {<Input
                                            id="N4StudentName"
                                            placeholder="Enter Student Name"
                                            type="text"
                                            value={values.N4StudentName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N4StudentName && touched.N4StudentName ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N4StudentName && touched.N4StudentName && (
                                            <div className="input-feedback">{errors.N4StudentName}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="4th Student ID:">
                                        {<Input
                                            id="N4StudentID"
                                            placeholder="Enter Student ID"
                                            type="text"
                                            value={values.N4StudentID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.N4StudentID && touched.N4StudentID ? 'text-input error' : 'text-input'
                                            }
                                        />}
                                        {errors.N4StudentID && touched.N4StudentID && (
                                            <div className="input-feedback">{errors.N4StudentID}</div>
                                        )}
                                    </Form.Item>
                                    <Form.Item required label="Specialization In:">
                                        <Select
                                            id="N4StudentSpecial"
                                            options = {Specialization}
                                            hasValue
                                            setValue={values.Field}
                                            onBlur={handleBlur}
                                            className = "basic-multi-select"
                                            onChange={setStudentFourSpecial}
                                            className={
                                                errors.N4StudentSpecial && touched.N4StudentSpecial ? 'text-input error' : 'text-input'
                                            }
                                        />
                                        {errors.N4StudentSpecial && touched.N4StudentSpecial && (
                                            <div className="input-feedback">{errors.N4StudentSpecial}</div>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                            <br/>
                            <br/>


                    </div>
                );
            }}
        </Formik>
    );
};
export default withRouter(AddGroup);
