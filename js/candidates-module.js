// Module pour la page des candidats
import { candidatesData } from './config.js';

// État des filtres
let currentFilter = 'all';
let currentCartelFilter = 'all';
let currentNumeroFilter = 'all';
let currentTeamFilter = 'all';
let candidatesList = null;
let activeFiltersDisplay = null;
let candidateCountDisplay = null;

function initializeCandidatesPage() {
    // Initialiser les éléments DOM
    candidatesList = document.getElementById('candidatesList');
    activeFiltersDisplay = document.getElementById('activeFilters');
    candidateCountDisplay = document.getElementById('candidateCount');
    
    const candidateModal = document.getElementById('candidateModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    const resetAllFiltersBtn = document.getElementById('resetAllFilters');
    const toggleFiltersBtn = document.getElementById('toggleFilters');
    const mobileToggleFiltersBtn = document.getElementById('mobileToggleFilters');
    const closeFiltersBtn = document.getElementById('closeFilters');
    const filtersSidebar = document.getElementById('filtersSidebar');

    if (!candidatesList) {
        console.error('Élément #candidatesList non trouvé');
        return;
    }

    /* =========================
       GESTION DU SIDEBAR MOBILE
    ========================= */
    function setupMobileSidebar() {
        if (toggleFiltersBtn) {
            toggleFiltersBtn.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    filtersSidebar.classList.toggle('active');
                }
            });
        }
        
        if (mobileToggleFiltersBtn) {
            mobileToggleFiltersBtn.addEventListener('click', () => {
                filtersSidebar.classList.add('active');
            });
        }
        
        if (closeFiltersBtn) {
            closeFiltersBtn.addEventListener('click', () => {
                filtersSidebar.classList.remove('active');
            });
        }
        
        // Fermer le sidebar en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && 
                filtersSidebar.classList.contains('active') &&
                !filtersSidebar.contains(e.target) &&
                e.target !== mobileToggleFiltersBtn &&
                !mobileToggleFiltersBtn.contains(e.target)) {
                filtersSidebar.classList.remove('active');
            }
        });
        
        // Fermer le sidebar lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                filtersSidebar.classList.remove('active');
            }
        });
    }

    /* =========================
       GÉNÉRATION DES BOUTONS DE FILTRE
    ========================= */
    function generateFilterButtons() {
        // Extraire les valeurs uniques pour chaque filtre
        const positions = [...new Set(candidatesData.map(c => c.position))];
        const teams = [...new Set(candidatesData.map(c => c.team))].filter(t => t && t.trim() !== '');
        const cartels = [...new Set(candidatesData.map(c => c.cartel))];
        const numeros = [...new Set(candidatesData.map(c => c.numero))].sort((a, b) => a - b);

        // Fonction pour créer un bouton de filtre
        function createFilterButton(type, value, label, containerId, isActive = false) {
            const container = document.getElementById(containerId);
            if (!container) return null;

            const button = document.createElement('button');
            button.className = `filter-btn ${type}-filter-btn ${isActive ? 'active' : ''}`;
            button.dataset[type] = value;
            
            // Ajouter un icône selon le type
            let icon = '';
            switch(type) {
                case 'position': icon = 'briefcase'; break;
                case 'team': icon = 'users'; break;
                case 'cartel': icon = 'flag'; break;
                case 'numero': icon = 'hashtag'; break;
            }
            
            button.innerHTML = `<i class="fas fa-${icon}"></i> ${label}`;
            
            container.appendChild(button);
            return button;
        }

        // Générer les boutons de filtre par position
        const positionContainer = document.getElementById('positionFilters');
        if (positionContainer) {
            positionContainer.innerHTML = '';
            createFilterButton('position', 'all', 'Tous les postes', 'positionFilters', currentFilter === 'all');
            
            positions.forEach(position => {
                const candidateWithPosition = candidatesData.find(c => c.position === position);
                const label = candidateWithPosition?.positionLabel || 
                             position.charAt(0).toUpperCase() + position.slice(1);
                createFilterButton('position', position, label, 'positionFilters', currentFilter === position);
            });
        }

        // Générer les boutons de filtre par équipe
        const teamContainer = document.getElementById('teamFilters');
        if (teamContainer) {
            teamContainer.innerHTML = '';
            createFilterButton('team', 'all', 'Toutes les équipes', 'teamFilters', currentTeamFilter === 'all');
            
            teams.forEach(team => {
                createFilterButton('team', team, team, 'teamFilters', currentTeamFilter === team);
            });
        }

        // Générer les boutons de filtre par cartel
        const cartelContainer = document.getElementById('cartelFilters');
        if (cartelContainer) {
            cartelContainer.innerHTML = '';
            createFilterButton('cartel', 'all', 'Tous les cartels', 'cartelFilters', currentCartelFilter === 'all');
            
            cartels.forEach(cartel => {
                createFilterButton('cartel', cartel, cartel, 'cartelFilters', currentCartelFilter === cartel);
            });
        }

        // Générer les boutons de filtre par numéro
        const numeroContainer = document.getElementById('numeroFilters');
        if (numeroContainer) {
            numeroContainer.innerHTML = '';
            createFilterButton('numero', 'all', 'Tous les numéros', 'numeroFilters', currentNumeroFilter === 'all');
            
            numeros.forEach(numero => {
                createFilterButton('numero', numero, `Numéro ${numero}`, 'numeroFilters', currentNumeroFilter === String(numero));
            });
        }
    }

    /* =========================
       FILTRAGE DES CANDIDATS
    ========================= */
    function filterCandidates() {
        if (!candidatesList) return;
        
        candidatesList.innerHTML = '';

        let filtered = [...candidatesData];

        // Appliquer les filtres
        if (currentFilter !== 'all') {
            filtered = filtered.filter(c => c.position === currentFilter);
        }

        if (currentTeamFilter !== 'all') {
            filtered = filtered.filter(c => c.team === currentTeamFilter);
        }

        if (currentCartelFilter !== 'all') {
            filtered = filtered.filter(c => c.cartel === currentCartelFilter);
        }

        if (currentNumeroFilter !== 'all') {
            filtered = filtered.filter(c => String(c.numero) === String(currentNumeroFilter));
        }

        // Mettre à jour l'affichage des filtres actifs
        updateActiveFiltersDisplay();
        
        // Mettre à jour le compteur de candidats
        updateCandidateCount(filtered.length);

        if (!filtered.length) {
            candidatesList.innerHTML = `
                <div class="no-candidates">
                    <i class="fas fa-user-slash"></i>
                    <h3>Aucun candidat trouvé</h3>
                    <p>Aucun candidat ne correspond aux filtres sélectionnés.</p>
                    <button class="reset-filters-btn">
                        <i class="fas fa-sync-alt"></i> Réinitialiser les filtres
                    </button>
                </div>`;
            
            // Ajouter l'événement pour le bouton de réinitialisation
            const resetBtn = candidatesList.querySelector('.reset-filters-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', resetAllFilters);
            }
            return;
        }

        // Trier les candidats
        filtered.sort((a, b) => {
            // D'abord par numéro
            if (a.numero !== b.numero) {
                return a.numero - b.numero;
            }
            // Ensuite par ordre des postes
            const positionOrder = {
                'president': 1,
                'vice-president': 2,
                'secretaire': 3,
                'tresorier': 4,
                'porte-parole': 5
            };
            return positionOrder[a.position] - positionOrder[b.position];
        });

        // Afficher les candidats
        filtered.forEach(candidate => {
            const card = createCandidateCard(candidate);
            candidatesList.appendChild(card);
        });
    }

    /* =========================
       CRÉATION D'UNE CARTE CANDIDAT
    ========================= */
    function createCandidateCard(candidate) {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.dataset.position = candidate.position;
        card.dataset.team = candidate.team;
        card.dataset.cartel = candidate.cartel;
        card.dataset.numero = candidate.numero;

        const bioPreview = candidate.bio?.trim()
            ? candidate.bio.trim().slice(0, 120) + (candidate.bio.length > 120 ? '…' : '')
            : 'Aucune biographie disponible pour le moment.';

        // Chemin de la photo
        const photoPath = `images/${candidate.photo}`;

        card.innerHTML = `
            <div class="candidate-image">
                <img src="${photoPath}"
                     alt="Photo de ${candidate.name}"
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=500&q=80'">
                <div class="candidate-number">${candidate.numero}</div>
                <div class="candidate-team-badge">${candidate.team}</div>
            </div>

            <div class="candidate-info">
                <h3>${candidate.name}</h3>
                <span class="candidate-position">${candidate.positionLabel}</span>
                <p class="candidate-cartel"><i class="fas fa-flag"></i> ${candidate.cartel}</p>
                <p class="candidate-team"><i class="fas fa-users"></i> ${candidate.team}</p>
                <p class="candidate-details">${bioPreview}</p>

                <button class="view-profile-btn">
                    <i class="fas fa-eye"></i> Voir le profil complet
                </button>
            </div>
        `;

        const viewProfileBtn = card.querySelector('.view-profile-btn');
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openCandidateModal(candidate);
            });
        }

        card.addEventListener('click', () => openCandidateModal(candidate));
        return card;
    }

    /* =========================
       MISE À JOUR DE L'AFFICHAGE DES FILTRES
    ========================= */
    function updateActiveFiltersDisplay() {
        if (!activeFiltersDisplay) return;
        
        const activeFilters = [];
        
        if (currentFilter !== 'all') {
            const candidateWithPosition = candidatesData.find(c => c.position === currentFilter);
            const label = candidateWithPosition?.positionLabel || currentFilter;
            activeFilters.push(`Poste: ${label}`);
        }
        
        if (currentTeamFilter !== 'all') {
            activeFilters.push(`Équipe: ${currentTeamFilter}`);
        }
        
        if (currentCartelFilter !== 'all') {
            activeFilters.push(`Cartel: ${currentCartelFilter}`);
        }
        
        if (currentNumeroFilter !== 'all') {
            activeFilters.push(`Numéro: ${currentNumeroFilter}`);
        }
        
        if (activeFilters.length > 0) {
            activeFiltersDisplay.innerHTML = `
                <div class="active-filters">
                    <i class="fas fa-filter"></i>
                    <strong>Filtres actifs:</strong>
                    <span>${activeFilters.join(' • ')}</span>
                </div>
            `;
        } else {
            activeFiltersDisplay.innerHTML = '';
        }
    }

    function updateCandidateCount(count) {
        if (!candidateCountDisplay) return;
        
        const total = candidatesData.length;
        if (count === total) {
            candidateCountDisplay.innerHTML = `
                <div class="candidate-count">
                    <i class="fas fa-users"></i>
                    <strong>${total} candidats</strong>
                </div>
            `;
        } else {
            candidateCountDisplay.innerHTML = `
                <div class="candidate-count">
                    <i class="fas fa-users"></i>
                    <strong>${count} sur ${total} candidats</strong>
                </div>
            `;
        }
    }

    /* =========================
       GESTION DES ÉVÉNEMENTS DE FILTRAGE
    ========================= */
    function setupFilterEvents() {
        // Gestionnaire générique pour tous les filtres
        document.addEventListener('click', function(e) {
            // Filtre par position
            if (e.target.closest('.position-filter-btn')) {
                const button = e.target.closest('.position-filter-btn');
                const filterValue = button.dataset.position;
                
                document.querySelectorAll('.position-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                currentFilter = filterValue;
                filterCandidates();
            }
            
            // Filtre par équipe
            if (e.target.closest('.team-filter-btn')) {
                const button = e.target.closest('.team-filter-btn');
                const filterValue = button.dataset.team;
                
                document.querySelectorAll('.team-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                currentTeamFilter = filterValue;
                filterCandidates();
            }
            
            // Filtre par cartel
            if (e.target.closest('.cartel-filter-btn')) {
                const button = e.target.closest('.cartel-filter-btn');
                const filterValue = button.dataset.cartel;
                
                document.querySelectorAll('.cartel-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                currentCartelFilter = filterValue;
                filterCandidates();
            }
            
            // Filtre par numéro
            if (e.target.closest('.numero-filter-btn')) {
                const button = e.target.closest('.numero-filter-btn');
                const filterValue = button.dataset.numero;
                
                document.querySelectorAll('.numero-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                currentNumeroFilter = filterValue;
                filterCandidates();
            }
        });
        
        // Bouton de réinitialisation
        if (resetAllFiltersBtn) {
            resetAllFiltersBtn.addEventListener('click', resetAllFilters);
        }
    }

    function resetAllFilters() {
        currentFilter = 'all';
        currentTeamFilter = 'all';
        currentCartelFilter = 'all';
        currentNumeroFilter = 'all';
        
        // Réactiver les boutons "Tous"
        document.querySelectorAll('.position-filter-btn, .team-filter-btn, .cartel-filter-btn, .numero-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const allPositionBtn = document.querySelector('.position-filter-btn[data-position="all"]');
        const allTeamBtn = document.querySelector('.team-filter-btn[data-team="all"]');
        const allCartelBtn = document.querySelector('.cartel-filter-btn[data-cartel="all"]');
        const allNumeroBtn = document.querySelector('.numero-filter-btn[data-numero="all"]');
        
        if (allPositionBtn) allPositionBtn.classList.add('active');
        if (allTeamBtn) allTeamBtn.classList.add('active');
        if (allCartelBtn) allCartelBtn.classList.add('active');
        if (allNumeroBtn) allNumeroBtn.classList.add('active');
        
        filterCandidates();
    }

    /* =========================
       MODAL DES CANDIDATS - CORRIGÉ
    ========================= */
    function openCandidateModal(candidate) {
        if (!modalBody || !candidateModal) return;
        
        const photoPath = `images/${candidate.photo}`;

        modalBody.innerHTML = `
            <div class="modal-candidate">
                <div class="modal-image">
                    <div class="modal-image-wrapper">
                        <img src="${photoPath}"
                             alt="Photo de ${candidate.name}"
                             onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="candidate-number-badge">${candidate.numero}</div>
                </div>

                <div class="modal-details">
                    <h2>${candidate.name}</h2>
                    
                    <div class="modal-tags">
                        <span class="modal-tag position-tag">
                            <i class="fas fa-briefcase"></i> ${candidate.positionLabel}
                        </span>
                        <span class="modal-tag team-tag">
                            <i class="fas fa-users"></i> ${candidate.team}
                        </span>
                        <span class="modal-tag cartel-tag">
                            <i class="fas fa-flag"></i> ${candidate.cartel}
                        </span>
                    </div>

                    <div class="candidate-info-grid">
                        <div class="info-item">
                            <h4><i class="fas fa-user"></i> Nom et prénom</h4>
                            <p>${candidate.prenom} ${candidate.nom}</p>
                        </div>

                        <div class="info-item">
                            <h4><i class="fas fa-hashtag"></i> Numéro</h4>
                            <p>${candidate.numero}</p>
                        </div>

                        <div class="info-item full-width">
                            <h4><i class="fas fa-file-alt"></i> Biographie</h4>
                            <p>${candidate.bio || 'Aucune biographie disponible.'}</p>
                        </div>

                        <div class="info-item">
                            <h4><i class="fas fa-phone"></i> Contact</h4>
                            <p>${candidate.contact || 'Non disponible'}</p>
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button class="btn btn-primary share-btn">
                            <i class="fas fa-share-alt"></i> Partager
                        </button>
                        <button class="btn btn-secondary close-btn">
                            <i class="fas fa-times"></i> Fermer
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Ajouter les événements pour les boutons du modal
        const shareBtn = modalBody.querySelector('.share-btn');
        const closeBtn = modalBody.querySelector('.close-btn');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => shareCandidate(candidate));
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModalFunc());
        }

        candidateModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus sur le modal pour l'accessibilité
        candidateModal.focus();
    }

    function shareCandidate(candidate) {
        if (!candidate) return;

        const url = `${window.location.origin}${window.location.pathname}?id=${candidate.id}`;
        const text = `Découvrez le profil de ${candidate.name} - ${candidate.positionLabel} (Équipe: ${candidate.team}, Cartel: ${candidate.cartel})`;

        if (navigator.share) {
            navigator.share({
                title: candidate.name,
                text: text,
                url: url
            });
        } else {
            navigator.clipboard.writeText(`${text}\n${url}`)
                .then(() => alert('Lien copié dans le presse-papiers !'))
                .catch(() => {
                    // Fallback
                    const textArea = document.createElement('textarea');
                    textArea.value = `${text}\n${url}`;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('Lien copié dans le presse-papiers !');
                });
        }
    }

    function closeModalFunc() {
        if (candidateModal) {
            candidateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    function setupModalEvents() {
        if (closeModal) {
            closeModal.addEventListener('click', closeModalFunc);
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === candidateModal) {
                closeModalFunc();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && candidateModal && candidateModal.style.display === 'block') {
                closeModalFunc();
            }
        });
    }

    /* =========================
       INITIALISATION
    ========================= */
    function init() {
        console.log('Initialisation de la page des candidats...');
        console.log('Nombre de candidats:', candidatesData.length);
        
        // Générer les boutons de filtre
        generateFilterButtons();
        
        // Configurer les événements
        setupFilterEvents();
        setupModalEvents();
        setupMobileSidebar();
        
        // Afficher les candidats
        filterCandidates();
        
        // Vérifier si un ID est passé dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const candidateId = urlParams.get('id');
        if (candidateId) {
            const candidate = candidatesData.find(c => String(c.id) === String(candidateId));
            if (candidate) {
                setTimeout(() => openCandidateModal(candidate), 500);
            }
        }
    }

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

export { initializeCandidatesPage };