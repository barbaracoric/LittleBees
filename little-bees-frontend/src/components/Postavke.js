import Axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import { useContext } from 'react';
import {ProductConsumer} from './Context'
import './css/Postavke.css'
import { MainTitle } from './MainTitle'

const Postavke = () => {
    // eslint-disable-next-line
    Axios.defaults.withCredentials = true;
    let url = 'http://localhost:3001';

    const [username, setUsername] = useState("");
    const [newusername, setnewUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [newpassword, setnewPassword] = useState("");
    const [repassword, setRepassword] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [errorText, setErrorText] = useState({
        usernameError: '',
        passwordError: '',
        repasswordError: '',
        UserpasswordError: '',
        newpasswordError: '',
        UserRepasswordError: ''
    });
    useEffect(() => {
        Axios.get(url + '/api/get').then((response) => {
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
                setLoginStatus(true);
                setCurrentUser(response.data.userInfo);
            }
            
            
        });
        return () => { }
    }, []);
    const [userList, setUserList] = useState([]);

    function regexTestUsername(username) {

        var patternUsername = new RegExp(/^[a-zA-Z0-9]{4,20}$/i);
        var validUsername = 1;
        let newErrorText = [''];

        if (!patternUsername.test(username)) {
            validUsername = 0;
            newErrorText[0] = username.length === 0 ? 'Username is required'
                : username.length < 4 ? 'Username is too short'
                    : username.length > 20 ? 'Username is too long'
                        : 'Username is invalid';
        }
        for (var i = 0; i < userList.length; i++) {
            if (username === userList[i].username) {
                validUsername = 0;
                newErrorText[0] = 'Username is already taken';
            }
        }
        return {
            validUsername: validUsername,
            usernameError: newErrorText[0]
        }
    }
    function regexTestPassword(password, repassword, newpassword, response) {
        var patternPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
        var validNewPassword = 1;
        var validCurrentPassword = 1;
        var validRepassword = 1;
        var validUserPassword = 1;
        var validUserRepassword = 1;
        let newErrorText = ['', '', '', '', ''];
        let userMatch = response.data;
        let PasswordWrong = response.data;
        if (password.length === 0 || userMatch.passwordwrong === true) {
            validCurrentPassword = 0;
            newErrorText[0] = password.length === 0 ? 'Current password is required' : 'Current Password is incorrect';
        }
        else {
            if (repassword !== password) {
                validUserRepassword = 0;
                newErrorText[1] = repassword.length === 0 ? 'Please repeat your password' : 'Passwords do not match';
            }
        }
        if (password.length === 0 || PasswordWrong.passwordwrong === true) {
            validUserPassword = 0;
            newErrorText[2] = password.length === 0 ? 'Current password is required' : 'Current Password is incorrect';
        }
        else {
            if (repassword !== password) {
                validRepassword = 0;
                newErrorText[3] = repassword.length === 0 ? 'Please repeat your password' : 'Passwords do not match';
            }
        }

        if (!patternPassword.test(newpassword)) {
            validNewPassword = 0;
            newErrorText[4] = newpassword.length === 0 ? 'New Password is required'
                : newpassword.length < 8 ? 'New Password is too short'
                    : newpassword.length > 32 ? 'New Password is too long'
                        : 'New Password is invalid';
        }
        return {
            validCurrentPassword: validCurrentPassword,
            passwordError: newErrorText[0],
            validUserRepassword: validUserRepassword,
            UserRepasswordError: newErrorText[1],
            validUserPassword: validUserPassword,
            UserpasswordError: newErrorText[2],
            validRepassword: validRepassword,
            repasswordError: newErrorText[3],
            validNewPassword: validNewPassword,
            newpasswordError: newErrorText[4],

        }

    }



    const updateUsername = () => {
        Axios.post(url + "/PasswordValidation", {
            password: password
        }, { headers: { "x-access-token": localStorage.getItem("token") } }
        ).then((response) => {
            console.log(response);
            var {
                validUsername,
                usernameError,
            } = regexTestUsername(newusername);
            var {
                validCurrentPassword,
                passwordError,
                validUserRepassword,
                UserRepasswordError,
                validUserPassword,
                UserpasswordError,
                validRepassword,
                repasswordError,
                validNewPassword,
                newpasswordError,
            } = regexTestPassword(password, repassword, newpassword, response);
            setErrorText({ usernameError: usernameError, UserRepasswordError: UserRepasswordError, UserpasswordError: UserpasswordError });
            var updatename = window.confirm("Jeste li sigurni da želite promjeniti vaše korisničko ime?");
            if (updatename === true) {
                if (validUsername === 1 && validUserPassword === 1 && validUserRepassword === 1) {
                    Axios.put(url +"/api/updateusername", {
                        newusername: newusername,
                        password: password,
                        username: username,
                    },
                        { headers: { "x-access-token": localStorage.getItem("token") } }
                    ).then((response) => {
                        console.log(response);
                        if (response.data.update === true) {
                            localStorage.removeItem("token");
                            window.history.back();
                        }

                    })

                }
                else {
                    console.log("Neispravni podaci");
                }
            }
            else { }

        })
    };

    const updatePassword = () => {
        Axios.post(url + "/PasswordValidation", {
            password: password
        },
            { headers: { "x-access-token": localStorage.getItem("token") } }

        ).then((response) => {
            console.log(response);
            var {
                validCurrentPassword,
                passwordError,
                validUserRepassword,
                UserRepasswordError,
                validUserPassword,
                UserpasswordError,
                validRepassword,
                repasswordError,
                validNewPassword,
                newpasswordError,
            } = regexTestPassword(password, repassword, newpassword, response);
            setErrorText({ passwordError: passwordError, newpasswordError: newpasswordError, repasswordError: repasswordError });
            var updatepas = window.confirm("Jeste li sigurni da želite promjeniti vašu lozinku?");
            if (updatepas === true) {
                if (validNewPassword === 1 && validCurrentPassword === 1 && validRepassword === 1) {
                    Axios.put( url +"/api/updatepassword", {
                        newpassword: newpassword,
                        password: password
                    },
                        { headers: { "x-access-token": localStorage.getItem("token") } }

                    ).then((response) => {
                        console.log(response);
                        if (response.data.updatepas === true) {
                            localStorage.removeItem("token");
                            window.history.back();
                        }
                    })
                }
                else {
                    console.log("Neispravni podaci");

                }
            }


            else { }

        })
    };

    const deleteUser = () => {
        var del = window.confirm("Jeste li sigurni da želite izbrisati vaš account?");
        if (del === true) {
            Axios.delete(url +"/api/deleteuser",
                { headers: { "x-access-token": localStorage.getItem("token") } }
            ).then((response) => {
                console.log(response);
                localStorage.removeItem("token");
                window.history.back();
            })
        }
        else { }
    }


    
    return (
        <ProductConsumer>
            {
                value => {
                    const{theme}=value
                    return(
                        <div>
                        <MainTitle title="Edit profile" provider={value.theme}/>
                        <div className={theme ? "theme-profile-container" : "profile-container"}>
                            <div className="profile-update">
                                <div className="profile-user">
                                    <span>Change username:</span>
                                    <div className="profile-part">
                                        <p>New username:</p>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Username"
                                            onChange={(e) => {
                                                setnewUsername(e.target.value);
                                            }}
                                        />
                                        <p className="below">Username mora imati 4-20 slova ili brojeva</p>
                                    </div>
                                    <div>
                                        <h6 className="errorText">{errorText.usernameError}</h6>
                                    </div> <br />
                                    <div className="profile-part">
                                        <p>Password:</p>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h6 className="errorPassUser">{errorText.UserpasswordError}</h6>
                                    </div> <br />
                                    <div className="profile-part current">
                                        <p>Confirm password:</p>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setRepassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h6 className="errorReePass">{errorText.UserRepasswordError}</h6>
                                    </div> <br />
                                    <button type="submit" onClick={updateUsername}>Update</button>
                                </div>
                                <div className="profile-pass">
                                    <span>Change password:</span>
                                    <div className="profile-part">
                                        <p>New password:</p>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setnewPassword(e.target.value);
                                            }}
                                        />
                                        <p className="below">Password mora imati minimalno 8 karaktera, veliko i malo slovo i broj</p>
                                    </div>
                                    <div>
                                        <h6 className="errorNewPass">{errorText.newpasswordError}</h6>
                                    </div> <br />
                                    <div className="profile-part">
                                        <p>Current password:</p>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h6 className="errorPass">{errorText.passwordError}</h6>
                                    </div> <br />
                                    <div className="profile-part current">
                                        <p>Confirm current password:</p>
                                        <input
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setRepassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h6 className="errorRePass">{errorText.repasswordError}</h6>
                                    </div> <br />
                                    <button type="submit" onClick={updatePassword}>Update</button>
                                </div>
                        </div>
                        <div className="del-btn">
                            <button type="submit" onClick={deleteUser}>Delete My Account</button>
                        </div>
                        </div>
                        </div>
                    )
                }
            }
        </ProductConsumer>
    );
}

export default Postavke;