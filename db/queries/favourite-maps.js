const db = require('../connection');

const addFavouriteMap = (favouriteMap) => {
  const queryString = `
  INSERT INTO favourite_maps
  (user_id, map_id)
  VALUES 
  ($1, $2)
  RETURNING *;
  `;

  const queryParams = [favouriteMap.user_id, favouriteMap.map_id];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const updateFavouriteMap = (favouriteMap) => {
  const queryString = `
  UPDATE favourite_maps
  SET user_id = $2,
  map_id = $3
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [favouriteMap.id, favouriteMap.user_id, favouriteMap.map_id];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const deleteFavouriteMap = (id) => {
  const queryString = `
  DELETE 
  FROM favourite_maps
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

module.exports = {
  addFavouriteMap,
  updateFavouriteMap,
  deleteFavouriteMap,
};

