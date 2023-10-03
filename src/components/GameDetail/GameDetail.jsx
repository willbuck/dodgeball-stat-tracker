import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function GameDetail() {
    const user = useSelector((store) => store.user);
    const team1players = useSelector((store) => store.players);
    const team2players = useSelector((store) => store.players);


    return (
        // Main Holding Box
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

            {/* Main Box For Scrolling Teams */}
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
                            </Card>
                        )
                    })}
                </Grid>

            </Box>
        </Box>
    );

}

export default GameDetail;