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
	valor: document.getElementById("moneyChange")
}

const genMoneyPlayerh1 = document.getElementById("genMoneyPlayerh1");

function save() {
    sessionStorage.setItem('turnSave', JSON.stringify(turnObject));
    
    sessionStorage.setItem('dataGrafico', JSON.stringify(saveGrafico))
}

//valores globales
let turnObject = {
    turnoActual: 0,
    rondaActual: 0,
    turnoActualToPlayersTotal: 0
};

//set jugadores(old)
/*let playersNames = [];*/
//set jugadores

let players = [];
let playersTotal = 0;

const playersdata = sessionStorage.getItem('playersSave');

const totaldata = sessionStorage.getItem('playersTotalSave');

players[0] = {
    turn: "[0]",
    name: "Economia",
    money: 0
};

if (playersdata) {
    players = JSON.parse(playersdata);
};
if (totaldata) {
    playersTotal = parseInt(totaldata);
};

function setPlayers() {
	let playersNamesDisplay = "";
	let display = [];
	playersTotal = parseInt(prompt("¿Cuantos jugadores hay?"));
	while (playersTotal < 2 || playersTotal > 4) {
		alert("cantidad de jugadores invalida, por favor usar un valor entre 2 y 4");
		playersTotal = parseInt(prompt("¿Cuantos jugadores hay?"));
	}
	if (playersTotal >= 2 || playersTotal <= 4) {
		alert("Añadir los nombres en orden de sus turnos (del primero al ultimo)");
		for (let i = 1; i < (playersTotal + 1); i++) {
		    players.push({
		        turn: `[${i}]`,
		        name: prompt(`Nombre del jugador ${i}`),
		        money: 0
		    });
		    while (players[i].name === null || players[i].name === "" || players[i].name.length > 10 || players[i].name.length < 4) {
		        alert("nombre invalido, vuelva a intentar");
		        players[i] = {
		        turn: `[${i}]`,
		        name: prompt(`Nombre del jugador ${i}`),
		        money: 0
		    }}
			display[i] = `<p id="player${i}">${players[i].turn} ${players[i].name}</p>`;
			playersNamesDisplay = display.join(``);
		}
		genJugadores.innerHTML = `${playersNamesDisplay}`;
		sessionStorage.setItem('playersSave', JSON.stringify(players));
		sessionStorage.setItem('playersTotalSave', playersTotal);
	}
	else setPlayers();
}

function setPlayersSave() {
    let playersNamesDisplay = "";
	let display = [];
    
    for (let i = 1; i < (playersTotal + 1); i++) {
        display[i] = `<p id="player${i}">${players[i].turn} ${players[i].name}</p>`;
    	playersNamesDisplay = display.join(``);
    }
	genJugadores.innerHTML = `${playersNamesDisplay}`;
}

if (!playersdata) {
    setPlayers();
}
else {
    setPlayersSave();
};
/*function setPlayers() {
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
}*/

const turndata = sessionStorage.getItem('turnSave');

if (turndata) {
    turnObject = JSON.parse(turndata);
    currentTurn.textContent = players[turnObject.turnoActualToPlayersTotal - 1].turn + players[turnObject.turnoActualToPlayersTotal - 1].name;
        actualNumberTurnsRounds.ronda.textContent = turnObject.rondaActual;
    actualNumberTurnsRounds.turno.textContent = turnObject.turnoActual;
};

//cambiar el turno y contar la cantidad de turnos y rondas totales

turnPass.addEventListener("click", ()=>{
	turnObject.turnoActual++;
	turnObject.turnoActualToPlayersTotal++;
	currentTurn.textContent = players[turnObject.turnoActualToPlayersTotal - 1].turn + players[turnObject.turnoActualToPlayersTotal - 1].name;
	if (turnObject.turnoActualToPlayersTotal == players.length) {
		currentTurn.textContent = players[turnObject.turnoActualToPlayersTotal - 1].turn + players[turnObject.turnoActualToPlayersTotal - 1].name;
		turnObject.turnoActual--
		turnObject.turnoActualToPlayersTotal = 0;
		turnObject.rondaActual++;
		actualNumberTurnsRounds.ronda.textContent = turnObject.rondaActual;
	}
	actualNumberTurnsRounds.turno.textContent = turnObject.turnoActual;
});

//añadir y restar dinero 

function restAddMoney(num, type) {
    switch (type) {
        case 0:
            moneyObject.valorlet = moneyObject.valorlet + num;
            break;
        case 1:
            moneyObject.valorlet = moneyObject.valorlet - num;
            break;
        default:
            moneyObject.valorlet = moneyObject.valorlet + num;
    }
	moneyObject.valor.textContent = moneyObject.valorlet;
}

/*botones para asignar dinero a los jugadores
(la cantidad depende de la cantidad de jugadores)*/

function genMoneyPlayerButtons() {
	let buttons = [];
	for (let i = 1; i < players.length; i++) {
		buttons[i] = `<button id="moneyPlayer${i}" onclick="updateMoney(${i})">${players[i].turn + players[i].name}</button><br>`;
	}
	return buttons.join(``);
}

function updateMoney(player) {
    players[player].money = players[player].money + moneyObject.valorlet;
    moneyObject.valorlet = 0;
    moneyObject.valor.textContent = moneyObject.valorlet;
    //alert(players[player].money)
}

if (genMoneyPlayerh1) {
    genMoneyPlayerh1.innerHTML = genMoneyPlayerButtons();
};