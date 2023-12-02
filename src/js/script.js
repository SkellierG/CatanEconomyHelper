//Extraer los IDs en constantes

const genJugadores = document.getElementById("genJugadores");

const actualNumberTurnsRounds = {
	ronda: document.getElementById("numeroRonda"),
	turno: document.getElementById("numeroTurno")
}

const currentTurn = document.getElementById("turnoActual");
const turnPass = document.getElementById("turnoPass");

const moneyObject = {
	valorlet: 0,
	valor: document.getElementById("moneyChange"),
	add: document.getElementById("moneyAdd"),
	add5: document.getElementById("moneyAdd5"),
	substract: document.getElementById("moneySustract"),
	substract5: document.getElementById("moneySustract5")
}

const genMoneyPlayerh1 = document.getElementById("genMoneyPlayerh1");

//valores globales
let turnoActual = 0;
let rondaActual = 0;
let turnoActualToPlayersTotal = 0;

//set jugadores
let playersNames = [];

setPlayers();

function setPlayers() {
	let playersNamesDisplay = "";
	let buttons = [];
	let playersTotal = parseInt(prompt("¿Cuantos jugadores hay?"));
	while (playersTotal < 2 || playersTotal > 4) {
		alert("cantidad de jugadores invalida, por favor usar un valor entre 2 y 4");
		playersTotal = parseInt(prompt("¿Cuantos jugadores hay?"));
	}
	if (playersTotal >= 2 || playersTotal <= 4) {
		alert("Añadir los nombres en orden de sus turnos (del primero al ultimo)");
		for (let i = 0; i < playersTotal; i++) {
			playersNames[i] = `[${i + 1}]` + prompt(`Nombre del jugador ${i + 1}`);
			buttons[i] = `<p id="player${i + 1}" class="sidebar__display-p">${playersNames[i]}</p>`;
			playersNamesDisplay = buttons.join(``);
		}
		genJugadores.innerHTML = `${playersNamesDisplay}`;
		playersNames.unshift("Economia");
	}
	else setPlayers();
}

//cambiar el turno y contar la cantidad de turnos y rondas totales

turnPass.addEventListener("click", ()=>{
	turnoActual++;
	turnoActualToPlayersTotal++;
	currentTurn.textContent = playersNames[turnoActualToPlayersTotal - 1];
	if (turnoActualToPlayersTotal == (playersNames.length)) {
		currentTurn.textContent = playersNames[turnoActualToPlayersTotal - 1];
		turnoActual--
		turnoActualToPlayersTotal = 0;
		rondaActual++;
		actualNumberTurnsRounds.ronda.textContent = rondaActual;
	}
	actualNumberTurnsRounds.turno.textContent = turnoActual;
});

//añadir y restar dinero 

moneyObject.add.addEventListener("click", ()=>{
	moneyObject.valorlet++;
	moneyObject.valor.textContent = moneyObject.valorlet;
});
moneyObject.substract.addEventListener("click", ()=>{
	moneyObject.valorlet--;
	moneyObject.valor.textContent = moneyObject.valorlet;
});
moneyObject.add5.addEventListener("click", ()=>{
	moneyObject.valorlet += 5;
	moneyObject.valor.textContent = moneyObject.valorlet;
});
moneyObject.substract5.addEventListener("click", ()=>{
	moneyObject.valorlet -= 5;
	moneyObject.valor.textContent = moneyObject.valorlet;
});

/*botones para asignar dinero a los jugadores
(la cantidad depende de la cantidad de jugadores)*/

function genMoneyPlayerButtons() {
	let buttons = [];
	for (let i = 1; i < playersNames.length; i++) {
		buttons[i] = `<button id="moneyPlayer${i}" class="moneyPLayerButton">${i}</button>`;
	}
	return buttons.join(``);
}

if (genMoneyPlayerh1) {
	genMoneyPlayerh1.innerHTML = genMoneyPlayerButtons();
}

//actualizacion del programa (10 FPS)
function animate() {
	requestAnimationFrame(animate, 10);
}
animate();