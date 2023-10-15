const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `
    SELECT 
        "statistics"."id" AS "id",
        "game_id",
        "player_id",
        "kills",
        "outs",
        "catches",
        "is_official",
        "user_id",
        "uuid",
        "players"."team_id" AS "team_id"
    FROM 
        "statistics"
        JOIN "players"
            ON "statistics"."player_id" = "players"."id"
    ;
    `

    pool.query(queryText)
    .then( response => {
        res.send(response.rows);
    })
    .catch( error => {
        console.log('error in stats router GET:', error);
        res.sendStatus(500);
    })
})

router.put('/', async (req, res) => {
    const {game, player, user} = req.body;

    const connection = await pool.connect();

    let userValue;
    let userPutText;
    let userGetText;

    if (user.id) {
        userValue = user.id;
        userGetText = `"user_id" = $3`
        userPutText = `"user_id" = $6`
    } else {
        userValue = user.uuid_index;
        userGetText = `"uuid" = $3`
        userPutText = `"uuid" = $6`
    }

    const existText = `
        SELECT * FROM "statistics"
        WHERE 
            "statistics"."player_id" = $1
            AND "game_id" = $2 
            AND ${userGetText};
    `
    const existValues = [player.player_id, game.game_id, userValue]

    //! If row does not exist, insert it 
    const insertRowText = `
    INSERT INTO "statistics" 
        ("kills",
        "catches", 
        "outs", 
        "player_id",
        "game_id",
        "user_id",
        "uuid",
        "is_official")
    VALUES ($1, $2, $3, $4, $5, $6, $7, false);
    `
    const insertRowValues = [player.kills, player.catches, player.outs, player.player_id, game.game_id, user.id, user.uuid_index]

    //! If row does exist, update it
    const updateRowText = `
        UPDATE "statistics" 
        SET 
            "kills" = $1, 
            "catches" = $2, 
            "outs" = $3 
        WHERE 
            "statistics"."player_id" = $4
            AND "game_id" = $5 
            AND ${userPutText};
    `
    const updateRowValues = [player.kills, player.catches, player.outs, player.player_id, game.game_id, userValue]



    try {
        await connection.query('BEGIN');

        const existCheck = await connection.query(existText, existValues);

        if (existCheck.rows.length === 0) {
            await connection.query(insertRowText, insertRowValues)
        } else if (existCheck.rows.length === 1) {
            await connection.query(updateRowText, updateRowValues);
        } else {
            console.log('unforeseen outcome from GET:', existCheck.rows);
        }

        await connection.query('COMMIT');
        res.sendStatus(200);

    } catch (error) {
        await connection.query('ROLLBACK')
        console.log('error in stats transaction:', error);
        res.sendStatus(500);
    } finally {
        connection.release();
        
    }
    

    
})

module.exports = router