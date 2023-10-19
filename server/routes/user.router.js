const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.post('/uuid', async (req, res) => {

  // Check if current uuid is already in database
  const getUUID = async (userUUID, userPseudonym) => {
    try {
      // Query text for getting UUID from database
      const getQueryText = `
        SELECT *
        FROM "uuid"
        WHERE "uuid" = $1
        ;
      `

      // Query text for posting UUID to database
      const postQueryText = `
        INSERT INTO "uuid" ("uuid", "pseudonym")
        VALUES ($1, $2)
        ;
      `

      // Check database for user UUID
      const response = await pool.query(getQueryText, [userUUID]);

      const uuidResponse = response.rows
    
      // Post unique credentials to database if not already present
      if (uuidResponse.length === 0) {
        await pool.query(postQueryText, [userUUID, userPseudonym]);

        const getUsername = await pool.query(getQueryText, [userUUID])
        await res.send(getUsername.rows);
      } else {
        await res.send(uuidResponse);
      }
    } catch (error) {
      console.log('error in GET UUID', error);
      res.sendStatus(500);
    }
  }
  getUUID(req.body.uuid, req.body.pseudonym);

})

module.exports = router;
