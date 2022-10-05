import React, { useState, useEffect } from 'react'
import { Link, Redirect  } from 'react-router-dom'
import { ProductConsumer } from './Context'
import Axios from 'axios'
import './css/Register.css'
import Logo from './img/logoo2.png'
import LogoTheme from './img/logoo2.png'


export default function Register() {

    let url = 'http://localhost:3001';
    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [repassword, setRepassword] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [signedUp, setSignedUp] = useState(false);
    const [errorText, setErrorText] = useState({
        usernameError: '',
        passwordError: '',
        repasswordError: '',
        UserpasswordError: '',
        newpasswordError: '',

    });
    useEffect(() => {
        Axios.get(url + '/api/get').then((response) => {
            setUserList([...response.data]);
        });
        // eslint-disable-next-line
    }, []);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        Axios.defaults.withCredentials = true;
        Axios.get(url +"/login", {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            if (response.data.loggedIn === true) {
                setCurrentUser(response.data.userInfo);
            }
        });
        return () => { }
    }, []);

    function regexTest(email, username, password, repassword) {

        var patternEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        var patternUsername = new RegExp(/^[a-zA-Z0-9]{4,20}$/i);
        var patternPassword = new RegExp(/^([a-zA-Z0-9@*#]{8,32})$/i);
        var validEmail = 1, validUsername = 1, validPassword = 1, validRepassword = 1;
        let newErrorText = ['', '', '', ''];

        if (!patternEmail.test(email)) {
            validEmail = 0;
            newErrorText[0] = email.length === 0 ? 'Email is required' : 'Email is invalid';
        }
        if (!patternUsername.test(username)) {
            validUsername = 0;
            newErrorText[1] = username.length === 0 ? 'Username is required'
                : username.length < 4 ? 'Username is too short'
                    : username.length > 20 ? 'Username is too long'
                        : 'Username is invalid';
        }
        if (!patternPassword.test(password)) {
            validPassword = 0;
            newErrorText[2] = password.length === 0 ? 'Password is required'
                : password.length < 8 ? 'Password is too short'
                    : password.length > 32 ? 'Password is too long'
                        : 'Password is invalid';
        }
        else {
            if (repassword !== password) {
                validRepassword = 0;
                newErrorText[3] = repassword.length === 0 ? 'Please repeat your password' : 'Passwords do not match';
            }
        }
        for (var i = 0; i < userList.length; i++) {
            if (email === userList[i].email) {
                validEmail = 0;
                newErrorText[0] = 'Email is already taken';
            }
            if (username === userList[i].username) {
                validUsername = 0;
                newErrorText[1] = 'Username is already taken';
            }
        }
        return {
            validEmail: validEmail,
            emailError: newErrorText[0],
            validUsername: validUsername,
            usernameError: newErrorText[1],
            validPassword: validPassword,
            passwordError: newErrorText[2],
            validRepassword: validRepassword,
            repasswordError: newErrorText[3]
        }
    }



    const register = () => {
        var {
            validEmail,
            emailError,
            validUsername,
            usernameError,
            validPassword,
            passwordError,
            validRepassword,
            repasswordError,
        } = regexTest(emailReg, usernameReg, passwordReg, repassword);
        setErrorText({ emailError: emailError, usernameError: usernameError, passwordError: passwordError, repasswordError: repasswordError });
        if (validEmail === 1 && validUsername === 1 && validPassword === 1 && validRepassword === 1) {
            Axios.post(url +"/register", {
                email: emailReg,
                username: usernameReg,
                password: passwordReg,
            }).then((response) => {
                console.log(response);
            });
            setSignedUp(true);
        }
        else {
            console.log("Neispravni podaci");
        }
    };

    return (
        signedUp ? <Redirect to="/login" />
            : <div>
        <ProductConsumer>
            {
                value => {
                    const { theme } = value
                    return (
                        <form onSubmit={(e) => { e.preventDefault(); }}>
                            <div>
                                <div className={theme ? "theme-login-header" : "login-header"}>
                                    {theme ? <img src={LogoTheme} alt="" height="30px" /> : <img src={Logo} alt="" height="30px" />}
                                </div>
                                <div className={theme ? "theme-background" : "background"}>
                                    <div className={theme ? "theme-register-section" : "register-section"}>
                                        <h1>Sign Up</h1>
                                        <div className="flex-top">
                                            <div className="mail">
                                                <p>Email:</p>
                                                <input onChange={(e) => {
                                                    setEmailReg(e.target.value);
                                                }}
                                                    required
                                                    type="email"
                                                    className="form-control"
                                                    value={emailReg}
                                                    placeholder="example@gmail.com" />
                                                {/*<h6>Email mora biti oblika:primjer@gmail.com</h6>*/}
                                            </div>
                                            <div>
                                                <h6 className="errorUsername">{errorText.emailError}</h6>
                                            </div> <br />
                                            <div className="usernamee">
                                                <p>Username:</p>
                                                <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    value={usernameReg}
                                                    placeholder="Username"
                                                    onChange={(e) => {
                                                        setUsernameReg(e.target.value);
                                                    }}
                                                />
                                                <p className="below">Username mora imati 4-20 slova ili brojeva</p>
                                            </div>
                                            <div>
                                                <h6 className="errorEmail">{errorText.usernameError}</h6>
                                            </div> <br />
                                        </div>
                                        <div className="flex-bottom">
                                            <div className="pass">
                                                <p>Password:</p>
                                                <input
                                                    required
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={passwordReg}
                                                    onChange={(e) => {
                                                        setPasswordReg(e.target.value);
                                                    }}
                                                />
                                                <p className="below">Password mora imati minimalno 8 karaktera, veliko i malo slovo i broj</p>
                                            </div>
                                            <div>
                                                <h6 className="errorPassword">{errorText.passwordError}</h6>
                                            </div> <br />
                                            <div className="con-pass">
                                                <p> Confirm Password:</p>
                                                <input
                                                    required
                                                    type="password"
                                                    className="form-control-retype"
                                                    placeholder="Password"
                                                    value={repassword}
                                                    onChange={(e) => {
                                                        setRepassword(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <br />
                                            <div>
                                                <h6 className="errorPassword">{errorText.repasswordError}</h6>
                                            </div> <br />
                                        </div>
                                        <button type="submit" onClick={register}> Sign Up </button>
                                        <div className="already">
                                            <div className="line"></div>
                                            <p>Already have an account?</p>
                                        </div>
                                        <button className="log"><Link to="/login" title="Log In">Login</Link></button>
                                        <Link to="/" title="Home"><i className="fas fa-home fa-lg"></i></Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-login-footer" : "login-footer"}>
                                    <p>&#169; Copyright Little Bees 2022, all rights reserved</p>
                                </div>
                            </div>
                        </form>
                    )
                }
            }
        </ProductConsumer>
        </div>
    )
}