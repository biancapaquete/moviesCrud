
let movieForm = document.getElementById('movieForm');
movieForm.addEventListener('submit', createMovie);

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

async function deleteGenre(genreID) {
    await axios.delete(`http://localhost:3000/genres/${genreID}`);
    listGenre();
}

function clearGenreList() {
    let movieListBody = document.getElementById('genreList');
    [...movieListBody.children].forEach(c => c.remove())
}

async function listMovies() {
    // clearGenreList();
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
                            <span>${movies[i].genreid}</span>
                            <span>${movies[i].director}</span>
                            <span>${movies[i].actors.join(";")}</span>
                        </div>
                        
                        <div class="actions">
                            <button>Edit Movie</button>
                            <button>Delete Movie</button>
                        </div>
                    </div>
				</div>`)
        let editButton = movieListBody.children[i].children[0].children[1].children[0];
        let deleteButton = movieListBody.children[i].children[0].children[1].children[1];

        // editButton.onclick = function () {
        //     movieListBody.children[i].insertAdjacentHTML('beforeend', `
        //
        //         <div class="edit-genre-form">
        //             <div class="form-field">
        //                 <span>Name</span>
        //                 <input id="editMovieName-${movie.id}" type="text" placeholder="Name" value=""/>
        //             </div>
        //         </div>
        //         <button>Save</button>
        //     `)
        //     let saveButton = movieListBody.children[i].children[2];
        //     saveButton.onclick = function () {
        //         var editedGenre = {
        //             name: document.getElementById(`editGenreName-${genre.id}`).value,
        //             id: genre.id
        //         }
        //         editGenre(editedGenre);
        //     }
        // }
        //
        // deleteButton.onclick = function () {
        //     deleteGenre(genre.id);
        // }
    })
}

async function listGenre() {
    let res = await axios.get('http://localhost:3000/genres');
    const genres = res.data;
    let movieGenreSelect = document.getElementById('movieGenre');

    genres.forEach((genre, i) => {
        movieGenreSelect.insertAdjacentHTML("beforeend", `
        <option value="${genres[i].id}">${genres[i].name}</option>
        `)
    })
}


async function editGenre(genre){
    let genreID = genre.id;
    await axios.post(`http://localhost:3000/genres/${genreID}`, genre);
    listGenre();
}

listMovies();

