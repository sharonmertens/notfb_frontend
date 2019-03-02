import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props)
  }

  fetchTasks = () => {
    fetch('http://localhost:3000/users')
    .then(data => data.json())
    .then(jData => {
      console.log(jData);
    })
  }

  render() {
    return (
      <div className="main-container">
        <h1>!FB Test</h1>
        <button onClick={this.fetchTasks}>Get Users</button>
      </div>
    );
  }
}

export default App;
