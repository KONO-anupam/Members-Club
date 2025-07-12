const path = require('path');
const fs = require('fs');
const db = require('./index');

(async () => {
  try {
    const tableFilePath = path.join(__dirname, 'schemas.sql');
    const seedsFilePath = path.join(__dirname, 'seeds.sql');

    fs.readFile(tableFilePath, async (err, data) => {
      if (err) throw err;
      await db.query(data.toLocaleString());
    });

    fs.readFile(seedsFilePath, async (err, data) => {
      if (err) throw err;
      await db.query(data.toLocaleString());
    });
  } catch (error) {
    console.error(error);
  }
})();