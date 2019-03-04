import React, { Component } from 'react'
import Dashboard from './components/dashboard'
import Authentication from './components/authentication'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      text: '',
      image: '',
      link: '',
      author: '',
      posts: []
    }
  }

  // initial get users
  fetchUsers = () => {
    fetch('http://localhost:3000/users')
    .then(data => data.json())
    .then(jData => {
      console.log(jData);
    })
  }

  // fetch all posts
  fetchPosts = () => {
    fetch('http://localhost:3000/posts')
    .then(data => data.json())
    .then(jData => {
      // console.log(jData)
      this.setState({posts: jData})
    })
  }

  // handles creating the post
  handleCreatePost = (post) => {
    console.log(this.state.posts)
    fetch('http://localhost:3000/posts', {
      body: JSON.stringify(post),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdPost => {
      // console.log(createdPost);
      return createdPost.json()
    })
    .then(jData => {
      this.updateArray(jData, 'posts')
      console.log(jData)
    })
    .catch(err => console.log(err))
  }

  // handles updating the post
  handleCheck = (post, arrayIndex) => {
    // console.log(post)
    // console.log(arrayIndex)
    // manipulate the post data

  }


  // update state of array
  updateArray = (post, array) => {
    // console.log(post)
    // console.log(this.props.posts);
    this.setState ( prevState => {
      prevState[array].push(post)
      // console.log(prevState)
      return {
        posts: prevState[array]
      }
    })
  }

  componentDidMount() {
    this.fetchPosts()
  }

  render() {
    return (
      <div className="main-container">
        <h1>!FB Test</h1>
        {/*just a test for fetch users*/}
        <button onClick={this.fetchUsers}>Get Users</button>
        {this.state.loggedIn ?
          <div>
          {/*main dashboard componenets will render in Dashboard.js*/}
            <Dashboard
            posts={this.state.posts} handleCreatePost={this.handleCreatePost}/>
          </div>
          :
          <div>
          {/*authentication page components will render in Authentication.js*/}
            <Authentication/>
          </div>
        }


      </div>
    );
  }
}

export default App;
