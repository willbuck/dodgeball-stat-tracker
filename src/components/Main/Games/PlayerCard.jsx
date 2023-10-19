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

// Style Tools
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { ro } from 'date-fns/locale';



export default function PlayerCard(props) {
    const { player, handleStat } = props;
    const { firstname, lastname, jersey_number, color, kills, catches, outs } = player;

    const styling = {
        prim: color,
        sec: 'white',
    }

    const ComponentTheme = styled(Grid)(({ theme }) => ({
        backgroundColor: styling.prim,
        color: styling.sec,
        display: "flex",
        padding: "4px",
        paddingTop: "4px",
        paddingBottom: "4px",
        marginLeft: "4px",
        marginRight: "4px",
        textWrap: "nowrap",
        overflow: "hidden",
        ".player-name": {
            padding: "0px",
        },
        ".player-stats": {
            padding: "0px",
        }
    }))

    return (
        <ComponentTheme container item xs={12} component={Card} >

            {/* Player Name & Number */}
            <PlayerName className="player-name" number={jersey_number} first={firstname} last={lastname} />

            {/* Stats */}
            <PlayerStats className="player-stats" player={player} handleStat={handleStat} />

        </ComponentTheme>
    )
}

function PlayerName(props) {
    const { number, first, last } = props;

    const ComponentTheme = styled(Grid)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        ".text": {
            fontSize: "18px",
            justifySelf: "center",
            alignSelf: "center",
        }
    }))

    return (
        <ComponentTheme className="player-name"
            item xs={12}
            component={CardContent}>

            {/* PLAYER NAME */}
            <Typography className="player-name text">
                #{number} {first} {last}
            </Typography>
        </ComponentTheme>
    )
}

function PlayerStats(props) {
    const { player, handleStat } = props;

    const ComponentTheme = styled(Grid)(({ theme }) => ({
        display: "flex",
        ".container": {
            margin: "0px",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "6px",
        },
        ".value": {
            alignSelf: "center",
            justifySelf: "center",
            fontSize: "18px",
        },
        ".icon-button": {
            alignSelf: "center",
            justifySelf: "center",
        },
    }))

    return (
        <ComponentTheme className="player-stats"
            container item xs={12}
            component={CardActions}>

            {/* Kills */}
            <Grid className="kills container" container item xs={4}>

                {/* Kills icon */}
                <Grid className="kills icon-button"
                    item xs={6}
                    component={IconButton}
                    onClick={() => { handleStat('kills', player) }}>
                    <GpsFixedIcon />
                </Grid>

                {/* Kills value */}
                <Grid className="kills value"
                    item xs={6}
                    component={Typography}>
                    {player.kills}
                </Grid >
            </Grid>


            {/* Catches Container */}
            <Grid className="catches container" container item xs={4}>

                {/* Catches Icon */}
                <Grid className="catches icon-button"
                    item xs={6}
                    component={IconButton}
                    onClick={() => { handleStat('catches', player) }}>
                    <BackHandIcon />
                </Grid>

                {/* Catches Value */}
                <Grid className="catches value"
                    item xs={6}
                    component={Typography}>
                    {player.catches}
                </Grid>
            </Grid>

            {/* Outs Container */}
            <Grid className="outs container" container item xs={4}>

                {/* Outs Icon */}
                <Grid className="outs icon-button"
                    item xs={6}
                    component={IconButton}
                    onClick={() => { handleStat('outs', player) }}>
                    <DoNotStepIcon />
                </Grid>

                {/* Outs Value */}
                <Grid className="outs value"
                    item xs={6}
                    component={Typography}>
                    {player.outs}
                </Grid>

            </Grid>
        </ComponentTheme>
    )
}