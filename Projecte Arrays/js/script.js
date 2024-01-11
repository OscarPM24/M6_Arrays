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

// Arrays para el Polar Chart
let arrayLabels = []; // Labels
let arrayLabelsGraf = []; // Valores de Labels
let borderColor = []; // Color del Borde
let backgroundColor = []; // Color del Fondo


let iniciado = false; // Booleano que indica si el chart se ha iniciado o no
let orderAsc; // Booleano que indica si la tabla se ordena ascendente o descendente
let ultimaDada; // Variable que almacena el último dato ordenado

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;

	dades.forEach(dada => {
		let dadesPokemon = {
			name: dada.name, // nombre
			img: dada.img, // imagen pokemon
			num: dada.num, // número
			weight: (dada.weight).substring(0, (dada.weight).length-3), // peso (sólo número)
			type: dada.type
		};

		pokemons.push(dadesPokemon);
	});
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;

	dades.forEach(dada => {
		let dadesMunicipi = {
		name: dada.municipi_nom, // nombre
		escut: dada.municipi_escut, // imagen escudo
		ine: dada.ine, // ine
		habitants: dada.nombre_habitants // habitantes
		};

		municipis.push(dadesMunicipi);
	});
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;

	dades.forEach(dada => {
		let dadesMeteorit = {
		name: dada.name, // nom
		id: dada.id, // id 
		year: dada.year != undefined ? (dada.year).substring(0, 4) : dada.year, // año (sólo número)
		mass: dada.mass != undefined ? dada.mass : 0 // masa (si es undefined, le ponemos 0)
		};

		meteorits.push(dadesMeteorit);
	});
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;

	dades.forEach(dada => {
		let dadesMovie = {
		name: dada.title, // titulo
		genres: dada.genres, // generos
		year: dada.year, // año
		rating: dada.rating // rating
		};

		movies.push(dadesMovie);
	});
});

/* Función que crea la tabla principal 
   (pos 0 = pokemons, pos 1 = municipis, pos 2 = meteorits, pos 3 = movies) */
function creaTaula() {
	for (let i = 0; i < 1000; i++) {
		let dades = [];
		dades[0] = pokemons[i],
		dades[1] = municipis[i],
		dades[2] = meteorits[i],
		dades[3] = movies[i]

		taula[i] = dades;
	};
	
	printList(getDades()); // Printea la tabla en pantalla
}

/* Función que recarga la página (F5) */
function refresh() { location.reload(); }

/* Función que ordena la lista principal.
   Recibe por parámetros si el órden es ascendente o descendente */
   function orderList(dada) {
	if (dada != ultimaDada) orderAsc = true;
    let dades = getDades();
	if (!isNaN(parseInt(dades[0][dada]))) { // Si el valor a ordenar es un número
        if (orderAsc) { dades.sort((a, b) => a[dada] - b[dada]); orderAsc = false; } 
		else { dades.sort((a, b) => b[dada] - a[dada]); orderAsc = true; }
    } else { // Si el valor a ordenar no es un número
		if (orderAsc) { dades.sort((a, b) => a[dada].localeCompare(b[dada])); orderAsc = false; } 
		else { dades.sort((a, b) => b[dada].localeCompare(a[dada])); orderAsc = true; }
	}
	ultimaDada = dada;
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
			if (dada.name.toLowerCase().includes(inputSearch.toLowerCase())) {
				dades.push(dada);
			}
		});
		printList(dades); // Printea la tabla en pantalla
	}
}

