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
          user: Number(req.cookies.user_id),
          maps
        }
        res.render('maps', templateVars);
      })
});


router.get('/new_part1', (req, res) => {
  res.render('maps_new_part1', { user: Number(req.cookies.user_id)})
});


router.get('/:id', (req, res) => {
  const mapId = req.params.id;
  const templateVars = {
    map: null,
    lat: null,
    lng: null,
    places: null,
    user: Number(req.cookies.user_id)
  }
  mapQueries.getMapById(mapId)
    .then(map => {
      templateVars.map = map;
      const address = map.address;
      const geocodeAPIURL = 'https://singlesearch.alk.com/NA/api/search?';
      const options = {
        authToken: process.env.GEOCODE_API,
        query: address
      }
      needle.request('get', geocodeAPIURL, options, (request, response) => {
        templateVars.lat = response.body.Locations[0].Coords.Lat;
        templateVars.lng = response.body.Locations[0].Coords.Lon;
        mapQueries.getPlacesByMap(mapId)
          .then(places => {
            templateVars.places = places;
            res.render('map', templateVars);
          })
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
router.get('/:id/update', (req, res) => {
  res.cookie('map_id', req.params.id)
  const templateVars = {
    user: req.cookies.user_id
  }
  res.render('maps', templateVars)
});

router.post('/', (req, res) => {
  const map = {
    user_id: Number(req.cookies.user_id),
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
        res.render('maps_new_part2', { lat: response.body.Locations[0].Coords.Lat, long: response.body.Locations[0].Coords.Lon, user: map.user_id })
      })
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
//       res.json({ map });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });


// router.get('/new_part2', (req, res) => {
//   const address = req.body.mapAddress
//   console.log(address)
//   res.render('maps_new_part2')
// })


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


module.exports = router;
