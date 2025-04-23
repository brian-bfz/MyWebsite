// Create bubble animation
function createBubbles() {
    bubblesContainer.innerHTML = '';
    bubblesContainer.style.display = 'block';
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDelay = `${delay}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}
