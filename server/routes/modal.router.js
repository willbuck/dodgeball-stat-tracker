const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/:id', (req,res) => {


    const queryText = `SELECT * FROM team WHERE id = $1;`


    const queryParams = [req.params.id]
    pool.query(queryText, queryParams)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;