const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// I need the statistics
//of the offical_score keper
// in a given game
// ordering them by event_count
// FOR the leaderboard page
router.get("/:id", (req, res) => {
  //the given game
  const gameId = req.params.id;

  const queryText = `
SELECT team.team_name AS team_name,
       players.firstname AS firstname,
       players.lastname AS lastname,
       statistics.events AS event,
       COUNT(statistics.events) AS event_count
FROM statistics 
INNER JOIN players ON statistics.player_id = players.id
INNER JOIN team  ON players.team_id = team.id
WHERE statistics.game_id = $1
  AND statistics.is_official = TRUE
GROUP BY team.team_name, firstname, lastname, statistics.events
ORDER BY event_count DESC;`;

  const queryParams = [gameId];

  pool.query(queryText, queryParams)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR with the  GET leaderboard', error);
        res.sendStatus(500);
    })
});

module.exports = router;
