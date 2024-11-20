const db = require('../connection');

const getPlaces = () => {
  const queryString = `
  SELECT p.*, 
  m.title as map_title,
  u.name as user_name
  FROM places p
  JOIN maps m
  ON m.id = p.map_id
  JOIN users u
  ON u.id = m.user_id
  ORDER by lower(u.name), lower(m.title), p.title;`;

  return db.query(queryString)
    .then(data => {
      return data.rows;
    });
};

const getPlaceById = (id) => {
  const queryString = `
  SELECT p.*, 
  m.title as map_title,
  u.name as user_name
  FROM places p
  JOIN maps m
  ON m.id = p.map_id
  JOIN users u
  ON u.id = m.user_id
  WHERE p.id = $1
  ORDER by lower(u.name), lower(m.title), p.title;`;

  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};

const addPlace = (place) => {
  const queryString = `
  INSERT INTO places
  (map_id, title, latitude, longitude, description, photo_url)
  VALUES 
  ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;

  const queryParams = [place.map_id, place.title, place.latitude, place.longitude, place.description, place.photo_url];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });
};

const updatePlace = (place) => {
  const queryString = `
  UPDATE places
  SET map_id = $2,
  title = $3,
  latitude = $4,
  longitude = $5,
  description = $6,
  photo_url = $7
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [place.id, place.map_id, place.title, place.latitude, place.longitude, place.description, place.photo_url];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const deletePlace = (id) => {
  const queryString = `
  DELETE 
  FROM places
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
  getPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace,
};

