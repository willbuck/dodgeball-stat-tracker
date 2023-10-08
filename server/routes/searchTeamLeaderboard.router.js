const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


router.get('/:tournamentId/:teamId', (req,res) => {
    const tournamentId = req.params.tournamentId;
    const teamId = req.params.teamId;

    const queryParams = [tournamentId, teamId];

    const queryText = `
    SELECT 
        players.id AS player_id,
        players.firstname AS firstname,
        players.lastname AS lastname,
        team.team_name,
        team.id AS team_id,
        COALESCE(SUM (statistics.kills),0) AS "kills",
        COALESCE(SUM (statistics.catches),0) AS "catches",
        COALESCE(SUM (statistics.outs),0) AS "outs"
    FROM
        game 
    JOIN tournament ON game.tournament_id = tournament.id
    JOIN
        team  ON game.team1_id = team.id OR game.team2_id = team.id
    JOIN
        players  ON team.id = players.team_id
    LEFT JOIN
        statistics ON game.id = statistics.game_id 
    AND 
	    players.id = statistics.player_id 
    AND 
	    statistics.is_official = 'TRUE'
    WHERE
	    tournament.id = $1
    AND 
	    team.id = $2
    GROUP BY
        players.id,
        players.firstname,
        players.lastname,
        team.team_name,
        team.id
    ORDER BY COALESCE(SUM(statistics.kills),0) DESC;`

    pool.query(queryText, queryParams)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            res.sendStatus(500);
            console.log('ERROR with the GET searchTeam', error);
        })
})

module.exports = router;