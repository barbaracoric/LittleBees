import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Logo from './img/logoo.png'
import LogoTheme from './img/logoo.png'
import Gs from './img/logoo2.png'
import GsTheme from './img/logoo2.png'
import './css/Header.css'
import {DataContext} from './Context'
import NamesContainer from './NamesContainer'
import Axios from 'axios'

class Header extends Component{
  static contextType = DataContext;

  state = {
    toggle: false,
    loggedIn: false,
    currentUser: {},
    toggleLogin: false,
    toggleSearch: false,
    iconSearch: false,
    gameNames: [
    ],
    searchTerm: '',
    cartClass: "",
    favoriteClass: ""
  }
  
  menuToggle = () => {
    this.setState({toggle: !this.state.toggle})
  }
  componentDidMount() {
    Axios.defaults.withCredentials = true;
    Axios.get("http://localhost:3001/login", {
      headers: { "x-access-token": localStorage.getItem("token") }
    }).then((response) => {
      if (response.data.loggedIn === true) {
        this.setState({ 
        loggedIn: response.data.loggedIn,
        currentUser: response.data.userInfo,
        Authority : response.data.role_name,
       });
      }

    });
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      toggle: false,
      loggedIn: false,
      currentUser: {}
    })
  }
  



  menuToggleLogin = () => {
    this.setState({toggleLogin: !this.state.toggleLogin})
  }

  menuToggleSearch = () => {
    this.setState({toggleSearch: !this.state.toggleSearch})
  }

  menuIconSearch = (e) => {
    this.setState({iconSearch: !this.state.iconSearch})
  }

  editSearchTerm = (e) => {
      this.setState({searchTerm: e.target.value})
  }

  dynamicSearch = () => {
      return this.state.gameNames.filter(gameName => gameName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  render(){
    const {toggle,loggedIn,currentUser, Authority,toggleLogin, toggleSearch, iconSearch} = this.state;
    const {cart, theme, changeTheme, headerMargin, changeHeaderMargin} = this.context;

    return(
      <header className={"" + (theme ? "theme " : "") + (headerMargin ? "header-margin " : "header-margin-false ")}>
        <div className={theme ? "theme-menu" : "menu"} >
          <i className="fas fa-bars fa-lg" onClick={this.menuToggle}></i>
          <i className="fas fa-adjust fa-lg" onClick={() => changeTheme()}></i>
        </div>
        <div className="logo">
        <Link to="/" title="THE GAME SHOP">
          {theme ? <img src={LogoTheme} alt=""/> : <img src={Logo} alt=""/>}
        </Link>
        </div>
        {/* <div className={theme ? "theme-welcome" : "welcome"} >
          <p>Prirodni proizvodi</p>
          <p> | </p>
          <span title="Change theme" onClick={() => changeTheme()}>Promjeni temu</span>
        </div> */}
        <div className={theme ? "theme-user-login" : "user-login"}>      
          <div className="admins">
            <Link to={loggedIn && Authority==="SuperAdmin"  ? "/admins" : "/" } >{loggedIn && Authority==="SuperAdmin"  ? 'Admins |' : ''}</Link>
            
            <Link to={loggedIn && Authority==="SuperAdmin" || Authority==="Admin" ? "/users" : "/" } >{loggedIn && Authority==="SuperAdmin" || Authority==="Admin" ? 'Users' : ''}</Link>
          </div>
          <div className="login">
            <Link to={loggedIn ? "/userInfo" : "/signup"} >{loggedIn ? currentUser.username : 'Registriraj se'}</Link>
            <p className="paragraf">|</p>
            <Link to="/login" onClick = {loggedIn ? this.logout : () => { }}>{loggedIn ? 'Odjavi se' : 'Prijavi se'}</Link>
          </div>
        </div>
          <nav className={theme ? "theme-nav" : ""}>
            <ul className={toggle ? "toggle" : ""}>
              <li><Link to="/pc" title="PC" onClick={()=>{
                setTimeout(() =>{
                  window.location.reload();
                }, 50)
              }}><i className="fas fa-desktop fa-lg"></i>MED</Link></li>
              <li><Link to="/psn" title="PSN" onClick={()=>{
                setTimeout(() =>{
                  window.location.reload();
                }, 50)
              }}><i className="fab fa-playstation fa-lg"></i>KREME</Link></li>
              <li><Link to="/xbox" title="XBOX" onClick={()=>{
                setTimeout(() =>{
                  window.location.reload();
                }, 50)
              }}><i className="fab fa-xbox fa-lg"></i>SAPUNI</Link></li>
              <li><Link to="/" title="THE GAME SHOP">{theme ? <img src={GsTheme} alt="" width="100"/> : <img src={Gs} alt="" width="100"/>}</Link></li>
              <li><Link to="/sale" title="SALE"><i className="fas fa-percent fa-lg"></i>POPUST</Link></li>
              <li><Link to="/new" title="NEW"><i className="fas fa-tag fa-lg"></i>NOVO</Link></li>
              <li><Link to="/dailydeals" title="DAILY DEALS"><i className="fab fa-hotjar fa-lg"></i> <span className="red">PONUDE</span></Link></li>
              <li className="close" onClick={this.menuToggle}><i className="fas fa-times fa-2x"></i></li>
            </ul>
          </nav>
          <div className={theme ? "theme-i" : "nav-right"}>
            <div className={theme ? "theme-search-part" : "search-part"}>
              <div onClick={() => changeHeaderMargin()}>
                <i onClick={this.menuIconSearch}>
                  {iconSearch ? "" : <i className="fas fa-search fa-lg" title="Search" onClick={this.menuToggleSearch}></i>}
                </i>
              </div>
              <div className={toggleSearch ? "toggle-search" : "toggle-search-false fontAwesome"}>
                <div className="search-div"><input type="text" value={this.state.searchTerm} onChange={this.editSearchTerm} placeholder="&#xF002;  Search" /></div>
                <div className="search-right">
                  <div className="ikss" onClick={() => {this.menuToggleSearch() ; changeHeaderMargin()}}>
                    <i className="fas fa-times" onClick={this.menuIconSearch}>
                      {iconSearch ? "" : <i className="fas fa-search fa-lg" title="Search" onClick={this.menuToggleSearch}></i>}
                    </i>
                  </div>
                  <div className="search-enter"><i className="fas fa-search fa-lg"></i></div>
                </div>
              </div>
              <h3></h3>
              <NamesContainer gameNames = {this.dynamicSearch()}/>
            </div>
            <Link to="/favorite" title="Favorite"><i className="far fa-heart fa-lg"></i></Link>
            <Link to="/cart" title="Cart" className={cart.length ? "red-circle" : "redd"}><i className="fas fa-shopping-cart fa-lg"></i><span>{cart.length}</span></Link>
            <div className="user-mobile" title="Profile"><i className="fas fa-user fa-lg" onClick={this.menuToggleLogin}></i></div>
          </div>
        <div className="tgs">
          <Link to="/" title="THE GAME SHOP">
            {theme ? <img src={GsTheme} alt="" width="80"/> : <img src={Gs} alt="" width="80"/>}
          </Link>
        </div>
        <div className={toggleLogin ? "toggle-login" : "toggle-login-false"}>
          {/* <div className="input-first">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-second">
            <input type="password" placeholder="Password" required />
          </div>
          <input className="header-log" type="submit" value="Login"/>
          <div className="dont-have">
              <div className="line"></div>
              <p>Don't have an account?</p>
          </div>
          <input className="header-sign" type="submit" value="Sign Up"/> */}
          <div className={theme ? "theme-profile-side" : "profile-side"}>
            <Link to="/userInfo" className="user-side" title="Profile"><i className="fas fa-user fa-lg"></i>Profil</Link>
            <Link to="/users" className="users-side" title="Users"><i class="fas fa-users fa-lg"></i>Korisnici</Link>
            <Link to="/favorite" className="heart-side" title="Favorite"><i className="fas fa-heart fa-lg"></i>Omiljeno</Link>
            <Link to="/cart" title="Cart" className={cart.length ? "red-circle" : "redd cart-side"}><i className="fas fa-shopping-cart fa-lg"></i>Košarica<span>{cart.length}</span></Link>
            <div className="logout-side" title="Logout"><i class="fas fa-sign-out-alt fa-lg"></i>Odjavi se</div>
            </div>
          <div><i className="fas fa-times fa-2x close-log" onClick={this.menuToggleLogin}></i></div>
        </div>
      </header>
    )
  }
}

export default Header;