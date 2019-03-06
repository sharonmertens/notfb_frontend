import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {userService} from '../services/user.service.js'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
  }
  logout = () => {
    userService.logout()
    window.location.replace('/login')
  }

  setUser = () => {
    let name = JSON.parse(localStorage.user)
    this.setState({
      user: name.charAt(0).toUpperCase() + name.slice(1)
    })
  }

  componentDidMount() {
    this.setUser()
  }

  render () {

    return (
      <div className="header">
        <div className='nav'>
          <h2>{this.state.user}</h2>
          <Link to='/login' className='link-btn'>Log Out</Link>
        </div>
        <div className='title'>
          <h1>WELCOME TO !FB</h1>
        </div>



      </div>
    )
  }
}

export default Header
