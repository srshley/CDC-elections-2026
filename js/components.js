// Composants réutilisables pour le site - Design System 2026
import { calendarEvents, candidatesData, positionsTable } from './config.js';

// ===== COMPOSANT: HEADER =====
function createHeader(activePage = '') {
    const header = document.createElement('header');
    header.className = 'header';
    
    header.innerHTML = `
        <div class="header__container container">
            <a href="index.html" class="logo">
                <i class="fas fa-vote-yea logo__icon"></i>
                <span class="logo__text">CDC Élections 2026</span>
            </a>
            
            <button class="mobile-menu__toggle" id="mobileMenuToggle" aria-label="Menu mobile">
                <i class="fas fa-bars"></i>
            </button>
            
            <nav class="nav">
                <ul class="nav__list">
                    <li>
                        <a href="index.html" class="nav__link ${activePage === 'index' ? 'nav__link--active' : ''}">
                            <i class="fas fa-home"></i>
                            Accueil
                        </a>
                    </li>
                    <li>
                        <a href="index.html#calendar" class="nav__link ${activePage === 'calendar' ? 'nav__link--active' : ''}">
                            <i class="fas fa-calendar-alt"></i>
                            Calendrier
                        </a>
                    </li>
                    <li>
                        <a href="index.html#positions" class="nav__link ${activePage === 'positions' ? 'nav__link--active' : ''}">
                            <i class="fas fa-users"></i>
                            Postes & Candidats
                        </a>
                    </li>
                    <li>
                        <a href="candidates.html" class="nav__link ${activePage === 'candidates' ? 'nav__link--active' : ''}">
                            <i class="fas fa-id-card"></i>
                            Tous les Candidats
                        </a>
                    </li>
                    <li>
                        <a href="politique-generale.html" class="nav__link ${activePage === 'politique' ? 'nav__link--active' : ''}">
                            <i class="fas fa-file-contract"></i>
                            Politique Générale
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    `;
    
    return header;
}

// ===== COMPOSANT: FOOTER =====
function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    const currentYear = new Date().getFullYear();
    
    footer.innerHTML = `
        <div class="container">
            <div class="footer__content">
                <div class="footer__section">
                    <h3>CDC Élections 2026</h3>
                    <p>
                        Plateforme officielle d'information sur les élections du comité culturel de CDC. 
                        Toutes les informations concernant le calendrier électoral et les candidats sont disponibles sur ce site.
                    </p>
                    <div class="footer__social">
                        <a href="mailto:authdeshley@gmail.com" class="social-link" aria-label="Envoyer un email">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <a href="tel:+50948850022" class="social-link" aria-label="Appeler">
                            <i class="fas fa-phone"></i>
                        </a>
                        <a href="https://maps.google.com/?q=1+%26+5+Catalpa+28,+Delmas,+HAITI" 
                           class="social-link" 
                           target="_blank" 
                           aria-label="Voir sur la carte">
                            <i class="fas fa-map-marker-alt"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer__section">
                    <h3>Liens rapides</h3>
                    <ul class="footer__list">
                        <li><a href="index.html" class="footer__link"><i class="fas fa-home"></i> Accueil</a></li>
                        <li><a href="index.html#calendar" class="footer__link"><i class="fas fa-calendar-alt"></i> Calendrier</a></li>
                        <li><a href="index.html#positions" class="footer__link"><i class="fas fa-users"></i> Postes & Candidats</a></li>
                        <li><a href="candidates.html" class="footer__link"><i class="fas fa-id-card"></i> Tous les Candidats</a></li>
                        <li><a href="politique-generale.html" class="footer__link"><i class="fas fa-file-contract"></i> Politique Générale</a></li>
                    </ul>
                </div>
                
                <div class="footer__section">
                    <h3>Contact</h3>
                    <ul class="footer__list">
                        <li><a href="mailto:authdeshley@gmail.com" class="footer__link"><i class="fas fa-envelope"></i> authdeshley@gmail.com</a></li>
                        <li><a href="tel:+50948850022" class="footer__link"><i class="fas fa-phone"></i> +509 4885-0022</a></li>
                        <li><a href="https://maps.google.com/?q=1+%26+5+Catalpa+28,+Delmas,+HAITI" 
                               class="footer__link" 
                               target="_blank">
                            <i class="fas fa-map-marker-alt"></i> 1 & 5 Catalpa 28, Delmas, HAITI
                        </a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer__copyright">
                <p>&copy; ${currentYear} Plateforme CDC Élections 2026. Tous droits réservés.</p>
            </div>
        </div>
    `;
    
    return footer;
}

// ===== COMPOSANT: CALENDRIER =====
function createCalendar() {
    const container = document.createElement('div');
    container.className = 'calendar-container';
    
    const grid = document.createElement('div');
    grid.className = 'grid grid--calendar';
    
    calendarEvents.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.style.animationDelay = `${index * 0.1}s`;
        
        // Formater la date
        const [day, month] = event.date.split(' ');
        const eventDate = event.date.toLowerCase();
        
        eventCard.innerHTML = `
            <div class="event-card__header">
                <div class="event-date__icon">
                    <i class="far fa-calendar-alt"></i>
                </div>
                <div class="event-date__content">
                    <span class="event-date__day text-gradient">${day}</span>
                    <span class="event-date__month text-gradient">${month}</span>
                </div>
            </div>
            
            <h3 class="event-card__title">${event.title}</h3>
            <p class="event-card__description">${event.description}</p>
            
            <div class="event-card__meta">
                <div class="event-meta__item">
                    <i class="fas fa-clock event-meta__icon"></i>
                    <span>${eventDate}</span>
                </div>
                <div class="event-meta__item">
                    <i class="fas fa-map-marker-alt event-meta__icon"></i>
                    <span>${event.location || 'CDC Catalpa 28 # 5'}</span>
                </div>
            </div>
            
            <span class="event-card__badge ${event.type ? `event-badge--${event.type}` : ''}">
                ${event.type || 'Événement'}
            </span>
        `;
        
        grid.appendChild(eventCard);
    });
    
    container.appendChild(grid);
    return container;
}

// ===== COMPOSANT: TABLE DES POSTES =====
function createPositionsTable() {
    const container = document.createElement('div');
    container.className = 'positions-container';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    
    const table = document.createElement('table');
    table.className = 'table';
    
    // En-tête du tableau
    const thead = document.createElement('thead');
    thead.className = 'table__header';
    thead.innerHTML = `
        <tr>
            <th>Présidents</th>
            <th>Vice-présidents</th>
            <th>Secrétaires</th>
            <th>Trésoriers</th>
            <th>Porte-parole/Délégué</th>
        </tr>
    `;
    
    // Corps du tableau
    const tbody = document.createElement('tbody');
    
    positionsTable.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        tr.className = 'table__row';
        
        // Créer les cellules pour chaque colonne
        const positions = ['president', 'vicePresident', 'secretaire', 'tresorier', 'porteParole'];
        
        positions.forEach(position => {
            const td = document.createElement('td');
            td.className = 'table__cell';
            
            const candidateName = row[position];
            if (candidateName) {
                const candidate = candidatesData.find(c => c.name === candidateName);
                
                if (candidate) {
                    const link = document.createElement('a');
                    link.href = `candidates.html?id=${candidate.id}`;
                    link.className = 'table-link';
                    link.innerHTML = `
                        <i class="fas fa-user-circle table-link__icon"></i>
                        ${candidateName}
                    `;
                    td.appendChild(link);
                } else {
                    td.textContent = candidateName;
                }
            }
            
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    wrapper.appendChild(table);
    container.appendChild(wrapper);
    
    return container;
}

// ===== COMPOSANT: GRILLE DES CANDIDATS =====
function createCandidatesGrid(filter = 'all') {
    const grid = document.createElement('div');
    grid.className = 'grid grid--candidates';
    
    // Filtrer les candidats si nécessaire
    let filteredCandidates = candidatesData;
    if (filter !== 'all') {
        filteredCandidates = candidatesData.filter(candidate => 
            candidate.position.toLowerCase().includes(filter.toLowerCase())
        );
    }
    
    // Ajouter chaque candidat
    filteredCandidates.forEach((candidate, index) => {
        const card = document.createElement('article');
        card.className = 'candidate-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="candidate-card__image">
                <img src="${candidate.image || 'https://via.placeholder.com/400x280?text=Candidat'}" 
                     alt="${candidate.name}" 
                     loading="lazy">
                <span class="candidate-card__badge">${index + 1}</span>
            </div>
            
            <div class="candidate-card__info">
                <h3 class="candidate-card__name">${candidate.name}</h3>
                <span class="candidate-card__position text-gradient">${candidate.position}</span>
                
                <p class="candidate-card__details">
                    ${candidate.description || 'Candidat aux élections CDC 2026.'}
                </p>
                
                <div class="candidate-card__meta">
                    <div class="candidate-meta__item">
                        <i class="fas fa-graduation-cap candidate-meta__icon"></i>
                        <span>${candidate.field || 'Étudiant'}</span>
                    </div>
                    <div class="candidate-meta__item">
                        <i class="fas fa-star candidate-meta__icon"></i>
                        <span>${candidate.experience || 'Nouveau candidat'}</span>
                    </div>
                </div>
                
                <a href="candidates.html?id=${candidate.id}" class="btn btn--accent" style="margin-top: 1rem; width: 100%;">
                    <i class="fas fa-eye"></i>
                    Voir le profil complet
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    return grid;
}

// ===== COMPOSANT: FILTRES =====
function createFilters(activeFilter = 'all') {
    const container = document.createElement('div');
    container.className = 'filters';
    
    const filters = [
        { id: 'all', label: 'Tous les candidats', icon: 'fas fa-users' },
        { id: 'president', label: 'Présidents', icon: 'fas fa-crown' },
        { id: 'vice', label: 'Vice-présidents', icon: 'fas fa-user-tie' },
        { id: 'secretaire', label: 'Secrétaires', icon: 'fas fa-file-alt' },
        { id: 'tresorier', label: 'Trésoriers', icon: 'fas fa-coins' },
        { id: 'porte-parole', label: 'Porte-parole', icon: 'fas fa-bullhorn' }
    ];
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = `filter-btn ${activeFilter === filter.id ? 'filter-btn--active' : ''}`;
        button.setAttribute('data-filter', filter.id);
        button.type = 'button';
        
        button.innerHTML = `
            <i class="${filter.icon}"></i>
            ${filter.label}
        `;
        
        container.appendChild(button);
    });
    
    return container;
}

// ===== FONCTIONS D'INITIALISATION =====
function initializePage(pageType = 'index') {
    // Initialiser les fonctionnalités communes
    initializeCommonFeatures();
    
    // Injecter le header
    document.body.insertAdjacentElement('afterbegin', createHeader(pageType));
    
    // Injecter le footer
    document.body.appendChild(createFooter());
    
    // Initialisations spécifiques à la page
    switch (pageType) {
        case 'index':
            initializeIndexPage();
            break;
        case 'candidates':
            initializeCandidatesPage();
            break;
        case 'politique':
            initializePolitiquePage();
            break;
    }
}

function initializeIndexPage() {
    // Injecter le calendrier
    const calendarSection = document.querySelector('#calendar .calendar-container');
    if (calendarSection) {
        calendarSection.appendChild(createCalendar());
    }
    
    // Injecter la table des positions
    const positionsSection = document.querySelector('#positions .positions-container');
    if (positionsSection) {
        positionsSection.appendChild(createPositionsTable());
    }
}

function initializeCandidatesPage() {
    // Récupérer le paramètre ID de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('id');
    
    const container = document.querySelector('.candidates-container');
    if (!container) return;
    
    if (candidateId) {
        // Afficher un candidat spécifique
        const candidate = candidatesData.find(c => c.id === candidateId);
        if (candidate) {
            container.appendChild(createCandidateDetail(candidate));
        } else {
            container.innerHTML = '<p class="error">Candidat non trouvé</p>';
        }
    } else {
        // Afficher tous les candidats avec filtres
        const filters = createFilters();
        const grid = createCandidatesGrid();
        
        container.appendChild(filters);
        container.appendChild(grid);
        
        // Gérer les filtres
        const filterButtons = filters.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Mettre à jour les boutons actifs
                filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
                button.classList.add('filter-btn--active');
                
                // Filtrer la grille
                const newGrid = createCandidatesGrid(filter);
                const oldGrid = container.querySelector('.grid--candidates');
                oldGrid.replaceWith(newGrid);
            });
        });
    }
}

function initializePolitiquePage() {
    // Initialisation spécifique à la page politique
    // (À implémenter selon le contenu de la page)
}

function initializeCommonFeatures() {
    // Menu mobile
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navList = document.querySelector('.nav__list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('nav__list--open');
            mobileMenuToggle.setAttribute('aria-expanded', 
                navList.classList.contains('nav__list--open'));
        });
        
        // Fermer le menu au clic sur un lien
        navList.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('nav__list--open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Scroll doux pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.section-title, .calendar-container, .positions-container, .candidate-card, .event-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== FONCTION UTILITAIRE: DÉTAIL CANDIDAT =====
function createCandidateDetail(candidate) {
    const detail = document.createElement('article');
    detail.className = 'candidate-detail';
    
    detail.innerHTML = `
        <div class="candidate-detail__header">
            <div class="candidate-detail__image">
                <img src="${candidate.image || 'https://via.placeholder.com/400x400?text=Candidat'}" 
                     alt="${candidate.name}">
            </div>
            
            <div class="candidate-detail__info">
                <h1 class="candidate-detail__name">${candidate.name}</h1>
                <span class="candidate-detail__position text-gradient">${candidate.position}</span>
                
                <div class="candidate-detail__meta">
                    <div class="meta-item">
                        <i class="fas fa-graduation-cap"></i>
                        <strong>Domaine :</strong> ${candidate.field || 'Non spécifié'}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-university"></i>
                        <strong>Année :</strong> ${candidate.year || 'Non spécifié'}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-star"></i>
                        <strong>Expérience :</strong> ${candidate.experience || 'Nouveau candidat'}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="candidate-detail__content">
            <h2><i class="fas fa-bullhorn"></i> Propositions</h2>
            <p>${candidate.proposals || 'Aucune proposition spécifique pour le moment.'}</p>
            
            <h2><i class="fas fa-trophy"></i> Objectifs</h2>
            <p>${candidate.objectives || 'Contribuer au développement du comité culturel.'}</p>
            
            <a href="candidates.html" class="btn btn--secondary">
                <i class="fas fa-arrow-left"></i>
                Retour aux candidats
            </a>
        </div>
    `;
    
    return detail;
}

// ===== EXPORT DES FONCTIONS =====
export {
    initializePage,
    createHeader,
    createFooter,
    createCalendar,
    createPositionsTable,
    createCandidatesGrid,
    createFilters,
    candidatesData
};
