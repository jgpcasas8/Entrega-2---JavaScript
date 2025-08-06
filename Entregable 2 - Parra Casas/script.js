const OPERACIONES = ["suma", "resta", "multiplicacion", "division"];
let operacionActual = "";
let ultimoResultado = null;
let historial = [];

function seleccionarOperacion(operacion) {
    operacionActual = operacion;
    
    ocultarMensajes();
    
    document.getElementById('formularioNumeros').classList.add('activo');
    
    const nombres = {
        'suma': 'Suma (+)',
        'resta': 'Resta (-)',
        'multiplicacion': 'Multiplicación (×)',
        'division': 'División (÷)'
    };
    
    document.getElementById('tituloOperacion').textContent = nombres[operacion];
    
    if (ultimoResultado === null) {
        document.getElementById('numero1').value = '';
        document.getElementById('numero2').value = '';
    } else {
        document.getElementById('numero1').value = ultimoResultado;
        document.getElementById('numero2').value = '';
        document.getElementById('numero2').focus();
    }
}

function calcular() {
    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        mostrarError("Por favor ingresa números válidos en ambos campos.");
        return;
    }
    
    let resultado;
    let operador;
    
    switch (operacionActual) {
        case "suma":
            resultado = num1 + num2;
            operador = "+";
            break;
        case "resta":
            resultado = num1 - num2;
            operador = "-";
            break;
        case "multiplicacion":
            resultado = num1 * num2;
            operador = "×";
            break;
        case "division":
            if (num2 === 0) {
                mostrarError("No se puede dividir por cero.");
                return;
            }
            resultado = num1 / num2;
            operador = "÷";
            break;
        default:
            mostrarError("Operación no válida.");
            return;
    }
    
    mostrarResultado(num1, num2, resultado, operador);
    
    agregarAlHistorial(num1, num2, resultado, operador);
    
    ultimoResultado = resultado;
}

function mostrarResultado(num1, num2, resultado, operador) {
    ocultarMensajes();
    
    const areaResultado = document.getElementById('areaResultado');
    const textoResultado = document.getElementById('textoResultado');
    
    textoResultado.innerHTML = `
        <strong>${num1} ${operador} ${num2} = ${resultado}</strong>
    `;
    
    areaResultado.classList.add('activo');
    document.getElementById('opcionesResultado').classList.add('activo');
    
    document.getElementById('formularioNumeros').classList.remove('activo');
}

function mostrarError(mensaje) {
    ocultarMensajes();
    
    const mensajeError = document.getElementById('mensajeError');
    const textoError = document.getElementById('textoError');
    
    textoError.textContent = mensaje;
    mensajeError.classList.add('activo');
}

function ocultarMensajes() {
    document.getElementById('areaResultado').classList.remove('activo');
    document.getElementById('mensajeError').classList.remove('activo');
    document.getElementById('opcionesResultado').classList.remove('activo');
}

function cancelarOperacion() {
    document.getElementById('formularioNumeros').classList.remove('activo');
    ocultarMensajes();
    ultimoResultado = null;
}

function continuarConResultado() {
    ocultarMensajes();
}

function nuevaOperacion() {
    ultimoResultado = null;
    document.getElementById('formularioNumeros').classList.remove('activo');
    ocultarMensajes();
}

function agregarAlHistorial(num1, num2, resultado, operador) {
    const operacion = `${num1} ${operador} ${num2} = ${resultado}`;
    historial.push(operacion);
    actualizarHistorial();
}

function actualizarHistorial() {
    const listaHistorial = document.getElementById('listaHistorial');
    
    if (historial.length === 0) {
        listaHistorial.innerHTML = '<p>No hay operaciones realizadas aún.</p>';
        return;
    }
    
    let html = '';
    historial.forEach((operacion, index) => {
        html += `<div class="historial-item">${index + 1}. ${operacion}</div>`;
    });
    
    listaHistorial.innerHTML = html;
}

window.addEventListener('load', function() {
    console.log("=== CALCULADORA SIMPLE ===");
    console.log("Calculadora cargada y lista para usar.");
});