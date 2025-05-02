// Baking soda animation - showing alkaline hydrolysis of fruit's waxy layer
function startBakingSodaAnimation(container = document.getElementById('baking-soda-container')) {
    container.innerHTML = '';

    // Add a fruit surface representation (rectangular)
    const fruitSurface = document.createElement('div');
    fruitSurface.style.position = 'absolute';
    fruitSurface.style.bottom = '0';
    fruitSurface.style.left = '0';
    fruitSurface.style.width = '100%';
    fruitSurface.style.height = '50%';
    fruitSurface.style.backgroundColor = '#8BC34A'; // Light green for fruit surface
    container.appendChild(fruitSurface);

    // Create wax layer on fruit surface (rectangular)
    const waxLayer = document.createElement('div');
    waxLayer.style.position = 'absolute';
    waxLayer.style.bottom = '50%';
    waxLayer.style.left = '0';
    waxLayer.style.width = '100%';
    waxLayer.style.height = '10%';
    waxLayer.style.backgroundColor = 'rgba(255, 255, 200, 0.7)';
    waxLayer.style.transition = 'opacity 1s';
    container.appendChild(waxLayer);

    // Add a label for the wax layer
    const waxLabel = document.createElement('div');
    waxLabel.textContent = 'Waxy Layer';
    waxLabel.style.position = 'absolute';
    waxLabel.style.bottom = '60%';
    waxLabel.style.left = '5px';
    waxLabel.style.fontSize = '8px';
    waxLabel.style.color = '#333';
    container.appendChild(waxLabel);

    // Create pesticide molecules embedded in fruit (under wax layer)
    const pesticides = [];
    for (let i = 0; i < 5; i++) {
        const pesticide = document.createElement('div');
        pesticide.classList.add('molecule', 'pesticide');
        pesticide.style.width = '12px';
        pesticide.style.height = '12px';
        pesticide.style.transition = 'all 1s ease';

        // Position within the fruit surface but under wax
        const top = 60 + Math.random() * 15;
        const left = 15 + i * 15;

        pesticide.style.top = `${top}%`;
        pesticide.style.left = `${left}%`;

        container.appendChild(pesticide);
        pesticides.push({
            element: pesticide,
            top,
            left
        });
    }

    // Create hydroxide ions directly
    const hydroxides = [];

    for (let i = 0; i < 6; i++) {
        const hydroxide = document.createElement('div');
        hydroxide.classList.add('molecule', 'hydroxide');
        hydroxide.style.width = '8px';
        hydroxide.style.height = '8px';
        hydroxide.style.borderRadius = '50%';
        hydroxide.style.backgroundColor = '#03A9F4'; // Blue for hydroxide ions
        hydroxide.style.transition = 'all 0.8s ease';

        // Position hydroxide ions at the top
        const top = 10 + Math.random() * 10;
        const left = 10 + i * 15;

        hydroxide.style.top = `${top}%`;
        hydroxide.style.left = `${left}%`;

        // Add OH- label
        const label = document.createElement('div');
        label.textContent = 'OH⁻';
        label.style.position = 'absolute';
        label.style.top = '8px';
        label.style.left = '8px';
        label.style.fontSize = '6px';
        label.style.color = '#333';
        hydroxide.appendChild(label);

        container.appendChild(hydroxide);
        hydroxides.push(hydroxide);
    }



    // Animation sequence
    setTimeout(() => {
        // Move hydroxide ions to the wax layer (but not past it)
        for (let i = 0; i < hydroxides.length; i++) {
            const hydroxide = hydroxides[i];
            const newTop = 45 + Math.random() * 5; // Position at the waxy layer (not below it)
            const newLeft = 10 + Math.random() * 80;

            hydroxide.style.top = `${newTop}%`;
            hydroxide.style.left = `${newLeft}%`;
        }

        // Start dissolving the wax layer
        setTimeout(() => {
            // Make wax layer disappear
            waxLayer.style.opacity = '0';

            // Move hydroxide ions upward and away
            setTimeout(() => {

                // Move hydroxide ions away first
                for (let i = 0; i < hydroxides.length; i++) {
                    hydroxides[i].style.top = '-50%'; // Move completely off screen
                    hydroxides[i].style.left = `${10 + Math.random() * 80}%`;
                }

                // After a short delay, move pesticides away upward
                setTimeout(() => {
                    // Move pesticides away (they're now free to be washed away)
                    for (let i = 0; i < pesticides.length; i++) {
                        const pesticide = pesticides[i];
                        pesticide.element.style.top = '-50%'; // Move completely off screen
                        pesticide.element.style.left = `${10 + Math.random() * 80}%`;
                    }
                }, 500); // Delay between hydroxide and pesticide movement

            }, 800);

        }, 700);

    }, 700);
}

// Function to start the sequential animation (corn starch followed by baking soda)
function startSequentialAnimation() {
    // This is a simplified version that doesn't use the magnifying glass
    // It just needs to exist for the main.js to call, but doesn't do anything visual
    console.log('Sequential animation started (no visual effect)');
}




