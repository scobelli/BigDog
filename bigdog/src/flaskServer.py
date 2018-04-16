from flask import Flask, Response
from flask import request
from flask import jsonify
from flask_cors import CORS
import json
import sys
from pymongo import MongoClient
from pprint import pprint

# Set the app server syntax so we can define app routes/
app = Flask(__name__)

uri = "mongodb://owner:Eiwe9fae@eg-mongodb.bucknell.edu/sjc032"
client = MongoClient(uri)

#creating a test database
db = client.sjc032

#creating a table in the database
collection = db.test_collection

collection.insert({"name": "Allan"})

for cursor in collection.find({}):
    pprint(cursor)

#{name: string, money: float, wons: int, losses: int}

@app.route('/update/<params>')
def update(params):
    print(params)
    #updates information in user profile
    dic = {}
    response = jsonify(dic)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/login/<params>')
def login(params):
    print(params)
    #check if login is in database, if so return information, if not create new account and return base info
    dic = {}
    response = jsonify(dic)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



#CORS(app)
#if __name__ == '__main__':
#    app.run(host='0.0.0.0', port=8000)
