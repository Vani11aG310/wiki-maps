/*
 * All routes for Map Data are defined here.
 * Since this file is loaded in server.js into api/maps,
 * these routes are mounted onto /api/maps
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  mapQueries.getMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const mapId = req.params.id;

mapQueries.getMapById(mapId)
.then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// router.post('/', (req, res) => {
//   const user = req.body;

//   userQueries.addUser(user)
//     .then(user => {
//       res.json({ user });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// router.post('/:id/delete', (req, res) => {
//   const userId = req.params.id;

//   userQueries.deleteUser(userId)
//     .then(user => {
//       res.json({ user });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// router.post('/:id', (req, res) => {
//   const user = req.body;
//   user.id = req.params.id

//   userQueries.updateUser(user)
//     .then(user => {
//       res.json({ user });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;
