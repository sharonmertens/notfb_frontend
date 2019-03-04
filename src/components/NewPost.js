import React, { Component } from 'react'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Text',
      image: 'Image',
      link: 'Link',
      likes: 0,
      dislikes: 0,
      author: 'Author',
      // posts: []
    }
  }

  // handle change
  handleChange = (event) => {
    // console.log(event.target.value)
    this.setState({ [event.target.id]: event.target.value })
    // console.log(this.state)
  }

  // handle submit
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
    this.props.handleCreatePost(this.state)
    // const newPost = {
    //   text: this.state.text,
    //   image: this.state.image,
    //   link: this.state.link,
    //   author: this.state.author
    // }
    // const newPostArray = [newPost, ...this.state.posts.post]
    // this.setState({
    //   posts: {post: newPostArray},
    //   text: '',
    //   image: '',
    //   link: '',
    //   author: ''
    // })
    this.clearForm()
  }

  // clear the form
  clearForm = () => {
    this.setState({
      text: '',
      image: '',
      link: '',
      author: ''
    })
  }

  render () {
    return (
      <div className="new-post">
      this is the new post component
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="text"
          value={this.state.text}
          onChange={this.handleChange}
          id="text"
        />
        <input
          type="text"
          placeholder="image"
          value={this.state.image}
          onChange={this.handleChange}
          id="image"
        />
        <input
          type="text"
          placeholder="link"
          value={this.state.link}
          onChange={this.handleChange}
          id="link"
        />
        <input
          type="text"
          placeholder="author"
          value={this.state.author}
          onChange={this.handleChange}
          id="author"
        />
        <input type="submit" />
      </form>
      </div>
    )
  }
}

export default NewPost
