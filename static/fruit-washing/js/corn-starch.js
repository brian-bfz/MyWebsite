// Corn starch animation with simplified molecular structures
function startCornStarchAnimation(container = document.getElementById('corn-starch-container')) {
    container.innerHTML = '';

    // Create pesticide molecule
    const pesticide = document.createElement('div');
    pesticide.classList.add('molecule', 'pesticide');
    pesticide.style.position = 'absolute';
    pesticide.style.width = '25px';
    pesticide.style.height = '25px';
    pesticide.style.borderRadius = '50%';
    pesticide.style.backgroundColor = '#e41e25';
    pesticide.style.top = '50%';
    pesticide.style.left = '50%';
    pesticide.style.transition = 'all 0.8s ease';

    // Add nitrogen atoms (binding sites - blue)
    const nitrogen1 = document.createElement('div');
    nitrogen1.classList.add('nitrogen-atom', 'binding-site');
    nitrogen1.style.position = 'absolute';
    nitrogen1.style.width = '8px';
    nitrogen1.style.height = '8px';
    nitrogen1.style.borderRadius = '50%';
    nitrogen1.style.backgroundColor = '#2196f3';
    nitrogen1.style.top = '0px';
    nitrogen1.style.left = '8px';
    nitrogen1.style.zIndex = '2';

    const nitrogen2 = document.createElement('div');
    nitrogen2.classList.add('nitrogen-atom', 'binding-site');
    nitrogen2.style.position = 'absolute';
    nitrogen2.style.width = '8px';
    nitrogen2.style.height = '8px';
    nitrogen2.style.borderRadius = '50%';
    nitrogen2.style.backgroundColor = '#2196f3';
    nitrogen2.style.top = '17px';
    nitrogen2.style.left = '17px';
    nitrogen2.style.zIndex = '2';

    pesticide.appendChild(nitrogen1);
    pesticide.appendChild(nitrogen2);
    container.appendChild(pesticide);

    // Create starch granule
    const starch = document.createElement('div');
    starch.classList.add('molecule', 'starch-granule');
    starch.style.position = 'absolute';
    starch.style.width = '35px';
    starch.style.height = '35px';
    starch.style.borderRadius = '50%';
    starch.style.backgroundColor = '#f5f5dc';
    starch.style.border = '1px solid #deb887';
    starch.style.top = '10%';
    starch.style.left = '30%';
    starch.style.transition = 'all 0.8s ease';

    // Add hydroxyl groups (OH) as binding sites (green)
    const hydroxyl1 = document.createElement('div');
    hydroxyl1.classList.add('hydroxyl-group', 'binding-site');
    hydroxyl1.style.position = 'absolute';
    hydroxyl1.style.width = '8px';
    hydroxyl1.style.height = '8px';
    hydroxyl1.style.borderRadius = '50%';
    hydroxyl1.style.backgroundColor = '#4caf50';
    hydroxyl1.style.top = '5px';
    hydroxyl1.style.left = '15px';
    hydroxyl1.style.zIndex = '2';

    const hydroxyl2 = document.createElement('div');
    hydroxyl2.classList.add('hydroxyl-group', 'binding-site');
    hydroxyl2.style.position = 'absolute';
    hydroxyl2.style.width = '8px';
    hydroxyl2.style.height = '8px';
    hydroxyl2.style.borderRadius = '50%';
    hydroxyl2.style.backgroundColor = '#4caf50';
    hydroxyl2.style.top = '20px';
    hydroxyl2.style.left = '25px';
    hydroxyl2.style.zIndex = '2';

    starch.appendChild(hydroxyl1);
    starch.appendChild(hydroxyl2);
    container.appendChild(starch);

    // Create hydrogen bonds
    const bond1 = document.createElement('div');
    bond1.classList.add('hydrogen-bond');
    bond1.style.position = 'absolute';
    bond1.style.backgroundColor = '#64b5f6';
    bond1.style.height = '2px';
    bond1.style.zIndex = '1';
    bond1.style.opacity = '0';
    bond1.style.transition = 'opacity 0.5s';
    container.appendChild(bond1);

    const bond2 = document.createElement('div');
    bond2.classList.add('hydrogen-bond');
    bond2.style.position = 'absolute';
    bond2.style.backgroundColor = '#64b5f6';
    bond2.style.height = '2px';
    bond2.style.zIndex = '1';
    bond2.style.opacity = '0';
    bond2.style.transition = 'opacity 0.5s';
    container.appendChild(bond2);

    // Function to update bond positions
    const updateBonds = () => {
        const containerRect = container.getBoundingClientRect();

        const n1Rect = nitrogen1.getBoundingClientRect();
        const n2Rect = nitrogen2.getBoundingClientRect();
        const h1Rect = hydroxyl1.getBoundingClientRect();
        const h2Rect = hydroxyl2.getBoundingClientRect();

        // Calculate positions for first bond
        const x1 = n1Rect.left + n1Rect.width/2 - containerRect.left;
        const y1 = n1Rect.top + n1Rect.height/2 - containerRect.top;
        const x2 = h1Rect.left + h1Rect.width/2 - containerRect.left;
        const y2 = h1Rect.top + h1Rect.height/2 - containerRect.top;

        const length1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle1 = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        bond1.style.width = `${length1}px`;
        bond1.style.left = `${x1}px`;
        bond1.style.top = `${y1}px`;
        bond1.style.transformOrigin = '0 0';
        bond1.style.transform = `rotate(${angle1}deg)`;

        // Calculate positions for second bond
        const x3 = n2Rect.left + n2Rect.width/2 - containerRect.left;
        const y3 = n2Rect.top + n2Rect.height/2 - containerRect.top;
        const x4 = h2Rect.left + h2Rect.width/2 - containerRect.left;
        const y4 = h2Rect.top + h2Rect.height/2 - containerRect.top;

        const length2 = Math.sqrt(Math.pow(x4 - x3, 2) + Math.pow(y4 - y3, 2));
        const angle2 = Math.atan2(y4 - y3, x4 - x3) * 180 / Math.PI;

        bond2.style.width = `${length2}px`;
        bond2.style.left = `${x3}px`;
        bond2.style.top = `${y3}px`;
        bond2.style.transformOrigin = '0 0';
        bond2.style.transform = `rotate(${angle2}deg)`;
    };

    // Animation sequence
    setTimeout(() => {
        // Move starch toward pesticide
        starch.style.top = '35%';
        starch.style.left = '35%';

        setTimeout(() => {
            // Show hydrogen bonds
            updateBonds();
            bond1.style.opacity = '1';
            bond2.style.opacity = '1';

            // Add a text explanation
            const explanation = document.createElement('div');
            explanation.textContent = 'Hydrogen bonds form between nitrogen atoms (blue) on thiabendazole and hydroxyl groups (green) on starch';
            explanation.style.position = 'absolute';
            explanation.style.bottom = '5px';
            explanation.style.left = '5px';
            explanation.style.right = '5px';
            explanation.style.fontSize = '9px';
            explanation.style.textAlign = 'center';
            explanation.style.color = '#333';
            container.appendChild(explanation);

            setTimeout(() => {
                // Wash away both molecules together
                starch.style.top = '150%'; // Move completely off screen
                starch.style.left = '35%';
                pesticide.style.top = '150%'; // Move completely off screen
                pesticide.style.left = '50%';

                // Update bonds position as molecules move
                // We need to continuously update the bonds during the movement
                const startTime = Date.now();
                const duration = 1000; // 1 second animation

                const animateBonds = () => {
                    const elapsed = Date.now() - startTime;
                    if (elapsed < duration) {
                        // Update bonds position
                        updateBonds();
                        requestAnimationFrame(animateBonds);
                    } else {
                        // Animation complete, hide bonds
                        bond1.style.opacity = '0';
                        bond2.style.opacity = '0';
                    }
                };

                // Start the animation
                animateBonds();
            }, 1500);
        }, 800);
    }, 500);
}


