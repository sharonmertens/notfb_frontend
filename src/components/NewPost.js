import React, { Component } from 'react'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyed_item: ''
    }
  }

  // handle change
  handleChange = (e) => {
    this.setState({ keyed_item: e.target.value })
  }

  // handle submit
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.clearForm()
  }

  // clear the form
  clearForm = () => {
    this.setState({ keyed_item: '' })
  }

  render () {
    return (
      <div className="new-post">
      this is the new post component
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="text"
          value={this.props.keyed_item}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="image"
          value={this.props.keyed_item}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="link"
          value={this.props.keyed_item}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="author"
          value={this.props.keyed_item}
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
      </div>
    )
  }
}

export default NewPost
