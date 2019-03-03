import React, { Component } from 'react'

import Post from './Post'

class PostList extends Component {
  render () {
    return (
      <div className="post-list">
        this is the post list component
        { this.props.posts ? this.props.posts.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
            />
          )})
            : '' }
      </div>
    )
  }
}

export default PostList
