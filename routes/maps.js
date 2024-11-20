/*
 * All routes for Map Data are defined here.
 * Since this file is loaded in server.js into api/maps,
 * these routes are mounted onto /api/maps
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', (req, res) => {
  if (!req.cookies.user_id) {
    mapQueries.getMaps()
      .then(maps => {
        return res.render('index', {maps: maps});
      })
  } else {mapQueries.getMaps()
      .then(maps => {
        return res.render('user_homepage', {maps: maps});
      })}
});

router.get('/:id', (req, res) => {
  const mapId = req.params.id;

mapQueries.getMapById(mapId)
.then(map => {
      res.render('map', { map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/new_part1', (req, res) => {
  res.render('maps_new')
})

router.get('/new_part2', (req, res) => {

})

// router.post('/', (req, res) => {
//   const map = req.body;

//   mapQueries.addMap(map)
//     .then(map => {
//       res.json({ map });
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
