// Liste d'exemples d'identifiants et mots de passe (à remplacer par ta propre logique de gestion)
const utilisateurs = [
    { id: "LeslieC", motdepasse: "SegpaJB" },//Leslie
    { id: "EnzoC", motdepasse: "SegpaJB" },//Enzo
    { id: "D'shawnC", motdepasse: "SegpaJB" },//D'shawn
    { id: "NaïlaG", motdepasse: "SegpaJB" },//Naïla
    { id: "ClaraM", motdepasse: "SegpaJB" },//Clara
    { id: "ManonP", motdepasse: "SegpaJB" },//Manon
    { id: "SaonaB", motdepasse: "SegpaJB" },//Saona
    { id: "TommyH", motdepasse: "SegpaJB" },//Tommy
    { id: "SayanP", motdepasse: "SegpaJB" },//Sayan
    { id: "SoryT", motdepasse: "SegpaJB" },//Sory
    { id: "JeanneV", motdepasse: "SegpaJB" },//Jeanne
    { id: "MohamedY", motdepasse: "SegpaJB" },//Mohamed
    { id: "NaïlaD", motdepasse: "SegpaJB" },//Naïlaa
    { id: "LyséaneG", motdepasse: "SegpaJB" },//Lyséane
    { id: "RafaelL", motdepasse: "SegpaJB" },//Rafael
    { id: "Huseyin", motdepasse: "SegpaJB" },//Huseyin
    { id: "MamadouT", motdepasse: "SegpaJB" },//Mamadou
    { id: "AlyzéT", motdepasse: "SegpaJB" },//Alyzé
    // Ajoute d'autres utilisateurs ici selon ton besoin
    { id: "admin1", motdepasse: "mdpA1", type: "admin" }  // Utilisateur admin
  ];

  // Fonction de connexion
  function connexion() {
    // Récupérer les valeurs du formulaire
    const identifiant = document.querySelector('.identifiant').value;
    const motdepasse = document.querySelector('.mdp').value;
    
    // Vérifier si l'identifiant et le mot de passe sont corrects
    const utilisateurTrouve = utilisateurs.find(utilisateur => utilisateur.id === identifiant && utilisateur.motdepasse === motdepasse);
  
    if (utilisateurTrouve) {
      // Si c'est un admin, rediriger vers classe.html
      if (utilisateurTrouve.type === "admin") {
        sessionStorage.setItem('utilisateur', JSON.stringify(utilisateurTrouve));
        window.location.href = 'classe.html';  // Redirection vers la page d'admin
      } else {
        // Sinon, stocker l'élève dans sessionStorage et rediriger vers la page de l'élève (par exemple : dashboard.html)
        sessionStorage.setItem('utilisateur', JSON.stringify(utilisateurTrouve));
        window.location.href = 'index.html';  // Remplacer par ta page principale pour les élèves
      }
    } else {
      // Si les identifiants sont incorrects, afficher un message d'erreur
      alert("Identifiant ou mot de passe incorrect.");
    }
  }
  
  // Ajouter un événement au formulaire pour empêcher le rechargement de la page et appeler la fonction connexion
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêcher le rechargement de la page
    connexion();
  });
  