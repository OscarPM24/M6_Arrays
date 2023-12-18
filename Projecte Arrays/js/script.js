// Variable para guardar los datos de los fetch
let dades; 

// Array principal
let taula = [];

// Sub arrays que se guardaran en taula[]
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
		dadesPokemon[0] = dada.name; // nom
		dadesPokemon[1] = dada.img; // imatge
		dadesPokemon[2] = dada.num; // numero
		dadesPokemon[3] = (dada.weight).substring(0, (dada.weight).length-3); // pes (solo número)

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
		dadesMunicipi[0] = dada.municipi_nom; // nom
		dadesMunicipi[1] = dada.municipi_escut; // imatge escudo
		dadesMunicipi[2] = dada.ine; // ine
		dadesMunicipi[3] = dada.nombre_habitants; // habitantes

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
		dadesMeteorit[0] = dada.name; // nom
		dadesMeteorit[1] = dada.id; // id 
		dadesMeteorit[2] = dada.year != undefined ? (dada.year).substring(0, 4) : dada.year; // año (solo número)
		dadesMeteorit[3] = dada.mass; // masa

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
		dadesMovie[0] = dada.title; // titulo
		dadesMovie[1] = dada.genres; // generos
		dadesMovie[2] = dada.year; // año
		dadesMovie[3] = dada.rating; // rating

		movies.push(dadesMovie);
	});

	//console.log(dades)
	//console.log(dades[0].title)
});

/* Función que crea la tabla principal 
   (pos 0 = pokemons, pos 1 = municipis, pos 2 = meteorits, pos 3 = movies) */
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
	printList(getDades()); // Printea la tabla en pantalla
}

/* Función que recarga la página (F5) */
function refresh() {
	location.reload();
}

/* Función que ordena la lista principal.
   Recibe por parámetros si el órden es ascendente o descendente */
function orderList(orden) {
	console.clear();
	// Ordenamos alfabéticamente
	pokemons.sort();
	municipis.sort();
	meteorits.sort();
	movies.sort();

	if (orden == 'asc') { // Volteamos si el orden es ascendente
		pokemons.reverse();
		municipis.reverse();
		meteorits.reverse();
		movies.reverse();
	}
	creaTaula(); // Vuelve a crear la tabla ordenada
}

/* Función que recibe un texto por prompt y devuelve por pantalla 
   los elementos de la lista que contengan el texto */
function searchList() {
	let text = prompt("Introdueix text");
	let dades = [];
	// Foreach que comprueba si el elemento de la list contiene el texto del prompt
	getDades().forEach(dada => {
		if (dada[0].toLowerCase().includes(text.toLowerCase())) {
			dades.push(dada);
		}
	});
	if (dades.length==0) return alert('Not found!'); // Si no ha encontrado nada muestra un alert
	printList(dades); // Printea la tabla en pantalla
}

/* Función que calcula la media del elemento de la lista, y la muestra por pantalla */
function calcMitjana() {
	let mitjana = 0;
	// Calcula total
	getDades().forEach(dada => {
		// dada[3] siempre será el dato que se va a ordenar, sea cual sea el tipo de dato 
		if (dada[3] != undefined) mitjana += parseInt(dada[3]);
	});
	// Calcula mitjana
	mitjana /= getDades().length;
	mitjana = mitjana.toFixed(2);
	
	let p = document.getElementById('mitjana');
	// Comprobamos el tipo de dato elegido para mostrar el tipo de dato (kg, habitants, punts)
	if (getRadioButton() == 'pokemons' || getRadioButton() == 'meteorits') p.innerHTML = mitjana + ' kg';
	if (getRadioButton() == 'municipis')  p.innerHTML = mitjana + ' habitants';
	if (getRadioButton() == 'movies') p.innerHTML = mitjana + ' punts';
}

/* Funcion que devuelve el Radio button que está chequeado */
function getRadioButton() {
	if (document.getElementById("pokemons").checked) return document.getElementById('pokemons').value;
	if (document.getElementById("municipis").checked) return document.getElementById('municipis').value;
	if (document.getElementById("meteorits").checked) return document.getElementById('meteorits').value;
	if (document.getElementById("movies").checked) return document.getElementById('movies').value;	
}

/* Función que devuelve la lista de datos según el Radio button chequeado */
function getDades() {
	let tipusDada = getRadioButton();
	if (tipusDada == 'pokemons') return pokemons;
	if (tipusDada == 'municipis') return municipis;
	if (tipusDada == 'meteorits') return meteorits;
	if (tipusDada == 'movies') return movies;

	return alert('Selecciona un tipus de dada'); // Si no hay ningún radio button chequeado
} 

/* Función que muestra por pantalla los datos de la lista */
function printList(dades) {
	let tipusDada = getRadioButton(); // Cogemos el radio button chequeado
	let divTable = document.getElementById('resultat');
	// table
	let table = '<table>';
	
	// Switch para mostrar los datos de la lista 
	switch (tipusDada) {
		case 'pokemons': // POKEMONS
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
	
		case 'municipis': // MUNICIPIS 
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

		case 'meteorits': // METEORITS
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

		case 'movies': // MOVIES
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