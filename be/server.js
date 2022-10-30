const dbService = require('./db.service');
const express = require('express');
const server = express();
const genresService = require('./genres.service');
const moviesService = require('./movies.service');

dbService.connectDatabase();

server.use(express.json());

server.get('/', (req, res) => res.send(204));
server.get('/createTables', (req, res) => {
    dbService.createTables().then(() => res.send(204));
});

server.get('/genres', (req, res) => {
    genresService.listGenres().then(genres => {
        res.send(genres);
    });
});
server.post('/genres', (req, res) => {
    const genre = req.body;
    genresService.createGenre(genre).then(() => {
        res.sendStatus(200);
    });
});
server.get('/genres/:id', (req, res) => {
    const genreId = req.params.id;
    genresService.getGenre(genreId).then(genre => {
        res.send(genre);
    });
});
server.post('/genres/:id', (req, res) => {
    const genre = {id: req.params.id, ...req.body};
    genresService.getGenre(genre.id).then(() => {
        genresService.updateGenre(genre).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
    }).catch(err => {
        res.status(404);
        res.send(err);
    });
});
server.delete('/genres/:id', (req, res) => {
    const genreId = req.params.id;
    genresService.getGenre(genreId).then(() => {
        genresService.deleteGenre(genreId).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
    }).catch(err => {
        res.status(404);
        res.send(err);
    });
});

server.get('/movies', (req, res) => {
    moviesService.listMovies().then(movies => {
        res.send(movies);
    });
});
server.post('/movies', (req, res) => {
    const movie = req.body;
    moviesService.createMovie(movie).then(() => {
        res.sendStatus(200);
    });
});
server.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    moviesService.getMovie(movieId).then(movie => {
        res.send(movie);
    });
});
server.post('/movies/:id', (req, res) => {
    const movie = {id: req.params.id, ...req.body};
    moviesService.getMovie(movie.id).then(() => {
        moviesService.updateMovie(movie).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
    }).catch(err => {
        res.status(404);
        res.send(err);
    });
});
server.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    moviesService.getMovie(movieId).then(() => {
        moviesService.deleteMovie(movieId).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
    }).catch(err => {
        res.status(404);
        res.send(err);
    });
});

module.exports = server;