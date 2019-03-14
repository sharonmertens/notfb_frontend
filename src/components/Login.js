import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {userService} from '../services/user.service.js'


class Login extends Component {
  constructor(props) {
    super(props)

    userService.logout()

    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: '',
      redirect: false
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      submitted: true
    })
    if(!(this.state.username && this.state.password)) {
      return
    }
    this.setState({
      loading: true
    })
    userService.login(this.state.username, this.state.password)
      .then(
        user => {
          const { from } = this.props.location.state || {from: {pathname: '/posts'}}
          this.props.history.push(from)
        },
        error => this.setState({
          error,
          loading: false})
      )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentDidMount(){
    if(userService.loggedIn()) {
      const { from } = this.props.location.state || {from: {pathname: '/posts'}}
      this.props.history.push(from)
    }
  }

  render() {
    return (
      <div>

        <form onSubmit={this.handleSubmit} className='authenticate'>
          <h2>Log In</h2>
          <div className='form-inputs'>
              <label htmlFor="username">Username</label>
              <input type="text" value={this.username} onChange={this.handleChange} id='username'/>
          </div>
          <div className='form-inputs'>
              <label htmlFor="password">Password</label>
              <input type="password" value={this.password} onChange={this.handleChange} id='password'/>
          </div>
          <div className="buttons-container">
              <button className="link-btn">Login</button>
              <Link className='link-btn' to='/register' >Register</Link>
          </div>
        </form>

      </div>

    )
  }
}

export default Login
