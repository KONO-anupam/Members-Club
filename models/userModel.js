const db = require('../database/index');

/*
* @DESC Get all users
*/
const findAll = async () => {

  const { rows } = await db.query('SELECT * FROM users;');
  return rows;
};
/*
* @DESC Get user by ID
*/

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

/*
* @DESC Get user by username
*/

const findByUsername = async (username) => {
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0];
};

/*
* @DESC Get user by email
*/
const findByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};
/*
* @DESC Insert a new user
*/
const create = async (data) => {

  const query = `
    INSERT INTO
      users (id, role_id, first_name, last_name, username, email, password, deactivated)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8);
  `;
  const { id, role_id, firstName, lastName, username, email, hashedPassword, deactivated } = data;
  await db.query(query, [id, role_id, firstName, lastName, username, email, hashedPassword, deactivated]);
};
/*
* @DESC Update a user by ID
*/
const updateById = async (id, data) => {

  const query = `
    UPDATE
      users
    SET
      role_id = $1,
      first_name = $2,
      last_name = $3,
      username = $4,
      email = $5,
      password = $6,
      deactivated = $7,
      updated_at = $8
    WHERE
      id = $9;
  `;
  const { role_id, firstName, lastName, username, email, password, deactivated } = data;
  await db.query(query, [role_id, firstName, lastName, username, email, password, deactivated, new Date(), id]);
};

/*
* @DESC Update a user role by ID
*/
const updateRoleById = async (id, role_id) => {
  const query = `
    UPDATE
      users
    SET
      role_id = $1
    WHERE
      id = $2
  `;
  await db.query(query, [role_id, id]);
}

/*
* @DESC Delete user by ID
*/
const deleteById = async (id) => {
  await db.query('DELETE FROM users WHERE = $1', [id]);
}


const activateById = async (id) => {
  await db.query('UPDATE users SET deactivated = $1 WHERE id = $2', [false, id]);
}

const deactivateById = async (id) => {
  await db.query('UPDATE users SET deactivated = $1 WHERE id = $2', [true, id]);
}

module.exports = {
  findAll,
  findById,
  findByUsername,
  findByEmail,
  create,
  updateById,
  updateRoleById,
  deleteById,
  activateById,
  deactivateById
};