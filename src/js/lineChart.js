const span = document.getElementById("span");
    
const randomBoton = document.getElementById("randomBoton");
    
const submitBoton = document.getElementById("submitBoton");

const randomObject ={
	valorlet: 0,
	valor: document.getElementById("randomChange"),
	substract: document.getElementById("randomSustract"),
	add: document.getElementById("randomAdd")
}

let numeroRandom = 0;
let valorNumeroRandom = [0, -3, -2, -1, 1, 2, 3];
let numeroActual = 0;
let elNumero = 0;
    
// Inicializa los datos
let turnos = [];
let cantidades = [];

// Obtén el contexto del lienzo
const ctx = document.getElementById('myChart').getContext('2d');

// Crea el gráfico
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
        	label: 'precio',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 8,
            fill: true
        }]
    },
    options: {
    	plugins: {
            title: {
                display: true,
                fullSize: true,
                text: 'Grafico'
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                min: 0,
                max: 16,
            }
        }
    }
});

// Función para agregar un nuevo dato
function agregarDato(turno, cantidad) {
    turnos.push(turno);
    cantidades.push(cantidad);

    const color = obtenerColorLinea(turnos, cantidades);

    myChart.data.datasets[0].data = turnos.map((turno, index) => ({ x: turno, y: cantidades[index] }));
      
    myChart.data.datasets[0].borderColor = color;
    myChart.update();
}

// Función para obtener el color de la línea
function obtenerColorLinea(turnos, cantidades) {
    const colores = [];
    for (let i = 1; i < cantidades.length; i++) {
        let color = '';
        if (cantidades[i] < cantidades[i - 1]){
          color = 'red';
        }
        else color = 'green';
        colores.push(color);
    }
    return colores;
}

randomObject.add.addEventListener("click", ()=>{
	randomObject.valorlet++;
	randomObject.valor.textContent = randomObject.valorlet;
});
randomObject.substract.addEventListener("click", ()=>{
	randomObject.valorlet--;
	randomObject.valor.textContent = randomObject.valorlet;
});

agregarDato(0, 8);

randomBoton.addEventListener("click", ()=>{
	numeroRandom = 0;
	numeroRandom = Math.floor(Math.random() * 10);
    while (numeroRandom > 6 || numeroRandom < 1) {
        numeroRandom = Math.floor(Math.random() * 10);
    }
    span.textContent = numeroRandom;
});

submitBoton.addEventListener("click", ()=>{
	let diff = cantidades[numeroActual] + valorNumeroRandom[numeroRandom] + randomObject.valorlet;
	if (cantidades[numeroActual] <= 0 && numeroActual !== 0) {
		diff = 4 + valorNumeroRandom[numeroRandom] + randomObject.valorlet;
	}
	if (cantidades[numeroActual] >= 16 && numeroActual !== 0) {
		diff = 12 + valorNumeroRandom[numeroRandom] + randomObject.valorlet;
	}
	if (diff < 0) {
		diff = 0;
	}
	if (diff > 16) {
		diff = 16;
	}
    numeroActual++;
    agregarDato(numeroActual, diff);
    numeroRandom = 0;
    randomObject.valorlet = 0;
    randomObject.valor.textContent = randomObject.valorlet;
    span.textContent = numeroRandom;
})
    
// Puedes llamar a agregarDato con nuevos valores cada vez que ingreses un nuevo dato.