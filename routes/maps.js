/*
 * All routes for Map Data are defined here.
 * Since this file is loaded in server.js into api/maps,
 * these routes are mounted onto /api/maps
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const needle = require('needle');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', (req, res) => {
    mapQueries.getMaps()
      .then(maps => {
        const templateVars = {
          user: req.cookies.user_id,
          maps
        }
        res.render('index', templateVars);
      })
});

router.get('/new_part1', (req, res) => {
  res.render('maps_new_part1')
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


// router.get('/new_part2', (req, res) => {
//   const address = req.body.mapAddress
//   console.log(address)
//   res.render('maps_new_part2')
// })

router.post('/', (req, res) => {
  const map = {
    user_id: req.cookies.user_id,
    title: req.body.mapTitle,
    address: req.body.mapAddress,
    description: req.body.mapDescription,
    photo_url: req.body.mapPhoto
  }
  console.log(map)

  mapQueries.addMap(map)
    .then(map => {
      res.cookie('map_id', map.id)
      const address = map.address;
      const geocodeAPIURL = 'https://singlesearch.alk.com/NA/api/search?';
      const options = {
        authToken: process.env.GEOCODE_API,
        query: address
      }
      needle.request('get', geocodeAPIURL, options, (req, response) => {
        res.render('maps_new_part2', { lat: response.body.Locations[0].Coords.Lat, long: response.body.Locations[0].Coords.Lon })
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

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
