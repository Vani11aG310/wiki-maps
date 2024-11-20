/*
 * All routes for Place Data are defined here.
 * Since this file is loaded in server.js into api/places,
 * these routes are mounted onto /api/places
 */

const express = require('express');
const router  = express.Router();
const placeQueries = require('../db/queries/places');

router.get('/', (req, res) => {
  placeQueries.getPlaces()
    .then(places => {
      res.json({ places });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const placeId = req.params.id;

placeQueries.getPlaceById(placeId)
.then(place => {
      res.json({ place });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// router.post('/', (req, res) => {
//   const map = req.body;

//   mapQueries.addMap(map)
//     .then(map => {
//       res.render({ map });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// router.post('/:id/delete', (req, res) => {
//   const mapId = req.params.id;

//   mapQueries.deleteMap(mapId)
//     .then(map => {
//       res.json({ map });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// router.post('/:id', (req, res) => {
//   const map = req.body;
//   map.id = req.params.id

//   mapQueries.updateMap(map)
//     .then(map => {
//       res.json({ map });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;
