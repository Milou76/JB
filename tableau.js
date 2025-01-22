        // Données pour les tableaux
        const tableauDonnees1 = [
          { code: "1.1", activite: "Rechercher l'information technique", bold: true, connaissances: "" },//ok
          { code: "1.1.1", activite: "•Découvrir les secteurs professionnels liés au champ HAS.", connaissances: "Identification des acteurs de l'orientation vers la voie professionnelle (ONISEP, entreprises, LP, CFA, COP, professeur principal, forum des métiers….)." },
          { code: "1.1.2", activite: " •Identifier les métiers, emplois, entreprises du champ professionnel.", connaissances: "Identification des métiers, des activités et des organisations (entreprises, structures…) liés au champ HAS." },
          { code: "1.1.3", activite: "  •Rechercher les informations utiles à la réalisation du travail (schéma simple, plan, documentation technique...).", connaissances: "Description des principales caractéristiques des produits alimentaires (classification en groupes) et de leurs formes de commercialisation." },
  
          { code: "1.2", activite: "Décoder l'information technique", bold: true, connaissances: "" },//ok
          { code: "1.2.1", activite: "•Décoder les documents d'organisation (planning, organigramme, plan, schéma...).", connaissances: "Indication des principes de base de l'équilibre alimentaire." },
          { code: "1.2.2", activite: "•Décoder les documents techniques (recette, protocole, notice de fabricant, étiquette, pictogramme...)..", connaissances: "Description des principales caractéristiques des produits d'entretien, des matériaux (textiles, revêtements…), des matériels." },
          { code: "1.2.3", activite: "•Identifier les caractéristiques d'un produit alimentaire, d'un produit d'entretien, à partir d'étiquettes, de fiches techniques et d'emballages..", connaissances: "Indication des dosages à respecter." },
          { code: "1.2.4", activite: "•Repérer les règles de sécurité et d'hygiène sur un protocole, une notice...", connaissances: "Étude technologique succincte (fonction d'usage, règles d'utilisation et de sécurité) des matériels utilisés en production alimentaire, distribution, entretien des locaux et équipements, entretien du linge et des vêtements." },
          ];
  
          const tableauDonnees2 = [
          { code: "2.1", activite: "Choisir le matériel, les équipements et les produits.", bold: true, connaissances: "" },//ok
      { code: "2.1.1", activite: "•Porter la tenue professionnelle adaptée au poste.", connaissances: "Justification des éléments constituant la tenue professionnelle adaptée au poste." },
      { code: "2.1.2", activite: "•Sélectionner les denrées, les produits et les matériels disponibles nécessaires à la réalisation de la tâche demandée.", connaissances: "Identification des règles d'hygiène : protocole de lavage des mains, principe de la marche en avant." },
      { code: "2.1.3", activite: " •Identifier et utiliser les équipements individuels de protection.", connaissances: "Nature et classement des déchets." },
      
      { code: "2.2", activite: "Organiser son poste de travail.", bold: true, connaissances: "" },//ok
      { code: "2.2.1", activite: "Installer le poste de travail.", connaissances: "Organisation et environnement du poste de travail." },
      { code: "2.2.2", activite: "•S'organiser dans l'espace.", connaissances: "Notions d'ergonomie du poste de travail." },
      { code: "2.2.3", activite: "•S'organiser dans le temps.", connaissances: "Caractéristiques principales des moyens à disposition : matériels, produits, équipements." },
      { code: "2.2.4", activite: "•Maintenir en ordre le poste de travail pendant l'activité.", connaissances: "Caractéristiques principales des documents d'organisation:plannings, protocoles, plans, affiches…" },
      { code: "2.2.5", activite: "•Classer par ordre chronologique les opérations à effectuer.", connaissances: "Identification des principaux risques professionnels liés à la tâche et des moyens de prévention (équipements de protection individuelle et collective)." },
      { code: "2.2.6", activite: "•Vérifier l'état du matériel.", connaissances: "Caractéristiques principales des moyens à disposition et des matières d’œuvre : matériels, produits, équipements, matériaux." },
      { code: "2.2.7", activite: "•Prendre en compte le principe de la marche en avant.", connaissances: "Indication des règles d'utilisation, de sécurité et d'entretien des matériels utilisés." },
          ];
  
          const tableauDonnees3 = [
          { code: "3.3", activite: "Entretien des locaux et des équipements", bold: true, connaissances: "" },//ok
      { code: "3.3.1", activite: "•Conduire des opérations de nettoyage.", connaissances: "Lecture des plans de nettoyage." },
      { code: "3.3.2", activite: "•Dépoussiérage manuel ou mécanique.", connaissances: "Indication des objectifs des différentes techniques." },
      { code: "3.3.3", activite: "•Lavage manuel (vitrerie, parois, sol).", connaissances: "Principales propriétés des produits d'entretien du linge." },
      { code: "3.3.4", activite: " •Entretien mécanique des sols (aspiration, lustrage, spray méthode).", connaissances: "Condition d'emploi des produits (dilution, précaution….)." },
      { code: "3.3.5", activite: "•Nettoyage désinfection des surfaces.", connaissances: "Lecture du code d'entretien des articles textiles." },
  
      
      { code: "3.4", activite: "Entretien du linge et des vêtements", bold: true, connaissances: "" },//ok mais bizarre
      { code: "3.4.1", activite: "•Réceptionner le linge sale (visiter, trier, peser, détacher).", connaissances: "Identification des programmes de lavage, séchage, des réglages des matériels de repassage." },
      { code: "3.4.2", activite: "•Laver, sécher en machine.", connaissances: "Critères de tri (catégories de linge, types de textiles) et de pliage." },
      { code: "3.4.3", activite: "•Repasser, plier, ranger.", connaissances: "Supports et outils de la communication : oral et écrit." },
      { code: "3.4.4", activite: "•Effectuer des travaux de réfection courants (coudre un bouton, ourlet, assemblage…).", connaissances: "Description des documents professionnels et courants (fiche de stock, bon de commande, fiche de traçabilité…)." },
          ];
  
          const tableauDonnees4 = [
          { code: "4.1", activite: "Transmettre des informations à caractère professionnel à l'écrit ou à l'oral :", bold: true, connaissances: "" },//ok
      { code: "4.1.1", activite: "•Utiliser le matériel de communication (téléphone, internet…).", connaissances: "Règles de savoir-être et de savoir-vivre professionnels." },
      { code: "4.1.2", activite: "•Rendre compte des opérations à effectuer ou effectuées à l'écrit ou à l'oral.", connaissances: "(politesse, discrétion, respect, courtoisie,….)." },
      { code: "4.1.3", activite: "•Renseigner un document professionnel.", connaissances: "Notion du secret professionnel." },
      { code: "4.1.4", activite: "•Rendre compte à l'employeur et aux collègues.", connaissances: "Indication des besoins de la clientèle, des usagers." },
  
      { code: "4.2", activite: "Entretien du linge et des vêtements", bold: true, connaissances: "" },//o
      { code: "4.2.1", activite: "•Instaurer des relations courtoises et efficaces.", connaissances: "Lecture d'un organigramme." },
      { code: "4.2.2", activite: "•Recueillir des observations des usagers, des clients sur les productions et les services.", connaissances: "Repérage de sa fonction dans l'organigramme de l'équipe." },
      { code: "4.2.3", activite: "•Réagir avec pertinence face à un événement imprévu.", connaissances: "" },
      { code: "4.2.4", activite: "•Participer à l'image de marque d'une organisation (entreprise, collectivité…).", connaissances: "" },
          ];