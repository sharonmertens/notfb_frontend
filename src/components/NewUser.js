import React, {Component} from 'react'
import { Link } from 'react-router-dom';

import {userService} from '../services/user.service.js'
import {Redirect} from 'react-router-dom'

class NewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      submited: true
    })
    if(this.state.username && this.state.password) {
      let user = {
        username: this.state.username,
        password: this.state.password
      }
      userService.register(user)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Create User</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={this.state.username}
            onChange={this.handleChange} />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={this.state.password}
            onChange={this.handleChange}/>
          <input type='submit'/>
        </form>
      </div>

    )
  }
}

export default NewUser
