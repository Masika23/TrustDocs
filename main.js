 /**
 * TrustDocs Core Logic
 * Handles Authentication UI, File Uploads, and Dashboard Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AUTHENTICATION LOGIC (Login & Signup) ---
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const passInput = document.getElementById('regPass');

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            
            // Visual feedback for "Decryption"
            btn.disabled = true;
            btn.innerText = "🔒 Decrypting Vault...";
            
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);
        });
    }

    // Handle Signup & Password Strength
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Vault Created Successfully!");
            window.location.href = "dashboard.html";
        });

        if (passInput) {
            passInput.addEventListener('input', (e) => {
                const meter = document.getElementById('passStrength');
                const val = e.target.value;
                
                if (val.length === 0) meter.style.width = "0%";
                else if (val.length < 6) { meter.style.width = "30%"; meter.style.background = "#ef4444"; }
                else if (val.length < 10) { meter.style.width = "60%"; meter.style.background = "#f59e0b"; }
                else { meter.style.width = "100%"; meter.style.background = "#10b981"; }
            });
        }
    }

    // --- 2. DASHBOARD SEARCH LOGIC ---

    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const files = document.querySelectorAll('.file-card');
            
            files.forEach(file => {
                const name = file.querySelector('.file-name').innerText.toLowerCase();
                file.style.display = name.includes(term) ? 'block' : 'none';
            });
        });
    }
});

// --- 3. FILE UPLOAD & MANAGEMENT ---

/**
 * Handles the visual addition of a file to the grid
 * @param {HTMLInputElement} input 
 */
function handleFile(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const grid = document.getElementById('fileGrid');
        const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

        // Determine category based on keywords (Simple AI simulation)

    let emoji = "📄"; 
    let category = "all";
    const nameLower = file.name.toLowerCase();

    if (nameLower.includes('passport')) {
    category = 'passport';
    emoji = "🛂";
    } else if (nameLower.includes('license') || nameLower.includes('permit')) {
    category = 'id';
    emoji = "🪪";
    } else if (nameLower.includes('insurance') || nameLower.includes('health') || nameLower.includes('nhif')) {
    category = 'health';
    emoji = "🏥";
    } else if (nameLower.includes('land') || nameLower.includes('title') || nameLower.includes('deed')) {
    category = 'land';
    emoji = "🏡";
    } else if (nameLower.includes('transcript') || nameLower.includes('degree') || nameLower.includes('academic') || nameLower.includes('kcse')) {
    category = 'academic';
    emoji = "🎓";
    } else if (nameLower.includes('birth') || nameLower.includes('cert') || nameLower.includes('marriage')) {
    category = 'cert';
    emoji = "📜";
    } else if (nameLower.includes('id')) {
    category = 'id';
    emoji = "🆔";
}

        // Create the card
        const newCard = document.createElement('div');
        newCard.className = 'file-card';
        newCard.setAttribute('data-category', category);
        
        newCard.innerHTML = `
            <div class="file-preview">${icon}</div>
            <div class="file-info">
                <h4 class="file-name">${file.name}</h4>
                <span>${(file.size / 1024).toFixed(1)} KB | ${date}</span>
            </div>
            <button class="btn-more" onclick="this.parentElement.remove()">Delete</button>
        `;

        // Add to top of grid
        grid.prepend(newCard);
    }
}

/**
 * Filters the dashboard view by category
 * @param {string} category 
 */
function filterFiles(category) {
    const cards = document.querySelectorAll('.file-card');
    const buttons = document.querySelectorAll('.side-btn');

    // Update active button UI
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Filter cards
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}