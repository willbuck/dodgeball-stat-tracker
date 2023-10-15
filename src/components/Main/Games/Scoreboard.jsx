import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';
import findIDMatch from '../../../utilities/findIDMatch'

// Components
import PlayerCard from './PlayerCard';

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

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';


function Scoreboard(props) {

    const ComponentTheme = styled(Grid)(({ theme }) => ({
        '.scroll-container': {
            backgroundColor: 'primary.dark',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            },
        },
        display: "flex",
        '.container': {},
        '.game-detail .container': {
            display: "flex",
            justifyContent: "center",
        },
        '.scoreboard .container': {
            color: "text.primary",
            fontSize: "24px"
        },
        '.team-one .score .container': {
            alignItems: "end"
        },
        '.team-one .team-name': {
            paddingLeft: "10px",
        },
        '.team-two .team-name': {
            alignSelf: "end",
            justifySelf: "end",
        },
        ".team-score": {
            alignSelf: "center",
            justifySelf: "center"
        },
        ".team-one .score-button": {
            color: '#186BCC'
        },
        ".dash .content": {
            color: "text.primary", fontSize: "24px", alignSelf: "center"
        }
    }));

    const { handleScore, teams, teamOneScore, teamTwoScore, } = props

    return (

        <ComponentTheme
            className="scoreboard container"
            container
            item xs={12} component={Card} >

            {/* TEAM ONE SCORE */}
            <Grid
                className="team-one score container"
                container
                item xs={5} >

                <Grid
                    className="team-one team-name"
                    item
                    xs={8}
                    component={CardContent}>
                    {teams.teamOne.name}
                </Grid>

                <Grid className="team-one team-score"
                    item xs={4}
                    component={CardContent}>
                    {teamOneScore}
                </Grid>

                <Grid
                    item xs={6}
                    component={CardActions} >
                    <IconButton className="team-one score-button decrease"
                        onClick={() => handleScore("one", "minus")}>
                        <RemoveCircleIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={6} component={CardActions}>
                    <IconButton className="team-one score-button increase"
                        onClick={() => handleScore("one", "plus")}>
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
            </Grid>

            {/* DASH */}
            <Grid className="dash container" item xs={2} component={Typography}>
                -
            </Grid>

            {/* TEAM TWO SCORE */}
            <Grid container item xs={5}>
                <Grid item xs={4} component={CardContent} className="team-two team-score" >
                    {teamTwoScore}
                </Grid>
                <Grid item xs={8} component={CardContent} className="team-two team-name" >
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
        </ComponentTheme>

    )
}

export default Scoreboard;