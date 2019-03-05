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
        <h1 className="author">{this.props.post.author}</h1>
        <h3 className="text">{this.props.post.text}</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7B2p2QIS4skzZZ9nEPtnhHsusf31V-NcI6WZ_nbfSbEcRqQH"/>
        <br/>
        <a href="{this.props.post.link}">{this.props.post.link}</a>
        <h3 onClick={() => this.props.addLikes(this.props.arrayIndex)}>{this.props.post.likes}</h3>
        <h3 onClick={() => this.props.addDislikes(this.props.arrayIndex)}>{this.props.post.dislikes}</h3>
        { /* button click changes static state to false to show edit component */ }
        <button onClick={this.changeStaticState}>Edit Post</button>
        <button onClick={() => this.props.handleDelete(this.props.post.id, this.props.arrayIndex, this.props.currentArray)}>Delete Post</button>
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
