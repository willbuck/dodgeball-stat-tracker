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
    console.log('players data:', players);
    // const team1players = 
    // const team2players = 

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: "FETCH_TEAMS" });
    }, []);


    const handleKill = () => { };

    const handleOutOfBounds = () => { };

    const handleCatch = () => { };


    return (
        // Main Container Box
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

            {/* Main Container Box For Scrolling */}
            <Box className="scroll-container"

                sx={{
                    display: 'flex',
                    width: 255,
                    height: 500,
                    overflowY: "auto",
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >


                {/* Left Grid For Team 1 */}
                <Grid container sx={{ minWidth: 100, display: 'flex', justifyContent: 'left' }}
                    xs={6}
                    columnGap={6}
                    rowGap={2}>
                    {team1players.map((player) => {
                        return (
                            <Card
                                key={player.id}
                                sx={{ minWidth: 100, maxWidth: 125, display: 'flex', justifyContent: 'center' }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                        {player.jersey_number}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {player.firstname} {player.lastname}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton onClick={() => { handleKill(player.id) }} sx={{ color: '#186BCC', }}>
                                        <GpsFixedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { handleOutOfBounds(player.id) }} sx={{ color: '#186BCC', }}>
                                        <DoNotStepIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { handleCatch(player.id) }} sx={{ color: '#186BCC', }}>
                                        <BackHandIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Grid>


                {/* Right Grid For Team 2 */}
                <Grid container sx={{ minWidth: 100, display: 'flex', justifyContent: 'right' }}
                    xs={6}
                    columnGap={6}
                    rowGap={2}>
                    {team2players.map((player) => {
                        return (
                            <Card
                                key={player.id}
                                sx={{ minWidth: 100, maxWidth: 125, display: 'flex', justifyContent: 'center' }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                        {player.jersey_number}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {player.firstname} {player.lastname}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton onClick={() => { handleKill(player.id) }} sx={{ color: '#186BCC', }}>
                                        <GpsFixedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { handleOutOfBounds(player.id) }} sx={{ color: '#186BCC', }}>
                                        <DoNotStepIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { handleCatch(player.id) }} sx={{ color: '#186BCC', }}>
                                        <BackHandIcon />
                                    </IconButton>
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