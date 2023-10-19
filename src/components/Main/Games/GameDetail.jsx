//! Refactor goal: import helper functions

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useParams } from 'react-router-dom'

// Helper function
import findIDMatch from '../../../utilities/findIDMatch'

// Custom component imports
import PlayerCard from './PlayerCard';
import Scoreboard from './Scoreboard';

// MUI component imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

// Style tools
import { styled } from '@mui/system';

// Component function
export default function GameDetail() {
    const dispatch = useDispatch();

    // Global state variables
    const allPlayers = useSelector((store) => store.playersReducer);
    const allGames = useSelector((store) => store.gamesReducer);
    const stats = useSelector(store => store.stats);
    const user = useSelector(store => store.user);

    // Get game id from route params & format as number
    const { id, gameID = Number(id) } = useParams();

    // Get current game object from global state
    const game = findIDMatch(allGames, gameID, 'game_id', false)

    // Local state
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

    // Helper function to add players to each team and statlines to each player
    const setRosters = (currentGame) => {

        // Shallow copy of local teams state
        const teamsObject = Object.assign({}, teams);

        // Loop through all players
        //! refactor goal: make it DRY
        for (let player of allPlayers) {
            // If player is on team 1 AND is not already in the team one object
            if (player.team_id === currentGame.team1_id && findIDMatch(teamsObject.teamOne.players, player.player_id, "player_id").length === 0) {
                // match existing stats to player
                for (let statline of stats) {
                    // If the statline matches the current player, game, and user
                    if (statline.player_id === player.player_id && statline.game_id === currentGame.game_id && (statline.user_id === user.id || statline.uuid === user.uuid)) {
                        // Assign the statline to the player object
                        player.kills = statline.kills;
                        player.catches = statline.catches;
                        player.outs = statline.outs;
                    }
                }
                // Set playery stats to 0 if no matches were found
                //? Why didn't I do this as an else statement? Review
                player.kills = player.kills || 0;
                player.outs = player.outs || 0;
                player.catches = player.catches || 0;
                teamsObject.teamOne.players.push(player);

                // Same logic as IF statement, but for team 2
            } else if (player.team_id === currentGame.team2_id && findIDMatch(teamsObject.teamTwo.players, player.player_id, "player_id").length === 0) {
                for (let statline of stats) {
                    if (statline.player_id === player.player_id && statline.game_id === currentGame.game_id && (statline.user_id === user.id || statline.uuid === user.pseudonym)) {
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

    // Assign players and stats to teams object on page load
    useEffect(() => {
        setTeams(setRosters(game))
    }, [])

    //! refactor goal: decrement option
    // Handler function for stat tracking
    const handleStat = async (stat, player) => {
        // stat: string matching a key in player.stats

        // Increment the selected stat on player object 
        await player[stat]++;

        // Shallow copy of teams object
        const teamsCopy = Object.assign({}, teams);

        //! refactor goal: make it DRY
        // Loop to find player in teams object
        let counter = 0;
        // Loop through team one players
        for (let roster of teamsCopy.teamOne.players) {
            // Find the player passed in as an argument
            if (player.player_id === roster.player_id) {
                // Replace the player to include the updated stat
                teamsCopy.teamOne.players[counter] = player;
            }
            await counter++
        }
        // same logic as above, but for team two
        counter = 0;
        for (let roster of teamsCopy.teamTwo.players) {
            if (player.player_id === roster.player_id) {
                teamsCopy.teamTwo.players[counter] = player;
            }
            await counter++;
        }

        // Updating local state
        await setTeams(teamsCopy);

        // Send stats to database
        await dispatch({ type: 'SEND_STATS', payload: { game, player, user } })
    }

    // Helper function to 
    const updateScore = async (team, score) => {
        // Loop through all games
        for (let aGame of allGames) {
            // Find current game
            if (game.game_id === aGame.game_id) {
                // Find selected team and update score
                if (team === 1) {
                    aGame.team1_score = score;
                }
                if (team === 2) {
                    aGame.team2_score = score;
                }
            }
        }
        //! Refactor goal: the below route would update the
        //! official game score. A random user shouldn't have 
        //! that power. We could have a table similar to the
        //! statistics table for user score reports.
        // await dispatch({type: 'UPDATE_GAMES', payload: game});

        // For now, keep score updates in global state
        await dispatch({ type: "SET_GAMES", payload: allGames });
    }

    // Helper function to update state for game score
    const handleScore = async (team, increment) => {
        // team one +1
        if (team === "one" && increment === "plus") {
            // Set global state
            await updateScore(1, teamOneScore + 1);
            // Set local state
            await setTeamOneScore(teamOneScore + 1);

        }// team one -1
        if (team === "one" && increment === "minus") {
            // Prevent score below 0
            if (teamOneScore <= 0) {
                await setTeamOneScore(0);
            } else {
                await updateScore(1, teamOneScore - 1);
                await setTeamOneScore(teamOneScore - 1);
            }
        } // team two +1
        if (team === "two" && increment === "plus") {
            await updateScore(2, teamTwoScore + 1);
            await setTeamTwoScore(teamTwoScore + 1);
        } // team two -1
        if (team === "two" && increment === "minus") {
            if (teamTwoScore <= 0) {
                await setTeamTwoScore(0);
            } else {
                await updateScore(2, teamTwoScore - 1);
                await setTeamTwoScore(teamTwoScore - 1);
            }
        }
    }

    // Create array to loop through for rendering player cards
    //! Refactor goal: as far as I can tell, this only exists
    //! to add colors. Would be easier to do this in the database query
    const createPlayersArray = () => {
        const teamArrays = {
            teamOne: [],
            teamTwo: []
        }
        // Add each player to the appropriate array, with team color
        for (let player of teams.teamOne.players) {
            teamArrays.teamOne.push({ ...player, color: teams.teamOne.color })
        }
        for (let player of teams.teamTwo.players) {
            teamArrays.teamTwo.push({ ...player, color: teams.teamTwo.color })
        }
        return teamArrays;
    }
    // Variable to hold above array
    const cardsToRender = createPlayersArray();

    // Component-level styling
    //! Refactor goal: put this in a css file
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

    // JSX to render
    return (
        <ComponentTheme
            className="game-detail container"
            container
            component={Box} >

            {/* SCOREBOARD COMPONENT */}
            <Scoreboard
                handleScore={handleScore}
                teams={teams}
                teamOneScore={teamOneScore}
                teamTwoScore={teamTwoScore} />


            {/* PLAYER CARD CONTAINER */}
            <Grid className="scroll-container"
                container item xs={12}
                component={Box}>

                {/* TEAM ONE CONTAINER */}
                <Grid className="team-one player container" container item xs={6} rowGap={2}>
                    {cardsToRender.teamOne.map(player => (
                        <PlayerCard
                            key={player.player_id}
                            player={player}
                            handleStat={handleStat} />
                    ))}
                </Grid>

                {/* TEAM TWO CONTAINER */}
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