			
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
		dadesPokemon[2] = dada.num;
		dadesPokemon[3] = (dada.weight).substring(0, (dada.weight).length-3);

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
		let dadesMunicipi = [];
		dadesMunicipi[0] = dada.municipi_nom;
		dadesMunicipi[1] = dada.municipi_escut;
		dadesMunicipi[2] = dada.ine;
		dadesMunicipi[3] = dada.nombre_habitants;

		municipis.push(dadesMunicipi);
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
		let dadesMeteorit = [];
		dadesMeteorit[0] = dada.name;
		dadesMeteorit[1] = dada.id;
		dadesMeteorit[2] = dada.year != undefined ? (dada.year).substring(0, 4) : dada.year;
		dadesMeteorit[3] = dada.mass;

		meteorits.push(dadesMeteorit);
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
		let dadesMovie = [];
		dadesMovie[0] = dada.title;
		dadesMovie[1] = dada.genres;
		dadesMovie[2] = dada.year;
		dadesMovie[3] = dada.rating;

		movies.push(dadesMovie);
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
	printList(getDades());
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
		pokemons.sort();
		municipis.sort();
		meteorits.sort();
		movies.sort();

		pokemons.reverse();
		municipis.reverse();
		meteorits.reverse();
		movies.reverse();
		creaTaula();
	}
}

function searchList() {
	let text = prompt("Introdueix text");
	let dades = [];
	getDades().forEach(dada => {
		if (dada[0].toLowerCase().includes(text.toLowerCase())) {
			dades.push(dada);
		}
	});
	if (dades.length==0) return alert('Not found!');
	printList(dades);
}

function calcMitjana() {
	let mitjana = 0;
	// Calcula total
	getDades().forEach(dada => {
		if (dada[3] != undefined) mitjana += parseInt(dada[3]);
	});
	// Calcula mitjana pes
	mitjana /= getDades().length;
	mitjana = mitjana.toFixed(2);
	
	let p = document.getElementById('mitjana');
	if (getRadioButton() == 'pokemons' || getRadioButton() == 'meteorits') p.innerHTML = mitjana + ' kg';
	if (getRadioButton() == 'municipis')  p.innerHTML = mitjana + ' habitants';
	if (getRadioButton() == 'movies') p.innerHTML = mitjana + ' punts';
}

function getRadioButton() {
	if (document.getElementById("pokemons").checked) return document.getElementById('pokemons').value;
	if (document.getElementById("municipis").checked) return document.getElementById('municipis').value;
	if (document.getElementById("meteorits").checked) return document.getElementById('meteorits').value;
	if (document.getElementById("movies").checked) return document.getElementById('movies').value;	
}

function getDades() {
	let tipusDada = getRadioButton();
	if (tipusDada == 'pokemons') return pokemons;
	if (tipusDada == 'municipis') return municipis;
	if (tipusDada == 'meteorits') return meteorits;
	if (tipusDada == 'movies') return movies;

	return alert('Selecciona un tipus de dada');
} 


function printList(dades) {
	let tipusDada = getRadioButton();
	let divTable = document.getElementById('resultat');
	// table
	let table = '<table>';

	switch (tipusDada) {
		case 'pokemons':
			// th
			table += '<tr><th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th></tr>';
			dades.forEach(dada => {
				// tr
				table += '<tr>';
				// td
				table += `<td>${dada[2]}</td><td><img src='${dada[1]}'></td><td>${dada[0]}</td><td>${dada[3]}</td>`;
				table += '</tr>';
			});
		break;
	
		case 'municipis':
			// th
			table += '<tr><th>Nom</th><th>Escut</th><th>INE</th><th>Habitants</th></tr>';
			dades.forEach(dada => {
				// tr
				table += '<tr>';
				// td
				table += `<td>${dada[0]}</td><td><img src='${dada[1]}'></td><td>${dada[2]}</td><td>${dada[3]}</td>`;
				table += '</tr>';
			});
		break;

		case 'meteorits':
			// th
			table += '<tr><th>Nom</th><th>#</th><th>Any</th><th>Masa</th></tr>';
			dades.forEach(dada => {
				// tr
				table += '<tr>';
				// td
				table += `<td>${dada[0]}</td><td>${dada[1]}</td><td>${dada[2]}</td><td>${dada[3]}</td>`;
				table += '</tr>';
			});
		break;

		case 'movies':
			// th
			table += '<tr><th>Title</th><th>Genres</th><th>Any</th><th>Rating</th></tr>';
			dades.forEach(dada => {
				// tr
				table += '<tr>';
				// td
				table += `<td>${dada[0]}</td><td>${dada[1]}</td><td>${dada[2]}</td><td>${dada[3]}</td>`;
				table += '</tr>';
			});
		break;
	}

	table += '</table>';
	divTable.innerHTML = table;
}
