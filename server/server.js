const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const challongeRouter = require('./routes/challonge.router')
const tournamentRouter = require('./routes/tournament.router')
const playersRouter = require('./routes/players.router')
const tournamentDetailsRouter = require('./routes/tournamentDetails.router');
const teamsRouter = require('./routes/teams.router')
const allPlayersRouter = require('./routes/allPlayers.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/challonge', challongeRouter);
app.use('/api/tournament', tournamentRouter);
// why is this playersRouter?  is it only for specific games?
app.use('/api/gameview', playersRouter);
app.use('/api/tournamentDetails', tournamentDetailsRouter);
app.use('/api/teams', teamsRouter)
app.use('/api/players', allPlayersRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
