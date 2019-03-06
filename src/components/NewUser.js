import React, {Component} from 'react'
import { Link } from 'react-router-dom';


import {userService} from '../services/user.service.js'
import {Route, Redirect} from 'react-router-dom'

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

    if(this.state.username && this.state.password) {
      let user = {
        username: this.state.username,
        password: this.state.password
      }
      userService.register(user)
      this.setState({
        submited: true
      })
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
      {this.state.submited === true ?
        <Redirect to='/login'/>
        :
        <div>
          <h2>Create User</h2>
          <form onSubmit={this.handleSubmit} className='authenticate'>
            <div className='form-inputs'>
                <label htmlFor="username">Username</label>
                <input type="text" value={this.username} onChange={this.handleChange} id='username'/>
            </div>
            <div className='form-inputs'>
                <label htmlFor="password">Password</label>
                <input type="password" value={this.password} onChange={this.handleChange} id='password'/>
            </div>
            <div className="buttons-container">
                <button type='submit' className="link-btn">Submit</button>
                <Link className='link-btn' to='/login' >Login</Link>
            </div>
          </form>
        </div>
      }

      </div>

    )
  }
}

export default NewUser
