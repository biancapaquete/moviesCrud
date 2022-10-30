const {Client} = require('pg')
const client = new Client({
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
})

function connectDatabase() {
    return client.connect()
        .then(() => console.log('Connected to DB postgres_db on localhost:5432'))
        .catch(err => console.log('Something went wrong with the connection: ', {err}));
}

function disconnectDatabase() {
    return client.end()
        .then(() => console.log('Disconnected to DB postgres_db on localhost:5432'))
        .catch(err => console.log('Something went wrong with the disconnection: ', {err}));
}

async function createTables() {
    const genreQuery = `CREATE TABLE genres
                        (
                            id   SERIAL PRIMARY KEY,
                            name varchar(150) NOT NULL
                        );`
    const moviesQuery = `CREATE TABLE movies
                         (
                             id          SERIAL PRIMARY KEY,
                             name        varchar(150) NOT NULL,
                             description varchar(300) NOT NULL,
                             releaseDate varchar(10)  NOT NULL,
                             genreId     int,
                             director    varchar(150) NOT NULL,
                             actors      varchar(150)[],
                             CONSTRAINT fk_genreId
                                 FOREIGN KEY (genreId)
                                     REFERENCES genres (id)
                                     ON DELETE SET NULL
                         );`

    await client.query('DROP TABLE IF EXISTS genres;');
    await client.query('DROP TABLE IF EXISTS movies;');
    await client.query(genreQuery);
    await client.query(moviesQuery);
}

async function runQuery(query) {
    return await client.query(query)
        .catch(err => console.log('Something went wrong running query: ', err));
}

module.exports = {
    connectDatabase,
    disconnectDatabase,
    createTables,
    runQuery
}