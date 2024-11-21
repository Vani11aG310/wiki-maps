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

/**
 * Fake the login process by setting the plain text cookie.
 * Redirect to the Maps page.
 */
router.get('/login', (req, res) => {
  res.cookie('user_id', process.env.USER_ID);
  res.redirect('/maps');
});

/**
 * Logout - Clear the cookie and redirect to the Maps page.
 */
router.get('/logout', (req, res) => {
  res.clearCookie('user_id');

  res.redirect('/maps');
});

module.exports = router;
