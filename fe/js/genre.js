document.getElementById('genreForm').addEventListener('submit', createGenre);

async function createGenre(event) {
    event.preventDefault();

    var genre = {
        name: document.getElementById('genreName').value
    }
    await axios.post('http://localhost:3000/genres', genre);
    listGenre();
}

async function deleteGenre(genreID) {
    await axios.delete(`http://localhost:3000/genres/${genreID}`);
    listGenre();
}

function clearGenreList() {
    let genreListBody = document.getElementById('genreList');
    [...genreListBody.children].forEach(c => c.remove())
}

async function listGenre() {
    clearGenreList();
    let res = await axios.get('http://localhost:3000/genres');
    const genres = res.data;

    let genreListBody = document.getElementById('genreList');

    genres.forEach((genre, i) => {
        genreListBody.insertAdjacentHTML('beforeend',
            `<div class="list-element">
                    <div class="element">
                        <div class="genre-info">
                            <span>${genres[i].name}</span>
                        </div>
                        
                        <div class="actions">
                            <button>Edit Genre</button>
                            <button>Delete Genre</button>
                        </div>
                    </div>
				</div>`)
        let editButton = genreListBody.children[i].children[0].children[1].children[0];
        let deleteButton = genreListBody.children[i].children[0].children[1].children[1];

        editButton.onclick = function () {
            genreListBody.children[i].insertAdjacentHTML('beforeend', `
               
                <div class="edit-genre-form">
                    <div class="form-field">
                        <span>Name</span>
                        <input id="editGenreName-${genre.id}" type="text" placeholder="Nome" value=""/>
                    </div>
                </div> 
                <button>Save</button>
            `)
            let saveButton = genreListBody.children[i].children[2];
            saveButton.onclick = function () {
                var editedGenre = {
                    name: document.getElementById(`editGenreName-${genre.id}`).value,
                    id: genre.id
                }
                editGenre(editedGenre);
            }
        }

        deleteButton.onclick = function () {
            deleteGenre(genre.id);
        }
    })
}

async function editGenre(genre){
    let genreID = genre.id;
    await axios.post(`http://localhost:3000/genres/${genreID}`, genre);
    listGenre();
}

listGenre();

