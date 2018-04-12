import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      submitted: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    fetch('http://localhost:3000/')
    .then( response => {
      console.log(response)
    })
    .catch( error => console.log("ERROR", error))   
  }

  render() {
    return (
      <div>
        <h1>Big Dog Bets</h1>

        <div>
          <button onClick={this.handleClick.bind(this)} type="button">Click</button>
        </div>              
      </div>
    )
  }
}

export default App;
