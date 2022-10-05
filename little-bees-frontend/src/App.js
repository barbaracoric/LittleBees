import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Section from './components/Section'
import Footer from './components/Footer'
import LogSection from './components/LogSection'
import {DataContext} from './components/Context'


class App extends Component{
  static contextType = DataContext;

  render(){
    const {theme} = this.context;
    return(
      <div className={theme ? "theme-app" : "app"}>
        <Router basename="">
          <Switch>
            <Route path="/login">
              <LogSection />
            </Route>
            <Route path="/signup">
              <LogSection />
            </Route>
            <Route path="/checkout">
              <LogSection />
            </Route>
            <Route path="/">
              <Header />
              <Section />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
