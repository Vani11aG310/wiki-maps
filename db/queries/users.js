const db = require('../connection');

const getUsers = () => {
  const queryString = `
    SELECT * 
    FROM users
    ORDER by name;`;

  return db.query(queryString)
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  const queryString = `
    SELECT * 
    FROM users 
    WHERE id = $1;`;
  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};

const addUser = (user) => {
  const queryString = `
  INSERT INTO users
  (name, email, password)
  VALUES 
  ($1, $2, $3)
  RETURNING *;
  `;

  const queryParms = [user.name, user.email, user.password];

  return db.query(queryString, queryParms)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const updateUser = (user) => {
  const queryString = `
  UPDATE users
  SET name = $2, 
  email = $3,
  password = $4
  WHERE id = $1
  RETURNING *;
  `;

  const queryParms = [user.id, user.name, user.email, user.password];

  return db.query(queryString, queryParms)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
};

