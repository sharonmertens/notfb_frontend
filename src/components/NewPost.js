import React, { Component } from 'react'


class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      image: '',
      link: '',
      likes: 0,
      dislikes: 0,
      author: '',
      // variable to identify if the form is being used to add a new post or edit an existing post
      submit: 'Add'
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
    // console.log(this.state)
    if (this.state.submit === 'Add') {
    this.props.handleCreatePost(this.state)
    this.props.handleNewPost()
    this.clearForm()
  } else {
    console.log(this.props.arrayIndex)
    let updatedPost = {
      id: this.props.post.id,
      text: this.state.text,
      image: this.state.image,
      link: this.state.link,
      likes: this.props.post.likes,
      dislikes: this.props.post.dislikes,
      author: this.state.author
    }
    // send data to handleCheck to update post details
    this.props.handleCheck(updatedPost, this.props.arrayIndex, 'posts')
    // change static state to revert to show state
    this.props.changeStaticState()
  }
}

  // clear the form
  clearForm = () => {
    this.setState({
      text: 'Text',
      image: 'Image',
      link: 'Link',
      author: 'Author',
      submit: 'Add'
    })
  }

  // check if the form is for editing existing element
  checkIfEditing = () => {
    // if there is a post being sent to the form
    if (this.props.post) {
      // set the state
      this.setState({
        // pull the values in from teh details to display as placeholder so you know what you are editing
        text: this.props.post.text,
        image: this.props.post.image,
        link: this.props.post.link,
        author: this.props.post.author,
        submit: 'Update'
      })
    }
  }

  // check if the form is being called by an editing request
  componentDidMount() {
    this.checkIfEditing()
  }

  render () {
    return (
      <div className="new-post">

      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="post text"
          value={this.state.text}
          onChange={this.handleChange}
          id="text"
        />
        <br/>
        <input
          type="text"
          placeholder="image source"
          value={this.state.image}
          onChange={this.handleChange}
          id="image"
        />
        <br/>
        <input
          type="text"
          placeholder="url"
          value={this.state.link}
          onChange={this.handleChange}
          id="link"
        />
        <br/>
        <input
          type="text"
          placeholder="author"
          value={this.state.author}
          onChange={this.handleChange}
          id="author"
        />
        <br/>
        <button onClick={this.props.handleNewPost}>Cancel</button>
        <button type="submit">{this.state.submit}</button>
      </form>
      </div>
    )
  }
}

export default NewPost
