import React, {Component} from 'react'

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'

class Dashboard extends Component {
  render() {
    return (
      <div>
        DASHBOARD
        <Header />
        <NewPost />
        <PostList />
      </div>
    )
  }
}

export default Dashboard
