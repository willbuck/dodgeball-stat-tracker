import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';
import findIDMatch from '../../../utilities/findIDMatch'

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BackHandIcon from '@mui/icons-material/BackHand';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function GameDetail() {
    const { id, gameID = Number(id) } = useParams();

    const allPlayers = useSelector((store) => store.playersReducer);
    const allGames = useSelector((store) => store.gamesReducer);

    // Getting information for current game
    const game = findIDMatch(allGames, gameID, 'game_id', false)

    // Score state
    const [teamOneScore, setTeamOneScore] = useState(0);
    const [teamTwoScore, setTeamTwoScore] = useState(0);

    const renderTallies = (num) => {
        let tallyString = ` `
        for (let i = 0; i < num; i++) {
            tallyString = tallyString + ` x`;
        }
        return tallyString;
    }

    //! Eventually state should be the number of players in a lineup on a per-tournament basis
    const [teamOneTally, setTeamOneTally] = useState(() => renderTallies(4));
    const [teamTwoTally, setTeamTwoTally] = useState(() => renderTallies(4));


    const [teams, setTeams] = useState({
        teamOne: {
            id: game.team1_id,
            name: game.team1_name,
            color: game.team1_jersey_color,
            players: []
        },

        teamTwo: {
            id: game.team2_id,
            name: game.team2_name,
            color: game.team2_jersey_color,
            players: []
        }
    });

    // Helper function to set team rosters
    const setRosters = (currentGame) => {
        const teamsObject = Object.assign({}, teams);
        // Looping over players to find players in this game
        for (let player of allPlayers) {
            // Push player to team object's .players array if both:
            // the player's team_id matches the team ID
            // the player is not already in the team's .players array
            if (player.team_id === currentGame.team1_id && findIDMatch(teamsObject.teamOne.players, player.player_id, "player_id").length === 0) {
                player.kills = 0;
                player.outs = 0;
                player.catches = 0;
                teamsObject.teamOne.players.push(player);
            } else if (player.team_id === currentGame.team2_id && findIDMatch(teamsObject.teamTwo.players, player.player_id, "player_id").length === 0) {
                player.kills = 0;
                player.outs = 0;
                player.catches = 0;
                teamsObject.teamTwo.players.push(player);
            }
        }
        return teamsObject
    }

    useEffect(() => {
        setTeams(setRosters(game))
    }, [])

    // Function to sum all player stats for a team
    const getTeamStats = (roster) => {
        // variables to hold total kills, catches, and outs
        let totalKills = 0;
        let totalCatches = 0;
        let totalOuts = 0;

        // loop over roster to add stats to team totals
        for (let player of roster) {
            totalKills += player.kills;
            totalCatches += player.catches;
            totalOuts += player.outs;
        }

        return { kills: totalKills, catches: totalCatches, outs: totalOuts }
    }


    // Function to get each team's score
    const getRemainingPlayers = (teams) => {
        const teamOneStats = getTeamStats(teams.teamOne.players);
        const teamTwoStats = getTeamStats(teams.teamTwo.players);

        // setTeamOneScore(teamOneStats.kills + teamOneStats.catches - teamOneStats.outs - teamTwoStats.catches);
        // setTeamTwoScore(teamTwoStats.kills + teamTwoStats.catches - teamTwoStats.outs - teamOneStats.catches);

        //! default 4 should be replaced with lineup size
        const teamOneTallyCalc = 4 - teamTwoStats.kills - teamTwoStats.catches + teamOneStats.catches - teamOneStats.outs;
        const teamTwoTallyCalc = 4 - teamOneStats.kills - teamOneStats.catches + teamTwoStats.catches - teamTwoStats.outs;

        // Update team one player tally
        if (teamOneTallyCalc >= 4) {
            // If greater than default, setState(default)
            setTeamOneTally(() => renderTallies(4));
        } else if (teamOneTallyCalc <= 0) {
            // if <0, setState(0) and render "Confirm Win" button
            setTeamOneTally('');
        } else {
            setTeamOneTally(() => renderTallies(teamOneTallyCalc));
        }

        // Update team two player tally
        if (teamTwoTallyCalc >= 4) {
            // If greater than default, setState(default)
            setTeamTwoTally(() => renderTallies(4));
        } else if (teamTwoTallyCalc <= 0) {
            // if <0, setState(0) and render "Confirm Win" button
            setTeamTwoTally('');
        } else {
            setTeamTwoTally(() => renderTallies(teamTwoTallyCalc));
        }
    }

    //! User should have decrement option
    // Handler function for stat tracking
    const handleStat = (stat, player) => {

        player[stat]++;

        // Creating copy of teams state so
        // react will re-render on state change
        const teamsCopy = Object.assign({}, teams);

        // Loop to find player in teams object
        //! This is very inelegant
        let counter = 0;
        for (let roster of teamsCopy.teamOne.players) {
            if (player.player_id === roster.player_id) {
                teamsCopy.teamOne.players[counter] = player;
            }
            counter++
        }
        counter = 0;
        for (let roster of teamsCopy.teamTwo.players) {
            if (player.player_id === roster.player_id) {
                teamsCopy.teamTwo.players[counter] = player;
            }
            counter++;
        }
        // Updating state
        setTeams(teamsCopy);
        getRemainingPlayers(teams);
    }

    const handleScore = (team, increment) => {
        if (team === "one" && increment === "plus") {
            setTeamOneScore(teamOneScore + 1);
        }
        if (team === "one" && increment === "minus") {
            if (teamOneScore <= 0) {
                setTeamOneScore(0);
            } else { 
                setTeamOneScore(teamOneScore - 1)
            }
        }
        if (team === "two" && increment === "plus") {
            setTeamTwoScore(teamTwoScore + 1);
        }
        if (team === "two" && increment === "minus") {
            if (teamTwoScore <= 0) {
                setTeamTwoScore(0);
            } else { 
                setTeamTwoScore(teamTwoScore - 1)
            }
        }
    }

    //! Make individual team grids into a separate component
    return (
        // Main Container Box
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container >
                {/* SCOREBOARD */}
                <Grid container item xs={12} component={Card} sx={{ color: "text.primary", fontSize: "24px" }}>

                    {/* TEAM ONE SCORE */}
                    <Grid container item xs={5} sx={{ alignItems: "end" }}>
                        <Grid item xs={8} component={CardContent} className="team-one team-name" sx={{ paddingLeft: "10px", }}>
                            {teams.teamOne.name}
                        </Grid>

                        <Grid item xs={4} component={CardContent} className="team-one team-score" sx={{ alignSelf: "center", justifySelf: "center" }}>
                            {teamOneScore}
                        </Grid>

                        <Grid item xs={6} component={CardActions} className="team-one score-button decrease">
                            <IconButton sx={{ color: '#186BCC' }} onClick={() => handleScore("one", "minus")}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6} component={CardActions} className="team-one score-button increase">
                            <IconButton sx={{ color: '#186BCC' }} onClick={() => handleScore("one", "plus")}>
                                <AddCircleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    {/* DASH */}
                    <Grid item xs={2}>
                        <Typography sx={{ color: "text.primary", fontSize: "24px", alignSelf: "center" }}>-</Typography>
                    </Grid>

                    {/* TEAM TWO SCORE */}
                    <Grid container item xs={5}>
                        <Grid item xs={4} component={CardContent} className="team-one team-score" sx={{ alignSelf: "center", justifySelf: "center" }}>
                            {teamTwoScore}
                        </Grid>
                        <Grid item xs={8} component={CardContent} className="team-one team-name" sx={{ paddingLeft: "10px", }}>
                            {teams.teamTwo.name}
                        </Grid>

                        <Grid item xs={6} component={CardActions} className="team-two score-button decrease">
                            <IconButton sx={{ color: '#186BCC' }} onClick={() => handleScore("two", "minus")}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6} component={CardActions} className="team-two score-button increase">
                            <IconButton sx={{ color: '#186BCC' }} onClick={() => handleScore("two", "plus")}>
                                <AddCircleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>



                </Grid>

                {/* Main Container Box For Scrolling */}
                <Box className="scroll-container"
                    sx={{
                        display: 'flex',
                        width: 350,
                        height: 600,
                        overflowY: "auto",
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >



                    {/* Left Grid For Team 1 */}
                    <Grid container item sx={{ minWidth: 100, display: 'flex', justifyContent: 'left', paddingLeft: 1 }}
                        xs={6}
                        columnGap={6}
                        rowGap={2}>

                        {teams.teamOne.players.map((player) => {
                            return (
                                // PLAYER COMPONENT
                                <Card
                                    key={player.player_id}
                                    sx={{ minWidth: 160, maxWidth: 125, justifyContent: 'center' }}
                                >
                                    <CardContent>
                                        {/* PLAYER NAME */}
                                        <Typography variant='body2' color='text.secondary'>
                                            #{player.jersey_number} {player.firstname} {player.lastname}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'spaceBetween' }}>

                                        {/* STAT ROW */}
                                        <Grid container direction="column" alignItems="center">
                                            {/* Kills value */}
                                            <Grid item >
                                                <Typography variant="body2" color='text.secondary'>
                                                    {player.kills}
                                                </Typography>
                                            </Grid >
                                            {/* Kill icon */}
                                            <Grid item >
                                                <IconButton onClick={() => { handleStat('kills', player) }} sx={{ color: '#186BCC', }}>
                                                    <GpsFixedIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="column" alignItems="center">
                                            <Grid >
                                                <Typography variant="body2" color='text.secondary'>
                                                    {player.catches}
                                                </Typography>
                                            </Grid>
                                            <Grid >
                                                <IconButton onClick={() => { handleStat('catches', player) }} sx={{ color: '#186BCC', }}>
                                                    <BackHandIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="column" alignItems="center">
                                            <Grid >
                                                <Typography variant="body2" color='text.secondary'>
                                                    {player.outs}
                                                </Typography>
                                            </Grid>
                                            <Grid >
                                                <IconButton onClick={() => { handleStat('outs', player) }} sx={{ color: '#186BCC', }}>
                                                    <DoNotStepIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                    </CardActions>
                                </Card>
                            )
                        })}
                    </Grid>


                    {/* Right Grid For Team 2 */}
                    <Grid container item sx={{ minWidth: 100, display: 'flex', justifyContent: 'right', paddingRight: 1 }}
                        xs={6}
                        columnGap={6}
                        rowGap={2}>
                        {teams.teamTwo.players.map((player) => {
                            return (
                                <Card
                                    key={player.player_id}
                                    sx={{ minWidth: 160, maxWidth: 125, justifyContent: 'center' }}
                                >
                                    <CardContent>
                                        <Typography variant='body2' color='text.secondary'>
                                            #{player.jersey_number} {player.firstname} {player.lastname}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'spaceBetween' }}>

                                        <Grid container direction="column" alignItems="center">
                                            <Grid >
                                                <Typography variant="body2" color='text.secondary'>
                                                    {player.kills}
                                                </Typography>
                                            </Grid>
                                            <Grid >
                                                <IconButton onClick={() => { handleStat("kills", player) }} sx={{ color: '#186BCC', }}>
                                                    <GpsFixedIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="column" alignItems="center">
                                            <Grid >
                                                <Typography variant="body2" color='text.secondary'>
                                                    {player.catches}
                                                </Typography>
                                            </Grid>
                                            <Grid >
                                                <IconButton onClick={() => { handleStat("catches", player) }} sx={{ color: '#186BCC', }}>
                                                    <BackHandIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="column" alignItems="center">
                                            <Grid >
                                                <Typography variant="body2" color='text.secondary'>
                                                    {player.outs}
                                                </Typography>
                                            </Grid>
                                            <Grid >
                                                <IconButton onClick={() => { handleStat("outs", player) }} sx={{ color: '#186BCC', }}>
                                                    <DoNotStepIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                    </CardActions>
                                </Card>
                            )
                        })}
                    </Grid>

                </Box>
            </Grid>

        </Box>
    );
}

export default GameDetail;