import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
  render () {
    return (
      <div className="header">
        <Link to='/login'>Log Out</Link>
        <h1>WELCOME TO !FB</h1>
      </div>
    )
  }
}

export default Header
