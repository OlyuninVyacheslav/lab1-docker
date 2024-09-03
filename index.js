const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5434,
  user: 'postgres',
  password: '1234',
  database: 'testdb',
});

async function testQueries() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    await client.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      age INT
    );`);

    await client.query(`INSERT INTO users (name, age) VALUES ('user1', 25), ('user2', 30);`);
    console.log("Inserted test data");

    const res = await client.query('SELECT * FROM users;');
    console.log('Data from users table:', res.rows);

  } catch (err) {
    console.error('Error executing queries', err);
  } finally {
    await client.end();
    console.log("Disconnected from PostgreSQL");
  }
}

testQueries();
