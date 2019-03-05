import React, {Component} from 'react'
import { Link } from 'react-router-dom';

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'

import {userService} from '../services/user.service.js'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      image: '',
      link: '',
      author: '',
      posts: [],
      users: {},
      users:[]
    }
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
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
      users: {loading: true}
    })
    userService.getAll().then(users => this.setState({users}))
  }


  render() {
    return (
      <div>
        DASHBOARD
        <Link to='/login'>Log Out</Link>
        <Header />
        <NewPost
          handleCreatePost={this.handleCreatePost}
        />
        <PostList
          posts={this.state.posts}
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
          currentArray="posts"
        />
      </div>
    )
  }
}

export default Dashboard
