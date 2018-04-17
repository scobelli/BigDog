import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import ReactDOM from 'react-dom';

var SERVER_URL = "http://localhost:8000/"

class DisplayWinLoss extends React.Component{
	constructor(props){
		super(props)
	}
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
		return(<div className='col-12'><form className="col-12" onSubmit={e => e.preventDefault()}><div><p className='prompt text-center'>Enter the amount you wish to bet: </p></div><div><input id='bet' className="center-block" type='text' ref='in'></input></div></form><div className='col-12 '><button className='center-block mt-15 box ' onClick={this.handleBetEntry}>Submit</button></div></div>)
	}

}

class MoneyDisplay extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (<p id='money' className=' text-center val disp'>Money Available: ${this.props.money}</p>)
	}
}

class OddsDisplay extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (<div className='col-12'><p className='prompt text-center'>Odds of winning: 1:81</p></div>)
	}
}

class BreedSelect extends React.Component{
	constructor(props){
		super(props)
		this.state={options:[], selectedBreed:[]}
		this.handleBreedSelect =this.handleBreedSelect.bind(this)
	}
	componentDidMount(){
		fetch('https://dog.ceo/api/breeds/list')
      .then(result=>result.json())
      .then(breeds=>this.setState({breeds: breeds.message.map(u=>u.substr(0,1).toUpperCase()+u.substr(1,u.length))}))
      .then(res=>{ if (this.state.breeds.length === 0)
      this.setState({options: <option value="loading" key="loading">loading...</option>})
    else {

      this.setState({options: ['--select breed--'].concat(this.state.breeds)
        .map(b=>
            <option value={b} key={b}>{b}</option>
          )})
	console.log(this.state.options[1])
     
    }})
      .catch(err=>console.log("Couldn't fetch dog breeds", err))
	}
	handleBreedSelect(event){
		this.setState({selectedBreed:event.target.value})
		this.props.onSelected(event.target.value)

	}
	render(){
		return(<div className='col-12 text-center'><h2 className="prompt">Select which breed you think will appear:</h2><div className='col-12 breeds'><select id='bselect' className='box'  onChange={this.handleBreedSelect}>{this.state.options}</select></div></div>)

	}
}

class DogDisplay extends React.Component{
	constructor(props){
		super(props)		
		this.placeholderurl = 'http://via.placeholder.com/350x350'
    	this.state = { loadedbreed:"", 
    				   currmon:500, 
    				   displayed:"Currently displayed breed: None", 
    				   breeds:[], 
    				   selectedBreed:"--select breed--", 
    				   imgurl: this.placeholderurl, 
    				   tempurl:"", 
    				   wins:0, 
    				   losses:0,
    				   loggedIn: false,
    				   name: "",
    				   id: ""}
    	this.handleSelectedChange=this.handleSelectedChange.bind(this)
    	this.handleBetSubmitted= this.handleBetSubmitted.bind(this)
    	this.handleGoogleInfomation = this.handleGoogleInfomation.bind(this)
	}

	componentDidMount(){    
		const responseGoogle = (response) => {      
		  var token = response.Zi.id_token;      
		  fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token )
		  .then(jsonResponse => {
		    var json = jsonResponse.json()
		    return json
		  }).then(json => {	
		    var id = json["email"].substr(0, json["email"].indexOf('@')) //returns user id created by google      
		    var name = json["name"]
		    this.handleGoogleInfomation(id, name)
		})
		.catch( error => console.log("ERROR", error))       
		}

