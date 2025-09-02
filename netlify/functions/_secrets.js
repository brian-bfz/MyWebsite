const fs = require('fs');
const path = require('path');

// Function to read HTML file
const readHtmlFile = (filename) => {
  try {
    const htmlPath = path.join(__dirname, 'html', filename);
    return fs.readFileSync(htmlPath, 'utf8');
  } catch (error) {
    console.error(`Error reading HTML file ${filename}:`, error);
    return `<p>Error loading content for ${filename}</p>`;
  }
};

// Simple friend-level protection. Do not store real secrets here.
const SECRETS = {
  // puzzle 1 location is disclosed to the user
  puzzle1: {
    password: "0512",
    title: "Fragments",
    html: readHtmlFile('puzzle1.html')
  },
  puzzle2_location: {
    password: "INTERSTELLAR", 
    title: "Mission 2", 
    html: readHtmlFile('puzzle2_location.html')
  },
  puzzle2: {
    password: "6439", 
    title: "Center", 
    html: "Oops. Brian hasn't made this puzzle yet."
  },
  puzzle3_location: {
    password: "todo", 
    title: "FINAL MISSION", 
    html: `
      <h2>Find Yuri, Reckoner of Relativity, and fight him.</h2>
    `,
  }
};

module.exports = { SECRETS };
