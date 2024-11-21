const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps');
const favouriteMapQueries = require('../db/queries/favourite-maps');
const cookieParser = require('cookie-parser');

router.post('/', (req, res) => {
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
      .then(map => {
        res.redirect(`/maps/${mapId}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  } else {
    favouriteMapQueries.addFavouriteMap(favouriteMap)
      .then(map => {
        res.redirect(`/maps/${mapId}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
});

module.exports = router;
