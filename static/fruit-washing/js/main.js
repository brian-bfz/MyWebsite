// Data based on the study results (simplified for demonstration)
const removalRates = {
    'apple': {
        'corn-starch': 70,
        'baking-soda': 74,
        'sequential': 84,
        'commercial': 86
    },
    'strawberry': {
        'sequential': 89,
        'commercial': 88
    },
    'grape': {
        'sequential': 99,
        'commercial': 98
    },
    'lemon': {
        'sequential': 96,
        'commercial': 98
    }
};

const interpretations = {
    'corn-starch': "Starch molecules bind to thiabendazole molecules, forming a complex that's easier to wash away.",
    'baking-soda': "Baking soda produces hydroxide ions that break down the waxy layer on fruit, allowing the pesticides beneath to be washed away more easily."
};

// Glossary of technical terms and their explanations
const glossary = {
    'example': "We use this to explain technical jargons and provide additional context.", 
    'Foods': "Foods is a peer-reviewed journal published by Multidisciplinary Digital Publishing Institute (MDPI). It ranks 38 out of 173 titles in the Food Science and Technology category, indicating that it is a reliable journal.",
    'thiabendazole': "Thiabendazole is a chemical commonly used on fruits to prevent mold, blight, and other fungal diseases. It makes fruits last longer on the shelf.",
    'deionized water': "Deionized water is another way of saying pure water. Using pure water that doesn't contain ions or contaminants makes the experiment more reliable by controlling for variables.",
    'sers': "Surface-Enhanced Raman Spectroscopy (SERS) shines a beam of laser on the apple and measures the light reflected. It can tell thiabendazole from other chemicals based on its color. The more light of that color is reflected, the more thiabendazole is present.",
    'mass spectrometry': "The researchers first separate the chemicals using liquid chromatography, which forces the chemicals to flow through a column at different speeds. Then, they bombard the chemicals with ions and measure the mass and charge of the resulting fragments. This identifies the type of chemicals present and the amount of each chemical.",
    'USDA': "The United States Department of Agriculture is a federal agency responsible for overseeing and implementing policies related to American farming, forestry, food safety, and nutrition."
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

        // Show/hide apple-specific methods
        if (fruit === 'apple') {
            document.querySelector('.selection-area').classList.add('apple-selected');
            // Make sure a valid method is selected
            if (!methodOptions.querySelector('.selected') ||
                !removalRates[fruit][methodOptions.querySelector('.selected').getAttribute('data-method')]) {
                // Select sequential by default
                methodOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                methodOptions.querySelector('[data-method="sequential"]').classList.add('selected');
            }
        } else {
            document.querySelector('.selection-area').classList.remove('apple-selected');
            // For non-apple fruits, only sequential and commercial are valid
            const currentMethod = methodOptions.querySelector('.selected')?.getAttribute('data-method');
            if (currentMethod !== 'sequential' && currentMethod !== 'commercial') {
                // Select sequential by default
                methodOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                methodOptions.querySelector('[data-method="sequential"]').classList.add('selected');
            }
        }
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

    // Check if the selected method is valid for the selected fruit
    if (!removalRates[selectedFruit][selectedMethod]) {
        alert('This washing method is not available for the selected fruit. Please choose another method.');
        return;
    }

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
            }, 500);

        }, 1500);

    }, animationDuration);
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
        case 'commercial':
            // No special animation for commercial cleaner, just hide the magnifying glass
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

    // Make sure apple-specific methods are visible initially
    document.querySelector('.selection-area').classList.add('apple-selected');
});
