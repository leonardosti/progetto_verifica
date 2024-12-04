// Timer per la verifica
let timerElement = document.getElementById('timer');
let totalTime = 90 * 60; // 1 ora e 30 minuti in secondi

const updateTimer = () => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    timerElement.textContent = `Tempo rimasto: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (totalTime > 0) {
        totalTime--;
    } else {
        clearInterval(timerInterval);
        alert("Tempo scaduto!");
    }
};

let timerInterval = setInterval(updateTimer, 1000);

// Gestione bottoni della homepage
document.getElementById('domandaAperta1').addEventListener('click', () => {
    window.location.href = 'domandaAperte.html?id=1';
});

document.getElementById('domandaAperta2').addEventListener('click', () => {
    window.location.href = 'domandaAperte.html?id=2';
});

document.getElementById('domandaAperta3').addEventListener('click', () => {
    window.location.href = 'domandaAperte.html?id=3';
});

document.getElementById('domandaCrocette1').addEventListener('click', () => {
    window.location.href = 'domandaCrocette.html?id=1';
});

document.getElementById('domandaCrocette2').addEventListener('click', () => {
    window.location.href = 'domandaCrocette.html?id=2';
});

document.getElementById('consegna').addEventListener('click', () => {
    clearInterval(timerInterval);
    alert("Verifica consegnata!");
});

// Gestione delle domande aperte
if (window.location.pathname.includes('domandaAperte.html')) {
    const params = new URLSearchParams(window.location.search);
    const domandaId = params.get('id');

    fetch('domandeAperte.json')
        .then(response => response.json())
        .then(data => {
            const domanda = data.find(d => d.id == domandaId);
            document.getElementById('domanda').textContent = domanda ? domanda.testo : 'Domanda non trovata!';
        });

    document.getElementById('consegna-domanda').addEventListener('click', () => {
        const risposta = document.getElementById('risposta').value;
        if (risposta.trim()) {
            alert("Risposta consegnata: " + risposta);
        } else {
            alert("Per favore, inserisci una risposta!");
        }
    });
}

// Gestione delle domande a crocette
if (window.location.pathname.includes('domandaCrocette.html')) {
  const params = new URLSearchParams(window.location.search);
  const domandaId = params.get('id');

  // Caricamento della domanda a crocette
  fetch('domandeCrocette.json')
      .then(response => response.json())
      .then(data => {
          const domanda = data.find(d => d.id == domandaId);
          if (domanda) {
              document.getElementById('domanda').textContent = domanda.testo;

              const opzioniContainer = document.getElementById('opzioni-container');
              domanda.opzioni.forEach((opzione, index) => {
                  const label = document.createElement('label');
                  label.innerHTML = `
                      <input type="radio" name="opzione" value="${opzione}">
                      ${opzione}
                  `;
                  opzioniContainer.appendChild(label);
                  opzioniContainer.appendChild(document.createElement('br'));
              });
          } else {
              document.getElementById('domanda').textContent = 'Domanda non trovata!';
          }
      });

  // Consegna della risposta
  document.getElementById('consegna-domanda').addEventListener('click', () => {
      const risposta = document.querySelector('input[name="opzione"]:checked');
      if (risposta) {
          alert("Risposta consegnata: " + risposta.value);
      } else {
          alert("Per favore, seleziona una risposta!");
      }
  });
}
