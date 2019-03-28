import React, {Component} from 'react'
import { Link } from 'react-router-dom';

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'
import Profile from './Profile'

import {userService} from '../services/user.service.js'

let api_url = 'https://notfb.herokuapp.com'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      image: '',
      link: '',
      author: '',
      posts: [],
      newPost: false,
      profile: false,
      user: {},
      users:[]
    }
  }

  // fetch all posts
  fetchPosts = () => {
    fetch(api_url + '/posts')
    .then(data => data.json())
    .then(jData => {
      // console.log(jData)
      this.setState({posts: jData})
    })
  }

  // handles creating the post
  handleCreatePost = (post) => {

    fetch(api_url + '/posts', {
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
      console.log(this.state.posts);

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
    fetch(api_url + `/posts/${post.id}`, {
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
    fetch(api_url + `/posts/${id}`, {
      method: 'DELETE'
    })
    .then(data => {
      this.removeFromArray(currentArray, arrayIndex)
    })
    .catch(err => console.log(err))
  }


  addLikes = (arrayIndex) => {
    console.log(this.state.posts[arrayIndex])
    const newArray = this.state.posts.slice(0)
    newArray[arrayIndex].likes += 1
    this.setState({ posts: newArray })
  }

  addDislikes = (arrayIndex) => {
    const newArray = this.state.posts.slice(0)
    newArray[arrayIndex].dislikes -= 1
    this.setState({ posts: newArray })
  }

  // Sets state of new post
  handleNewPost = () => {
    this.setState({
      newPost: !this.state.newPost
    })
  }

  // PROFILE HANDLERS



  handleProfile = () => {
    this.setState({
      profile: !this.state.profile
    })
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
      <div className='dashboard'>

        <Header />
        {this.state.newPost ?
          <NewPost
            handleNewPost={this.handleNewPost}
            handleCreatePost={this.handleCreatePost}
          />
          :
          <button className='new-post-btn' onClick={this.handleNewPost}>Post</button>
        }
        <PostList
          posts={this.state.posts}
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
          currentArray="posts"
          addLikes={this.addLikes}
          addDislikes={this.addDislikes}
        />
      </div>
    )
  }
}

export default Dashboard
