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

const addUser = function (user) {
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

module.exports = {
  getUsers,
  getUserById,
  addUser,
};

