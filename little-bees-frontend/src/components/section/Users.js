import React, { Component, useState, useEffect } from 'react'
import '../css/Users.css'
import Axios from 'axios';


const Users = () => {
    let url = 'http://localhost:3001';
    useEffect(() => {
        Axios.get(url + '/getUsersOnly').then((response) => {
            setUserList([...response.data]);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        Axios.defaults.withCredentials = true;
        Axios.get(url +"/login", {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            if (response.data.loggedIn === true) {
                setUserAuthority(response.data.role_name);
            }

        });
    });

    const[Authority,setUserAuthority]=useState();
    
    const [userList, setUserList] = useState([]);
    const [AdminList,setAdminsList]=useState([]);

    function deleteUser(user_id){
        var del = window.confirm("Jeste li sigurni da želite izbrisati ovaj account?");
        if(del===true){
            Axios.delete(url + "/removeuser", {
                data:{user_id : user_id}
            }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            })
        }
        else{}
       
    }

    function updateUser(user_id){
        var update = window.confirm("Jeste li sigurni da želite ažurirati ovaj account?");
        if(update===true){
            Axios.put(url + "/updateIntoAdmin", {
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
                    <td className="action-update"> {Authority === 'SuperAdmin' ? 'Action' : null }</td>
                    <td className="del">Delete</td>
                </tr>
            </thead>
        </table>
            {
                userList.map(user => {

                    return (
                        <div key ={user.user_id} className="main-table">
                            <form onSubmit={(e) => { e.preventDefault(); }} className="user-section">
                                <table>   
                                    <tbody>
                                        <tr>
                                            <td className="action"><input type="checkbox" name="user"></input></td>
                                            <td className="leftt">{user.username}</td>
                                            <td>{user.user_id}</td>
                                            <td className="emaill leftt">{user.email}</td>
                                            <td className="action-update">{Authority === 'SuperAdmin' ? < button type="submit" onClick={() => { updateUser(user.user_id)}}>Update Into Admin </button>: null } </td> 
                                            <td className="del"><button type="submit" onClick={() => { deleteUser(user.user_id)}}><i title="DELETE USER" class="fas fa-trash fa-lg"></i></button></td>
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

export default Users;