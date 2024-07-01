const contenitoriSfera = document.querySelectorAll('.contenitore-sfera');
const centroOrbitale = {
    x: 250,
    y: 250
}; // Posizione del centro orbitale (metà della larghezza e altezza del contenitore orbitale)

function posizionaSfera(contenitoreSfera, angolo) {
    const raggioOrbitale = 200; // Distanza dal centro orbitale
    const x = centroOrbitale.x + raggioOrbitale * Math.cos(angolo);
    const y = centroOrbitale.y + raggioOrbitale * Math.sin(angolo);

    const offsetX = contenitoreSfera.offsetWidth / 2;
    const offsetY = contenitoreSfera.offsetHeight / 2;
    const maxX = window.innerWidth - offsetX;
    const maxY = window.innerHeight - offsetY;
}

function animaOrbita() {
    let angolo = 0;

    setInterval(() => {
        angolo += 0.005; // Velocità di rotazione (in radianti)

        for (let i = 0; i < contenitoriSfera.length; i++) {
            posizionaSfera(contenitoriSfera[i], angolo + i * Math.PI * 2 / 3); // Distribuisce le sfere uniformemente
        }
    }, 10); // Tempo tra gli aggiornamenti (in millisecondi)
}

animaOrbita(); // Avvia l'animazione all'avvio della pagina
