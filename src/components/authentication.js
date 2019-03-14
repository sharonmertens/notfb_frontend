import React, { Component } from 'react'
import Login from './Login'
import NewUser from './NewUser'
// import {PrivateRoute} from './components/PrivateRoute'

import Dashboard from './dashboard'

class Authentication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'login'
    }
  }

  setAuthType = (type) => {
    if(type === 'login') {
      this.setState({
        type: 'login'
      })
    } else if (type === 'newuser') {
      this.setState({
        type: 'newuser'
      })
    } else {
      this.setState({
        type: 'none'
      })
    }
  }

  render() {
    return (
      <div>
        <h1>WELCOME TO !FB</h1>
        <button onClick={() => {this.setAuthType('newuser')}}>Create User</button>
        <button onClick={() => {this.setAuthType('login')}}>Login In</button>
        {this.state.type === 'newuser' ?
          <NewUser
            setAuthType={this.setAuthType}
          />
          :
          ''}
        {this.state.type === 'login' ?
          <Login
            loginUser={this.props.loginUser}
            PrivateRoute exact path='/' component={Dashboard}
            />
          : ''}
      </div>
    )
  }

}

export default Authentication
