import React,  {useEffect, useState} from "react";
import { withRouter,useHistory } from "react-router-dom";
import axios from "axios";
import {Typography} from "antd";

const { Title} = Typography;

function UserManagement(){

    const[StudentGroups,setStudentGroups] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8080/studentGroup/')
            .then(response => {
                console.log(response.data.stuGroup);
                setStudentGroups(response.data.stuGroup);
            })
            .catch(err => {
                console.log(err);
            })
    },[])


    // async function deleteStudent(item) {
    //     console.log(item.id);
    //     await axios.delete(`http://localhost:8080/user/deleteStudent/${item._id}`).then((res)=>{
    //         console.log(res)
    //         alert("Delete  Successfully");
    //     });
    // }



    // useEffect(() => {
    //     axios.get('http://localhost:8080/user/getSupervisors')
    //         .then(response => {
    //             console.log(response.data);
    //             setSupervisor(response.data.Supervisor);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // },[])

    // async function deleteSupervisor(item) {
    //     console.log(item.ID);
    //     await axios.delete(`http://localhost:8080/user/deleteSupervisor/${item._id}`).then((res)=>{
    //         console.log(res)
    //         alert("Delete  Successfully");
    //     });
    // }


    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Allocate panel members </Title>
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
                    <th scope="col"><center>Leader Name</center></th>
                    <th scope="col"><center>Student 2 Name</center></th>
                    <th scope="col"><center>Student 3 Name</center></th>
                    <th scope="col"><center>Student 4 Name</center></th>
                    <th scope="col"><center>Panel member 1 Name</center></th>
                    <th scope="col"><center>Panel member 2 Name</center></th>
                    <th scope="col"><center>Panel member 3 Name</center></th>
                    <th scope="col"><center>Panel member 4 Name</center></th>
                    <th scope="col"><center>Allocating panel</center></th>
                </tr>
                </thead>
                <tbody id="cursorPointer">
                {/*Rendering data*/}
                {StudentGroups.map( (item, key) => {
                    return (
                        <tr key = {key} >

                            <td><center>{item.N1StudentName}</center></td>
                            <td><center>{item.N2StudentName}</center></td>
                            <td><center>{item.N3StudentName}</center></td>
                            <td><center>{item.N4StudentName}</center></td>
                            <td><center>{item.panel_member1}</center></td>
                            <td><center>{item.panel_member2}</center></td>
                            <td><center>{item.panel_member3}</center></td>
                            <td><center>{item.panel_member4}</center></td>
                            <td><center><button onClick={() => {
                                history.push({
                                    pathname: "/allocatingMembersToGroup",
                                    state:{studentPanel:item}
                                })}
                            }>Add</button></center></td>

                        </tr>
                    )
                })}
                </tbody>
            </table>

            <br/>
            <br/>

            {/*<table className="table table-hover table-bordered">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th scope="col"><center>id</center></th>*/}
            {/*        <th scope="col"><center>name</center></th>*/}
            {/*        <th scope="col"><center>email</center></th>*/}
            {/*        <th scope="col"><center>university</center></th>*/}
            {/*        <th scope="col"><center>department</center></th>*/}
            {/*        <th scope="col"><center>ResearchField</center></th>*/}
            {/*        <th scope="col"><center>Update</center></th>*/}
            {/*        <th scope="col"><center>Delete</center></th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody id="cursorPointer">*/}
            {/*    /!*Rendering data*!/*/}
            {/*    {Supervisor.map( (item, key) => {*/}
            {/*        return (*/}
            {/*            <tr key = {key} >*/}
            {/*                <td>*/}
            {/*                    <center>{item.id}</center>*/}
            {/*                </td>*/}
            {/*                <td><center>{item.name}</center></td>*/}
            {/*                <td><center>{item.email}</center></td>*/}
            {/*                <td><center>{item.university}</center></td>*/}
            {/*                <td><center>{item.department}</center></td>*/}
            {/*                <td><center>{item.ResearchField}</center></td>*/}
            {/*                <td><center><button onClick={() => {*/}
            {/*                    history.push({*/}
            {/*                        pathname: "/updateSupervisor",*/}
            {/*                        state:{supervisor:item}*/}
            {/*                    })}*/}
            {/*                }>Edit</button></center></td>*/}
            {/*                <td><center><button onClick={() => {deleteSupervisor(item); window.location.reload() }*/}
            {/*                }>Delete</button></center></td>*/}
            {/*            </tr>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

        </div>
    )
}

export default withRouter(UserManagement);
