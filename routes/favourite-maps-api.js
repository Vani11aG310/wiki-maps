/*
 * All routes for Map Data are defined here.
 * Since this file is loaded in server.js into api/maps,
 * these routes are mounted onto /api/maps
 */

const express = require('express');
const router  = express.Router();
const favouriteMapQueries = require('../db/queries/favourite-maps');

router.post('/', (req, res) => {
  const favouriteMap = req.body;

  favouriteMapQueries.addFavouriteMap(favouriteMap)
    .then(favouriteMap => {
      res.json({ favouriteMap });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/delete', (req, res) => {
  const favouriteMapId = req.params.id;

  favouriteMapQueries.deleteFavouriteMap(favouriteMapId)
    .then(favouriteMap => {
      res.json({ favouriteMap });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post('/toggle', (req, res) => {
  const id = req.body.id;
  const userId = req.body.user_id;
  const mapId = req.body.map_id;
  const favouriteMap = {
    id: id,
    user_id: userId,
    map_id: mapId,
  }

  // If the Map is marked as a favourite, remove it.
  // Otherwise, add it to the favourites.
  if (id) {
    favouriteMapQueries.deleteFavouriteMap(id)
      .then(favouriteMap => {
        res.json({ favouriteMap });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  } else {
    favouriteMapQueries.addFavouriteMap(favouriteMap)
      .then(favouriteMap => {
        res.json({ favouriteMap });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
});


router.post('/:id', (req, res) => {
  const favouriteMap = req.body;
  favouriteMap.id = req.params.id

  favouriteMapQueries.updateFavouriteMap(favouriteMap)
    .then(favouriteMap => {
      res.json({ favouriteMap });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:user_id/:map_id', (req, res) => {
  const userId = req.params.user_id;
  const mapId = req.params.map_id;

  favouriteMapQueries.isFavouriteMap(userId, mapId)
    .then(favouriteMap => {
      res.json({ favouriteMap });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
