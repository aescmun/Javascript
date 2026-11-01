// Chrome y Edge exponen la API con el prefijo "webkit"; otros navegadores,
// sin prefijo. Se usa la que exista. Si ninguna existe, el valor es undefined.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Se guardan referencias a los elementos del HTML con los que se va a trabajar.
const btnStart = document.getElementById('btnStart');
const statusText = document.getElementById('statusText');
const commandText = document.getElementById('commandText');
const respuestaText = document.getElementById('respuestaText');
const listaHTML = document.getElementById('lista');
const campoProducto = document.getElementById('producto');

let recognition;

// Variable de control para saber si el micrófono está activo ahora mismo.
let isListening = false;
let hayError = false;
let respondiendo = false;

// Se carga la lista guardada. Si no hay ninguna, se empieza con una lista vacía.
let lista = JSON.parse(localStorage.getItem('listaCompra')) || [];

function guardarLista() {
  localStorage.setItem('listaCompra', JSON.stringify(lista));
}

function mostrarLista() {
  listaHTML.innerHTML = '';
  if (lista.length === 0) {
    listaHTML.innerHTML = '<li>La lista está vacía</li>';
  }
  lista.forEach((producto) => {
    const li = document.createElement('li');
    li.textContent = producto;
    listaHTML.appendChild(li);
  });
}

// Muestra la respuesta y la lee. Mientras habla se para el micrófono para que no se escuche a sí misma.
function responder(texto) {
  respuestaText.textContent = texto;

  if ('speechSynthesis' in window) {
    const mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.lang = 'es-ES';

    if (isListening) {
      respondiendo = true;
      recognition.abort();
    }

    mensaje.onend = () => {
      if (respondiendo) {
        respondiendo = false;
        recognition.start();
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(mensaje);
  }
}

function añadirProducto(producto) {
  if (producto === '') {
    responder('Dime qué producto quieres añadir.');
  } else if (lista.includes(producto)) {
    responder(producto + ' ya está en la lista.');
  } else {
    lista.push(producto);
    guardarLista();
    mostrarLista();
    responder('He añadido ' + producto + '.');
  }
}

function quitarProducto(producto) {
  const posicion = lista.indexOf(producto);
  if (producto === '') {
    responder('Dime qué producto quieres quitar.');
  } else if (posicion === -1) {
    responder(producto + ' no está en la lista.');
  } else {
    lista.splice(posicion, 1);
    guardarLista();
    mostrarLista();
    responder('He quitado ' + producto + '.');
  }
}

function vaciarLista() {
  lista = [];
  guardarLista();
  mostrarLista();
  responder('He vaciado la lista.');
}

// Se mira cómo empieza la frase y se coge el producto que va detrás.
function interpretarFrase(transcript) {
  commandText.textContent = transcript;

  if (transcript.startsWith('añade')) {
    añadirProducto(transcript.replace('añade', '').trim());
  } else if (transcript.startsWith('quita')) {
    quitarProducto(transcript.replace('quita', '').trim());
  } else if (transcript.includes('vacía') || transcript.includes('vaciar')) {
    vaciarLista();
  } else {
    responder('No he entendido la frase.');
  }
}

// Botones alternativos para usar la lista sin micrófono.
document.getElementById('btnAñadir').addEventListener('click', () => {
  añadirProducto(campoProducto.value.trim().toLowerCase());
  campoProducto.value = '';
});

document.getElementById('btnQuitar').addEventListener('click', () => {
  quitarProducto(campoProducto.value.trim().toLowerCase());
  campoProducto.value = '';
});

document.getElementById('btnVaciar').addEventListener('click', () => {
  vaciarLista();
});

mostrarLista();

// Si el navegador no soporta la API, se avisa y se desactiva el botón del micrófono.
if (!SpeechRecognition) {
  statusText.textContent = "Estado: tu navegador no admite el reconocimiento de voz. Usa el campo de texto y los botones.";
  btnStart.disabled = true;
} else {
  // Se crea el objeto que se encargará de escuchar y transcribir.
  recognition = new SpeechRecognition();

  // Idioma esperado del habla: español de España.
  recognition.lang = 'es-ES';
  // true: sigue escuchando tras cada frase, hasta que se llame a stop().
  // false (por defecto) pararía solo después de la primera frase.
  recognition.continuous = true;
  // false: solo se reciben resultados finales, no las transcripciones parciales.
  recognition.interimResults = false;

  // El botón alterna entre iniciar y detener la escucha.
  // start() debe llamarse tras una acción del usuario: así el navegador
  // puede pedir el permiso del micrófono.
  btnStart.addEventListener('click', () => {
    if (!isListening) {
      recognition.start();
    } else {
      respondiendo = false;
      recognition.stop();
    }
  });

  // Se dispara cuando el navegador empieza a escuchar de verdad.
  // Aquí se actualiza la interfaz para reflejar el nuevo estado.
  recognition.onstart = () => {
    isListening = true;
    hayError = false;
    statusText.textContent = "Estado: Escuchando...";
    btnStart.textContent = "Detener Micrófono";
  };

  // Se dispara siempre que la escucha termina: por stop(), por un error
  // o porque el navegador la cierra. Se restaura la interfaz al estado inicial.
  recognition.onend = () => {
    isListening = false;
    btnStart.textContent = "Activar Micrófono";
    if (respondiendo) {
      statusText.textContent = "Estado: Respondiendo...";
    } else if (!hayError) {
      statusText.textContent = "Estado: Inactivo";
    }
  };

  // Se dispara cada vez que el servicio reconoce una frase.
  recognition.onresult = (event) => {
    // Con continuous = true, event.results acumula todas las frases de la sesión.
    // La que acaba de llegar es la última de la lista.
    const lastIndex = event.results.length - 1;

    // [lastIndex] es el resultado y [0] su mejor alternativa (la más probable).
    // trim() quita espacios sobrantes y toLowerCase() pasa a minúsculas
    // para que "Leche" y "leche" se traten igual.
    const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();

    interpretarFrase(transcript);
  };

  // Se dispara si algo falla (permiso denegado, sin micrófono, sin red...).
  // event.error contiene el código, por ejemplo "not-allowed" o "no-speech".
  // Después del error, el navegador lanza también "end".
  recognition.onerror = (event) => {
    console.error("Error en el reconocimiento de voz:", event.error);
    if (event.error === 'aborted') {
      return;
    }
    hayError = true;
    if (event.error === 'not-allowed') {
      statusText.textContent = "Error: no se ha dado permiso para usar el micrófono. Usa el campo de texto.";
    } else if (event.error === 'no-speech') {
      statusText.textContent = "Error: no se ha detectado ninguna voz. Vuelve a intentarlo.";
    } else if (event.error === 'audio-capture') {
      statusText.textContent = "Error: no se encuentra ningún micrófono. Usa el campo de texto.";
    } else {
      statusText.textContent = "Error: " + event.error;
    }
  };
}
