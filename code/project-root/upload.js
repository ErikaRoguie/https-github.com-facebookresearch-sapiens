document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const file = document.getElementById('bookFile').files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        const chapters = parseBook(text);
        
        window.chapters = chapters; // Store chapters globally
        document.getElementById('startGameButton').disabled = false;
    };

    reader.readAsText(file);
});

function parseBook(text) {
    // Logic to parse book text goes here
    // Example: Split text into chapters, sentences, etc.
    const chapters = text.split(/\r?\n\r?\n/); // Split by empty lines
    return chapters;
}