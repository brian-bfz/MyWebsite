// Simple friend-level protection. Do not store real secrets here.
const SECRETS = {
  rhlo: {
    password: "rhlo-secret-2024",
    title: "RHLO Secret Page",
    html: `
      <h2>Welcome to the RHLO Secret!</h2>
      <p>This is a secret page for RHLO members. Here you can find exclusive content and updates.</p>
      <ul>
        <li>Secret meeting notes</li>
        <li>Exclusive memes</li>
        <li>Private discussions</li>
      </ul>
      <p><em>Remember: What happens in RHLO, stays in RHLO! 🤫</em></p>
    `,
  },
  party: {
    password: "party-time-123",
    title: "Party Details",
    html: `
      <h2>🎉 Secret Party Information</h2>
      <p><strong>Date:</strong> This Saturday, 8:00 PM</p>
      <p><strong>Location:</strong> The usual spot (you know where!)</p>
      <p><strong>What to bring:</strong></p>
      <ul>
        <li>Your favorite snacks</li>
        <li>Good vibes</li>
        <li>Maybe some games?</li>
      </ul>
      <p>Can't wait to see everyone there! 🥳</p>
    `,
  },
  treasure: {
    password: "x-marks-the-spot",
    title: "Treasure Hunt",
    html: `
      <h2>🏴‍☠️ Treasure Hunt Clues</h2>
      <p>Ahoy, treasure hunter! You've found the secret map.</p>
      <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>First Clue:</h3>
        <p><em>"Where the books sleep and knowledge keeps,<br>
        Look for the shelf that never weeps."</em></p>
      </div>
      <p>Good luck on your quest! The treasure awaits those who are clever enough to solve all the riddles.</p>
    `,
  },
  recipes: {
    password: "secret-sauce-42",
    title: "Secret Recipe Collection",
    html: `
      <h2>👨‍🍳 Top Secret Recipes</h2>
      <p>Welcome to the vault of culinary secrets!</p>
      
      <h3>Grandma's Famous Chocolate Chip Cookies</h3>
      <p><strong>Secret ingredient:</strong> A pinch of sea salt and love! 💕</p>
      <ul>
        <li>2 cups flour</li>
        <li>1 cup butter</li>
        <li>3/4 cup brown sugar</li>
        <li>1/2 cup white sugar</li>
        <li>2 eggs</li>
        <li>2 tsp vanilla</li>
        <li>1 tsp baking soda</li>
        <li>1 tsp salt (the secret is using sea salt!)</li>
        <li>2 cups chocolate chips</li>
      </ul>
      
      <h3>The Ultimate Friendship Smoothie</h3>
      <p>Perfect for sharing with your best friends!</p>
      <ul>
        <li>1 banana</li>
        <li>1/2 cup strawberries</li>
        <li>1/2 cup blueberries</li>
        <li>1 cup almond milk</li>
        <li>1 tbsp honey</li>
        <li>A handful of spinach (trust me on this!)</li>
      </ul>
    `,
  },
  memories: {
    password: "remember-when-2023",
    title: "Memory Lane",
    html: `
      <h2>📸 Our Favorite Memories</h2>
      <p>A collection of our best moments together...</p>
      
      <div style="background: #ffe6f0; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>Summer 2023</h3>
        <p>That epic road trip where we got lost for 3 hours but found the best ice cream shop ever!</p>
      </div>
      
      <div style="background: #e6f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>Game Night Champion</h3>
        <p>Remember when Sarah won 7 games in a row and we accused her of cheating? 😂</p>
      </div>
      
      <div style="background: #f0ffe6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>The Great Pizza Debate</h3>
        <p>Pineapple on pizza: the discussion that almost ended our friendship (but made it stronger).</p>
      </div>
      
      <p><em>Here's to making many more memories together! 🥂</em></p>
    `,
  },
};

module.exports = { SECRETS };