		ReactDOM.render(
		  <GoogleLogin
		    className = "Google"
		    id = "Google"
		    clientId="954169837234-2sjs0c5ie2vg5use5oaigjouudqr2k8o.apps.googleusercontent.com"
		    buttonText="Sign in with Google"
		    onSuccess={responseGoogle}
		    onFailure={responseGoogle}
		  />,
		  document.getElementById('googleButton')
		);
	}

	handleGoogleInfomation(id, name){		
		fetch("http://localhost:8000/login/"+id)
		.then(jsonResponse => {
			var json = jsonResponse.json()
			return json
		}).then(json => {
			console.log(json)
			var currmon = json["money"]
			var losses = json["losses"]
			var wins = json["wins"]
			this.setState({currmon: currmon, 
						   wins: wins,
						   losses: losses,
						   name: name,
						   loggedIn: true,
						   id: id
						   })		    	    
		})
		.catch( error => console.log("ERROR", error))       
	}

	httpGetAsynchronous(theUrl, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
		  if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
		    callback(xmlHttp.responseText);
		  } else if (xmlHttp.readyState === 4) {
		    console.log("SOMETHING WENT WRONG: Server gave bad response")
		    console.log(xmlHttp);
		  }
		};
		xmlHttp.open("GET", theUrl, true); // true for asynchronous request
		xmlHttp.send(null);
	}	
	
	handleSelectedChange(event){
		console.log(event)		
	}

	handleBetSubmitted(event){
		var bselect= document.getElementById('bselect')
		if(bselect.options[bselect.selectedIndex].value!=='--select breed--'){
		 fetch('https://dog.ceo/api/breeds/image/random')
        .then(resp => resp.json())
        .then(jresp => {
          if (jresp.status === "success"){
          	console.log(jresp)
          	var temp= jresp.message.split('/')
		var t2= temp[4]
		temp[4]=temp[4].split('-')
		if(temp[4].length>1){
			temp[4]=temp[4][0]+ " ("+temp[4][1].substr(0,1).toUpperCase()+temp[4][1].substr(1,temp[4][1].length)+")"
		}else{
		temp[4]=t2
		}
		

        console.log(temp)
        this.setState({loadedbreed:temp[4].substr(0,1).toUpperCase()+temp[4].substr(1,temp[4].length),tempurl:jresp.message})

		if(event!='' && event>0 && bselect.options[bselect.selectedIndex].value!=='--select breed--'){
		console.log(this.state.currmon)
		if(event<=this.state.currmon){
		this.setState({imgurl:this.state.tempurl, displayed:"Currently displayed breed: "+this.state.loadedbreed})
		console.log(bselect.options[bselect.selectedIndex].value)
		console.log(this.state.loadedbreed)

		if(bselect.options[bselect.selectedIndex].value==this.state.loadedbreed.split(" ")[0]){
			event = event*10   			
		}else{
			event = event*-1
		}
		
		fetch(SERVER_URL+"update/"+this.state.id+"&"+event)
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
							   })
				console.log(json)        		
        	}).catch(error => console.log("ERROR", error))
		
		//update loss/win/money on frontend after changing it in backend		
	}
		else{
			alert("Insufficient funds!")
		}
	}else{
		alert("Invalid Entry, please fill out all fields and enter a bet of at least $1")
	}

        }
          else {
            this.setState({imgurl:this.placeholderurl})
          }
        })
        .catch(err => console.log("ERR:", err))}else{
        	 this.setState({imgurl:this.placeholderurl, displayed:"Currently displayed breed: None" })
        	 alert('Please select a breed')

        }
		console.log(event)
		

	
}
	
	render(){
   		if(this.state.loggedIn){
			return (<Container-fluid>
						<Row className="col-12">
						<div className='col-2'></div>
						<div className="col-8 val" >
							<h1 className="text-center heading" >Welcome to Big Dog Bets {this.state.name}!</h1>
						
						
					
						<Row>
							<div className="col-12 "><p className=" currbreed text-center"><b>{this.state.displayed}</b></p></div>
							<img className="img-responsive center-block" src={this.state.imgurl}/>
							<div className="col-12"><p className='text-center prompt'>{'Select a bet type:' }</p></div><div className=' col-12 bets'><select className='box'><option>{'--select type--'}</option></select></div>
							<BreedSelect  onSelected={this.handleSelectedChange}/>
							
							
							<OddsDisplay/>
							<SubmitBet onBetEntry={this.handleBetSubmitted}/>
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
						<div id= "googleButton"></div> 
					</div>
				)
		}
	}
}



export default DogDisplay;
