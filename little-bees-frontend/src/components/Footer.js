import React, {Component} from 'react'
import './css/Footer.css'
import {DataContext} from './Context'
import {Link} from 'react-router-dom'


class Footer extends Component {
    static contextType = DataContext;

    render(){
        const {theme} = this.context;

        return(
            <footer className={theme ? "theme-footer" : ""}>
                {/* <div className="footer-main">
                    <div className="footer-top">
                        <div className={theme ? "theme-footer-left" : "footer-left"}>
                            <p>Get in the game</p>
                            <div className={theme ? "theme-social-media" : "social-media"}>
                                <a href="https://www.facebook.com" target="_blank"><i className="fab fa-facebook-square fa-2x"></i></a>
                                <a href="https://www.instagram.com" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
                                <a href="https://www.twitter.com" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
                                <a href="https://www.youtube.com" target="_blank"><i className="fab fa-youtube fa-2x"></i></a>
                                <a href="https://www.linkedin.com" target="_blank"><i className="fab fa-linkedin-in fa-2x"></i></a>
                                <a href="https://www.twitch.com" target="_blank"><i className="fab fa-twitch fa-2x"></i></a>
                            </div>
                        </div>
                        <div className={theme ? "theme-footer-right" : "footer-right"}>
                            <p>We accept</p>
                            <div className="mastercard">
                                <img src={Mc} alt ="" height="30px"/>
                                <img src={Mc1} alt ="" height="30px"/>
                                <img src={Visa} alt ="" height="30px"/>
                                <img src={Payweb} alt ="" height="30px"/>
                                <img src={Diners} alt ="" height="30px"/>
                                <img src={Discover} alt ="" height="30px"/>
                                <img src={Visa1} alt ="" height="30px"/>
                                <img src={Mc2} alt ="" height="30px"/>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className={theme ? "theme-footer-main-bottom" : "footer-main-bottom"}>
                    <div className="footer-main">
                        <div className={theme ? "theme-footer-bottom" : "footer-bottom"}>
                            <p>&#169; Copyright Little Bees 2022, all rights reserved</p>
                            <Link to="/about-us" onClick={()=>{setTimeout(()=>{window.location.reload()},20) }}><span>{window.location.pathname === "/about-us" ? "" : "About us"}</span></Link>
                        </div>    
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer