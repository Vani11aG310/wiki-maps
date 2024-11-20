const db = require('../connection');

const getMaps = () => {
  const queryString = `
  SELECT m.*, 
  u.name as user_name
  FROM maps m
  JOIN users u
  ON u.id = m.user_id
  ORDER by lower(u.name), lower(m.title);`;

  return db.query(queryString)
    .then(data => {
      return data.rows;
    });
};

const getMapById = (id) => {
  const queryString = `
  SELECT m.*, 
  u.name as user_name
  FROM maps m
  JOIN users u
  ON u.id = m.user_id
  WHERE m.id = $1
  ORDER by lower(u.name), lower(m.title);`;

  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};

const addMap = (map) => {
  const queryString = `
  INSERT INTO maps
  (user_id, title, address, description, photo_url)
  VALUES 
  ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  const queryParams = [map.user_id, map.title, map.address, map.description, map.photo_url];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const updateMap = (map) => {
  const queryString = `
  UPDATE maps
  SET user_id = $2,
  title = $3,
  address = $4
  description = $5,
  photo_url = $6
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [map.id, map.user_id, map.title, map.address, map.description, map.photo_url];

  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const deleteMap = (id) => {
  const queryString = `
  DELETE 
  FROM maps
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

const getPlacesByMap = (id) => {
  const queryString = `
  SELECT p.*, 
  u.name as user_name,
  m.title as map_title
  FROM places p
  JOIN maps m
  ON m.id = p.map_id
  JOIN users u
  ON u.id = m.user_id
  WHERE m.id = $1
  ORDER by lower(u.name), lower(m.title), p.title;`;

  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getMaps,
  getMapById,
  addMap,
  updateMap,
  deleteMap,
  getPlacesByMap,
};

