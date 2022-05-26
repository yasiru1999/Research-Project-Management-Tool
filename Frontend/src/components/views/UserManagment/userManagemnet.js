import React,  {useEffect, useState} from "react";
import { withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import {Typography} from "antd";

const { Title} = Typography;

function UserManagement(){

    const[Student,setStudent] = useState([]);
    const[Supervisor,setSupervisor] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8080/user/getStudents')
            .then(response => {
                console.log(response.data);
                setStudent(response.data.Student);
            })
            .catch(err => {
                console.log(err);
            })
    },[])


        async function deleteStudent(item) {
        console.log(item.id);
            await axios.delete(`http://localhost:8080/user/deleteStudent/${item._id}`).then((res)=>{
                console.log(res)
                alert("Delete  Successfully");
            });
        }



    useEffect(() => {
        axios.get('http://localhost:8080/user/getSupervisors')
            .then(response => {
                console.log(response.data);
                setSupervisor(response.data.Supervisor);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    async function deleteSupervisor(item) {
        console.log(item.ID);
        await axios.delete(`http://localhost:8080/user/deleteSupervisor/${item._id}`).then((res)=>{
            console.log(res)
            alert("Delete  Successfully");
        });
    }


    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Manage Users </Title>
            </div>
            {/*{Submission.length > 0 && Submission.map((item,index) => (*/}
            {/*    <Fragment key={index}>*/}
            {/*        <Divider />*/}
            {/*        <Title level={4}>*/}
            {/*            {item.topic}*/}
            {/*        </Title>*/}
            {/*        <p>*/}
            {/*            {item.description}*/}
            {/*        </p>*/}
            {/*        <a>*/}
            {/*            <DownloadOutlined onClick={() => downloadFile(item.link)}/>*/}
            {/*        </a>*/}
            {/*        <br/>*/}
            {/*        <p>*/}
            {/*            {item.Exp_Date}*/}
            {/*        </p>*/}
            {/*        <br/>*/}
            {/*        <a href={"/submissionUpload"}></a>*/}
            {/*        <br/>*/}
            {/*        <Text strong>*/}
            {/*            {item.author != null && item.author.name}*/}
            {/*        </Text>*/}
            {/*    </Fragment>*/}
            {/*))}*/}

            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col"><center>id</center></th>
                    <th scope="col"><center>Student Name</center></th>
                    <th scope="col"><center>Email</center></th>
                    <th scope="col"><center>Update</center></th>
                    <th scope="col"><center>Delete</center></th>
                </tr>
                </thead>
                <tbody id="cursorPointer">
                {/*Rendering data*/}
                {Student.map( (item, key) => {
                    return (
                        <tr key = {key} >
                            <td>
                                <center>{item.id}</center>
                            </td>
                            <td><center>{item.StudentName}</center></td>
                            <td><center>{item.Email}</center></td>
                            <td><center><button onClick={() => {
                                history.push({
                                    pathname: "/updateStudent",
                                    state:{student:item}
                                })}
                            }>Edit</button></center></td>

                            <td><center><button onClick={() => {deleteStudent(item); window.location.reload()}
                            }>Delete</button></center></td>
                        </tr>
                )
                })}
                </tbody>
                </table>

            <br/>
            <br/>

            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col"><center>id</center></th>
                    <th scope="col"><center>name</center></th>
                    <th scope="col"><center>email</center></th>
                    <th scope="col"><center>university</center></th>
                    <th scope="col"><center>department</center></th>
                    <th scope="col"><center>ResearchField</center></th>
                    <th scope="col"><center>Update</center></th>
                    <th scope="col"><center>Delete</center></th>
                </tr>
                </thead>
                <tbody id="cursorPointer">
                {/*Rendering data*/}
                {Supervisor.map( (item, key) => {
                    return (
                        <tr key = {key} >
                            <td>
                                <center>{item.id}</center>
                            </td>
                            <td><center>{item.name}</center></td>
                            <td><center>{item.email}</center></td>
                            <td><center>{item.university}</center></td>
                            <td><center>{item.department}</center></td>
                            <td><center>{item.ResearchField}</center></td>
                            <td><center><button onClick={() => {
                                history.push({
                                    pathname: "/updateSupervisor",
                                    state:{supervisor:item}
                                })}
                            }>Edit</button></center></td>
                            <td><center><button onClick={() => {deleteSupervisor(item); window.location.reload() }
                            }>Delete</button></center></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

        </div>
    )
}

export default withRouter(UserManagement);
