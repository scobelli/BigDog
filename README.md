# Big Dog Bets

Allan La, Jack Napor, Stefano Cobelli

Big dog bets is a game that you can bet imaginary money on what kind of dog will randomly appear. The site uses a mongo database to store your wins, losses, and money. You can place bets on a variety of breeds with varying odds. The point of this game is to help feed your gambeling fix in a safe and friendly environment.

# Architecture:

We use React for the front-end. For table layout and design, we used reactstrap. For the backend and API endpoints, we used flask.

The main application file is App.js, using components from Bet.js, User.js, Utils.js and timer.js

Bet.js contains the displaying logic, basically everything that happens after the bet is made and the lever is pulled

Dog.js contains the front and back end of betting, encapsulating all user interactions

Utils.js contains miscellaneous forms and tools

timer.js contains the timer for how long the dog is displayed


# Running

There are a couple configuration differences between running locally and remote. For ease of use, I've seperated them into branches.

## TO RUN LOCALLY:

There is a branch called master. Check it out.
You need to run:
`python src/flaskServer.py`
and `npm start`
Then, navigate to http://localhost:3000

## TO RUN REMOTELY:

There is a branch called build. Check it out
Run the ec2
pull the project
run:
`npm run build`
copy the build folder to var/www/html/
run in BigDog/src
`python flaskServer`
navigate to the ec2 server
