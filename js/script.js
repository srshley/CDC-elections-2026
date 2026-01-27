// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

// Initialize mobile menu as hidden on small screens
if (window.innerWidth <= 768) {
    mainNav.style.display = 'none';
}

mobileMenuBtn.addEventListener('click', () => {
    if (mainNav.style.display === 'block') {
        mainNav.style.display = 'none';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        mainNav.style.display = 'block';
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mainNav.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.section-title, .calendar-container, .positions-container').forEach(el => {
    observer.observe(el);
});

// Adjust mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.style.display = '';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        mainNav.style.display = 'none';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Add current year to footer
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright p');
if (copyrightElement) {
    copyrightElement.innerHTML = `&copy; ${currentYear} Plateforme Élections 2026. Tous droits réservés.`;
}

// Highlight current section in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add active class to navigation links
navItems.forEach(item => {
    if (item.getAttribute('href') === '#home') {
        item.classList.add('active');
    }
});

// Add hover effect to table rows
const tableRows = document.querySelectorAll('tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.01)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});


// ===== UPDATE CANDIDATE NAMES TO LINKS IN INDEX PAGE =====
function updateCandidateLinks() {
    // Cette fonction transforme les noms des candidats en liens vers leur profil
    const candidateNames = document.querySelectorAll('.candidate-name');
    
    // Données des candidats (simplifiées pour index.html)
    const candidateLinks = {
        "Kethia JULES": 1,
        "Johnson GUAY": 2,
        "Jean Gardy VOLTAIRE": 3,
        "Dave GUAY": 4,
        "Joline BELNOM": 5,
        "Roody GASPARD": 6,
        "Kerwin SIMEON": 7,
        "Peterson MARCELIN": 8,
        "Torchon ADJINANIE": 9,
        "Guerlyne PLAISIR": 10,
        "Love Mondy ANTOINE": 11,
        "Fredeline PAUL": 12,
        "Jean Ernst Edner CELESTIN": 13,
        "Geraldine FIRMIN": 14,
        "Berline IBART": 15,
        "Jeff JEAN-BAPTISTE": 16,
        "Richelor ROGER": 17,
        "Norka Arolyonne FRANCOIS": 18,
        "Ismael PLAISIR": 19,
        "Georges FRANCINE": 20,
        "Nedgina MARTEL": 21,
        "Bladimyr LYLIS": 22,
        "Erlendo DUBOIS": 23,
        "Kike-Love Dina ALEXANDRE": 24,
        "Patrice LAMY": 25,
        "Jude Betsau MUSEAU": 26
    };
    
    candidateNames.forEach(nameElement => {
        const candidateName = nameElement.textContent.trim();
        const candidateId = candidateLinks[candidateName];
        
        if (candidateId) {
            // Sauvegarder le nom original
            const originalName = candidateName;
            
            // Créer un lien
            const link = document.createElement('a');
            link.href = `candidates.html?id=${candidateId}`;
            link.textContent = originalName;
            link.className = 'candidate-link';
            link.title = `Voir le profil de ${originalName}`;
            
            // Remplacer le contenu
            nameElement.innerHTML = '';
            nameElement.appendChild(link);
        }
    });
}

// Appeler cette fonction après le chargement de la page
document.addEventListener('DOMContentLoaded', updateCandidateLinks);
