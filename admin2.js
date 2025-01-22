// Codes des couleurs pour la base de données
const colorCodes = {
    "green": "VF",         // Vert foncé
    "mediumseagreen": "VM", // Vert moyen
    "lightgreen": "VC",     // Vert clair
    "yellow": "J",          // Jaune
    "orange": "O",          // Orange
    "red": "R",             // Rouge
    "white": "N"            // Blanc pour les notes ABS et NE
};

// Référence à la cellule actuellement sélectionnée
let celluleActuelle = null;

// Fonction pour ouvrir le panneau de couleurs
function ouvrirPanneauCouleurs(cellule) {
    // Vérifie si la cellule existe
    if (!cellule) {
        console.error("La cellule n'a pas été trouvée");
        return;
    }

    // Met à jour la cellule actuelle
    celluleActuelle = cellule;

    const panel = document.getElementById('colorPanel');
    if (!panel) {
        console.error("Le panneau de couleurs n'existe pas.");
        return;
    }

    // Positionner le panneau près de la cellule cliquée
    const rect = cellule.getBoundingClientRect();
    panel.style.top = `${window.scrollY + rect.bottom + 5}px`;
    panel.style.left = `${window.scrollX + rect.left}px`;
    panel.style.display = 'block';

    console.log(`Panneau de couleurs ouvert pour la cellule : ${cellule.id}`);
}

// Fonction pour appliquer une couleur sélectionnée
function appliquerCouleur(couleur) {
    if (!celluleActuelle) {
        console.error("Aucune cellule sélectionnée");
        return;
    }

    // Vérifier si la couleur est déjà appliquée
    if (celluleActuelle.style.backgroundColor === couleur) {
        console.log(`La couleur ${couleur} est déjà appliquée à la cellule ${celluleActuelle.id}.`);
        return; // Ne rien faire si la couleur est déjà appliquée
    }

    // Appliquer la couleur à la cellule
    celluleActuelle.style.backgroundColor = couleur;

    // Mettre à jour la validation dans l'attribut dataset de la cellule
    celluleActuelle.dataset.validation = colorCodes[couleur] || "N"; // Si couleur non valide, "N" sera utilisé

    // Fermer le panneau de couleurs
    document.getElementById('colorPanel').style.display = 'none';
    console.log(`Validation appliquée : ${colorCodes[couleur] || "N"} à la cellule ${celluleActuelle.id}`);
}

// Fonction pour appliquer une note (ABS ou NE)
function appliquerNote(note) {
    if (!celluleActuelle) {
        console.error("Aucune cellule sélectionnée");
        return;
    }

    // Appliquer la note à la cellule
    celluleActuelle.style.backgroundColor = "white"; // Blanc pour ABS ou NE
    celluleActuelle.dataset.validation = note; // "ABS" ou "NE"

    // Fermer le panneau de couleurs
    document.getElementById('colorPanel').style.display = 'none';
    console.log(`Note appliquée : ${note} à la cellule ${celluleActuelle.id}`);
}

// Fermer le panneau quand on clique ailleurs
document.addEventListener('click', (e) => {
    const panel = document.getElementById('colorPanel');
    if (panel.style.display === 'block' && !panel.contains(e.target) && !e.target.classList.contains('validation-cell')) {
        panel.style.display = 'none';
        console.log('Panneau de couleurs fermé.');
    }
});

// Ajouter un événement de clic pour chaque option de couleur dans le panneau
document.querySelectorAll('#colorPanel div').forEach((option) => {
    option.addEventListener('click', (e) => {
        const couleur = e.target.style.backgroundColor;
        
        // Vérifier si on clique sur une couleur ou une note (ABS/NE)
        if (e.target.getAttribute("onclick") && e.target.getAttribute("onclick").includes('appliquerCouleur')) {
            appliquerCouleur(couleur);
        } else if (e.target.getAttribute("onclick") && e.target.getAttribute("onclick").includes('appliquerNote')) {
            const note = e.target.textContent.trim();
            appliquerNote(note);
        }
    });
});

// Ouvrir le panneau de couleurs pour une cellule spécifique
document.querySelectorAll('.validation-cell').forEach((cell) => {
    cell.addEventListener('click', (e) => {
        ouvrirPanneauCouleurs(e.target);
    });
});
