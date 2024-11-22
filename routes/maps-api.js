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

router.get('/:id/places', (req, res) => {
  const mapId = req.params.id;

  mapQueries.getPlacesByMap(mapId)
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

router.post('/', (req, res) => {
  const map = req.body;

  mapQueries.addMap(map)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/delete', (req, res) => {
  const mapId = req.params.id;

  mapQueries.deleteMap(mapId)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {
  const map = req.body;
  map.id = req.params.id

  mapQueries.updateMap(map)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
