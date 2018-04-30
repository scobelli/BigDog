import { GoogleLogin } from 'react-google-login';

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
    				   id: "",
    				   submitted: false,
				   type:"",
				   odds:"",
				   disable:false,
				   messg:""}
    	this.handleSelectedChange=this.handleSelectedChange.bind(this)
    	this.handleBetSubmitted= this.handleBetSubmitted.bind(this)
    	this.handleGoogleInfomation = this.handleGoogleInfomation.bind(this)
		this.handleSelectedBet=this.handleSelectedBet.bind(this)
		this.updateDataBase=this.updateDataBase.bind(this)
		this.responseGoogle=this.responseGoogle.bind(this)

	}


	responseGoogle(response){
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

	componentDidMount(){
	}

	handleGoogleInfomation(id, name){
			console.log(id)
			fetch( API + "/login/"+id)
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
	handleSelectedBet(j){
		console.log(j)
		this.setState({type:j, selectedBreed:"--select breed--"})
		if(j==='All breeds'){
		this.setState({odds:"Odds of winning: 1:81 (x10 payout)"})

		}else if (j==='Hound breeds'){
		this.setState({odds:"Odds of winning: 1:6 (x3 payout)"})

		}else if(j==='Spaniel breeds'){
		this.setState({odds:"Odds of winning: 1:7 (x4 payout)"})
		}else if(j==='Bulldog breeds'){
		this.setState({odds:"Odds of winning: 1:2 (x2 payout)"})
		}
	}
	handleSelectedChange(event){
		if(this.state.type==='All breeds'){
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
							    this.setState({loadedbreed:temp[4].substr(0,1).toUpperCase()+temp[4].substr(1,temp[4].length),tempurl:jresp.message,selectedBreed:event})
									}
								})}
		else if (this.state.type==='Hound breeds'){
			fetch('https://dog.ceo/api/breed/hound/images/random')
        .then(resp => resp.json())
        .then(jresp => {
          if (jresp.status === "success"){
          	console.log(jresp)
          	var temp= jresp.message.split('/')
						var t2= temp[4]
						temp[4]=temp[4].split('-')
						if(temp[4].length>1){
							temp[4]=temp[4][1].substr(0,1).toUpperCase()+temp[4][1].substr(1,temp[4][1].length)
						}else{
							temp[4]=t2
						}
		        console.log(temp)
		        this.setState({loadedbreed:temp[4].substr(0,1).toUpperCase()+temp[4].substr(1,temp[4].length),tempurl:jresp.message,selectedBreed:event})
					}
				})}
		else if (this.state.type==='Spaniel breeds'){
		fetch('https://dog.ceo/api/breed/spaniel/images/random')
	        .then(resp => resp.json())
	        .then(jresp => {
	          if (jresp.status === "success"){
	          	console.log(jresp)
	          	var temp= jresp.message.split('/')
							var t2= temp[4]
							temp[4]=temp[4].split('-')
							if(temp[4].length>1){
								temp[4]=temp[4][1].substr(0,1).toUpperCase()+temp[4][1].substr(1,temp[4][1].length)
							}else{
								temp[4]=t2
							}
			        console.log(temp)
			        this.setState({loadedbreed:temp[4].substr(0,1).toUpperCase()+temp[4].substr(1,temp[4].length),tempurl:jresp.message,selectedBreed:event})
						}
					})}
		else if (this.state.type==='Bulldog breeds'){
			fetch('https://dog.ceo/api/breed/bulldog/images/random')
	        .then(resp => resp.json())
	        .then(jresp => {
	          if (jresp.status === "success"){
	          	console.log(jresp)
	          	var temp= jresp.message.split('/')
							var t2= temp[4]
							temp[4]=temp[4].split('-')
							if(temp[4].length>1){
								temp[4]=temp[4][1].substr(0,1).toUpperCase()+temp[4][1].substr(1,temp[4][1].length)
							}else{
								temp[4]=t2
							}
			        console.log(temp)
			        this.setState({loadedbreed:temp[4].substr(0,1).toUpperCase()+temp[4].substr(1,temp[4].length),tempurl:jresp.message,selectedBreed:event})
						}
					})}
}

export default DogSelect
