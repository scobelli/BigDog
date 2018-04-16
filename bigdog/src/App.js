import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';


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

class DisplayWinLoss extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div className='Row'><p id='wins' className='disp text-center col-12'>Wins: 0</p><p id='losses' className='disp text-center col-12'>Losses: 0</p></div>)
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
		return (<p id='money' className=' text-center val disp'>Money Available: $500</p>)
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
    	this.state = { loadedbreed:"", currmon:500, displayed:"Currently displayed breed: None", breeds:[], selectedBreed:"--select breed--", imgurl: this.placeholderurl, tempurl:"", wins:0, losses:0}
    	this.handleSelectedChange=this.handleSelectedChange.bind(this)
    	this.handleBetSubmitted= this.handleBetSubmitted.bind(this)
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
			document.getElementById('money').innerHTML="Money Available: $"+(this.state.currmon+event*10)
		this.setState({currmon:this.state.currmon+event*10, wins:this.state.wins+1})
		document.getElementById('wins').innerHTML="Wins: "+this.state.wins.toString()


		}else{
		document.getElementById('money').innerHTML="Money Available: $"+(this.state.currmon-event)
		this.setState({currmon:this.state.currmon-event, losses:this.state.losses+1})
		document.getElementById('losses').innerHTML="Losses: "+ this.state.losses.toString()
		}
		
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

        }
		console.log(event)
		

	
}
	
	render(){
   
		return (<Container-fluid>
					<Row className="col-12">
					<div className='col-2'></div>
					<div className="col-8 val" >
						<h1 className="text-center heading" >Big Dog Bets</h1>
					
					
				
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
					<MoneyDisplay/></div>
					
					
					<DisplayWinLoss /></div>
					</div>
					</Row>
					
					
					
				</Container-fluid>)
	}
}



export default DogDisplay;
