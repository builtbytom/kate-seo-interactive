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
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Track progress through the site
let sectionsViewed = new Set(['intro']);

function trackProgress(sectionId) {
    sectionsViewed.add(sectionId);
    
    // If they've viewed all sections, you could trigger something special
    if (sectionsViewed.size >= 6) {
        console.log('User has viewed all sections');
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