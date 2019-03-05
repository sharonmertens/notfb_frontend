import React, {Component} from 'react'

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'

import {userService} from '../services/user.service.js'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // text: '',
      // image: '',
      // link: '',
      // author: '',
      // posts: []
    }
  }



  render() {
    return (
      <div>
        DASHBOARD
        <link to='/login'>Log Out</link>
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
