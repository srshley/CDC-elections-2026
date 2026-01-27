import { candidatesData } from './config.js';

/* =========================
   VALIDATION DES DONNÉES
========================= */

function validateCandidatesData(data) {
    const requiredFields = [
        'id', 'name', 'prenom', 'nom',
        'position', 'positionLabel',
        'cartel', 'numero', 'photo'
    ];

    const validCandidates = [];

    data.forEach((candidate, index) => {
        const missing = requiredFields.filter(f => !candidate[f]);

        if (missing.length > 0) {
            console.warn(
                `⛔ Candidat ignoré (index ${index}) – champs manquants :`,
                missing,
                candidate
            );
            return;
        }

        validCandidates.push({
            ...candidate,
            bio: candidate.bio || '',
            contact: candidate.contact || ''
        });
    });

    if (validCandidates.length === 0) {
        throw new Error('Aucun candidat valide après validation.');
    }

    console.info(`✔ ${validCandidates.length} candidats valides chargés`);
    return validCandidates;
}

/* =========================
   GÉNÉRATION DES FILTRES
========================= */

function generateFilters(data) {
    const positions = new Map();
    const cartels = new Set();
    const numeros = new Set();

    data.forEach(c => {
        positions.set(c.position, c.positionLabel);
        cartels.add(c.cartel);
        numeros.add(c.numero);
    });

    return {
        positions: [...positions.entries()], // [value, label]
        cartels: [...cartels],
        numeros: [...numeros].sort((a, b) => a - b)
    };
}

/* =========================
   MODULE PRINCIPAL
========================= */

let currentFilter = 'all';
let currentCartelFilter = 'all';
let currentNumeroFilter = 'all';

function initializeCandidatesPage(rawData = candidatesData) {

    const data = validateCandidatesData(rawData);
    const filters = generateFilters(data);

    const candidatesList = document.getElementById('candidatesList');
    const candidateModal = document.getElementById('candidateModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');

    /* =========================
       RENDER FILTRES
    ========================= */

    function renderFilters() {
        const positionContainer = document.getElementById('positionFilters');
        const cartelContainer = document.getElementById('cartelFilters');
        const numeroContainer = document.getElementById('numeroFilters');

        positionContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">Tous</button>
            ${filters.positions.map(([value, label]) =>
                `<button class="filter-btn" data-filter="${value}">${label}</button>`
            ).join('')}
        `;

        cartelContainer.innerHTML = `
            <button class="cartel-filter-btn active" data-cartel="all">Tous</button>
            ${filters.cartels.map(c =>
                `<button class="cartel-filter-btn" data-cartel="${c}">${c}</button>`
            ).join('')}
        `;

        numeroContainer.innerHTML = `
            <button class="numero-filter-btn active" data-numero="all">Tous</button>
            ${filters.numeros.map(n =>
                `<button class="numero-filter-btn" data-numero="${n}">N° ${n}</button>`
            ).join('')}
        `;
    }

    /* =========================
       FILTRAGE
    ========================= */

    function filterCandidates() {
        candidatesList.innerHTML = '';

        let result = [...data];

        if (currentFilter !== 'all') {
            result = result.filter(c => c.position === currentFilter);
        }

        if (currentCartelFilter !== 'all') {
            result = result.filter(c => c.cartel === currentCartelFilter);
        }

        if (currentNumeroFilter !== 'all') {
            result = result.filter(c => String(c.numero) === String(currentNumeroFilter));
        }

        if (result.length === 0) {
            candidatesList.innerHTML = `
                <div class="no-candidates">
                    <h3>Aucun candidat trouvé</h3>
                </div>`;
            return;
        }

        result.forEach(renderCandidateCard);
    }

    /* =========================
       CARTE CANDIDAT
    ========================= */

    function renderCandidateCard(candidate) {

        const card = document.createElement('div');
        card.className = 'candidate-card';

        const bioPreview = candidate.bio
            ? candidate.bio.slice(0, 120) + '…'
            : 'Aucune biographie disponible.';

        card.innerHTML = `
            <div class="candidate-image">
                <img src="images/${candidate.photo}"
                     alt="${candidate.name}"
                     onerror="this.src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=500&q=80'">
                <div class="candidate-number">${candidate.numero}</div>
            </div>

            <div class="candidate-info">
                <h3>${candidate.name}</h3>
                <span>${candidate.positionLabel}</span>
                <p><strong>Cartel :</strong> ${candidate.cartel}</p>
                <p>${bioPreview}</p>
                <button class="view-profile-btn">Voir le profil</button>
            </div>
        `;

        card.addEventListener('click', () => openCandidateModal(candidate));
        card.querySelector('button').addEventListener('click', e => {
            e.stopPropagation();
            openCandidateModal(candidate);
        });

        candidatesList.appendChild(card);
    }

    /* =========================
       MODAL
    ========================= */

    function openCandidateModal(candidate) {

        modalBody.innerHTML = `
            <h2>${candidate.name}</h2>
            <p><strong>Poste :</strong> ${candidate.positionLabel}</p>
            <p><strong>Cartel :</strong> ${candidate.cartel}</p>
            <p><strong>Numéro :</strong> ${candidate.numero}</p>
            <p>${candidate.bio || 'Aucune biographie disponible.'}</p>
            <p><strong>Contact :</strong> ${candidate.contact || '—'}</p>
        `;

        candidateModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal.addEventListener('click', () => {
        candidateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    /* =========================
       EVENTS FILTRES
    ========================= */

    function setupFilterEvents() {

        document.addEventListener('click', e => {

            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.dataset.filter;
                filterCandidates();
            }

            if (e.target.classList.contains('cartel-filter-btn')) {
                document.querySelectorAll('.cartel-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentCartelFilter = e.target.dataset.cartel;
                filterCandidates();
            }

            if (e.target.classList.contains('numero-filter-btn')) {
                document.querySelectorAll('.numero-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentNumeroFilter = e.target.dataset.numero;
                filterCandidates();
            }
        });
    }

    /* =========================
       INIT
    ========================= */

    renderFilters();
    setupFilterEvents();
    filterCandidates();
}

export { initializeCandidatesPage };
