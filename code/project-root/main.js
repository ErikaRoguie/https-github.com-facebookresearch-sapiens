import kaboom from "kaboom";
import "kaboom/global";

function initializeGame() {
    // Initialize Kaboom context
    kaboom({
        global: true,
        fullscreen: true,
        clearColor: [0, 0, 0, 1],
    });

    // Load Lego-style sprites
    loadSprite("lego-character", "sprites/lego-character.png");
    loadSprite("lego-background", "sprites/lego-background.png");

    createPlayer();
    createBackground();
    initializeControls();
}

function createPlayer() {
    // Add a Lego character to the scene
    window.player = add([
        sprite("lego-character"),
        pos(80, 40),
        area(),
        body(),
    ]);
}

function createBackground() {
    // Add a background
    add([
        sprite("lego-background"),
        pos(0, 0),
        area(),
        "background",
    ]);
}

function initializeControls() {
    keyDown("left", () => {
        window.player.move(-120, 0);
    });

    keyDown("right", () => {
        window.player.move(120, 0);
    });

    keyDown("up", () => {
        if (window.player.grounded()) {
            window.player.jump(400);
        }
    });
}

let currentChapter = 0;

function loadChapter(chapterText) {
    destroyAll("lego-character");
    destroyAll("background");

    createPlayer();
    createBackground();

    document.getElementById('chapterDisplay').innerText = chapterText;
}

function nextChapter() {
    currentChapter++;
    if (currentChapter < window.chapters.length) {
        loadChapter(window.chapters[currentChapter]);
    } else {
        document.getElementById('chapterDisplay').innerText = "The End";
    }
}

keyPress("space", () => {
    nextChapter();
});

document.getElementById('startGameButton').onclick = function () {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    if (!window.chapters || window.chapters.length === 0) {
        alert("No chapters found. Please upload a valid book.");
        return;
    }

    initializeGame();
    loadChapter(window.chapters[currentChapter]);
};