// Module pour la page Politique Générale
// Utilise les données des candidats pour afficher les cartels et leurs politiques

// Initialiser la page politique
function initializePolitiquePage(candidatesData) {
    // Récupérer les éléments du DOM
    const cartelsList = document.getElementById('cartelsList');
    const documentViewer = document.getElementById('documentViewer');
    const currentCartelTitle = document.getElementById('currentCartelTitle');
    const downloadBtn = document.getElementById('downloadBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const documentDetails = document.getElementById('documentDetails');
    const detailsContent = document.getElementById('detailsContent');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenTitle = document.getElementById('fullscreenTitle');
    const fullscreenContent = document.getElementById('fullscreenContent');
    const closeFullscreenBtn = document.getElementById('closeFullscreenBtn');
    
    // Initialiser les filtres
    const filterButtons = document.querySelectorAll('#cartelFilter .filter-btn');
    const numeroFilterButtons = document.querySelectorAll('#numeroFilter .filter-btn');
    
    let currentCartel = null;
    let currentFilter = 'all';
    let currentNumeroFilter = 'all';
    
    // Données des cartels extraites des candidats
    const cartelsData = extractCartelsFromCandidates(candidatesData);
    
    // Fonction pour extraire les cartels des données des candidats
    function extractCartelsFromCandidates(candidates) {
        const cartelsMap = {};
        
        candidates.forEach(candidate => {
            const cartelName = candidate.cartel;
            
            if (!cartelsMap[cartelName]) {
                cartelsMap[cartelName] = {
                    id: candidate.numero,
                    name: cartelName,
                    shortName: candidate.team,
                    numero: candidate.numero,
                    candidatesCount: 1,
                    document: {
                        title: `Programme Électoral - ${candidate.team}`,
                        filename: `documents/cartel-${candidate.numero}.pdf`,
                        lastUpdated: new Date().toLocaleDateString('fr-FR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric' 
                        })
                    }
                };
            } else {
                cartelsMap[cartelName].candidatesCount++;
            }
        });
        
        return Object.values(cartelsMap);
    }
    
    // Fonction pour générer les cartes des cartels
    function generateCartelsList() {
        cartelsList.innerHTML = '';
        
        // Filtrer les cartels
        let filteredCartels = cartelsData;
        
        if (currentFilter !== 'all') {
            filteredCartels = filteredCartels.filter(cartel => {
                // Corriger la correspondance pour Cartel Comité
                if (currentFilter === 'Cartel Comité de Joie et D\'amour') {
                    return cartel.name.includes('Cartel Comité de Joie et D\'amour');
                }
                return cartel.name.includes(currentFilter);
            });
        }
        
        if (currentNumeroFilter !== 'all') {
            filteredCartels = filteredCartels.filter(cartel => 
                cartel.numero == currentNumeroFilter
            );
        }
        
        // Afficher un message si aucun cartel trouvé
        if (filteredCartels.length === 0) {
            cartelsList.innerHTML = `
                <div class="no-cartels" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-users-slash" style="font-size: 3rem; color: var(--medium-gray); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--primary-blue); margin-bottom: 10px;">Aucun cartel trouvé</h3>
                    <p style="color: var(--text-light);">Aucun cartel ne correspond aux filtres sélectionnés.</p>
                </div>
            `;
            return;
        }
        
        // Générer les cartes de cartels
        filteredCartels.forEach(cartel => {
            const cartelCard = document.createElement('div');
            cartelCard.className = 'cartel-card';
            if (currentCartel && currentCartel.id === cartel.id) {
                cartelCard.classList.add('active');
            }
            
            // Générer des initiales à partir du nom du cartel
            const initials = cartel.shortName
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .substring(0, 3);
            
            cartelCard.innerHTML = `
                <div class="cartel-number">${cartel.numero}</div>
                <div class="cartel-logo">${initials}</div>
                <h3 class="cartel-name">${cartel.name}</h3>
                <p class="cartel-tagline">${cartel.candidatesCount} candidats</p>
                <span class="cartel-status available">
                    Document disponible
                </span>
            `;
            
            cartelCard.addEventListener('click', () => {
                selectCartel(cartel);
            });
            
            cartelsList.appendChild(cartelCard);
        });
    }
    
    // Fonction pour sélectionner un cartel
    function selectCartel(cartel) {
        // Mettre à jour la sélection visuelle
        document.querySelectorAll('.cartel-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const selectedCards = document.querySelectorAll('.cartel-card');
        selectedCards.forEach(card => {
            const cardNumber = card.querySelector('.cartel-number').textContent;
            if (cardNumber === cartel.numero.toString()) {
                card.classList.add('active');
            }
        });
        
        // Mettre à jour les variables
        currentCartel = cartel;
        
        // Mettre à jour l'affichage
        updateDocumentViewer();
        updateDocumentDetails();
        
        // Activer les boutons
        downloadBtn.disabled = false;
        fullscreenBtn.disabled = false;
        
        // Faire défiler jusqu'au viewer
        document.getElementById('document-viewer').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fonction pour mettre à jour le viewer de document
    function updateDocumentViewer() {
        if (!currentCartel) {
            documentViewer.innerHTML = `
                <div class="no-document-selected">
                    <i class="fas fa-file-alt"></i>
                    <h3>Aucun document sélectionné</h3>
                    <p>Sélectionnez un cartel dans la liste ci-dessus pour afficher son programme.</p>
                </div>
            `;
            currentCartelTitle.textContent = 'Sélectionnez un cartel pour afficher son programme';
            documentDetails.style.display = 'none';
            downloadBtn.disabled = true;
            fullscreenBtn.disabled = true;
            return;
        }
        
        // Mettre à jour le titre
        currentCartelTitle.textContent = currentCartel.document.title;
        
        // Créer un iframe pour afficher le PDF
        const pdfFrame = document.createElement('iframe');
        pdfFrame.id = 'pdfFrame';
        pdfFrame.style.width = '100%';
        pdfFrame.style.height = '600px';
        pdfFrame.style.border = 'none';
        
        // Vérifier si le fichier existe avant de l'afficher
        const testLink = document.createElement('a');
        testLink.href = currentCartel.document.filename;
        testLink.style.display = 'none';
        document.body.appendChild(testLink);
        
        // Tenter de charger le PDF, sinon afficher un message d'erreur
        pdfFrame.onerror = function() {
            documentViewer.innerHTML = `
                <div class="no-document-selected">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Document non disponible</h3>
                    <p>Le fichier PDF pour ce cartel n'a pas été trouvé dans le dossier /documents/.</p>
                    <p>Vérifiez que le fichier existe : ${currentCartel.document.filename}</p>
                </div>
            `;
        };
        
        pdfFrame.src = currentCartel.document.filename;
        
        // Remplacer le contenu
        documentViewer.innerHTML = '';
        documentViewer.appendChild(pdfFrame);
        
        // Afficher les détails
        documentDetails.style.display = 'block';
    }
    
    // Fonction pour mettre à jour les détails du document
    function updateDocumentDetails() {
        if (!currentCartel) return;
        
        detailsContent.innerHTML = `
            <div class="detail-item">
                <h4><i class="fas fa-file-alt"></i> Nom du document</h4>
                <p>${currentCartel.document.title}</p>
            </div>
            <div class="detail-item">
                <h4><i class="fas fa-users"></i> Cartel</h4>
                <p>${currentCartel.name}</p>
            </div>
            <div class="detail-item">
                <h4><i class="fas fa-calendar-alt"></i> Dernière mise à jour</h4>
                <p>${currentCartel.document.lastUpdated}</p>
            </div>
            <div class="detail-item">
                <h4><i class="fas fa-user-friends"></i> Nombre de candidats</h4>
                <p>${currentCartel.candidatesCount} candidats</p>
            </div>
            <div class="detail-item">
                <h4><i class="fas fa-file-pdf"></i> Fichier PDF</h4>
                <p>${currentCartel.document.filename}</p>
            </div>
        `;
    }
    
    // Fonction pour télécharger le document
    function downloadDocument() {
        if (!currentCartel) return;
        
        // Simuler un téléchargement
        const link = document.createElement('a');
        link.href = currentCartel.document.filename;
        link.download = currentCartel.document.filename.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Fonction pour ouvrir en plein écran
    function openFullscreen() {
        if (!currentCartel) return;
        
        fullscreenTitle.textContent = currentCartel.document.title;
        
        // Créer un iframe pour le plein écran
        const fullscreenFrame = document.createElement('iframe');
        fullscreenFrame.style.width = '100%';
        fullscreenFrame.style.height = '100%';
        fullscreenFrame.style.border = 'none';
        fullscreenFrame.src = currentCartel.document.filename;
        
        fullscreenContent.innerHTML = '';
        fullscreenContent.appendChild(fullscreenFrame);
        
        fullscreenModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Fonction pour fermer le plein écran
    function closeFullscreen() {
        fullscreenModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Vider le contenu de l'iframe
        fullscreenContent.innerHTML = '';
    }
    
    // Configurer les écouteurs d'événements
    function setupEventListeners() {
        // Boutons d'actions
        downloadBtn.addEventListener('click', downloadDocument);
        fullscreenBtn.addEventListener('click', openFullscreen);
        closeFullscreenBtn.addEventListener('click', closeFullscreen);
        
        // Filtres par cartel
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');
                // Mettre à jour le filtre
                currentFilter = button.dataset.filter;
                // Regénérer la liste des cartels
                generateCartelsList();
            });
        });
        
        // Filtres par numéro
        numeroFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                numeroFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');
                // Mettre à jour le filtre
                currentNumeroFilter = button.dataset.numero;
                // Regénérer la liste des cartels
                generateCartelsList();
            });
        });
        
        // Fermer le plein écran avec ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && fullscreenModal.style.display === 'block') {
                closeFullscreen();
            }
        });
        
        // Fermer le plein écran en cliquant à l'extérieur
        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                closeFullscreen();
            }
        });
    }
    
    // Initialiser la page
    function init() {
        generateCartelsList();
        setupEventListeners();
        
        // Sélectionner le premier cartel par défaut si disponible
        if (cartelsData.length > 0) {
            setTimeout(() => {
                selectCartel(cartelsData[0]);
            }, 500);
        }
        
        // Vérifier si un cartel est spécifié dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const cartelId = urlParams.get('cartel');
        if (cartelId) {
            const cartel = cartelsData.find(c => c.id == cartelId || c.numero == cartelId);
            if (cartel) {
                selectCartel(cartel);
            }
        }
    }
    
    // Démarrer l'initialisation
    init();
}

// Exporter la fonction d'initialisation
export { initializePolitiquePage };