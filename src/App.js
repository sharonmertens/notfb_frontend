import React, { Component } from 'react'
import Dashboard from './components/dashboard'
import Login from './components/Login'
import NewUser from './components/NewUser'
/////// import authProvider from './authProvider'
import {BrowserRouter as Router, Route} from 'react-router-dom'
//
import {PrivateRoute} from './components/PrivateRoute'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // loggedIn: false,
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
    this.editPost(post, arrayIndex)

  }

  // update state of array
  updateArray = (post, array) => {
    // console.log(post)
    // console.log(this.props.posts);
    this.setState ( prevState => {
      console.log(prevState[array])
      prevState[array].push(post)
      // console.log(prevState)
      return {
        posts: prevState[array]
      }
    })
  }

  // remove a post from array
  removeFromArray = (array, arrayIndex) => {

    this.setState( prevState => {
      console.log(prevState[array])
      prevState[array].splice(arrayIndex, 1)
      return {
        [array]: prevState[array]
      }
    })
  }

  // edit post
  editPost = (post, index) => {
    // console.log(post)
    // console.log(index)
    // console.log(post.id)
    console.log(JSON.stringify(post))
    fetch(`http://localhost:3000/posts/${post.id}`, {
      body: JSON.stringify(post),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedPost => {
      return updatedPost.json()
    })
    .then(jData => {
      // console.log(jData)
      this.fetchPosts()
    })
    .catch(err => console.log(err))
  }

  // delete post
  handleDelete = (id, arrayIndex, currentArray) => {
    console.log(id)
    console.log(arrayIndex)
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE'
    })
    .then(data => {
      this.removeFromArray(currentArray, arrayIndex)
    })
    .catch(err => console.log(err))
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
              posts={this.state.posts}
              handleCreatePost={this.handleCreatePost}
              handleCheck={this.handleCheck}
              handleDelete={this.handleDelete}
            />
          </div>
          :
          <div>
          {/*authentication page components will render in Authentication.js*/}
            <Authentication/>
          </div>
        }

                                <Route path="/login" component={Login} />
                                <Route path='/register' component={NewUser}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
  // render() {
  //   return (
  //     <div className="main-container">
  //       <h1>!FB Test</h1>
  //       {/*just a test for fetch users*/}
  //       <button onClick={this.fetchUsers}>Get Users</button>
  //       {this.state.loggedIn ?
  //         <div>
  //         {/*main dashboard componenets will render in Dashboard.js*/}
  //           <Dashboard
  //           posts={this.state.posts} handleCreatePost={this.handleCreatePost} handleCheck={this.handleCheck}/>
  //         </div>
  //         :
  //         <div>
  //         {/*authentication page components will render in Authentication.js*/}
  //           <Authentication
  //             loginUser={this.loginUser}
  //           />
  //         </div>
  //       }
  //     </div>
  //   );
  // }
}

export default App;
