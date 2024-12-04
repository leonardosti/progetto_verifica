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

    // Funzione per caricare domande dal file JSON
    function caricaDomande(tipo, id) {
        const file = tipo === 'aperte' ? './domandeAperte.json' : './domandeCrocette.json';

        fetch(file)
            .then(response => response.json())
            .then(data => {
                const domanda = data.find(d => d.id == id);
                if (!domanda) {
                    document.getElementById('domanda').textContent = 'Domanda non trovata!';
                    return;
                }
                document.getElementById('domanda').textContent = domanda.testo;

                if (tipo === 'crocette') {
                    const opzioniContainer = document.getElementById('opzioni-container');
                    opzioniContainer.innerHTML = ''; // Pulizia contenitore
                    domanda.opzioni.forEach(opzione => {
                        const label = document.createElement('label');
                        label.innerHTML = `
                            <input type="radio" name="opzione" value="${opzione}">
                            ${opzione}
                        `;
                        opzioniContainer.appendChild(label);
                        opzioniContainer.appendChild(document.createElement('br'));
                    });
                }
            })
            .catch(error => console.error('Errore nel caricamento delle domande:', error));
    }

    // Verifica la pagina e carica i dati appropriati
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (window.location.pathname.includes('domandaAperte.html')) {
        caricaDomande('aperte', id);
    } else if (window.location.pathname.includes('domandaCrocette.html')) {
        caricaDomande('crocette', id);
    }
});
