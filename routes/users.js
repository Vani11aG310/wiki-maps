/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser');
const userQueries = require('../db/queries/users')
router.use(cookieParser());


router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:userId/maps', (req, res) => {
  const userId = req.cookies.user_id;
  userQueries.getMapsByUser(userId)
    .then(maps => {
      const templateVars = {
        user: req.cookies.user_id,
        maps
      }
      res.render('index', templateVars);
    })
});

router.get('/:userId/favourite-maps', (req, res) => {
  const userId = req.cookies.user_id;
  userQueries.getFavouriteMapsByUser(userId)
    .then(maps => {
      const templateVars = {
        user: req.cookies.user_id,
        maps
      }
      res.render('index', templateVars);
    })
});

module.exports = router;
