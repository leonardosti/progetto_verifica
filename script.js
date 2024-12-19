document.addEventListener('DOMContentLoaded', () => {
    const TIMER_KEY = 'tempoRimanente';
    let timerInterval;

    // Inizializza il tempo rimanente (90 minuti in secondi se non presente)
    if (!sessionStorage.getItem(TIMER_KEY)) {
        sessionStorage.setItem(TIMER_KEY, 90 * 60); // 1h 30m in secondi
    }

    const timerElement = document.getElementById('timer');

    function updateTimer() {
        let timeRemaining = parseInt(sessionStorage.getItem(TIMER_KEY), 10);

        if (timeRemaining > 0) {
            timeRemaining--;
            sessionStorage.setItem(TIMER_KEY, timeRemaining);
        } else {
            clearInterval(timerInterval);
            alert('Tempo scaduto! Consegna obbligatoria.');
        }

        // Aggiorna il display del timer
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Tempo rimasto: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Avvia il timer
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Avvia immediatamente il display

    // Funzione per la consegna
    const consegnaButton = document.getElementById('consegna');
    if (consegnaButton) {
        consegnaButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            alert('Verifica consegnata con successo!');
            sessionStorage.removeItem(TIMER_KEY); // Reset del timer
        });
    }
})
