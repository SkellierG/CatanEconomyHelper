const span = document.getElementById("span");
    
    const sumarBoton = document.getElementById("sumarBoton");
    const restarBoton = document.getElementById("restarBoton");
    
    const submitBoton = document.getElementById("submitBoton");
    
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
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            min: 0,
            max: 10,
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
    // Ejemplo de uso
    for (let i = 0; i < 10; i++) {
      let numeroRandom = Math.floor(Math.random() * 100);
      while (numeroRandom > 10) {
        numeroRandom = Math.floor(Math.random() * 100);
      }
      numeroActual++;
      elNumero = numeroRandom;
      agregarDato(i, numeroRandom);
      elNumero = 0;
    }
    
    sumarBoton.addEventListener("click", ()=>{
      elNumero++;
      span.textContent = elNumero;
    });
    restarBoton.addEventListener("click", ()=>{
      elNumero--;
      span.textContent = elNumero;
    });
    submitBoton.addEventListener("click", ()=>{
      numeroActual++;
      agregarDato(numeroActual, elNumero);
      elNumero = 0;
      span.textContent = elNumero;
    })
    
    // Puedes llamar a agregarDato con nuevos valores cada vez que ingreses un nuevo dato.