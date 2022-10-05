import React, { Component, useState, useEffect } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import Axios from 'axios'
import './css/Login.css'
import Logo from './img/logoo2.png'
import LogoTheme from './img/logoo2.png'
import { ProductConsumer } from './Context'

function Login() {
    let url = 'http://localhost:3001';
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [errorText, setErrorText] = useState({
        usernameError: '',
        passwordError: '',
        WrongInputError: ''
    });

    useEffect(() => {
        Axios.defaults.withCredentials = true;
        Axios.get(url + "/login", {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.loggedIn);
                setCurrentUser(response.data.userInfo);
            }
        });
        return () => { }
    }, []);


    const login = () => {
        var validUsername = 1;
        var validPassword = 1;
        var validInput = 1;
        let newErrorText = ['', '', ''];
        Axios.post(url +"/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (username.length === 0) {
                validUsername = 0;
                newErrorText[0] = 'Username is required';
                setLoginStatus(false);
                setCurrentUser({});
            }
            if (password.length === 0) {
                validPassword = 0;
                newErrorText[1] = 'Password is required';
                setLoginStatus(false);
                setCurrentUser({});
            }
            if (response.data.loggedIn === false) {
                validInput = 0;
                newErrorText[2] = 'Username or password is incorecct';
                setLoginStatus(false);
                setCurrentUser({});
            }
            setErrorText({
                usernameError: newErrorText[0],
                passwordError: newErrorText[1],
                WrongInputError: newErrorText[2]
            });


            if (validPassword === 1 && validUsername === 1 && validInput === 1) {
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true);
                setCurrentUser(response.data.userInfo);
                console.log(response);
            }
        });
    };



    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <ProductConsumer>
                {
                    value => {
                        const { theme } = value
                        return (
                            <div>
                                <div className={theme ? "theme-login-header" : "login-header"}>
                                    {theme ? <img src={LogoTheme} alt="" height="30px" /> : <img src={Logo} alt="" height="30px" />}
                                </div>
                                <div className={theme ? "theme-background" : "background"}>
                                    <div className={theme ? "theme-login-section" : "login-section"}>
                                        <h1>Log In</h1>
                                        <div>
                                            <p>Username:</p>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Username"
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h6 className="errorPassUser">{errorText.usernameError}</h6>
                                        </div> <br />
                                        <div>
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
                                            <h6 className="errorPass">{errorText.passwordError}</h6>
                                        </div> <br />
                                        <div>
                                            <h6 className="errorInput">{errorText.WrongInputError}</h6>
                                        </div> <br />
                                        <button type="submit" onClick={login}> Login </button>
                                        {loginStatus ?
                                            <Redirect to="/" />
                                            : <div></div>
                                        }
                                        <div className="dont-have">
                                            <div className="line"></div>
                                            <p>Don't have an account?</p>
                                        </div>
                                        <button className="sign"><NavLink to="/signup" title="Sign Up">Sign Up</NavLink></button>
                                        <NavLink to="/" title="Home"><i className="fas fa-home fa-lg"></i></NavLink>
                                    </div>
                                </div>
                                <div className={theme ? "theme-login-footer" : "login-footer"}>
                                    <p>&#169; Copyright Little Bees 2022, all rights reserved</p>
                                </div>
                            </div>
                        )
                    }
                }
            </ProductConsumer>
        </form>
    )
}

export default Login;