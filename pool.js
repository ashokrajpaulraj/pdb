const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Test1',
    password: 'admin',
    port: 5432,
});

//error event handler for pool
pool.on('error', (err, client) => {
    console.error('Error:', err);
});

const query = `
SELECT *
FROM users
`;

pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(query, (err, res) => {
        done();
        if (err) {
            console.log(err.stack);
        } else {
            for (let row of res.rows) {
                console.log(row);
            }
        }
    });
});