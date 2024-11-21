/*
 * All routes for Place Data are defined here.
 * Since this file is loaded in server.js into api/places,
 * these routes are mounted onto /api/places
 */

const express = require('express');
const router  = express.Router();
const placeQueries = require('../db/queries/places');
const mapQueries = require('../db/queries/maps')
const needle = require('needle');

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

router.post('/', (req, res) => {
  const body = req.body.placesObject;
  const parsedBody= JSON.parse(body);
  console.log(parsedBody);

  const templateVars = {
    map: null,
    lat: null,
    lng: null,
    places: null,
    user: req.cookies.user_id
  }
  
  for (let i = 0; i < parsedBody.length; i++) {
    const place = {
      map_id: req.cookies.map_id,
      title: parsedBody[i].title,
      latitude: parsedBody[i].lat,
      longitude: parsedBody[i].lng
    }
    placeQueries.addPlace(place)
      .then(() => {
        console.log('place submitted');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }
  
  mapQueries.getMapById(req.cookies.map_id)
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
        mapQueries.getPlacesByMap(req.cookies.map_id)
          .then(places => {
            templateVars.places = places;
            res.render('map', templateVars);
          })
      })
    })
});

router.post('/:id/delete', (req, res) => {
  const placeId = req.params.id;

  placeQueries.deletePlace(placeId)
    .then(place => {
      res.json({ place });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {
  const place = req.body;
  place.id = req.params.id

  placeQueries.updatePlace(place)
    .then(place => {
      res.json({ place });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
