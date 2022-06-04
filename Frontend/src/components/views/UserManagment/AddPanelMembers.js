import React,  {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {Typography} from "antd";


const { Title} = Typography;

function UserManagement(){

    const[Supervisor,setSupervisor] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/user/getSupervisors')
            .then(response => {
                console.log(response.data.Supervisor);
                setSupervisor(response.data.Supervisor);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    // async function deleteSupervisor(item) {
    //     console.log(item.ID);
    //     await axios.delete(`http://localhost:8080/user/deleteSupervisor/${item._id}`).then((res)=>{
    //         console.log(res)
    //         alert("Delete  Successfully");
    //     });
    // }


    function approvedChange(ID,approval){
        const submit = {
            ID: ID,
            isPanelMember: approval
        }

        console.log(submit);

        axios.put(`http://localhost:8080/user/updateSupervisor/${ID}`,submit).then(response => {
            if(response.data.success){
                alert("Success");
            }else{
                console.log(response.data.error);
            }
        })
    }

    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Adding Panel Members </Title>
            </div>

            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col"><center>Id</center></th>
                    <th scope="col"><center>Name</center></th>
                    <th scope="col"><center>Email</center></th>
                    <th scope="col"><center>University</center></th>
                    <th scope="col"><center>Department</center></th>
                    <th scope="col"><center>ResearchField</center></th>
                    <th scope="col"><center>Panel Member</center></th>
                </tr>
                </thead>
                <tbody id="cursorPointer">
                {/*Rendering data*/}
                {Supervisor.filter(Supervisor => Supervisor.isPanelMember === "false").map((item,key) =>{
                    return (
                        <tr key = {key} >
                            <td>
                                <center>{item.id}</center>
                            </td>
                            <td><center>{item.username}</center></td>
                            <td><center>{item.email}</center></td>
                            <td><center>{item.university}</center></td>
                            <td><center>{item.department}</center></td>
                            <td><center>{item.ResearchField}</center></td>
                            <td><center><button onClick={() => {approvedChange(item._id,true); window.location.reload()}}>Add</button></center></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

        </div>
    )
}

export default withRouter(UserManagement);
