// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
document.addEventListener("keydown", (event) => {
    // Check if the game is over
    if (!gameOver) {
        // Convert response to uppercase
        let response = event.key.toUpperCase();

        // Checking if the input is a letter
        if (/^[a-z]$/i.test(response)) {
            addLetter(response);
        } 
        // Checking if the input is a backspace
        else if (response === "BACKSPACE") {
            deleteLetter();
        }
        // Checking if the input is an enter
        else if (response === "ENTER") {
            submitGuess();
        }
    }
});

// TODO: Implement addLetter function
function addLetter(letter) {
    logDebug(`Adding letter ${letter}`, "Alert");

    //Check if current row is full, if so then return early
    if (currentTile >= 5){
        logDebug("Row is full. Letter not added.", "Error");
        return;
    }
    // Get the current row element fromr rows array
    const rowElement = rows[currentRow];
    // Get all tiles in the current row into an array
    const tiles = rowElement.querySelectorAll('.tile');
    // Get the specific tile from the row
    const specificTile = tiles[currentTile];
    // Set the tile's textContent to the letter
    specificTile.textContent = letter;
    // Add the 'filled' CSS class to the tile
    specificTile.classList.add('filled');
    // TODO: Increment currentTile by 1
    currentTile += 1;

    logDebug(`Successfully added letter, current tile is now ${currentTile}`, "Success");
}
  
function deleteLetter() {
    logDebug("Deleting letter", "Alert");

    //Check if current row has any letters, if there are none then return early
    if (currentTile <= 0){
        logDebug("Row is empty. Cannot delete.", "Error");
        return;
    }

    // Incremeant current tile down
    currentTile -= 1;

    // Getting the correct tile to delete
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    const tileToDelete = tiles[currentTile];

    // Get the letter before deleting it (for logging)
    const letterBeingDeleted = tileToDelete.textContent;

    // Clear the tile text and class
    tileToDelete.textContent = ''; // empty string removes the letter
    tileToDelete.classList.remove('filled'); // remove the styling class

    // Log deletion
    logDebug(`Successfully deleted ${letterBeingDeleted} from position ${currentTile}`, "Success");
    logDebug(`Current word is ${getCurrentWord()}`, "Alert");
}

// TODO: Implement submitGuess function
function submitGuess() {
    logDebug("Submitting guess", "Alert");
}

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }