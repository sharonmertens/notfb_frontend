import React, { Component } from 'react'

import NewPost from './NewPost'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // sets show or edit state
      static: true,
      text: '',
      image: '',
      link: '',
      author: ''
    }
  }

  // changes static state to render show or edit components
  changeStaticState = () => {
    this.setState({
      static: !this.state.static
    })
  }

  componentDidMount() {
    if(this.props.updatedPost) {
      this.setState({
        static: true
      })
    }
  }

  render () {
    return (
      <div className="post">
      {/* check static state */}
      { this.state.static ?
        <div className="post-show">
        { /* if static state is true, show the 'show' state post */ }
        <h3>{this.props.post.text}</h3>
        <h3>{this.props.post.image}</h3>
        <h3>{this.props.post.link}</h3>
        <h3>{this.props.post.likes}</h3>
        <h3>{this.props.post.dislikes}</h3>
        <h3>{this.props.post.author}</h3>
        { /* button click changes static state to false to show edit component */ }
        <button onClick={this.changeStaticState}>Edit Post</button>
        </div> :

        // if static state is false, show the edit component

        <div className="post-edit">
          <NewPost
            post={this.props.post}
            handleCheck={this.props.handleCheck}
            arrayIndex={this.props.arrayIndex}
            changeStaticState={this.changeStaticState}
          />
        </div>
      }
      </div>
    )
  }
}

export default Post
