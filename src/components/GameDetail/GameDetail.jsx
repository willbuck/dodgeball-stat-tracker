import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

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
// import Button from '@mui/material/Button';
// import CallMissedIcon from '@mui/icons-material/CallMissed';



function GameDetail() {
    const user = useSelector((store) => store.user);
    const players = useSelector((store) => store.playersReducer);
    let team1 = []
    let team2 = []


    console.log('players data:', players);
    //const team1players = players.filter((team) => {team.team1_id === team1_id})
    // const team2players = 

    for (let player of players) {
        if (player.team_id === player.team1_id) {
            console.log("Team one member:", player)
            team1.push(player)
        } else if (player.team_id === player.team2_id) {
            console.log("Team two member:", player)
            team2.push(player)
        }
    }


    const dispatch = useDispatch();


    // Bug to fix: this useEffect does not re-render the data upon page reload.
    //  useEffect((ID) => {
    //      dispatch({ type: "FETCH_TEAMS", payload: ID });
    //  }, []);


    const handleKill = (id) => {
        console.log(id, 'Got a Kill!')
        dispatch({
            type: 'POST_KILL',
            payload: id
          })
    };

    const handleOutOfBounds = (id) => {
        console.log(id, 'Out of bounds!')
        dispatch({
            type: 'POST_OUT',
            payload: id
          })
    };

    const handleCatch = (id) => {
        console.log(id, 'Got a Catch!')
        dispatch({
            type: 'POST_CATCH',
            payload: id
          })
    };


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
                    {team1.map((player) => {
                        return (
                            <Card
                                key={player.id}
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
                                            <IconButton onClick={() => { handleKill(player) }} sx={{ color: '#186BCC', }}>
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
                                            <IconButton onClick={() => { handleOutOfBounds(player) }} sx={{ color: '#186BCC', }}>
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
                                            <IconButton onClick={() => { handleCatch(player) }} sx={{ color: '#186BCC', }}>
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
                    {team2.map((player) => {
                        return (
                            <Card
                                key={player.id}
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
                                            <IconButton onClick={() => { handleKill(player) }} sx={{ color: '#186BCC', }}>
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
                                            <IconButton onClick={() => { handleOutOfBounds(player) }} sx={{ color: '#186BCC', }}>
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
                                            <IconButton onClick={() => { handleCatch(player) }} sx={{ color: '#186BCC', }}>
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