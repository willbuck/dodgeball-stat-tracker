import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory, useLocation, useParams } from 'react-router-dom'
import findIDMatch from '../../../utilities/findIDMatch'


// Components
import PlayerCard from './PlayerCard';
import Scoreboard from './Scoreboard';


// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

// Style Tools
import { styled } from '@mui/system';


function GameDetail() {
    const dispatch = useDispatch();

    const { id, gameID = Number(id) } = useParams();

    const allPlayers = useSelector((store) => store.playersReducer);
    const allGames = useSelector((store) => store.gamesReducer);
    const stats = useSelector(store => store.stats);
    const user = useSelector(store => store.user);

    console.log('stats:', stats[0]);
    console.log('players:', allPlayers[0]);

    // Getting information for current game
    const game = findIDMatch(allGames, gameID, 'game_id', false)

    // Score state
    const [teamOneScore, setTeamOneScore] = useState(game.team1_score);
    const [teamTwoScore, setTeamTwoScore] = useState(game.team2_score);

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
        console.log('current game:', currentGame);
        const teamsObject = Object.assign({}, teams);
        // Looping over players to find players in this game
        for (let player of allPlayers) {
            // Push player to team object's .players array if both:
            // the player's team_id matches the team ID
            // the player is not already in the team's .players array

            if (player.team_id === currentGame.team1_id && findIDMatch(teamsObject.teamOne.players, player.player_id, "player_id").length === 0) {

                // match existing stats to player
                for (let statline of stats) {
                    //! THIS SHOULD REPLACE THE IF STATEMENT FOR ACTUAL USE
                    // if (statline.player_id === player.player_id && statline.game_id === currentGame.game_id && (statline.user_id === user.id || statline.uuid === user.uuid)) {

                    //! THIS IF STATEMENT IS FOR PRESENTATION PURPOSES ONLY
                    if (statline.player_id === player.player_id && statline.game_id === currentGame.game_id && statline.user_id === 1) {
                        console.log('MATCH:', player);

                        player.kills = statline.kills;
                        player.catches = statline.catches;
                        player.outs = statline.outs;
                    }
                }

                player.kills = player.kills || 0;
                player.outs = player.outs || 0;
                player.catches = player.catches || 0;
                teamsObject.teamOne.players.push(player);




            } else if (player.team_id === currentGame.team2_id && findIDMatch(teamsObject.teamTwo.players, player.player_id, "player_id").length === 0) {
                for (let statline of stats) {

                    //! USE THIS IF STATEMENT IN ACTUAL APP
                    // if (statline.player_id === player.player_id && statline.game_id === currentGame.game_id && (statline.user_id === user.id || statline.uuid === user.pseudonym)) {

                    //! THIS IF STATEMENT IS FOR PRESENTATION USE ONLY
                    if (statline.player_id === player.player_id && statline.game_id === currentGame.game_id && statline.user_id === 1) {
                        player.kills = statline.kills;
                        player.catches = statline.catches;
                        player.outs = statline.outs;
                    }
                }

                player.kills = player.kills || 0;
                player.outs = player.outs || 0;
                player.catches = player.catches || 0;
                teamsObject.teamTwo.players.push(player);
            }
        }
        return teamsObject
    }

    useEffect(() => {
        setTeams(setRosters(game))
    }, [])

    //! User should have decrement option
    // Handler function for stat tracking
    const handleStat = async (stat, player) => {

        await player[stat]++;

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
            await counter++
        }
        counter = 0;
        for (let roster of teamsCopy.teamTwo.players) {
            if (player.player_id === roster.player_id) {
                teamsCopy.teamTwo.players[counter] = player;
            }
            await counter++;
        }

        // Updating state
        await setTeams(teamsCopy);

        // Send stats to database
        await dispatch({ type: 'SEND_STATS', payload: { game, player, user } })

        setTeams(setRosters(game))
    }

    const updateScore = async (team, score) => {
        for (let aGame of allGames) {
            if (game.game_id === aGame.game_id) {

                if (team === 1) {
                    aGame.team1_score = score;
                }
                if (team === 2) {
                    aGame.team2_score = score;
                }
            }
        }
        //! The current logic has the below dispatch updating the official game score. We would need a new table for user-specific score reports if we want that to work
        // await dispatch({type: 'UPDATE_GAMES', payload: game});
        await dispatch({ type: "SET_GAMES", payload: allGames });
    }

    const handleScore = async (team, increment) => {
        if (team === "one" && increment === "plus") {
            await updateScore(1, teamOneScore + 1);
            await setTeamOneScore(teamOneScore + 1);

        }
        if (team === "one" && increment === "minus") {
            if (teamOneScore <= 0) {
                await setTeamOneScore(0);
            } else {
                await updateScore(1, teamOneScore - 1);
                await setTeamOneScore(teamOneScore - 1);
            }
        }
        if (team === "two" && increment === "plus") {
            await updateScore(2, teamTwoScore + 1);
            await setTeamTwoScore(teamTwoScore + 1);
        }
        if (team === "two" && increment === "minus") {
            if (teamTwoScore <= 0) {
                await setTeamTwoScore(0);
            } else {
                await updateScore(2, teamTwoScore - 1);
                await setTeamTwoScore(teamTwoScore - 1);
            }
        }
    }

    const createPlayersArray = () => {
        const teamArrays = {
            teamOne: [],
            teamTwo: []
        }

        for (let player of teams.teamOne.players) {
            teamArrays.teamOne.push({ ...player, color: teams.teamOne.color })
        }
        for (let player of teams.teamTwo.players) {
            teamArrays.teamTwo.push({ ...player, color: teams.teamTwo.color })
        }


        return teamArrays;
    }
    const cardsToRender = createPlayersArray();

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

    return (
        // Main Container Box

        <ComponentTheme
            className="game-detail container"
            container
            component={Box} >

            <Scoreboard
                handleScore={handleScore}
                teams={teams}
                teamOneScore={teamOneScore}
                teamTwoScore={teamTwoScore} />


            {/* Player Card Container */}
            <Grid className="scroll-container"
                container item xs={12}
                component={Box}>

                <Grid className="team-one player container" container item xs={6} rowGap={2}>
                    {cardsToRender.teamOne.map(player => (
                        <PlayerCard
                            key={player.player_id}
                            player={player}
                            handleStat={handleStat} />
                    ))}
                </Grid>

                <Grid className="team-two player container" container item xs={6} rowGap={2} >
                    {cardsToRender.teamTwo.map(player => (
                        <PlayerCard
                            key={player.player_id}
                            player={player}
                            handleStat={handleStat} />
                    ))}
                </Grid>

                

            </Grid>
        </ComponentTheme>

    );
}

export default GameDetail;