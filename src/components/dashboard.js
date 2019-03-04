import React, {Component} from 'react'

import Header from './Header'
import NewPost from './NewPost'
import PostList from './PostList'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // text: '',
      // image: '',
      // link: '',
      // author: '',
      posts: []
    }
  }
  // handles creating the post
  handleCreatePost = (post) => {
    console.log(post)
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

  // update state of array
  updateArray = (post, array) => {
    // console.log(post)
    // console.log(array)
    this.setState ( prevState => {
      prevState[array].push(post)
      console.log(prevState)
      return {
        [array]: prevState[array]
      }
    })
  }


  render() {
    return (
      <div>
        DASHBOARD
        <Header />
        <NewPost
          handleCreatePost={this.handleCreatePost}
        />
        <PostList posts={this.props.posts}/>
      </div>
    )
  }
}

export default Dashboard
