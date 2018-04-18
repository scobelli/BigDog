import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
 
class Timers extends Component {
  /* delay is just the delay on showing the update of the timer */
	 constructor(){
	    super();
	    
	    this.state = {
	       timer: null,
	       counter: 0,
	       picture: 0
	  	};

	  	this.tick = this.tick.bind(this)
	  }

	componentDidMount() {
	    let timer = setInterval(this.tick, 1000);
	    this.setState({timer: timer});
	  }


	componentWillUnmount() {
	    this.clearInterval(this.state.timer);
	  }

	tick() {

		var time = this.state.counter + 1
	    this.setState({
	      counter: time
	    })

	    if(this.props.submit){
	    	this.setState({
	      		picture: this.state.picture + 1
	    	})

	    	if(this.state.picture==4){
	    		this.setState({
	      			picture: 0
	    		})

	    		this.props.changeDogPicture()
	    	}
	    }


	  }

	render() {
	  return (
	  	<div></div>
	  	)
	}
}

export default Timers;