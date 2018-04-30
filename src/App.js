import React from 'react';
import './App.css';
import { Row } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import Timers from './timer.js';
import DogSelect from"./Dog.js";
import BetSelect from "./Bet.js";

var API = "http://localhost:8000"

class DisplayWinLoss extends React.Component{
	render(){
		return(<div className='Row'><p id='wins' className='disp text-center col-12'>Wins: {this.props.wins}</p><p id='losses' className='disp text-center col-12'>Losses: {this.props.losses}</p></div>)
	}
}

class SubmitBet extends React.Component{
	constructor(props){
		super(props)
		this.state={submittedBet: null}
		this.handleBetEntry=this.handleBetEntry.bind(this)

	}
	handleBetEntry(event){
		event.preventDefault()
		this.setState({submittedBet:this.refs.in.value})
		this.props.onBetEntry(this.refs.in.value)
		document.getElementById("bet").value=""

	}
	render(){
		return(<div className='col-12'><form className="col-12" onSubmit={e => e.preventDefault()}><div><p className='prompt text-center mt0'>Enter the amount you wish to bet: </p></div><div><input id='bet' className="center-block" type='text' ref='in'></input></div></form><div className='col-12 '><button disabled={this.props.disable} className='center-block mt-15 box ' onClick={this.handleBetEntry}>Submit</button></div></div>)
	}

}

class MoneyDisplay extends React.Component{
	render(){
		return (<p id='money' className=' text-center val disp'>Money Available: ${this.props.money}</p>)
	}
}


changeDogPicture(){

	this.setState({imgurl: 'http://via.placeholder.com/350x350',
				   submitted: false,
				  displayed:"Currently displayed breed: None", disable:false, messg:""})
}



/*
* param win: boolean value that is true if the person won
* param amountBet: amount of money the user bet
* param multipier: integer value for the odds, for example if odds were 1:81, multipler = 81
*/
updateDataBase(win, amountBet, multiplier){
	var msg=""
	if(win){
		amountBet = amountBet * multiplier
		msg="Congratulations! You won $"+amountBet+"!"

	}else{
		amountBet = amountBet * -1
		msg="Incorrect! You lost $"+amountBet*-1+"!"
	}

	fetch(API + "/update/"+this.state.id+"&"+amountBet)
      	.then(resp =>{
      		var json = resp.json()
      		return json
      	}).then( json =>{
			var currmon = json["money"]
			var losses = json["losses"]
			var wins = json["wins"]
			this.setState({currmon: currmon,
						   wins: wins,
						   losses: losses,
						   messg:msg
						   })
			console.log(json)
      	}).catch(error => console.log("ERROR", error))
}
handleBetSubmitted(o){
	console.log(this.state.loadedbreed)
	console.log(this.state.selectedBreed)
	console.log(o)
	if(o<1){
		this.setState({disable:false})
		alert('You must enter a bet of at least 1$')
		return
	}
	if(this.state.currmon<o){
		this.setState({disable:false})
		alert("Insufficient funds")
		return
	}
	if(this.state.selectedBreed==="" || this.state.selectedBreed==="--select breed--"){
		this.setState({disable:false})
		alert('Please select a breed to bet on')
		return
	}
	var mult=0
	if(this.state.type==='All breeds'){
		this.setState({odds:"Odds of winning: 1:81 (x10 payout)"})
		mult=10
	}else if (this.state.type==='Hound breeds'){
		this.setState({odds:"Odds of winning: 1:6 (x3 payout)"})
		mult=3
	}else if (this.state.type==='Spaniel breeds'){
		this.setState({odds:"Odds of winning: 1:7 (x4 payout)"})
		mult=4
	}else if (this.state.type==='Bulldog breeds'){
		this.setState({odds:"Odds of winning: 1:2 (x2 payout)"})
		mult=2
	}

	this.setState({imgurl:this.state.tempurl,displayed:"Currently displayed breed: "+this.state.loadedbreed, submitted: true, disable:true})
	if(this.state.loadedbreed===this.state.selectedBreed){
		this.updateDataBase(true, o, mult)
	}else{
		this.updateDataBase(false, o, mult)
		if(this.state.currmon<o*mult){
				alert('You lost all your money. Reset back to 500.')
			}
	}
	this.handleSelectedChange(this.state.selectedBreed)
	}

	render(){
   		if(this.state.loggedIn){
			return (<Container-fluid>
						<Timers changeDogPicture={this.changeDogPicture.bind(this)} submit={this.state.submitted}/>
						<Row className="col-12">
						<div className='col-2'></div>
						<div className="col-8 val" >
							<h1 className="text-center heading" >Welcome to Big Dog Bets{'\n'+this.state.name}!</h1>
						<Row>
							<div className="col-12 "><p className=" currbreed text-center">{this.state.displayed+'\n'+this.state.messg}</p></div>
							<img className="img-responsive center-block" src={this.state.imgurl} alt="dog"/>
							<BetSelect onSelected={this.handleSelectedChange} onBetSelected={this.handleSelectedBet}/>
							<div className='col-12'><p className='prompt text-center mb10'>{this.state.odds}</p></div>
							<SubmitBet disable={this.state.disable} onBetEntry={this.handleBetSubmitted}/>
						</Row>
						</div>
						<div className='col-2 val '>
						<div className='bord'>
						<div className='Row'>
						<MoneyDisplay money={this.state.currmon}/></div>
						<DisplayWinLoss wins={this.state.wins} losses={this.state.losses}/></div>
						</div>
						</Row>
					</Container-fluid>)
		}else{
			return(
					<div>
						<h1 id="signInHeader">Please Sign In With Google To Begin</h1>
						<h1 className="loginheading text-center"> Big Dog Bets</h1>
						<h2 className="subheading text-center"> The best place to bet on random images of dogs.</h2>

						<GoogleLogin
						    className = "Google signin"
						    id = "Google"
						    clientId="954169837234-2sjs0c5ie2vg5use5oaigjouudqr2k8o.apps.googleusercontent.com"
						    buttonText="Sign in with Google"

						    onSuccess={this.responseGoogle}
						    onFailure={this.responseGoogle}
						  />
					</div>
				)
		}
	}
}

export default DogDisplay;
