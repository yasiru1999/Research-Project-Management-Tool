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

    async function deleteSupervisor(item) {
        console.log(item.ID);
        await axios.delete(`http://localhost:8080/user/deleteSupervisor/${item._id}`).then((res)=>{
            console.log(res)
            alert("Delete  Successfully");
        });
    }


    function approvedChange(ID,approval){
        const submit = {
            ID: ID,
            isPendding: approval
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
                <Title level={2}> Approved Users </Title>
            </div>

            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th scope="col"><center>id</center></th>
                    <th scope="col"><center>name</center></th>
                    <th scope="col"><center>email</center></th>
                    <th scope="col"><center>university</center></th>
                    <th scope="col"><center>department</center></th>
                    <th scope="col"><center>ResearchField</center></th>
                    <th scope="col"><center>Approved</center></th>
                    <th scope="col"><center>Deleted</center></th>
                </tr>
                </thead>
                <tbody id="cursorPointer">
                {/*Rendering data*/}
                {Supervisor.filter(Supervisor => Supervisor.isPendding === "true").map((item,key) =>{
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
                            <td><center><button onClick={() => approvedChange(item._id,false)}>Approved</button></center></td>
                            <td><center><button onClick={() => {deleteSupervisor(item); window.location.reload()}
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
