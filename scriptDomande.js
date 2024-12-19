// Funzione per caricare la domanda e associarla al bottone
function caricaDomanda(tipo, idBottone) {
    let domandaSalvata = localStorage.getItem(`domanda_${tipo}_${idBottone}`);

    // Se la domanda è già stata caricata per questo bottone, la mostriamo
    if (domandaSalvata) {
        domandaSalvata = JSON.parse(domandaSalvata);
        mostraDomanda(domandaSalvata);
    } else {
        // Se la domanda non è ancora stata assegnata, la carichiamo dal JSON
        fetch('domande.json')
            .then(response => response.json())
            .then(data => {
                let domanda;
                let domandeDisponibili;

                // Carica domanda aperta
                if (tipo === 'aperta') {
                    domandeDisponibili = data.domande_aperte.filter(d => !isDomandaSelezionata(d.id));
                    if (domandeDisponibili.length === 0) {
                        alert('Non ci sono più domande aperte disponibili!');
                        return;
                    }
                    domanda = domandeDisponibili[Math.floor(Math.random() * domandeDisponibili.length)];
                } 
                // Carica domanda multipla
                else if (tipo === 'multipla') {
                    domandeDisponibili = data.domande_multipla.filter(d => !isDomandaSelezionata(d.domanda));
                    if (domandeDisponibili.length === 0) {
                        alert('Non ci sono più domande a crocette disponibili!');
                        return;
                    }
                    domanda = domandeDisponibili[Math.floor(Math.random() * domandeDisponibili.length)];
                }

                // Salva la domanda nel localStorage per il bottone specifico
                localStorage.setItem(`domanda_${tipo}_${idBottone}`, JSON.stringify(domanda));
                mostraDomanda(domanda);
                aggiungiDomandaSelezionata(domanda.id || domanda.domanda);
            })
            .catch(error => console.error('Errore nel caricamento delle domande:', error));
    }
}

// Funzione per verificare se una domanda è già stata selezionata
function isDomandaSelezionata(domandaId) {
    const selezionate = JSON.parse(localStorage.getItem('domande_selezionate')) || [];
    return selezionate.includes(domandaId);
}

// Funzione per aggiungere una domanda all'elenco delle domande selezionate
function aggiungiDomandaSelezionata(domandaId) {
    const selezionate = JSON.parse(localStorage.getItem('domande_selezionate')) || [];
    if (!selezionate.includes(domandaId)) {
        selezionate.push(domandaId);
        localStorage.setItem('domande_selezionate', JSON.stringify(selezionate));
    }
}

// Funzione per mostrare la domanda nel layout
function mostraDomanda(domanda) {
    document.getElementById('domanda').textContent = domanda.domanda || domanda;

    // Se è una domanda a scelta multipla
    if (domanda.opzioni) {
        const opzioniContainer = document.getElementById('opzioni-container');
        opzioniContainer.innerHTML = '';
        domanda.opzioni.forEach(opzione => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'risposta';
            radio.value = opzione;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opzione));
            opzioniContainer.appendChild(label);
        });
    }
}

// Funzione per inviare la risposta
function inviaRisposta() {
    alert("Risposta inviata con successo!");
}

// Funzione per resettare le domande e consegnare la verifica
function resetDomande() {
    localStorage.clear(); 
    alert('Verifica consegnata! Domande resettate.');
    window.location.href = 'index.html';
}

// Gestione del bottone di consegna verifica
if (document.getElementById('consegna')) {
    document.getElementById('consegna').addEventListener('click', resetDomande);
}

// Gestione del bottone di invio della risposta
if (document.getElementById('consegna-domanda')) {
    document.getElementById('consegna-domanda').addEventListener('click', inviaRisposta);
}

// Event listener per la pagina delle domande aperte
if (window.location.pathname.includes('domandaAperte.html')) {
    const params = new URLSearchParams(window.location.search);
    const idBottone = params.get('id');
    document.addEventListener('DOMContentLoaded', () => {
        caricaDomanda('aperta', idBottone);
    });
}

// Event listener per la pagina delle domande a crocette
if (window.location.pathname.includes('domandaCrocette.html')) {
    const params = new URLSearchParams(window.location.search);
    const idBottone = params.get('id');
    document.addEventListener('DOMContentLoaded', () => {
        caricaDomanda('multipla', idBottone);
    });
}
