import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {userService} from '../services/user.service.js'
import NewUser from './NewUser'

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
        <h2>Log In</h2>

        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (this.submitted && !this.username ? ' has-error' : '')}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={this.username} onChange={this.handleChange} id='username'/>
              {this.submitted && !this.username &&
                  <div className="help-block">Username is required</div>
              }
          </div>
          <div className={'form-group' + (this.submitted && !this.password ? ' has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={this.password} onChange={this.handleChange} id='password'/>
              {this.submitted && !this.password &&
                  <div className="help-block">Password is required</div>
              }
          </div>
          <div className="form-group">
              <button className="btn btn-primary" disabled={this.loading}>Login</button>
              {this.loading}
          </div>
          <Link to='/register'>Register</Link>
          {this.error &&
              <div className={'alert alert-danger'}>{this.error}</div>
          }
        </form>

      </div>

    )
  }
}

export default Login
