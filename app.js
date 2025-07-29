// Simple navigation between sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Update breadcrumb
        updateBreadcrumb(sectionId);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Update breadcrumb navigation
function updateBreadcrumb(sectionId) {
    const sectionNames = {
        'intro': 'Introduction',
        'reality': 'Current Situation',
        'diagnosis': 'Technical Analysis',
        'opportunity': 'Growth Opportunity',
        'solution': 'Action Plan',
        'timeline': 'Success Timeline'
    };
    
    const breadcrumb = document.getElementById('breadcrumb');
    const currentSection = document.getElementById('currentSection');
    
    if (sectionId === 'intro') {
        breadcrumb.style.display = 'none';
    } else {
        breadcrumb.style.display = 'block';
        currentSection.textContent = sectionNames[sectionId] || sectionId;
    }
}

// Track progress through the site
let sectionsViewed = new Set(['intro']);

function trackProgress(sectionId) {
    sectionsViewed.add(sectionId);
    
    // If they've viewed all sections, you could trigger something special
    if (sectionsViewed.size >= 5) {  // Updated from 6 to 5 since we removed letmedoit section
        console.log('User has viewed all sections');
    }
}

// Copy content function for the copy buttons
function copyContent(button) {
    const contentBox = button.previousElementSibling;
    const text = contentBox.textContent || contentBox.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Copied!';
        button.style.background = 'var(--secondary)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'var(--primary)';
        }, 2000);
    });
}

// Share report function
function shareReport() {
    if (navigator.share) {
        navigator.share({
            title: 'SEO Analysis for Kate - Salon Space',
            text: 'Check out this detailed SEO analysis that shows real opportunities for local businesses',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Add click tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track button clicks
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('onclick')?.match(/showSection\('(.+)'\)/)?.[1];
            if (nextSection) {
                trackProgress(nextSection);
            }
        });
    });
    
    // Make the copy text easy to copy
    const copyText = document.querySelector('.copy-text');
    if (copyText) {
        copyText.style.cursor = 'pointer';
        copyText.addEventListener('click', function() {
            const text = this.innerText;
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalBg = this.style.background;
                this.style.background = '#10b981';
                this.style.color = 'white';
                this.innerHTML = '✓ Copied to clipboard!';
                
                setTimeout(() => {
                    this.style.background = originalBg;
                    this.style.color = '';
                    this.innerHTML = text;
                }, 2000);
            });
        });
    }
});

// Optional: Add some personality with random encouragement
const encouragements = [
    "You've got this, Kate!",
    "This is easier than a perfect blonde highlight!",
    "15 minutes to beat Flair? Worth it!",
    "Your future customers will thank you!"
];

function showEncouragement() {
    const random = encouragements[Math.floor(Math.random() * encouragements.length)];
    console.log(random);
}