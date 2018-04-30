#Big Dog Bets

Allan La, Jack Napor, Stefano Cobelli

Big dog bets is a game that you can bet imaginary money on what kind of dog will randomly appear. The site uses a mongo database to store your wins, losses, and money. You can place bets on a variety of breeds with varying odds. The point of this game is to help feed your gambeling fix in a safe and friendly environment.

#Architecture: 

We use React for the front-end. For table layout and design, we used reactstrap. For the backend and API endpoints, we used flask.

The main application file is App.js, using componants from Bet.js, Dog.js and timer.js



#Running

There are a couple configuration differences between running locally and remote. For ease of use, I've seperated them into branches.

##TO RUN LOCALLY:

There is a branch called "Local". Check it out.
You need to run:
`python flaskServer.py` in BigDog/src
and `npm start` in /BigDog.
Then, navigate to http://localhost:3000

##TO RUN REMOTELY:

Check in to master branch.
Run the ec2 instance
run:
`npm run build`
copy the build folder to var/www/html/
run in BigDog/src
`python flaskServer`
naviage to the ec2 server


