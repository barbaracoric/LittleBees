import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Checkout from './section/Checkout'

class Log extends Component {
    render(){
        return(
            <section>
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={Register} exact />
                <Route path="/checkout" component={Checkout} exact />
                <Route path="/userInfo" component={Profile} exact />
            </section>
        )
    }
}

export default Log