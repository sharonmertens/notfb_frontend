import React, { Component } from 'react'

class Post extends Component {
  render () {
    return (
      <div className="post">
          {this.props.post.text}
          {this.props.post.image}
          {this.props.post.link}
          {this.props.post.likes}
          {this.props.post.dislikes}
          {this.props.post.author}
      </div>
    )
  }
}

export default Post
