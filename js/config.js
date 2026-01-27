// Données centralisées pour le site

const calendarEvents = [
    {
        date: "12 - 16 Janvier 2026",
        title: "Dépôt des candidatures",
        description: "Période officielle de dépôt des candidatures pour les différents postes du comité culturel."
    },
    {
        date: "19 - 21 Janvier 2026",
        title: "Formation des cartels",
        description: "Organisation des groupes (cartels) et structuration des équipes autour des projets culturels."
    },
    {
        date: "22 Janvier 2026",
        title: "Présentation des candidats",
        description: "Présentation officielle des candidats et de leurs visions culturelles à l’ensemble de l’équipe."
    },
    {
        date: "23 - 26 Janvier 2026",
        title: "Présentation des plans d’actions culturels",
        description: "Présentation des projets, activités et orientations culturelles proposées par chaque cartel."
    },
    {
        date: "Semaine du 26 Janvier 2026",
        title: "Ouverture officielle de la campagne culturelle",
        description: "Début officiel de la campagne de promotion des projets culturels."
    },
    {
        date: "26 Janvier 2026",
        title: "Présentation du cartel Force Majeure",
        description: "Rencontre culturelle et présentation du projet du cartel Force Majeure avec toute l’équipe."
    },
    {
        date: "27 Janvier 2026",
        title: "Présentation du cartel Sperc",
        description: "Présentation du projet culturel et des membres du cartel Sperc."
    },
    {
        date: "28 Janvier 2026",
        title: "Présentation du Comité Joie et Amour",
        description: "Présentation des initiatives culturelles portées par le Comité Joie et Amour."
    },
    {
        date: "29 Janvier 2026",
        title: "Présentation du cartel Intrépide",
        description: "Présentation des projets et de la vision culturelle du cartel Intrépide."
    },
    {
        date: "30 Janvier 2026",
        title: "Présentation du cartel Dévlopman ak Lajwa",
        description: "Présentation du programme culturel du cartel Dévlopman ak Lajwa."
    },
    {
        date: "Semaine du 6 Février 2026",
        title: "Rencontres et échanges culturels",
        description: "Échanges entre les responsables des cartels autour des projets culturels proposés."
    },
    {
        date: "9 Février 2026",
        title: "Journée électorale",
        description: "Vote pour l’élection des membres du comité culturel."
    },
    {
        date: "11 Février 2026",
        title: "Journée électorale (si 2ᵉ tour)",
        description: "Deuxième tour du vote si nécessaire, notamment pour la présidence du comité culturel."
    },
    {
        date: "11 - 15 Février 2026",
        title: "Période de transition",
        description: "Passation entre l’ancien et le nouveau comité culturel."
    },
    {
        date: "16 Février 2026",
        title: "Cérémonie d’investiture",
        description: "Installation officielle du nouveau comité culturel."
    }
];


// Données des candidats
const candidatesData = [
    // Ligne 1: Cartel KDL (Katèl Devlpman ak Lajwa) - Numéro 1
  {
    id: 1,
    name: "Kethia JULES",
    prenom: "Kethia",
    nom: "JULES",
    team: "Appliance",
    position: "president",
    positionLabel: "Président",
    bio: "Je suis Kethia Jules, spécialisée en informatique et fondatrice d’un business en ligne. Sérieuse et dotée d’un fort sens du leadership, j’ai l’habitude de présider et de diriger des équipes. Je possède une solide expérience en gestion, organisation et prise de décisions, avec une approche engagée, structurée et compétente.",
    cartel: "Cartel KDL (Katèl Devlòpman ak Lajwa)",
    numero: 1,
    contact: "Pas disponible",
    photo: "Kethia.jpg"
}
,
    {
        id: 6,
        name: "Roody GASPARD",
        prenom: "Roody",
        nom: "GASPARD",
        team: "EyeCare",
        position: "vice-president",
        positionLabel: "Vice-président",
        bio: "Chrétien engagé, informaticien de formation et jeune entrepreneur, PDG de MaketOu, orienté innovation et développement.",
        cartel: "Cartel KDL (Katèl Devlòpman ak Lajwa)",
        numero: 1,
        contact: "+509 4414-2816",
        photo: "Roody.jpg"
    },
    {
        id: 11,
        name: "Love Mondy ANTOINE",
        prenom: "Love Mondy",
        nom: "ANTOINE",
        team: "Non-Appliance",
        position: "secretaire",
        positionLabel: "Secrétaire",
        bio: "citoyenne responsable,Organisee ,capacite d'assurer la polyvalence des fonctions , professionnalisme",
        cartel: "Cartel KDL (Katèl Devlòpman ak Lajwa)",
        numero: 1,
        contact: "+509 3224-2141",
        photo: "Love Mondy.jpg"
    },
    {
        id: 16,
        name: "Jeff JEAN-BAPTISTE",
        prenom: "Jeff",
        nom: "JEAN-BAPTISTE",
        team: "EyeCare",
        position: "tresorier",
        positionLabel: "Trésorier",
        bio: "Specialiste en reseaux informatiques avec 4 ans d'experience, je maitrise la conception et l'optimisation d'infrastructure connectees.",
        cartel: "Cartel KDL (Katèl Devlòpman ak Lajwa)",
        numero: 1,
        contact: "+509 3859-6171/41992208",
        photo: "Jeff.jpg"
    },
    {
        id: 21,
        name: "Nedgina MARTEL",
        prenom: "Nedgina",
        nom: "MARTEL",
        team: "Appliance",
        position: "porte-parole",
        positionLabel: "Porte-parole",
        bio: "Technicienne en operation douaniere, candidate porte-parole pour assurer communication et diffusion des informations.",
        cartel: "Cartel KDL (Katèl Devlòpman ak Lajwa)",
        numero: 1,
        contact: "+509 48401954",
        photo: "Nedgina.jpg"
    },

    // Ligne 2: Comité de Joie et D'amour - Numéro 7
    {
        id: 3,
        name: "Jean Gardy VOLTAIRE",
        prenom: "Jean Gardy",
        nom: "VOLTAIRE",
        team: "EyeCare",
        position: "president",
        positionLabel: "Président",
        bio: "Citoyen,Chretien,Marie, Habitue a etre  premier responsable dans d'autre Institution,fomer en Administration et Gestion",
        cartel: "Comité de Joie et D'amour",
        numero: 7,
        contact: "+509 4461-3458",
        photo: "Jean Gardy.jpg"
    },
    {
        id: 8,
        name: "Peterson MARCELIN",
        prenom: "Peterson",
        nom: "MARCELIN",
        team: "Alcon",
        position: "vice-president",
        positionLabel: "Vice-président",
        bio: "Chretien, avoir esprit d'equipe,musicien,informaticien,etudiant en droit,responsable",
        cartel: "Comité de Joie et D'amour",
        numero: 7,
        contact: "+509 49097349",
        photo: "Peterson.jpg"
    },
    {
        id: 13,
        name: "Jean Ernst Edner CELESTIN",
        prenom: "Jean Ernst Edner",
        nom: "CELESTIN",
        team: "Acquisition",
        position: "secretaire",
        positionLabel: "Secrétaire",
        bio: "",
        cartel: "Comité de Joie et D'amour",
        numero: 7,
        contact: "Pas disponible",
        photo: "Jean Ernst Edner.jpg"
    },
    {
        id: 18,
        name: "Norka Arolyonne FRANCOIS",
        prenom: "Norka Arolyonne",
        nom: "FRANCOIS",
        team: "ALCON",
        position: "tresorier",
        positionLabel: "Trésorière",
        bio: "INFIRMIERE, TECHNICIENNE EN BANQUE, RESPONSABLE , FIABLE, INNOVATRICE, Avec des postes similaires j'ai les compétences nécessaires  pour exceller dans    la Planification financière et budgétisation en tresorerie",
        cartel: "Comité de Joie et D'amour",
        numero: 7,
        contact: "Pas disponible",
        photo: "Norka Arolyonne.jpg"
    },
    {
        id: 23,
        name: "Erlendo DUBOIS",
        prenom: "Erlendo",
        nom: "DUBOIS",
        team: "Acquisition",
        position: "porte-parole",
        positionLabel: "Porte-parole",
        bio: "Étudiant en journalisme passionné par la communication, je souhaite devenir un présentateur professionnel capable d'informer, d'inspirer et de toucher le public. Je possède de solides compétences en prise de parole en public et en création de liens humains, renforçant mon efficacité comme communicant. Ma vision est d'être une voix engagée pour la vérité et la transparence.",
        cartel: "Comité de Joie et D'amour",
        numero: 7,
        contact: "+509 4070-6698",
        photo: "Erlendo.jpg"
    },

    // Ligne 3: Cartel Sperc - Numéro 3
    {
        id: 2,
        name: "Johnson GUAY",
        prenom: "Johnson",
        nom: "GUAY",
        team: "Alcon",
        position: "president",
        positionLabel: "Président",
        bio: "ECONOMISTE, PDG MOMENTUM BARBER SHOP ,PDG JOHN'S SHIPING, RESPONSABLE, ENGAGEE . FORMATEUR EN DEVELOPPEMENT PERSONNEL",
        cartel: "Cartel Sperc",
        numero: 3,
        contact: "+509 4824-0708",
        photo: "Johnson.jpg"
    },
    {
        id: 7,
        name: "Kerwin SIMEON",
        prenom: "Kerwin",
        nom: "SIMEON",
        team: "Entry",
        position: "vice-president",
        positionLabel: "Vice-président",
        bio: "Créative, responsable, fiable, empathique et engagée.",
        cartel: "Cartel Sperc",
        numero: 3,
        contact: "+509 3470-4349",
        photo: "Kerwin.jpg"
    },
    {
        id: 12,
        name: "Fredline PAUL",
        prenom: "Fredline",
        nom: "PAUL",
        team: "Appliance",
        position: "secretaire",
        positionLabel: "Secrétaire",
        bio: "Formée en informatique bureautique à CETEMOH, J'assure l'agenda, je rédige des documents, je suis sérieuse,organisée et dévouée.",
        cartel: "Cartel Sperc",
        numero: 3,
        contact: "+509 4319-8998",
        photo: "Fredline.jpg"
    },
    {
        id: 17,
        name: "Richelor ROGER",
        prenom: "Richelor",
        nom: "ROGER",
        team: "Tire",
        position: "tresorier",
        positionLabel: "Trésorier",
        bio: "J'assure la gestion stratégique des liquidités et des risques financiers. Veille à la transparence des opérations à travers une planification budgétaire rigoureuse.",
        cartel: "Cartel Sperc",
        numero: 3,
        contact: "Pas disponible",
        photo: "Richelor.jpg"
    },
    {
        id: 22,
        name: "Bladymir LYLIS",
        prenom: "Bladymir",
        nom: "LYLIS",
        team: "Alcon",
        position: "porte-parole",
        positionLabel: "Porte-parole",
        bio: "Teneur de livres comptable ,obtenir un certificat a CETEMOH EN comptabilité informatisée,tres responsable ,capacite de motive,discipline .",
        cartel: "Cartel Sperc",
        numero: 3,
        contact: "+509 3416-7831",
        photo: "Bladymir.jpg"
    },

    // Ligne 4: Cartel Force Majeure - Numéro 10
    {
        id: 4,
        name: "Dave GUAY",
        prenom: "Dave",
        nom: "GUAY",
        team: "Task",
        position: "president",
        positionLabel: "Président",
        bio: "Passionné par l'informatique et les nouvelles technologies, je suis un technicien compétent, organisé et persévérant, doté d'un bon esprit d'analyse et toujours prêt à apprendre afin d'offrir un service efficace et professionnel.",
        cartel: "Cartel Force Majeure",
        numero: 10,
        contact: "+509 4612-6417",
        photo: "Dave.jpg"
    },
    {
        id: 9,
        name: "Torchon ADJINANIE",
        prenom: "Torchon",
        nom: "ADJINANIE",
        team: "COOP",
        position: "vice-president",
        positionLabel: "Vice-président",
        bio: "Technicienne en Informatique,Chretienne,Personne engagee , Responsable ,Innovatrice et aussi Motivante.",
        cartel: "Cartel Force Majeure",
        numero: 10,
        contact: "509 3292-4174",
        photo: "Torchon.jpg"
    },
    {
        id: 14,
        name: "Geraldine FIRMIN",
        prenom: "Geraldine",
        nom: "FIRMIN",
        team: "COOP",
        position: "secretaire",
        positionLabel: "Secrétaire",
        bio: "Technicienne en informatique, Motivée, Une bonne esprit d'equipe, Responsable, Engagée, Fiable.",
        cartel: "Cartel Force Majeure",
        numero: 10,
        contact: "+509 3809-8646",
        photo: "Geraldine.jpg"
    },
    {
        id: 19,
        name: "Ismael PLAISIR",
        prenom: "Ismael",
        nom: "PLAISIR",
        team: "QA",
        position: "tresorier",
        positionLabel: "Trésorier",
        bio: "",
        cartel: "Cartel Force Majeure",
        numero: 10,
        contact: "Pas disponible",
        photo: "Ismael.jpg"
    },
    {
        id: 24,
        name: "Kike-Love Dina ALEXANDRE",
        prenom: "Kike-Love Dina",
        nom: "ALEXANDRE",
        team: "QA-Int",
        position: "porte-parole",
        positionLabel: "Porte-parole",
        bio: "Animatrice et présentatrice d'expérience. Étudiante finissante en journalisme. Passionnée de la psychologie et de la gestion des ressources humaines. Oratrice capable de porter la voix de tous ceux qui ne veulent ou ne peuvent pas parler avec respect et transparence.",
        cartel: "Cartel Force Majeure",
        numero: 10,
        contact: "+509 4939-2250",
        photo: "Kike-Love Dina.jpg"
    },

    // Ligne 5: Cartel INTREPIDE - Numéro 2
    {
        id: 5,
        name: "Joline BELNOM",
        prenom: "Joline",
        nom: "BELNOM",
        team: "Alcon",
        position: "president",
        positionLabel: "Présidente",
        bio: "Licenciée en sc.Juridique,formée en informatique bureautique. Dynamique,responsable,disciplinée et tenace: en somme,une personne devouée et engagée,prête à se sacrifier pour le bonheur des autres.",
        cartel: "Cartel INTREPIDE",
        numero: 2,
        contact: "+509 4788-8183",
        photo: "Joline.jpg"
    },
    {
        id: 10,
        name: "Guerlyne PLAISIR",
        prenom: "Guerlyne",
        nom: "PLAISIR",
        team: "Appliance",
        position: "vice-president",
        positionLabel: "Vice-présidente",
        bio: "",
        cartel: "Cartel INTREPIDE",
        numero: 2,
        contact: "Pas disponible",
        photo: "Guerlyne.jpg"
    },
    {
        id: 15,
        name: "Berline IBART",
        prenom: "Berline",
        nom: "IBART",
        team: "Tire",
        position: "secretaire",
        positionLabel: "Secrétaire",
        bio: "DIPLOME EN COMPTABILITE ET GESTION .Laborieuse, disciplinee, determinee et devouee",
        cartel: "Cartel INTREPIDE",
        numero: 2,
        contact: "+509 37838609",
        photo: "Berline.jpg"
    },
    {
        id: 20,
        name: "Georges FRANCINE",
        prenom: "Georges",
        nom: "FRANCINE",
        team: "Appliance",
        position: "tresorier",
        positionLabel: "Trésorière",
        bio: "Technicienne en Opérations Douanières, je me distingue par ma rigueur et mon sens de l'organisation. Je suis motivée à contribuer à une gestion transparente et responsable des ressources du Comité Culturelle de CDC.",
        cartel: "Cartel INTREPIDE",
        numero: 2,
        contact: "+509 3378-1519",
        photo: "Georges.jpg"
    },
    {
        id: 25,
        name: "Patrice LAMY",
        prenom: "Patrice",
        nom: "LAMY",
        team: "EyeCare",
        position: "porte-parole",
        positionLabel: "Porte-parole",
        bio: "Formee en informatique Bureautique depuis CETEMOH, Decodage telephone Portable depuis PRMS.  Honnete,Confiant, Respectueux.",
        cartel: "Cartel INTREPIDE",
        numero: 2,
        contact: "+509 4076-0862",
        photo: "Patrice.jpg"
    },

    // Ligne 6: Jude Betsau MUSEAU - Cartel Indépendant - Numéro 5
    {
        id: 26,
        name: "Jude Betsau MUSEAU",
        prenom: "Jude Betsau",
        nom: "MUSEAU",
        team: "Independent",
        position: "porte-parole",
        positionLabel: "Porte-parole",
        bio: "UN JEUNE TALENTUEUX , HUMAIN, COMPERSIF  ET AVISER, FORMER A CETEMOH EN TECHNIQUES DES SCIENCES INFORMATIQUES",
        cartel: "Indépendant",
        numero: 5,
        contact: "+509 4104-2147",
        photo: "Jude Betsau.jpg"
    }
];

