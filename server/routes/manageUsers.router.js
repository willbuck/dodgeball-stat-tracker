const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', (req,res) => {

    const queryText = `SELECT * FROM "user";`



    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

router.put('/:id', (req,res) => {
    console.log("made it", req.params)
    console.log("id", req.params.id)
    console.log("auth", req.params.auth)

    const queryText = `UPDATE "user"
    SET "auth_level" = $1
    WHERE id = $2;`


    const queryParams = [req.body.auth, req.params.id];
    pool.query(queryText, queryParams)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;