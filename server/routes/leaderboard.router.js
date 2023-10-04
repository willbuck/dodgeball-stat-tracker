const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// I need the statistics
//of the offical_score keper
// in a given tournament
// ordering them by event_count
// FOR the leaderboard page
router.get("/:id", (req, res) => {
  //the given tournament
  const tournamentId = req.params.id;

  const queryText = `
  SELECT 
    players.id AS player_id,
    players.firstname AS firstname,
    players.lastname AS lastname,
    team.team_name,
    COUNT(statistics.events) FILTER (WHERE statistics.events = 'kill') AS "kills",
    COUNT(statistics.events) FILTER (WHERE statistics.events = 'catch') AS "catches",
    COUNT(statistics.events) FILTER (WHERE statistics.events = 'out') AS "outs"
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
  GROUP BY
    players.id,
    players.firstname,
    players.lastname,
    team.team_name
  ORDER BY COUNT(statistics.events) DESC;`;

  const queryParams = [tournamentId];

  pool
    .query(queryText, queryParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("ERROR with the  GET leaderboard", error);
      res.sendStatus(500);
    });
});

module.exports = router;
