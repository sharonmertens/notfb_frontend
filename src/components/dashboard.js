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
        
        <Header />
        <NewPost
          handleCreatePost={this.props.handleCreatePost}
        />
        <PostList
          posts={this.props.posts}
          handleCheck={this.props.handleCheck}
          handleDelete={this.props.handleDelete}
          currentArray="posts"
          addLikes={this.props.addLikes}
          addDislikes={this.props.addDislikes}
        />
      </div>
    )
  }
}

export default Dashboard
