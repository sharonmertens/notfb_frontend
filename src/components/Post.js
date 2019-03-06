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
        <img className="image-link" src={this.props.post.image}/>
        <br/>
        <a href={this.props.post.link}>{this.props.post.link}</a>
        <div className="likes">
          <div className="likes-only">
            <p className="numbers">{this.props.post.likes}</p>
            <img src="/images/cuteface.png" className="cute" onClick={() => this.props.addLikes(this.props.arrayIndex)}/>
          </div>
          <div className="dislikes-only">
            <p className="numbers">{this.props.post.dislikes}</p>
            <img src="/images/angryface.png" className="angry" onClick={() => this.props.addDislikes(this.props.arrayIndex)}/>
          </div>
        </div>
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
