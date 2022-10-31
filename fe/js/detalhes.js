const token = 'a45458b3';

function showMovie(){
	var movieID = sessionStorage.getItem('movieID');

	axios.get('http://www.omdbapi.com/?i=' + movieID + '&apikey=' + token)
	  .then(function (response) {
		var movie = response.data;
		console.log(movie);
		var movieHTML = `
			<div class="col-md-6">
				<img src="${movie.Poster}" class="img-responsive">
					<h3><strong>${movie.Title}</strong></h3>
			</div>
			<div class="col-md-6">
				<div class="well clearfix">
					<ul class="list-group">
						<li class="list-group-item"><strong>Gênero: </strong>${movie.Genre}</li>
						<li class="list-group-item"><strong>Lançamento: </strong>${movie.Released}</li>
						<li class="list-group-item"><strong>Duração: </strong>${movie.Runtime}</li>
						<li class="list-group-item"><strong>Idiomas: </strong>${movie.Language}</li>
						<li class="list-group-item"><strong>Prêmios: </strong>${movie.Awards}</li>
						<li class="list-group-item"><strong>Atores: </strong>${movie.Actors}</li>
					</ul>
					
					<h3>Descrição</h3>
					${movie.Plot}
					<hr>
					<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-success" pull-left>Ver no IMDB</a>
					<a href="index.html" target="_blank" class="btn btn-outline-secondary" pull-right>Voltar a Pesquisar</a>
					
				</div>
			</div>
		`

		document.getElementById('movies').innerHTML = movieHTML;
	  })
	  
	  .catch(function (error) {
		console.log(error);
	  });
}