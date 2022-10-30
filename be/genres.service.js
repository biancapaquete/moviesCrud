const {runQuery} = require('./db.service');

function listGenres() {
    const query = `SELECT * FROM genres`;
    return runQuery(query).then(res => res.rows);
}

function createGenre(genre) {
    const query = {
        text: 'INSERT INTO genres(name) VALUES($1)',
        values: [genre.name]
    };
    return runQuery(query).then(res => {
        if(res.rowCount) {
            return;
        }
        throw new Error('Did not create');
    });
}

function getGenre(genreId) {
    const query = {
        text: 'SELECT * FROM genres WHERE id = $1',
        values: [genreId]
    }
    return runQuery(query).then(res => {
        if(res.rows.length) {
            return res.rows;
        }
        throw new Error('Did not find')
    });
}

function updateGenre(genre) {
    const query = {
        text: 'UPDATE genres SET name=$2 WHERE id=$1',
        values: [genre.id, genre.name]
    };
    return runQuery(query).then(res => {
        if(res.rowCount) {
            return;
        }
        throw new Error('Did not update');
    });
}

function deleteGenre(genreId) {
    const query = {
        text: 'DELETE FROM genres WHERE id=$1',
        values: [genreId]
    };
    return runQuery(query).then(res => {
        if(res.rowCount) {
            return;
        }
        throw new Error('Did not delete');
    });
}

module.exports = {
    listGenres,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre,
}