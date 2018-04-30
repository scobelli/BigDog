class BetSelect extends React.Component{
	constructor(props){
		super(props)
		this.state={options:<option value='--select breed--' key='--select breed--'>--select breed--</option>}
		this.betChange=this.betChange.bind(this)
		this.handleBreedSelected=this.handleBreedSelected.bind(this)

	}
	handleBreedSelected(event){
	console.log(event.target.value)
	this.props.onSelected(event.target.value)

	}

	betChange(event){
	console.log(event.target.value)
	this.props.onBetSelected(event.target.value)

	if(event.target.value==='All breeds'){

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

	}else if (event.target.value==='Hound breeds'){

	fetch('https://dog.ceo/api/breed/hound/list')
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

	else if (event.target.value==='Spaniel breeds'){

	fetch('https://dog.ceo/api/breed/spaniel/list')
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

	else if (event.target.value==='Bulldog breeds'){

	fetch('https://dog.ceo/api/breed/bulldog/list')
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
	}
	render(){
		return (<div className="col-12"><div className="col-12"><p className='text-center prompt'>{'Select a bet type:' }</p></div><div className=' col-12 bets'><select className='box' onChange={this.betChange}><option>{'--select type--'}</option><option>{'All breeds'}</option><option>{'Hound breeds'}</option><option>{'Spaniel breeds'}</option><option>{'Bulldog breeds'}</option></select></div><div className='col-12 text-center'><h2 className="prompt">Select which breed you think will appear:</h2><div className='col-12 breeds'><select id='bselect' className='box'  onChange={this.handleBreedSelected}>{this.state.options}</select></div></div></div>)
	}

}

export default BetSelect;
