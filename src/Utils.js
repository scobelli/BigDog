import React from 'react'

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

export {MoneyDisplay, SubmitBet, DisplayWinLoss}