// Données pour la table des postes (mise à jour avec les noms corrects)
const positionsTable = [
    {
        president: "Kethia JULES",
        vicePresident: "Roody GASPARD",
        secretaire: "Love Mondy ANTOINE",
        tresorier: "Jeff JEAN-BAPTISTE",
        porteParole: "Nedgina MARTEL"
    },
    {
        president: "Jean Gardy VOLTAIRE",
        vicePresident: "Peterson MARCELIN",
        secretaire: "Jean Ernst Edner CELESTIN",
        tresorier: "Norka Arolyonne FRANCOIS",
        porteParole: "Erlendo DUBOIS"
    },
    {
        president: "Johnson GUAY",
        vicePresident: "Kerwin SIMEON",
        secretaire: "Fredline PAUL",
        tresorier: "Richelor ROGER",
        porteParole: "Bladymir LYLIS"
    },
    {
        president: "Dave GUAY",
        vicePresident: "Torchon ADJINANIE",
        secretaire: "Geraldine FIRMIN",
        tresorier: "Ismael PLAISIR",
        porteParole: "Kike-Love Dina ALEXANDRE"
    },
    {
        president: "Joline BELNOM",
        vicePresident: "Guerlyne PLAISIR",
        secretaire: "Berline IBART",
        tresorier: "Georges FRANCINE",
        porteParole: "Patrice LAMY"
    },
    {
        president: "",
        vicePresident: "",
        secretaire: "",
        tresorier: "",
        porteParole: "Jude Betsau MUSEAU"
    }
];

// Exporter les données

export { calendarEvents, candidatesData, positionsTable };
