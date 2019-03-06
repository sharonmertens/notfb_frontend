import React, { Component } from 'react'

import Post from './Post'

class PostList extends Component {
  render () {
    return (
      <div className="post-list">
        
        { this.props.posts ? this.props.posts.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
              arrayIndex={index}
              handleCheck={this.props.handleCheck}
              handleDelete={this.props.handleDelete}
              currentArray="posts"
              addLikes={this.props.addLikes}
              addDislikes={this.props.addDislikes}
            />
          )})
            : '' }
      </div>
    )
  }
}

export default PostList
