import React, { Component } from 'react'

class Post extends Component {
  render () {
    return (
      <div className="post">
          <h3>{this.props.post.text}</h3>
          <h3>{this.props.post.image}</h3>
          <h3>{this.props.post.link}</h3>
          <h3>{this.props.post.likes}</h3>
          <h3>{this.props.post.dislikes}</h3>
          <h3>{this.props.post.author}</h3>
          <button onClick={() => {this.props.handleCheck(this.props.post, this.props.arrayIndex)}}>Edit Post</button>
      </div>
    )
  }
}

export default Post
