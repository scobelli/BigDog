import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


var app = express()
var router = express.Router();
var port = process.env.API_PORT || 3001;

app.use(function(req, res, next) {
 res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
 res.setHeader(‘Access-Control-Allow-Credentials’, ‘true’);
 res.setHeader(‘Access-Control-Allow-Methods’, ‘GET,HEAD,OPTIONS,POST,PUT,DELETE’);
 res.setHeader(‘Access-Control-Allow-Headers’, ‘Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers’);

router.get(‘/’, function(req, res) {
	res.json({ message: ‘API Initialized!’});
});
app.use(‘/api’, router);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

var data
fetch('configure.json')
	.then(response => response.json())
  .then(json => {
    username = data["username"]
    password = data["password"]
		mongoose.connect("mongodb://owner:"+password+"@eg-mongodb.bucknell.edu/"+ username);
	});

file.close()

username = data["username"]
password = data["password"]

uri = "mongodb://owner:"+password+"@eg-mongodb.bucknell.edu/"+ username



client = MongoClient(uri)

#creating a test database
db = client.sjc032

#creating a table in the database

collection = db.test_collection


#for cursor in collection.find({}):
#    pprint(cursor)

#{name: string, money: float, wons: int, losses: int}

@app.route('/money/<param>')
def money(param):
app.get('/money/:userId', function (req, res) {
    userId = req.userId
    user = collection.find_one({"_id": userId})
    user["money"] = user["money"] + 500
    #updates information in user profile

    collection.update_one({"_id": userId},{"$set": user})
    response = jsonify(user)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/update/<params>')
def update(params):
    info = params.split("&")
    userId = info[0]
    gain = int(info[1])
    user = collection.find_one({"_id": userId})
    user["money"] = user["money"] + gain
    #updates information in user profile
    if(gain>0):
        user["wins"] = user["wins"] + 1
    else:
        user["losses"] = user["losses"] + 1
        if user["money"]<=0 :
            user["money"] = 500

    collection.update_one({"_id": userId},{"$set": user})
    print(user)
    response = jsonify(user)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

"""
check if userId is in database, if so return information, if not create new account and return base info
"""
@app.route('/login/<userId>')
def login(userId):
    user = collection.find_one({"_id": userId})
    if user is None:
        user = {"_id": userId, "money": 500, "wins": 0, "losses": 0}
        collection.insert_one(user)

    if user["money"] <= 0:
        user["money"] = 500
        collection.update_one({"_id": userId},{"$set": user})

    response = jsonify(user)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
