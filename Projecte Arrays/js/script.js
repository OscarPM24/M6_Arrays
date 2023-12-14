			
let dades;

let taula = [];

let pokemons = [];
let municipis = [];
let meteorits = [];
let movies = [];


// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;

	dades.forEach(dada => {
		let dadesPokemon = [];
		dadesPokemon[0] = dada.name;
		dadesPokemon[1] = dada.img;
		dadesPokemon[2] = dada.weight;

		pokemons.push(dadesPokemon);
	});


	//console.log(dades)
	//console.log(dades[0].name)
});


// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;

	dades.forEach(dada => {
		municipis.push(dada.municipi_nom);
	});


	//console.log(dades)
	//console.log(dades[0].municipi_nom)

});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;

	dades.forEach(dada => {
		meteorits.push(dada.name);
	});

	
	//console.log(dades)
	//console.log(dades[0].name)

});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;

	dades.forEach(dada => {
		movies.push(dada.title);
	});
	

	//console.log(dades)
	//console.log(dades[0].title)

});

function creaTaula() {
	console.clear()
	for (let i = 0; i < 1000; i++) {
		let dades = [];
		dades[0] = pokemons[i],
		dades[1] = municipis[i],
		dades[2] = meteorits[i],
		dades[3] = movies[i]

		taula[i] = dades;
	};
	console.table(taula);
	let dada = getRadioButton();
	if (dada == 'pokemons') printList(pokemons);
	if (dada == 'municipis') printList(mu);
	if (dada == 'meteorits') printList(meteorits);
	if (dada == 'movies') printList(movies);
}

function refresh() {
	location.reload();
}

function orderList(orden) {
	console.clear();
	if (orden == 'desc') {
		pokemons.sort();
		municipis.sort();
		meteorits.sort();
		movies.sort();
		creaTaula();
	}
	else if (orden == 'asc') {
		pokemons.reverse();
		municipis.reverse();
		meteorits.reverse();
		movies.reverse();
		creaTaula();
	}
}

function searchList() {
	let text = prompt("Introdueix text");
	if (text == null) return printList(getRadioButton());
	
	let resultat = [];
	getRadioButton().forEach(dada => {
		if (dada[0].toLowerCase().includes(text.toLowerCase())) {
			resultat.push(dada);
		}
	});
	if (resultat.length==0) return alert('Not found!');
	printList(resultat);
}

function calcMitjana() {
	let weight = 0;
	// Calcula total pes
	pokemons.forEach(pokemon => {
		weight += parseInt(pokemon[2].substring(0, pokemon[2].length-3));
	});
	// Calcula mitjana pes
	weight /= pokemons.length;
	weight = weight.toFixed(2);
	console.log(weight);
}

function printList(resultat) {
	let divTable = document.getElementById('resultat');
	// table
	let table = '<table>';
	// th
	table += '<tr><th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th></tr>';
	let i = 0;
	resultat.forEach(dada => {
		// tr
		table += '<tr>';
		// td
		table += `<td>${i}</td><td><img src='${dada[1]}'></td><td>${dada[0]}</td><td>${dada[2]}</td>`;
		table += '</tr>';
		i++;
	});
	table += '</table>';
	divTable.innerHTML = table;
}

function getRadioButton() {
	if (document.getElementById("pokemons").checked) return document.getElementById("pokemons").value;
	if (document.getElementById("municipis").checked) return document.getElementById("municipis").value;
	if (document.getElementById("meteorits").checked) return document.getElementById("meteorits").value;
	if (document.getElementById("movies").checked) return document.getElementById("movies").value;

	return alert('Selecciona un tipus de dada');
}