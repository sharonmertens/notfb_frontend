import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {userService} from '../services/user.service.js'

class Header extends Component {
  logout = () => {
    userService.logout()
    window.location.replace('/login')


  }

  render () {
    return (
      <div className="header">
        <button onClick={this.logout}>Log Out</button>
        <h1>WELCOME TO !FB</h1>
      </div>
    )
  }
}

export default Header
