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
const gamesRouter = require('./routes/games.router');

const leaderboardRouter = require('./routes/leaderboard.router');
const teamLeaderboardRouter = require('./routes/teamLeaderboard.router');
const searchTeamLeaderboardRouter = require('./routes/searchTeamLeaderboard.router');
const killRouter = require('./routes/kill.router')
const teamsRouter = require('./routes/teams.router')

const allPlayersRouter = require('./routes/allPlayers.router');
const addPlayersRouter = require('./routes/addPlayers.router');
const updatePlayerRouter = require('./routes/updatePlayer.router');

const manageUsersRouter = require('./routes/manageUsers.router');
const modalRouter = require('./routes/modal.router')




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
app.use('/api/players', playersRouter);
app.use('/api/games', gamesRouter);

app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/allTeams', teamLeaderboardRouter);
app.use('/api/searchTeam', searchTeamLeaderboardRouter);
app.use('/api/kill', killRouter);
app.use('/api/teams', teamsRouter)

app.use('/api/allPlayers', allPlayersRouter);
app.use('/api/addPlayer', addPlayersRouter);
app.use('/api/updatePlayer', updatePlayerRouter);


app.use('/api/manageUsers', manageUsersRouter);
app.use('/api/admin/modal', modalRouter)





// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
