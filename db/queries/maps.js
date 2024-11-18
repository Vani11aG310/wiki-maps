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

// const addUser = (user) => {
//   const queryString = `
//   INSERT INTO users
//   (name, email, password)
//   VALUES 
//   ($1, $2, $3)
//   RETURNING *;
//   `;

//   const queryParams = [user.name, user.email, user.password];

//   return db.query(queryString, queryParams)
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       return err.message;
//     });
// };

// const updateUser = (user) => {
//   const queryString = `
//   UPDATE users
//   SET name = $2, 
//   email = $3,
//   password = $4
//   WHERE id = $1
//   RETURNING *;
//   `;

//   const queryParams = [user.id, user.name, user.email, user.password];

//   return db.query(queryString, queryParams)
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       return err.message;
//     });
// };

// const deleteUser = (id) => {
//   const queryString = `
//   DELETE 
//   FROM users
//   WHERE id = $1
//   RETURNING *;
//   `;

//   const queryParams = [id];

//   return db.query(queryString, queryParams)
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       return err.message;
//     });
// };

module.exports = {
  getMaps,
  getMapById,
  // addUser,
  // updateUser,
  // deleteUser,
};

