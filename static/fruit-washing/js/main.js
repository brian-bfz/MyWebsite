// Data based on the study results (simplified for demonstration)
const removalRates = {
    'apple': {
        'water': 20,
        'baking-soda': 65,
        'corn-starch': 75,
        'sequential': 90
    },
    'strawberry': {
        'water': 25,
        'baking-soda': 60,
        'corn-starch': 70,
        'sequential': 85
    },
    'grape': {
        'water': 15,
        'baking-soda': 55,
        'corn-starch': 65,
        'sequential': 80
    },
    'lemon': {
        'water': 30,
        'baking-soda': 70,
        'corn-starch': 75,
        'sequential': 88
    }
};

const interpretations = {
    'water': "Water washing provides some basic cleaning but leaves most pesticide residues behind.",
    'baking-soda': "Baking soda solution is more effective than water alone, breaking down some pesticide compounds through alkaline hydrolysis of the wax layer.",
    'corn-starch': "Corn starch solution works surprisingly well, adsorbing pesticides through physisorption and chemisorption, removing them from the fruit surface.",
    'sequential': "The sequential method (corn starch followed by baking soda) shows the highest effectiveness, combining adsorption and chemical breakdown mechanisms."
};

// Glossary of technical terms and their explanations
const glossary = {
    'thiabendazole': "Thiabendazole is a fungicide and parasiticide commonly used on fruits to prevent mold, blight, and other fungal diseases. It's often applied post-harvest to extend shelf life of produce.",
    'sers': "Surface-Enhanced Raman Spectroscopy (SERS) is an analytical technique that enhances Raman scattering by molecules adsorbed on rough metal surfaces. It allows scientists to detect and identify very small amounts of chemicals, making it useful for measuring pesticide residues on fruit surfaces.",
    'lcms': "Liquid Chromatography-Mass Spectrometry (LC-MS/MS) is a powerful analytical technique that combines the physical separation capabilities of liquid chromatography with the mass analysis capabilities of mass spectrometry. It's highly sensitive and can detect trace amounts of pesticides in samples."
};

// Fruit images using SVG files
const fruitImages = {
    'apple': 'images/apple.svg',
    'strawberry': 'images/strawberry.svg',
    'grape': 'images/grape.svg',
    'lemon': 'images/lemon.svg'
};

// Elements
const fruitOptions = document.getElementById('fruit-options');
const methodOptions = document.getElementById('method-options');
const startButton = document.getElementById('start-experiment');
const resultArea = document.getElementById('results');
const resultText = document.getElementById('result-text');
const resultBar = document.getElementById('result-bar');
const percentageText = document.getElementById('percentage-text');
const interpretation = document.getElementById('interpretation');
const fruitImg = document.getElementById('fruit-img');
const waterContainer = document.querySelector('.water-container');
const pesticideLayer = document.querySelector('.pesticide-layer');
const bubblesContainer = document.getElementById('bubbles-container');
const magnifyingGlass = document.getElementById('magnifying-glass');

// Animation containers
const cornStarchAnimation = document.getElementById('corn-starch-animation');
const bakingSodaAnimation = document.getElementById('baking-soda-animation');

// Term explanation elements
const termElements = document.querySelectorAll('.term');
const termPopup = document.getElementById('term-popup');
const termTitle = document.getElementById('term-title');
const termExplanation = document.getElementById('term-explanation');
const closePopup = document.querySelector('.close-popup');

// Add event listeners to fruit options
fruitOptions.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        fruitOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');

        // Update fruit image
        const fruit = option.getAttribute('data-fruit');
        fruitImg.src = fruitImages[fruit];
    });
});

// Add event listeners to method options
methodOptions.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        methodOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Start experiment button event
startButton.addEventListener('click', () => {
    const selectedFruit = fruitOptions.querySelector('.selected').getAttribute('data-fruit');
    const selectedMethod = methodOptions.querySelector('.selected').getAttribute('data-method');

    // Show washing animation
    waterContainer.style.height = '80%';
    createBubbles();

    // Show magnifying glass with appropriate animation
    showMolecularAnimation(selectedMethod);

    // Animation duration - same for all methods
    const animationDuration = 2000;

    // After washing animation, show results
    setTimeout(() => {
        const removalRate = removalRates[selectedFruit][selectedMethod];

        // Update pesticide layer opacity based on removal rate
        pesticideLayer.style.opacity = 1 - (removalRate / 100);

        // Update results text
        resultText.textContent = `${selectedMethod.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} removed ${removalRate}% of pesticides from the ${selectedFruit}.`;

        // Update progress bar
        resultBar.style.width = `${removalRate}%`;

        // Update percentage text
        percentageText.textContent = `${removalRate}% Pesticide Removed`;

        // Update interpretation
        interpretation.textContent = interpretations[selectedMethod];

        // Show results area
        resultArea.style.display = 'block';

        // Reset water animation after a delay
        setTimeout(() => {
            waterContainer.style.height = '0%';
            bubblesContainer.style.display = 'none';

            // Hide magnifying glass after animation completes
            setTimeout(() => {
                magnifyingGlass.style.display = 'none';
                hideAllAnimations();
            }, 500); // Faster hiding (was 1000)

        }, 1500); // Faster reset (was 2000)

    }, animationDuration); // Dynamic duration based on method
});

// Function to show the appropriate molecular animation
function showMolecularAnimation(method) {
    // Hide all animations first
    hideAllAnimations();

    // Show magnifying glass
    magnifyingGlass.style.display = 'block';

    // Show the appropriate animation based on method
    switch(method) {
        case 'corn-starch':
            cornStarchAnimation.style.display = 'block';
            startCornStarchAnimation(document.getElementById('corn-starch-container'));
            break;
        case 'baking-soda':
            bakingSodaAnimation.style.display = 'block';
            startBakingSodaAnimation(document.getElementById('baking-soda-container'));
            break;
        case 'sequential':
            // For sequential, we don't show the magnifying glass
            magnifyingGlass.style.display = 'none';
            break;
        case 'water':
            // No special animation for water, just hide the magnifying glass
            magnifyingGlass.style.display = 'none';
            break;
    }
}

// Function to hide all molecular animations
function hideAllAnimations() {
    cornStarchAnimation.style.display = 'none';
    bakingSodaAnimation.style.display = 'none';

    // Clear animation containers
    document.getElementById('corn-starch-container').innerHTML = '';
    document.getElementById('baking-soda-container').innerHTML = '';
}

// Term explanation functionality
termElements.forEach(term => {
    term.addEventListener('click', () => {
        const termId = term.getAttribute('data-term');
        if (glossary[termId]) {
            // Set the term title and explanation
            termTitle.textContent = term.textContent;
            termExplanation.textContent = glossary[termId];

            // Show the popup
            termPopup.style.display = 'flex';
        }
    });
});

// Close popup when clicking the X
closePopup.addEventListener('click', () => {
    termPopup.style.display = 'none';
});

// Close popup when clicking outside the content
termPopup.addEventListener('click', (e) => {
    if (e.target === termPopup) {
        termPopup.style.display = 'none';
    }
});

// Set initial fruit image when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set default fruit (apple)
    fruitImg.src = fruitImages['apple'];
});
