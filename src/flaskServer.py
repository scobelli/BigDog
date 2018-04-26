from flask import Flask, Response
from flask import request
from flask import jsonify
from flask_cors import CORS
import json
import sys
from pymongo import MongoClient
from pprint import pprint
import uuid
import sys

# Set the app server syntax so we can define app routes/
app = Flask(__name__)
file = open("configure.json", "r")
data = json.load(file)
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
    userId = param
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



CORS(app)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
