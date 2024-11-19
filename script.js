// Timer che conta i minuti e i secondi dall'inizio della prova
let seconds = 0;
const timerElement = document.getElementById('timer');

function updateTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerElement.textContent = `Timer: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Avvia il timer, aggiornandolo ogni secondo
setInterval(updateTimer, 1000);

// Funzione per gestire la consegna della verifica
function consegnaVerifica() {
  alert("Verifica consegnata!");
  // Logica aggiuntiva per la consegna della verifica
}

// Assegna l'evento al pulsante di consegna
document.getElementById('submitButton').addEventListener('click', consegnaVerifica);
