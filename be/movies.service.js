const {runQuery} = require('./db.service');

function listMovies() {
    const query = `SELECT *
                   FROM movies`;
    return runQuery(query).then(res => res.rows);
}

function createMovie(movie) {
    const query = {
        text: `INSERT INTO movies(name, description, releaseDate, genreId, director, actors)
               VALUES ($1, $2, $3, $4, $5, $6)`,
        values: [movie.name, movie.description, movie.releaseDate, movie.genreId, movie.director, movie.actors]
    };
    return runQuery(query).then(res => {
        if (res.rowCount) {
            return;
        }
        throw new Error('Did not create');
    });
}

function getMovie(movieId) {
    const query = {
        text: 'SELECT * FROM movies WHERE id = $1',
        values: [movieId]
    }
    return runQuery(query).then(res => {
        if(res.rows.length) {
            return res.rows;
        }
        throw new Error('Did not find');
    });
}

function updateMovie(movie) {
    const query = {
        text: `UPDATE movies
               SET name=$2,
                   description=$3,
                   releaseDate=$4,
                   genreId=$5,
                   director=$6,
                   actors=$7
               WHERE id=$1`,
        values: [
            movie.id,
            movie.name,
            movie.description,
            movie.releaseDate,
            movie.genreId,
            movie.director,
            movie.actors
        ]
    };
    return runQuery(query).then(res => {
        if (res.rowCount) {
            return;
        }
        throw new Error('Did not update');
    });
}

function deleteMovie(movieId) {
    const query = {
        text: 'DELETE FROM movies WHERE id=$1',
        values: [movieId]
    };
    return runQuery(query).then(res => {
        if (res.rowCount) {
            return;
        }
        throw new Error('Did not delete');
    });
}

// createMovie({
//     name: 'filme 1',
//     description: 'o primeiro filme',
//     releaseDate: '01/01/2000',
//     genreId: 1,
//     director: 'Tarantino',
//     actors: ['Samuel', 'Ashton', 'Chris'],
// })

module.exports = {
    listMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
}