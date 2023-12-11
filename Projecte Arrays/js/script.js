			
// POKEMONS

let dades;
let taula = [];

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;

	//console.log(dades)
	//console.log(dades[0].name)
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;
	
	//console.log(dades)
	//console.log(dades[0].municipi_nom)

});

/*
// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;	
	let i = 0;
	dades.forEach(data => {
		taula[i] += (data.name);
		i++;
	});
	
	//console.log(dades)
	//console.log(dades[0].name)

});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;
	let i = 0;
	dades.forEach(data => {
		taula[i] += (data.title);
		i++;
	});
	
	//console.log(dades)
	//console.log(dades[0].title)

});*/

function mostraTaula() {
	taula.push(data);
	console.table(taula);
}