// Importation des modules Firestore nécessaires
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
    "Transmettre des informations à caractère professionnel à l'écrit ou à l'oral :",
    "Entretien du linge et des vêtements"
];

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

    let validationIndex = 1;  // Compteur pour les cases de validation, commence à 1

    if (donnees.length === 0) {
        console.warn(`Aucune donnée à afficher pour "${containerId}".`);
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="4" style="text-align: center;">Aucune donnée disponible</td>
        `;
        tbody.appendChild(emptyRow);
    } else {
        donnees.forEach((item, index) => {
            // Si l'activité est dans 'activitesSansValidation', ne pas afficher les cases de validation
            let validationCells = '';
            if (activitesSansValidation.includes(item.activite)) {
                validationCells = ''; // Pas de cases de validation
            } else {
                // Créer des cellules de validation avec le compteur 'validationIndex'
                validationCells = ` 
                    <div id="case_${validationIndex}" class="validation-cell" onclick="ouvrirPanneauCouleurs(this)" data-index="${validationIndex}"></div>
                    <div id="case_${validationIndex+1}" class="validation-cell" onclick="ouvrirPanneauCouleurs(this)" data-index="${validationIndex+1}"></div>
                    <div id="case_${validationIndex+2}" class="validation-cell" onclick="ouvrirPanneauCouleurs(this)" data-index="${validationIndex+2}"></div>
                `;
                validationIndex += 3;  // Incrémenter de 3 pour la prochaine ligne
            }

            const row = document.createElement('tr');
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé, initialisation des tableaux...");

    // Création des tableaux avec les données existantes
    Object.keys(tableaux).forEach((key) => {
        console.log(`Création du tableau ${key} avec les données :`, tableaux[key]);
        creerTableau(`tableau-container-${key}`, tableaux[key] || [], key);
    });

    // Charger les données depuis Firestore
    console.log("Chargement des données depuis Firestore...");
    lireDonnees();

    // Attacher l'événement sur le bouton Enregistrer
    const enregistrerBtn = document.getElementById('enregistrerBtn');
    if (enregistrerBtn) {
        console.log("Événement 'click' attaché au bouton Enregistrer.");
        enregistrerBtn.addEventListener('click', enregistrerDonnees);
    } else {
        console.error("Le bouton 'enregistrerBtn' n'a pas été trouvé.");
    }
});


// Fonction pour lire les données depuis Firestore
async function lireDonnees() {
    try {
        const docRef = doc(window.db, "eleves", idBdd);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Données complètes du document récupérées depuis Firestore:", data);

            // Mise à jour du titre avec le nom de l'élève
            const nomEleve = data.nom || "Inconnu";
            const classeEleve = data.classe || "Non spécifiée"; // Récupérer la classe
            document.title = `Compet ${nomEleve}`;
            console.log(`Titre mis à jour : Compet ${nomEleve}`);

            // Vérification des données uniquement pour le tableau 1
            const tableauData1 = data[`tableau_1`];
            console.log(`Vérification des données du tableau 1:`, tableauData1);

            if (tableauData1) {
                console.log(`Données du tableau 1 valides:`, tableauData1);

                // Parcourir chaque case dans le tableau 1
                let caseIndex = 1; // Initialisation de l'index des cases
                const tailleTableau1 = 21; // Taille du tableau 1 (21 cases)

                for (let i = 1; i <= tailleTableau1; i++) {
                    const caseId = `case_${caseIndex}`;
                    const couleur = tableauData1[caseId] || "white"; // Utilise "white" par défaut si aucune couleur

                  // Convertir la couleur en une couleur valide CSS selon ton panneau
                  let couleurCSS;
                  switch (couleur) {
                      case "VF":
                          couleurCSS = "#006400";  // Vert foncé
                          break;
                      case "VM":
                          couleurCSS = "#008000";  // Vert moyen
                          break;
                      case "VC":
                          couleurCSS = "#90EE90";  // Vert clair
                          break;
                      case "J":
                          couleurCSS = "yellow";   // Jaune
                          break;
                      case "O":
                          couleurCSS = "orange";   // Orange
                          break;
                      case "R":
                          couleurCSS = "red";      // Rouge
                          break;
                      case "ABS":
                      case "NE":
                          couleurCSS = "white";    // Absent ou Non évalué, couleur blanche
                          break;
                      default:
                          couleurCSS = "white";    // Si la couleur est inconnue, on applique "white"
                          break;
                  }

                    // Sélectionner la cellule correspondant à cette case
                    const cellule = document.querySelector(`#${caseId}`);
                    if (cellule) {
                        console.log(`Case ${caseId} trouvée, application de la couleur : ${couleurCSS}`);
                        cellule.style.backgroundColor = couleurCSS;  // Appliquer la couleur à la cellule
                        cellule.dataset.validation = couleurCSS;  // Ajouter la donnée de validation
                    } else {
                        console.warn(`Case ${caseId} non trouvée dans le DOM.`);
                    }

                    caseIndex++; // Incrémenter l'index de la case
                }
            } else {
                console.warn("Données du tableau 1 invalides ou absentes.");
            }

            // Ajoute ces infos dans l'alerte ou à un autre endroit dans ton UI si nécessaire
            alert(`Données chargées pour : ${nomEleve}, Classe : ${classeEleve}`);

        } else {
            console.log("Aucune donnée trouvée pour cet élève.");
        }
    } catch (error) {
        console.error("Erreur lors de la lecture des données :", error);
        alert("Une erreur est survenue lors de la récupération des données.");
    }
}



