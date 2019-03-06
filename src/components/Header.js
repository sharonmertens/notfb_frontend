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
<<<<<<< HEAD

        <Link to='/login'>Log Out</Link>
        <h1>WELCOME TO !FB</h1>

=======
        <button onClick={this.logout}>Log Out</button>
        <h1>WELCOME TO !FB</h1>
        <h2>{this.state.user}</h2>
>>>>>>> c7be8be5ff2e8e7ed7cd1fbcefaf819c92291046
      </div>
    )
  }
}

export default Header
