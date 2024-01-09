// Variable para guardar los datos de los fetch
let dades; 

// Array principal
let taula = [];

// Sub arrays que se guardaran en taula[]
let pokemons = [];
let municipis = [];
let meteorits = [];
let movies = [];

// Polar Chart
let myChart;

let iniciado = false; // Booleano que indica si la tabla se ha iniciado o no
let orderAsc; // Booleano que indica si la tabla se ordena ascendente o descendente
let indexTmp; // Variable que almacena el último index del orderList

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
		dadesPokemon[4] = dada.type;

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
	//console.clear()
	for (let i = 0; i < 1000; i++) {
		let dades = [];
		dades[0] = pokemons[i],
		dades[1] = municipis[i],
		dades[2] = meteorits[i],
		dades[3] = movies[i]

		taula[i] = dades;
	};
	//console.table(taula);
	printList(getDades()); // Printea la tabla en pantalla
}

/* Función que recarga la página (F5) */
function refresh() {
	location.reload();
}

/* Función que ordena la lista principal.
   Recibe por parámetros si el órden es ascendente o descendente */
   function orderList(index) {
	if (index != indexTmp) orderAsc = true;
    // console.clear();
	console.log("index " +index)
    let dades = getDades();
	console.log(isNaN(parseInt(dades[10][index])))
	if (!isNaN(parseInt(dades[10][index]))) { // Si el valor a ordenar es un número
        if (orderAsc) { dades.sort((a, b) => a[index] - b[index]); orderAsc = false; } 
		else { dades.sort((a, b) => b[index] - a[index]); orderAsc = true; }
    } else { // Si el valor a ordenar no es un número
		if (orderAsc) { dades.sort((a, b) => a[index].localeCompare(b[index])); orderAsc = false; } 
		else { dades.sort((a, b) => b[index].localeCompare(a[index])); orderAsc = true; }
	}
	indexTmp = index;
    creaTaula(); // Vuelve a crear la tabla ordenada
}

/* Event Listener que detecta cada vez que escrivimos en la barra de búsqueda 
   y llama a searchList() */
let inputSearch = document.getElementById('txtSearch')
inputSearch.addEventListener('input', (e) => {
	searchList(inputSearch.value)
});

/* Función que recibe el valor del input HTML y devuelve por pantalla 
   los elementos de la lista que contengan ese texto */
function searchList(inputSearch) {
	if (iniciado) {
		let dades = [];
		// Foreach que comprueba si el elemento de la list contiene el texto del input HTML
		getDades().forEach(dada => {
			if (dada[0].toLowerCase().includes(inputSearch.toLowerCase())) {
				dades.push(dada);
			}
		});
		printList(dades); // Printea la tabla en pantalla
	}
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
	
	return null;
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
	if (getRadioButton() == null) return; // Si no hay ningún radio button chequeado no hacemos nada
	let divTable = document.getElementById('resultat');
	// table
	let table = '<table>';
	
	if (dades.length != 0) {
		// Switch para mostrar los datos de la lista 
		switch (tipusDada) {
			case 'pokemons': // POKEMONS
				// th
				table += '<tr><th onclick="orderList(2)">#</th><th>Imatge</th><th onclick="orderList(0)">Nom</th><th onclick="orderList(3)">Pes</th></tr>';
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
				table += '<tr><th onclick="orderList(0)">Nom</th><th>Escut</th><th onclick="orderList(2)">INE</th><th onclick="orderList(3)">Habitants</th></tr>';
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
				table += '<tr><th onclick="orderList(0)">Nom</th><th onclick="orderList(1)">#</th><th onclick="orderList(2)">Year</th><th onclick="orderList(3)">Masa</th></tr>';
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
				table += '<tr><th onclick="orderList(0)">Title</th><th>Genres</th><th onclick="orderList(2)">Year</th><th onclick="orderList(3)">Rating</th></tr>';
				dades.forEach(dada => {
					// tr
					table += '<tr>';
					// td
					table += `<td>${dada[0]}</td><td>${dada[1]}</td><td>${dada[2]}</td><td>${dada[3]}</td>`;
					table += '</tr>';
				});
			break;
		}
	}

	table += '</table>';
	divTable.innerHTML = table;
	iniciado = true;
	
	// Creamos el Polar Chart
	creaChart(dades);
}

/* Función que crea un Polar Chart
   Los datos de los pokemons son el tipo
   Los datos de las movies es el género */
function creaChart(dades) {
	// Arrays para el Polar Chart
	let arrayLabels = []; // Labels
	let arrayLabelsGraf = []; // Valores de Labels
	let borderColor = []; // Color del Borde
	let backgroundColor = []; // Color del Fondo

	if (myChart != null) myChart.destroy(); // Destruimos el Chart si ya existe

	if (getRadioButton() == 'pokemons') {
		// POKEMONS
		arrayLabels = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
		arrayLabelsGraf = new Array(15).fill(0); // Array de 15 posiciones con 0 en cada posición
		dades.forEach(dada => { // Datos pokemon
			dada[4].forEach(tipus => { // Tipos pokemon
				arrayLabelsGraf[arrayLabels.indexOf(tipus)] += 1;
			});
		});
	} else if (getRadioButton() == 'movies') {
		// MOVIES
		arrayLabels = ["Drama", "Crime", "Action", "Thriller", "Biography", "History", "Adventure", "Fantasy", "Western", "Romance", "Sci-Fi", "Mystery", "Comedy", "War", "Family", "Animation", "Musical", "Music", "Horror", "Film-Noir", "Sport"];
		arrayLabelsGraf = new Array(21).fill(0); // Array de 21 posiciones con 0 en cada posición
		dades.forEach(dada => { // Datos movie
			dada[1].forEach(tipus => { // Tipos movie
				arrayLabelsGraf[arrayLabels.indexOf(tipus)] += 1;
			});
		});
	} else return;

	// For que por cada label asigna un color rgb aleatorio al array borderColor
	arrayLabels.forEach(label => {
		borderColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
	});

	// For que por cada borderColor asigna el mismo color con una opacidad del 0.2 en el array backgroundColor
	borderColor.forEach(color => {
		backgroundColor.push(`${color.substring(0, color.length - 1)}, 0.2)`);
	});

	// Variable con los datos del Polar Chart
	const data = {
	  labels: arrayLabels,
	  datasets: [{
		label: 'Gráfico de Datos',
		data: arrayLabelsGraf,
		backgroundColor: backgroundColor,
		borderColor: borderColor
	  }]
	};

	// Variable de configuración del Polar Chart
	const config = {
	  type: 'polarArea',
	  data: data,
	  options: {}
  	};

	// Polar Chart
	myChart = new Chart(
	  document.getElementById('myChart'),
	  config
	);
} 