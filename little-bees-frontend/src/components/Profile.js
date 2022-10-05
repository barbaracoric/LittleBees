import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {ProductConsumer} from './Context'
import './css/Profile.css'
import { MainTitle } from './MainTitle'

const Profile = () => {
    // eslint-disable-next-line
    Axios.defaults.withCredentials = true;
    let url = 'http://localhost:3001';
    const [loginStatus, setLoginStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        Axios.defaults.withCredentials = true;
        Axios.get(url + "/login", {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(true);
                setCurrentUser(response.data.userInfo);
            }
        });
        return () => { }
    }, []);

    return (
        <ProductConsumer>
            {
                value => {
                    const{theme}=value
                    return(
                        <div className={theme ? "theme-main-container" : "main-container"}>
                            <MainTitle title="My profile" provider={value.theme}/>
                            <div className="container">
                                <p>Username: <span>{currentUser.username}</span></p>
                                <p>Email: <span>{currentUser.email}</span></p>
                                <p>User ID: <span>{currentUser.user_id}</span></p>
                                <button className="update"><Link to="/profile" title="Update">Update Profile</Link></button>
                            </div>
                        </div>
                    )
                }
            }
        </ProductConsumer>
    );
}


export default Profile;


