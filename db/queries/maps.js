const db = require('../connection');

const getMaps = () => {
  const queryString = `
  SELECT m.*, 
  u.name as user_name, 
  case when fm.id is NULL THEN false ELSE true END as is_favourite 
  FROM maps m
  JOIN users u
  ON u.id = m.user_id
  LEFT JOIN favourite_maps fm
  ON fm.map_id = m.id
  AND fm.user_id = u.id
  ORDER by lower(u.name), lower(m.title);`;

  return db.query(queryString)
    .then(data => {
      return data.rows;
    });
};

const getMapById = (id) => {
  const queryString = `
  SELECT m.*, 
  u.name as user_name, 
  case when fm.id is NULL THEN false ELSE true END as is_favourite 
  FROM maps m
  JOIN users u
  ON u.id = m.user_id
  LEFT JOIN favourite_maps fm
  ON fm.map_id = m.id
  AND fm.user_id = u.id
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
  (user_id, title, description, photo_url)
  VALUES 
  ($1, $2, $3, $4)
  RETURNING *;
  `;

  const queryParams = [map.user_id, map.title, map.description, map.photo_url];

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
  description = $4,
  photo_url = $5
  WHERE id = $1
  RETURNING *;
  `;

  const queryParams = [map.id, map.user_id, map.title, map.description, map.photo_url];

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

module.exports = {
  getMaps,
  getMapById,
  addMap,
  updateMap,
  deleteMap,
};

