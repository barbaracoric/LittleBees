import React, { Component, useState, useEffect } from 'react'
import '../components/css/Users.css'
import Axios from 'axios';


const Admins = () => {
    let url = 'http://localhost:3001';
    useEffect(() => {
        Axios.get(url + '/getAdminsOnly').then((response) => {
            setAdminList([...response.data]);
        });
        // eslint-disable-next-line
    }, []);
    
    
    const [AdminList,setAdminList]=useState([]);

    function deleteUser(user_id){
        var del = window.confirm("Jeste li sigurni da želite izbrisati vaš account?");
        if(del===true){
            Axios.delete(url + "/removeuser", {
                user_id : user_id 
            }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            })
        }
        else{}
    }

    
    function updateAdmin(user_id){
        var update = window.confirm("Jeste li sigurni da želite ažurirati ovaj account?");
        if(update===true){
            Axios.put(url + "/revertbacktoUser", {
                data:{user_id : user_id}
            }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            })
        }
        else{}
    }


    return (
        <>
            <table className="head-table">
                <thead>
                    <tr>
                        <td className="action"><input title="SELECT ALL" type="checkbox" name="user"></input></td>
                        <td>Username</td>
                        <td>Id</td>
                        <td className="emaill">Email address</td>
                        <td className="action-update">Action</td>
                        <td className="del">Delete</td>
                    </tr>
                </thead>
            </table>
            {
                AdminList.map(user => {
                    return (
                        <div key ={user.user_id} className="main-table">
                            <form onSubmit={(e) => { e.preventDefault(); }} className="user-section">
                                <table>
                                    <tbody >
                                        <tr>
                                            <td className="action"><input type="checkbox" name="user"></input></td>
                                            <td className="leftt">{user.username}</td>
                                            <td>{user.user_id}</td>
                                            <td className="emaill leftt">{user.email}</td>
                                            <td className="action-update"><button type="submit" onClick={() => { updateAdmin(user.user_id)}}>Update Into User</button></td> 
                                            <td className="del"><button type="submit" onClick={() => { deleteUser(user.user_id)}}><i title="DELETE USER" class="fas fa-trash fa-lg"></i></button></td>

                                            {/* <td>{user.user_id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td><button type="submit" onClick={() => { deleteUser(user.user_id)}}>Delete Admin</button></td>
                                            <td><button type="submit" onClick={() => { updateAdmin(user.user_id)}}>Update Into User </button></td> */}
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Admins;