import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Home from './section/Home'
import Pcc from './section/Pcc'
import Psnn from './section/Psnn'
import Xboxx from './section/Xboxx'
import Details_pc from './section/Details_pc'
import Details_psn from './section/Details_psn'
import Details_xbox from './section/Details_xbox'
import About from './section/About'
import Users from './section/Users'
import Postavke from './Postavke'
import Favorite from './section/Favorite'
import Cart from './section/Cart'
import Login from './Login'
import Profile from './Profile'
import Admins from './Admins'
import Register from './Register'
import AddGame from './section/AddGame'
import Checkout from './section/Checkout'
import Sale from './section/Sale'
import New from './section/New'
import DailyDeals from './section/DailyDeals'

export class Section extends Component{
  render(){
    return(
      <div>
      <Route path="/" component={Home} exact />
      <section style={sectionn}>
      <Route path="/pc" component={Pcc} exact />
      <Route path="/pc/:id" component={Details_pc} />
      <Route path="/psn" component={Psnn} exact />
      <Route path="/psn/:id" component={Details_psn} />
      <Route path="/xbox" component={Xboxx} exact />
      <Route path="/xbox/:id" component={Details_xbox} />
      <Route path="/sale" component={Sale} exact />
      <Route path="/new" component={New} exact />
      <Route path="/dailydeals" component={DailyDeals} exact />
      <Route path="/cart" component={Cart} />
      <Route path="/favorite" component={Favorite} />
      <Route path="/addgame" component={AddGame} />
      <Route path="/about-us" component={About} exact />
      <Route path="/users" component={Users} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Register} exact />
      <Route path="/profile" component={Postavke} exact />
      <Route path="/userInfo" component={Profile} exact />
      <Route path="/admins" component={Admins} exact />
      <Route path="/checkout" component={Checkout} />
      </section>
      </div>
    )
  }
}

const sectionn = {
    'width': '76%',
    'maxWidth': '1200px',
    'minHeight': '54vh',
    'margin': 'auto',
    'textAlign': 'center'
}

export default Section