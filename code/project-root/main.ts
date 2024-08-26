import kaboom from "kaboom";
import "kaboom/global";

// Initialize Kaboom context
kaboom();

// Load Lego-style sprites
loadSprite("lego-character", "sprites/lego-character.png");
loadSprite("lego-background", "sprites/lego-background.png");

// Add a Lego character to the scene
const player = add([
    sprite("lego-character"),
    pos(80, 40),
    area(),
    body(),
]);

// Add a background
add([
    sprite("lego-background"),
    pos(0, 0),
    area(),
    "background",
]);

// Character movement
keyDown("left", () => {
    player.move(-120, 0);
});

keyDown("right", () => {
    player.move(120, 0);
});

keyDown("up", () => {
    if (player.grounded()) {
        player.jump(400);
    }
});

let currentChapter = 0;
const chapters = ["Chapter 1 Content", "Chapter 2 Content"]; // Sample chapters

function loadChapter(chapterText) {
    destroyAll("lego-character");
    destroyAll("background");

    addLevel([
        "          ",
        "  @       ",
        "          ",
        "==========",
    ], {
        width: 40,
        height: 40,
        "@": () => [
            sprite("lego-character"),
            area(),
            body(),
        ],
        "=": () => [
            sprite("lego-background"),
            area(),
            solid(),
        ],
    });

    // Display chapter text on screen if needed
}

function nextChapter() {
    currentChapter++;
    if (currentChapter < chapters.length) {
        loadChapter(chapters[currentChapter]);
    } else {
        add([
            text("The End"),
            pos(width() / 2, height() / 2),
            origin("center"),
        ]);
    }
}

keyPress("space", () => {
    nextChapter();
});

// Start button event listener
document.getElementById('startGameButton').onclick = function () {
    loadChapter(chapters[currentChapter]);
};