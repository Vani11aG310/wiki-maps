const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const favouriteMapQueries = require('../db/queries/favourite-maps');
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

// Rod
router.get('/:id', (req, res) => {
  const mapId = req.params.id;
  const userId = Number(req.cookies.user_id);
  const templateVars = {
    map: null,
    lat: null,
    lng: null,
    places: null,
    user: userId,
  }
  let address = null;

  mapQueries.getMapById(mapId)
    .then(map => {
       templateVars.map = map;
       address = map.address;

      return favouriteMapQueries.isFavouriteMap(userId, mapId)
    })
    .then(favouriteMap => {
      const isFavouriteMap = favouriteMap ? true : false;
      const favouriteMapId = favouriteMap ? favouriteMap.id : null;
      templateVars.isFavouriteMap = isFavouriteMap;
      templateVars.favouriteMapId = favouriteMapId;

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
