import React, {Component} from 'react'

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'

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
        <Header />
        <NewPost
          handleCreatePost={this.props.handleCreatePost}
        />
        <PostList
          posts={this.props.posts}
          handleCheck={this.handleCheck}
        />
      </div>
    )
  }
}

export default Dashboard
