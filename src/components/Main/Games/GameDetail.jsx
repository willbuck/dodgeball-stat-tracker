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

function GameDetail() {
    const { id, gameID = Number(id) } = useParams();

    const allPlayers = useSelector((store) => store.playersReducer);
    const allGames = useSelector((store) => store.gamesReducer);

    // Getting information for current game
    const game = findIDMatch(allGames, gameID, 'game_id', false)

    const [teams, setTeams] = useState({
        team1: {
            id: game.team1_id,
            name: game.team1_name,
            color: game.team1_jersey_color,
            players: []
        },

        team2: {
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
            if (player.team_id === currentGame.team1_id && !teamsObject.team1.players.includes(player)) {
                player.kills = 0;
                player.outs = 0;
                player.catches = 0;
                teamsObject.team1.players.push(player);
            } else if (player.team_id === currentGame.team2_id && !teamsObject.team2.players.includes(player)) {
                player.kills = 0;
                player.outs = 0;
                player.catches = 0;
                teamsObject.team2.players.push(player);
            }
        }
        return teamsObject
    }

    useEffect(() => {
        setTeams(setRosters(game))

    }, [])

    // Function to calculate team scores
    const countScore = (roster) => {
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

    }

    // Handler function for stat tracking
    const handleStat = (stat, player) => {

        player[stat]++;

        // Creating copy of teams state so
        // react will re-render on state change
        const teamsCopy = Object.assign({}, teams)

        // Loop to find player in teams object
        // This is very inelegant
        let counter = 0;
        for (let roster of teamsCopy.team1.players) {
            if (player.player_id === roster.player_id) {
                teamsCopy.team1.players[counter] = player;
            }
            counter++
        }
        counter = 0;
        for (let roster of teamsCopy.team2.players) {
            if (player.player_id === roster.player_id) {
                teamsCopy.team2.players[counter] = player;
            }
            counter++;
        }
        // Updating state
        setTeams(teamsCopy);
    }

    //! Make separate team grids into a separate component
    return (
        // Main Container Box
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

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
                <Grid container sx={{ minWidth: 100, display: 'flex', justifyContent: 'left', paddingLeft: 1 }}
                    xs={6}
                    columnGap={6}
                    rowGap={2}>
                    {teams.team1.players.map((player) => {
                        return (
                            // PLAYER COMPONENT
                            <Card
                                key={player.player_id}
                                sx={{ minWidth: 160, maxWidth: 125, justifyContent: 'center' }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                        #{player.jersey_number}
                                    </Typography>

                                    {/* PLAYER NAME */}
                                    <Typography variant='body2' color='text.secondary'>
                                        {player.firstname} {player.lastname}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'spaceBetween' }}>

                                    {/* STAT ROW */}
                                    <Grid container direction="column" alignItems="center">
                                        {/* Kills value */}
                                        <Grid >
                                            <Typography variant="body2" color='text.secondary'>
                                                {player.kills}
                                            </Typography>
                                        </Grid>
                                        {/* Kill icon */}
                                        <Grid >
                                            <IconButton onClick={() => { handleStat('kills', player) }} sx={{ color: '#186BCC', }}>
                                                <GpsFixedIcon />
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
                                </CardActions>
                            </Card>
                        )
                    })}
                </Grid>


                {/* Right Grid For Team 2 */}
                <Grid container sx={{ minWidth: 100, display: 'flex', justifyContent: 'right', paddingRight: 1 }}
                    xs={6}
                    columnGap={6}
                    rowGap={2}>
                    {teams.team2.players.map((player) => {
                        return (
                            <Card
                                key={player.player_id}
                                sx={{ minWidth: 160, maxWidth: 125, justifyContent: 'center' }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                        #{player.jersey_number}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {player.firstname} {player.lastname}
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
                                                {player.outs}
                                            </Typography>
                                        </Grid>
                                        <Grid >
                                            <IconButton onClick={() => { handleStat("outs", player) }} sx={{ color: '#186BCC', }}>
                                                <DoNotStepIcon />
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
                                </CardActions>
                            </Card>
                        )
                    })}
                </Grid>


            </Box>
        </Box>
    );
}

export default GameDetail;