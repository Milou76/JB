// Importation des modules Firestore nécessaires
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Récupérer l'ID de la base de données à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const idBdd = urlParams.get('idBDD'); // ID de la base de données passé dans l'URL

if (!idBdd) {
    alert("L'ID de la base de données n'a pas été fourni dans l'URL.");
}

if (!db) {
    console.error("Firestore n'est pas initialisé !");
} else {
    console.log("Firestore est prêt !");
}

// Liste des activités sans validation
const activitesSansValidation = [
    "Rechercher l'information technique",
    "Décoder l'information technique",
    "Choisir le matériel, les équipements et les produits.",
    "Organiser son poste de travail.",
    "Entretien des locaux et des équipements",
    "Entretien du linge et des vêtements",
    "Transmettre des informations à caractère professionnel à l'écrit ou à l'oral",
    "Entretien du linge et des vêtements"
];

// Mappage des couleurs en lettres
const colorCodes = {
    "green": "VF", // Validation Faite
    "mediumseagreen": "VM", // Validation Moyenne
    "lightgreen": "VC", // Validation Complète
    "yellow": "J", // Justifiée
    "orange": "O", // Orange
    "red": "R", // Red
    "white": "A", // Absent
    "white": "N"  // Non évalué
};

// Mapping des données
const tableaux = {
    1: tableauDonnees1 || [],
    2: tableauDonnees2 || [],
    3: tableauDonnees3 || [],
    4: tableauDonnees4 || []
};
// Fonction pour créer le tableau
function creerTableau(containerId, donnees = []) {
    const tableContainer = document.getElementById(containerId);
    if (!tableContainer) {
        console.error(`Conteneur "${containerId}" introuvable.`);
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>CODES</th>
                <th>ACTIVITÉS DE FORMATION</th>
                <th>VALIDATION</th>
                <th>EXEMPLES DE CONNAISSANCES ASSOCIÉES</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement('tbody');

    if (donnees.length === 0) {
        console.warn(`Aucune donnée à afficher pour "${containerId}".`);
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="4" style="text-align: center;">Aucune donnée disponible</td>
        `;
        tbody.appendChild(emptyRow);
    } else {
        let compteurCellule = 1;  // Réinitialiser le compteur pour chaque tableau
        donnees.forEach((item, index) => {
            
        
            const row = document.createElement('tr');
            let validationCells = '';
        
            // Créer des cellules de validation liées à l'index de l'élément dans le tableau
            validationCells = ` 
                <div id="case-${index * 3 + 1}" class="validation-cell" onclick="ouvrirPanneauCouleurs(this)" data-index="${index * 3 + 1}"></div>
                <div id="case-${index * 3 + 2}" class="validation-cell" onclick="ouvrirPanneauCouleurs(this)" data-index="${index * 3 + 2}"></div>
                <div id="case-${index * 3 + 3}" class="validation-cell" onclick="ouvrirPanneauCouleurs(this)" data-index="${index * 3 + 3}"></div>
            `;
        
            row.innerHTML = `
                <td>${item.code || ''}</td>
                <td class="${item.bold ? 'bold' : ''}">${item.activite || ''}</td>
                <td style="gap: 5px; align-items: center;">${validationCells}</td>
                <td>${item.connaissances || ''}</td>
            `;
            tbody.appendChild(row);
        });
        
    }

    table.appendChild(tbody);
    tableContainer.innerHTML = ''; // Nettoie le conteneur avant d'ajouter un tableau
    tableContainer.appendChild(table);
}
// Initialiser les tableaux même vides
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(tableaux).forEach((key) => {
        creerTableau(`tableau-container-${key}`, tableaux[key] || [], key);
    });

    // Appeler la fonction pour charger les données
    lireDonneesEtTitre();
});

// Fonction pour lire les données depuis Firestore et mettre à jour le titre
async function lireDonneesEtTitre() {
    try {
        const docRef = doc(window.db, "eleves", idBdd);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Récupérer le nom de l'élève et mettre à jour le titre
            const nomEleve = data.nom || "Inconnu";
            document.title = `Évaluation ${nomEleve}`; // Mettre à jour le titre de la page

            // Charger les données dans les tableaux
            for (let key = 1; key <= 4; key++) {
                const tableauData = data[`tableau_${key}`] || [];

                let indexCellule = 1; // Réinitialiser l'index pour chaque tableau

                tableauData.forEach((item) => {
                    const globalIndex1 = indexCellule;
                    const globalIndex2 = indexCellule + 1;
                    const globalIndex3 = indexCellule + 2;

                    const cellule1 = document.querySelector(`#case-${globalIndex1}`);
                    const cellule2 = document.querySelector(`#case-${globalIndex2}`);
                    const cellule3 = document.querySelector(`#case-${globalIndex3}`);

                    if (cellule1 && item.validation1) {
                        const couleur1 = getColorFromValidation(item.validation1);
                        cellule1.style.backgroundColor = couleur1;
                        cellule1.dataset.validation = item.validation1;
                    }
                    if (cellule2 && item.validation2) {
                        const couleur2 = getColorFromValidation(item.validation2);
                        cellule2.style.backgroundColor = couleur2;
                        cellule2.dataset.validation = item.validation2;
                    }
                    if (cellule3 && item.validation3) {
                        const couleur3 = getColorFromValidation(item.validation3);
                        cellule3.style.backgroundColor = couleur3;
                        cellule3.dataset.validation = item.validation3;
                    }

                    indexCellule += 3;
                });
            }

           
        } else {
            console.log("Aucune donnée trouvée pour cet élève.");
        }
    } catch (error) {
        console.error("Erreur lors de la lecture des données :", error);
        alert("Une erreur est survenue lors de la récupération des données.");
    }
}

// Fonction pour obtenir la couleur associée à une validation
function getColorFromValidation(validation) {
    switch (validation) {
        case "VF": return "green";
        case "VM": return "mediumseagreen";
        case "VC": return "lightgreen";
        case "J": return "yellow";
        case "O": return "orange";
        case "R": return "red";
        case "A": return "white";
        case "N": return "white";
        default: return "white";
    }
}
