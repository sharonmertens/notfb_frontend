import React, {Component} from 'react'
import { Link } from 'react-router-dom';

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'

import {userService} from '../services/user.service.js'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: {},
      users:[]
    }
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
      users: {loading: true}
    })
    userService.getAll().then(users => this.setState({users}))
  }


  render() {
    return (
      <div>
        DASHBOARD
        <Link to='/login'>Log Out</Link>
        <Header />
        <NewPost
          handleCreatePost={this.props.handleCreatePost}
        />
        <PostList
          posts={this.props.posts}
          handleCheck={this.props.handleCheck}
        />
      </div>
    )
  }
}

export default Dashboard
