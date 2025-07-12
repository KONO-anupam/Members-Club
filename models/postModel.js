const db = require('../database/index');

/*
* @DESC Get all posts
*/
const findAll = async () => {
  const query = `
    SELECT 
      p.id, p.user_id, u.first_name, u.username, p.title, p.message, p.created_at, p.updated_at
    FROM 
      posts as p
    INNER JOIN 
      users as u
    ON
      p.user_id = u.id;
  `
  const { rows } = await db.query(query);
  return rows;
};
/*
* @DESC Get a post by ID
*/

const findById = async (id) => {
  const query = `
    SELECT 
      p.id, p.user_id, u.first_name, u.username, p.title, p.message, p.created_at, p.updated_at
    FROM 
      posts as p
    INNER JOIN 
      users as u
    ON
      p.user_id = u.id
    WHERE
      p.id = $1;
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

/*
* @DESC Get post by user_id
*/

const findByUsername = async (user_id) => {
  const { rows } = await db.query('SELECT * FROM posts WHERE user_id = $1', [user_id]);
  return rows[0];
};

/*
* @DESC Insert a new post
*/
const create = async (data) => {
  const query = `
    INSERT INTO
      posts (id, user_id, title, message)
    VALUES 
      ($1, $2, $3, $4);
  `;
  const { id, user_id, title, message } = data;
  await db.query(query, [id, user_id, title, message]);
};

/*
* @DESC Update a post by ID
*/
const updateById = async (id, data) => {
  const query = `
    UPDATE
      posts
    SET
      title = $1,
      message = $2,
      updated_at = $3
    WHERE
      id = $4;
  `;
  const { title, message } = data;
  await db.query(query, [title, message, new Date(), id]);
};

/*
* @DESC Delete a post by ID
*/
const deleteById = async (id) => {
  await db.query('DELETE FROM posts WHERE = $1', [id]);
}

module.exports = {
  findAll,
  findById,
  findByUsername,
  create,
  updateById,
  deleteById,
};