/* Función que calcula la media del elemento de la lista, y la muestra por pantalla */
function calcMitjana(dades) {
	let mitjana = 0;
	let radio = getRadioButton();
	let tipusDada;
	if (radio == 'pokemons') tipusDada = "weight";
	if (radio == 'meteorits') tipusDada = "mass";
	if (radio == 'municipis') tipusDada = "habitants";
	if (radio == 'movies') tipusDada = "rating";

	// Calcula total
	dades.forEach(dada => { mitjana += parseInt(dada[tipusDada]); });
	
	// Calcula mitjana
	mitjana /= dades.length;
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
				table += `<tr><th onclick="orderList('num')">#</th><th>Imatge</th><th onclick="orderList('name')">Nom</th><th onclick="orderList('weight')">Pes</th></tr>`;
				dades.forEach(dada => {
					// tr
					table += '<tr>';
					// td
					table += `<td>${dada.num}</td><td><img src='${dada.img}'></td><td>${dada.name}</td><td>${dada.weight}</td>`;
				});
			break;
		
			case 'municipis': // MUNICIPIS 
				// th
				table += `<tr><th onclick="orderList('name')">Nom</th><th>Escut</th><th onclick="orderList('ine')">INE</th><th onclick="orderList('habitants')">Habitants</th></tr>`;
				dades.forEach(dada => {
					// tr
					table += '<tr>';
					// td
					table += `<td>${dada.name}</td><td><img src='${dada.escut}'></td><td>${dada.ine}</td><td>${dada.habitants}</td>`;
				});
			break;

			case 'meteorits': // METEORITS
				// th
				table += `<tr><th onclick="orderList('name')">Nom</th><th onclick="orderList('id')">#</th><th onclick="orderList('year')">Year</th><th onclick="orderList('mass')">Masa</th></tr>`;
				dades.forEach(dada => {
					// tr
					table += '<tr>';
					// td
					table += `<td>${dada.name}</td><td>${dada.id}</td><td>${dada.year}</td><td>${dada.mass}</td>`;
				});
			break;
			
			case 'movies': // MOVIES
				// th
				table += `<tr><th onclick="orderList('name')">Title</th><th>Genres</th><th onclick="orderList('year')">Year</th><th onclick="orderList('rating')">Rating</th></tr>`;
				dades.forEach(dada => {
					// tr
					table += '<tr>';
					// td
					table += `<td>${dada.name}</td><td>${dada.genres}</td><td>${dada.year}</td><td>${dada.rating}</td>`;
				});
			break;
		}
	}
	table += '</tr>';
	table += '</table>';
	divTable.innerHTML = table;

	// Creamos el Polar Chart
	creaChart(dades);
}	

/* Función que crea un Polar Chart
   Los datos de los pokemons son el tipo
   Los datos de las movies es el género */
function creaChart(dades) {
	if (myChart != null) myChart.destroy(); // Destruimos el Chart si ya existe

	if (getRadioButton() == 'pokemons') {
		// POKEMONS
		arrayLabels = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
		arrayLabelsGraf = new Array(15).fill(0); // Array de 15 posiciones con 0 en cada posición
		dades.forEach(dada => { // Datos pokemon
			dada.type.forEach(tipus => { // Tipos pokemon
				arrayLabelsGraf[arrayLabels.indexOf(tipus)] += 1;
			});
		});
	} else if (getRadioButton() == 'movies') {
		// MOVIES
		arrayLabels = ["Drama", "Crime", "Action", "Thriller", "Biography", "History", "Adventure", "Fantasy", "Western", "Romance", "Sci-Fi", "Mystery", "Comedy", "War", "Family", "Animation", "Musical", "Music", "Horror", "Film-Noir", "Sport"];
		arrayLabelsGraf = new Array(21).fill(0); // Array de 21 posiciones con 0 en cada posición
		dades.forEach(dada => { // Datos movie
			dada.genres.forEach(tipus => { // Generos movie
				arrayLabelsGraf[arrayLabels.indexOf(tipus)] += 1;
			});
		});
	} else return;

	// Crea los colores del chart sólo cuando éste se inicia por primera vez
	if (!iniciado) {
		// For que por cada label asigna un color rgb aleatorio al array borderColor
		arrayLabels.forEach(label => {
			borderColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
		});

		// For que por cada borderColor asigna el mismo color con una opacidad del 0.2 en el array backgroundColor
		borderColor.forEach(color => {
			backgroundColor.push(`${color.substring(0, color.length - 1)}, 0.2)`);
		});
		iniciado = true;
	}

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