// Fonction pour enregistrer les données du Tableau 1
async function enregistrerDonnees() {
    const donneesAEnvoyer = {};

    // Récupérer le nom et la classe
    const nomEleve = document.title.replace("Compet ", "");  // Prend le nom de l'élève depuis le titre
    const classeEleve = "Non spécifiée"; // La classe est récupérée depuis Firestore

    // Ajouter nom et classe aux données à envoyer
    donneesAEnvoyer.nom = nomEleve;
    donneesAEnvoyer.classe = classeEleve;

    const tableauData = {}; // On prépare les données à envoyer pour le tableau 1
    let caseIndex = 1; // Initialisation du compteur global pour les cases

    // Récupérer les anciennes données depuis Firestore
    let anciennesDonnees = {};
    try {
        const docRef = doc(window.db, "eleves", idBdd);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            anciennesDonnees = docSnap.data().tableau_1 || {};
            console.log("Anciennes données :", anciennesDonnees);
        } else {
            console.log("Aucune donnée existante trouvée pour cet élève.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des anciennes données :", error);
    }

    // Tableau 1 : Récupérer les couleurs des cases
    for (let i = 1; i <= 21; i++) {
        const caseIdGlobal = `case_${caseIndex}`; // Identifiant unique global basé sur l'index
        const cellule = document.querySelector(`#${caseIdGlobal}`);
        
        if (cellule) {
            // Récupérer la couleur de la case depuis data-validation ou style.backgroundColor
            let couleur = cellule.dataset.validation || cellule.style.backgroundColor || "blanc"; // Par défaut "blanc"
            
            // Vérifier si la couleur est hexadécimale (ex: #006400), la convertir en chaîne valide
            if (couleur.startsWith("#")) {
                couleur = couleur.toLowerCase();  // Normaliser la couleur hexadécimale
            }

            // Si la couleur est "white" ou "blanc", elle est gardée comme "blanc"
            if (couleur === "white" || couleur === "blanc") {
                couleur = "blanc";
            }

            // Ajouter la couleur au tableau des données
            tableauData[caseIdGlobal] = couleur;
        } else {
            console.warn(`Cellule ${caseIdGlobal} non trouvée dans le DOM.`);
        }

        caseIndex++; // Incrémenter l'index global pour la prochaine case
    }

    // Fusionner les anciennes données avec les nouvelles
    const donneesFusionnees = { ...anciennesDonnees, ...tableauData };

    // Ajouter les données pour le tableau 1
    if (Object.keys(donneesFusionnees).length > 0) {
        donneesAEnvoyer.tableau_1 = donneesFusionnees;
        console.log("Nouvelles données fusionnées :", donneesFusionnees);
    }

    console.log("Données à envoyer :", donneesAEnvoyer); // Log les données collectées

    // Si l'objet contient des données, on les envoie
    if (Object.keys(donneesAEnvoyer).length > 0) {
        try {
            const docRef = doc(window.db, "eleves", idBdd);
            await setDoc(docRef, donneesAEnvoyer, { merge: true }); // Utilisation de "merge" pour ne pas écraser les anciennes données
            alert("Les données ont été enregistrées avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement des données :", error);
            alert("Une erreur est survenue lors de l'enregistrement.");
        }
    } else {
        console.warn("Aucune donnée à enregistrer.");
    }
}
