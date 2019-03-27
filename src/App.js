import React, { Component } from 'react'
import Dashboard from './components/dashboard'
import Login from './components/Login'
import NewUser from './components/NewUser'
/////// import authProvider from './authProvider'
import {BrowserRouter as Router, Route} from 'react-router-dom'
//
import {PrivateRoute} from './components/PrivateRoute'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // loggedIn: false,
      // text: '',
      // image: '',
      // link: '',
      // author: '',
      // posts: []
    }
  }

  // initial get users
  fetchUsers = () => {
    fetch('https://notfb.herokuapp.com/users')
    .then(data => data.json())
    .then(jData => {
      console.log(jData);
    })
  }

  render() {
    return (
      <div className="jumbotron">
        <Router>
            <div>
                <PrivateRoute exact path="/posts" component={Dashboard}
                handleCreatePost={this.handleCreatePost}
                posts={this.state.posts}
                handleCheck={this.handleCheck}
                 />
                <Route path="/login" component={Login} />
                <Route path='/register' component={NewUser}/>
            </div>
        </Router>
      </div>
      );
    }
}

export default App;
