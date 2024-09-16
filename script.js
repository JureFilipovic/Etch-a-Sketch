const container = document.querySelector (".container");
const button = document.querySelector (".changeBtn");
const squareArray = [];
const darkeningLevels = new Map();

function getRandomColor () {
    const r = Math.floor (Math.random() * 256);
    const g = Math.floor (Math.random() * 256);
    const b = Math.floor (Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function darkenColor(color, percentage) {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    const darken = (value) => Math.max(0, Math.min(255, value * (1 - percentage / 100)));
    return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
}

function createGrid (squaresPerSide) {
    container.innerHTML = "";
    squareArray.length = 0;
    darkeningLevels.clear ();

    const squareSize = 100 / squaresPerSide;

    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        squareArray[i] = document.createElement ("div");
        squareArray[i].classList.add ("square");
        squareArray[i].style.width = `${squareSize}%`;
        squareArray[i].style.height = `${squareSize}%`;
        container.appendChild (squareArray[i]);

        const initialColor = getRandomColor();
        darkeningLevels.set(squareArray[i], { color: initialColor, level: 0 });

        squareArray[i].addEventListener ("mouseover", () => {
            const {color, level} = darkeningLevels.get (squareArray[i]);
            const newLevel = Math.min (level + 1, 9);
            const newColor = darkenColor (color, newLevel * 10);
            squareArray[i].style.backgroundColor = newColor;
            darkeningLevels.set (squareArray[i], {color, level: newLevel});
        });

        squareArray[i].addEventListener ("mouseout", () => {
            squareArray[i].style.backgroundColor = "lightblue";
        });
    }
}

button.addEventListener ("click", () => {
    const squaresPerSide = parseInt (prompt ("Enter number:"));

    if (isNaN (squaresPerSide) || squaresPerSide <= 0 || squaresPerSide > 100) {
        alert ("Enter valid number.");
        return;
    }

    createGrid (squaresPerSide);
});

createGrid (4);