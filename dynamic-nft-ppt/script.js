// Character customization system
const character = {
    hair: { color: '#8B4513', name: 'Brown' },
    shirt: { color: '#4ECDC4', name: 'Teal' },
    pants: { color: '#45B7D1', name: 'Blue' },
    shoes: { color: '#2C3E50', name: 'Black' },
    hat: { color: 'none', name: 'None' },
    accessory: { color: 'none', name: 'None' }
};

// DOM Elements
const randomizeBtn = document.getElementById('randomize-btn');
const exportBtn = document.getElementById('export-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupOptionHandlers();
    updateCharacter();
    
    // Event listeners
    randomizeBtn.addEventListener('click', randomizeCharacter);
    exportBtn.addEventListener('click', exportCharacter);
});

// Update character appearance
function updateCharacter() {
    document.querySelector('.hair').style.background = character.hair.color;
    document.querySelector('.shirt').style.background = character.shirt.color;
    document.querySelector('.pants').style.background = character.pants.color;
    document.querySelector('.shoes').style.background = character.shoes.color;
    
    const hat = document.querySelector('.hat');
    const accessory = document.querySelector('.accessories');
    
    if (character.hat.color === 'none') {
        hat.classList.remove('active');
    } else {
        hat.style.background = character.hat.color;
        hat.classList.add('active');
    }
    
    if (character.accessory.color === 'none') {
        accessory.classList.remove('active');
    } else {
        accessory.style.background = character.accessory.color;
        accessory.classList.add('active');
    }
    
    // Update trait display
    document.getElementById('hair-trait').textContent = character.hair.name;
    document.getElementById('shirt-trait').textContent = character.shirt.name;
    document.getElementById('pants-trait').textContent = character.pants.name;
    document.getElementById('shoes-trait').textContent = character.shoes.name;
    document.getElementById('hat-trait').textContent = character.hat.name;
    document.getElementById('accessory-trait').textContent = character.accessory.name;
}

// Handle option selection
function setupOptionHandlers() {
    const categories = ['hair', 'shirt', 'pants', 'shoes', 'hat', 'accessory'];
    
    categories.forEach(category => {
        const options = document.querySelectorAll(`#${category}-options .option`);
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from siblings
                options.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Update character
                character[category] = {
                    color: option.dataset.color,
                    name: option.dataset.name
                };
                
                updateCharacter();
            });
        });
    });
}

// Randomize character
function randomizeCharacter() {
    const categories = ['hair', 'shirt', 'pants', 'shoes', 'hat', 'accessory'];
    
    categories.forEach(category => {
        const options = document.querySelectorAll(`#${category}-options .option`);
        const randomOption = options[Math.floor(Math.random() * options.length)];
        
        // Clear all selections
        options.forEach(opt => opt.classList.remove('selected'));
        // Select random option
        randomOption.classList.add('selected');
        
        character[category] = {
            color: randomOption.dataset.color,
            name: randomOption.dataset.name
        };
    });
    
    updateCharacter();
}

// Export character traits (for NFT metadata)
function exportCharacter() {
    const metadata = {
        name: "Dynamic NFT Character",
        description: "A customizable NFT character with dynamic traits",
        attributes: [
            { trait_type: "Hair", value: character.hair.name },
            { trait_type: "Shirt", value: character.shirt.name },
            { trait_type: "Pants", value: character.pants.name },
            { trait_type: "Shoes", value: character.shoes.name },
            { trait_type: "Hat", value: character.hat.name },
            { trait_type: "Accessory", value: character.accessory.name }
        ],
        character_data: character
    };
    
    // Create downloadable JSON
    const dataStr = JSON.stringify(metadata, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'nft-character-traits.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}