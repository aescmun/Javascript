// Chrome y Edge exponen la API con el prefijo "webkit"; otros navegadores,
// sin prefijo. Se usa la que exista. Si ninguna existe, el valor es undefined.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Se guardan referencias a los elementos del HTML con los que se va a trabajar.
const btnStart = document.getElementById('btnStart');
const statusText = document.getElementById('statusText');
const commandText = document.getElementById('commandText');
const respuestaText = document.getElementById('respuestaText');
const tarjeta = document.querySelector('.card');

let recognition;
let tamañoActual = 16;

// Variable de control para saber si el micrófono está activo ahora mismo.
let isListening = false;
let hayError = false;
let respondiendo = false;

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

// Se busca una palabra clave dentro de la frase y se aplica la acción.
// includes() permite que funcione con frases como "pon el fondo en rojo".
// Si no coincide ningún comando, no se cambia nada.
function ejecutarComando(transcript) {
  commandText.textContent = transcript;

  if (transcript.includes('rojo')) {
    document.body.style.backgroundColor = '#ff0015';
    responder('He cambiado el fondo a rojo.');
  } else if (transcript.includes('verde')) {
    document.body.style.backgroundColor = '#00ff3c';
    responder('He cambiado el fondo a verde.');
  } else if (transcript.includes('azul')) {
    document.body.style.backgroundColor = '#007bff';
    responder('He cambiado el fondo a azul.');
  } else if (transcript.includes('restablecer') || transcript.includes('blanco')) {
    tamañoActual = 16;
    document.body.style.fontSize = tamañoActual + 'px';
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#050505';
    tarjeta.style.backgroundColor = '#ffffff';
    responder('He dejado la página como al principio.');
  } else if (transcript.includes('más grande')) {
    tamañoActual = tamañoActual + 2;
    document.body.style.fontSize = tamañoActual + 'px';
    responder('He aumentado el tamaño del texto.');
  } else if (transcript.includes('más pequeño')) {
    tamañoActual = tamañoActual - 2;
    document.body.style.fontSize = tamañoActual + 'px';
    responder('He reducido el tamaño del texto.');
  } else if (transcript.includes('modo claro')) {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#050505';
    tarjeta.style.backgroundColor = '#ffffff';
    responder('He puesto el modo claro.');
  } else if (transcript.includes('modo oscuro')) {
    document.body.style.backgroundColor = '#010101';
    document.body.style.color = '#ffffff';
    tarjeta.style.backgroundColor = '#333333';
    responder('He puesto el modo oscuro.');
  } else {
    responder('No he entendido el comando.');
  }
}

// Botones alternativos para usar la página sin micrófono.
document.querySelectorAll('.botones button').forEach((boton) => {
  boton.addEventListener('click', () => {
    ejecutarComando(boton.dataset.comando);
  });
});

// Si el navegador no soporta la API, se avisa y se desactiva el botón del micrófono.
if (!SpeechRecognition) {
  statusText.textContent = "Estado: tu navegador no admite el reconocimiento de voz. Usa los botones o prueba con Chrome u Edge.";
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
    // para que "Rojo" y "rojo" se traten igual.
    const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();

    ejecutarComando(transcript);
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
      statusText.textContent = "Error: no se ha dado permiso para usar el micrófono. Usa los botones.";
    } else if (event.error === 'no-speech') {
      statusText.textContent = "Error: no se ha detectado ninguna voz. Vuelve a intentarlo.";
    } else if (event.error === 'audio-capture') {
      statusText.textContent = "Error: no se encuentra ningún micrófono. Usa los botones.";
    } else {
      statusText.textContent = "Error: " + event.error;
    }
  };
}