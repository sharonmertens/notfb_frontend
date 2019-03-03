import React, { Component } from 'react'
import Dashboard from './components/dashboard'
import Authentication from './components/authentication'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true
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
      console.log(jData)
      this.setState({posts: jData})
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
            <Dashboard posts={this.state.posts}/>
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
