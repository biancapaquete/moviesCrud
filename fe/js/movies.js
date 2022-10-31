let movieForm = document.getElementById('movieForm');
movieForm.addEventListener('submit', createMovie);

let genres = [];

async function createMovie(event) {
    event.preventDefault();

    var movie = {
        name: document.getElementById('movieName').value,
        description: document.getElementById('movieDescription').value,
        releaseDate: document.getElementById('movieReleaseDate').value,
        genreId: document.getElementById('movieGenre').value,
        director: document.getElementById('movieDirector').value,
        actors: document.getElementById('movieActors').value.split(";"),
    }
    await axios.post('http://localhost:3000/movies', movie);
    listMovies();
}

async function deleteMovie(movieID) {
    await axios.delete(`http://localhost:3000/movies/${movieID}`);
    listMovies();
}

function clearMovieList() {
    let movieListBody = document.getElementById('movieList');
    let movieListBodyArr = [...movieListBody.children];
    movieListBodyArr.shift();
    movieListBodyArr.forEach(c => c.remove())
}

async function listMovies() {
    clearMovieList();
    await listGenre();

    let res = await axios.get('http://localhost:3000/movies');
    const movies = res.data;

    let movieListBody = document.getElementById('movieList');

    movies.forEach((movie, i) => {
        movieListBody.insertAdjacentHTML('beforeend',
            `<div class="list-element">
                    <div class="element">
                        <div class="movie-info">
                            <span>${movies[i].name}</span>
                            <span>${movies[i].description}</span>
                            <span>${movies[i].releasedate}</span>
                            <span>${(genres.find(g => g.id === movies[i].genreid)).name}</span>
                            <span>${movies[i].director}</span>
                            <span>${movies[i].actors.join(";")}</span>
                        
                            <div class="actions">
                                <button>Edit Movie</button>
                                <button>Delete Movie</button>
                            </div>
                        
                        </div>
                    </div>
				</div>`)
        let editButton = movieListBody.children[i+1].children[0].children[0].children[6].children[0];
        let deleteButton = movieListBody.children[i+1].children[0].children[0].children[6].children[1];

        editButton.onclick = function () {
            movieListBody.children[i+1].insertAdjacentHTML('beforeend', `

        <div class="edit-genre-form">       
            <div class="form-field">
            <span>Title</span>
            <input id="editMovieName-${movie.id}" type="text" placeholder="Bee Movie" value=""/>
            </div>
            <div class="form-field">
            <span>Description</span>
            <input id="editMovieDescription-${movie.id}" type="text" placeholder="Description" value=""/>
            </div>
            <div class="form-field">
            <span>Release Date</span>
            <input id="editMovieReleaseDate-${movie.id}" type="text" placeholder="dd/mm/yyyy" value=""/>
            </div>
            <div class="form-field">
            <span>Genre</span>
            <select id="editMovieGenre-${movie.id}"></select>
            </div>
            <div class="form-field">
            <span>Director</span>
            <input id="editMovieDirector-${movie.id}" type="text" placeholder="John Doe" value=""/>
            </div>
            <div class="form-field">
            <span>Actors</span>
            <input id="editMovieActors-${movie.id}" type="text" placeholder="John; Mary" value=""/>
            </div>
        </div>
                <button>Save</button>
            `)

            let editGenreSelect = document.getElementById(`editMovieGenre-${movie.id}`)

            genres.forEach((genre, i) => {
                editGenreSelect.insertAdjacentHTML("beforeend", `
        <option value="${genres[i].id}">${genres[i].name}</option>
        `)
            })

            let saveButton = movieListBody.children[i+1].children[2];
            saveButton.onclick = function () {
                var editedMovie = {
                    id: movie.id,
                    name: document.getElementById(`editMovieName-${movie.id}`).value,
                    description: document.getElementById(`editMovieDescription-${movie.id}`).value,
                    releaseDate: document.getElementById(`editMovieReleaseDate-${movie.id}`).value,
                    genreId: document.getElementById(`editMovieGenre-${movie.id}`).value,
                    director: document.getElementById(`editMovieDirector-${movie.id}`).value,
                    actors: document.getElementById(`editMovieActors-${movie.id}`).value.split(";"),
                }
                editMovie(editedMovie);
            }
        }
        deleteButton.onclick = function () {
            deleteMovie(movie.id);
        }
    })
}

async function listGenre() {
    let res = await axios.get('http://localhost:3000/genres');
    genres = res.data;
    let movieGenreSelect = document.getElementById('movieGenre');

    genres.forEach((genre, i) => {
        movieGenreSelect.insertAdjacentHTML("beforeend", `
        <option value="${genres[i].id}">${genres[i].name}</option>
        `)
    })
}


async function editMovie(movie) {
    let movieID = movie.id;
    await axios.post(`http://localhost:3000/movies/${movieID}`, movie);
    listMovies();
}

listMovies();

