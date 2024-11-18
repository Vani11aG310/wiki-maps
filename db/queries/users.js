const db = require('../connection');

const getUsers = () => {
  const queryString = `
    SELECT * 
    FROM users;`;

  return db.query(queryString)
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  const queryString = `
    SELECT * 
    FROM users 
    WHERE id = $1`;
  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getUsers,
  getUserById
};

