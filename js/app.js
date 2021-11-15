const colorMode = {
    selectedColor: 1,
    randomColor: 2,
    eraseColor: 3
}
let currentColorMode = colorMode.selectedColor;
let selectedColor = '#D1B9CE';
let gridSize = getGridSize();
createGrid(gridSize);

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('pointerenter', () => button.classList.add('scale-button'));
    button.addEventListener('pointerleave', () => button.classList.remove('scale-button'));

    if (button.classList[0] === 'color-mode') {
        button.addEventListener('click', () => {
            currentColorMode = colorMode.selectedColor;
        })
    }
    else if (button.classList[0] === 'rainbow-mode') {
        button.addEventListener('click', () => {
            currentColorMode = colorMode.randomColor;
        })
    }
    else if (button.classList[0] === 'eraser') {
        button.addEventListener('click', () => {
            currentColorMode = colorMode.eraseColor;
        })
    }
    else if (button.classList[0] === 'clear') {
        button.addEventListener('click', clearGrid)
    }
});

function changeGridCellColor(gridCell) {
    if (currentColorMode === colorMode.selectedColor) {
        gridCell.style.backgroundColor = selectedColor;
    }
    else if (currentColorMode === colorMode.randomColor) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        gridCell.style.backgroundColor = '#' + randomColor;
    }
    else {
        gridCell.style.backgroundColor = 'white';
    }
}

function createGrid(n) {
    if (typeof n != 'number') {
        return 'ERROR';
    }
    n = Math.floor(n);
    const numberOfDivs = n ** 2;
    const grid = document.querySelector('.grid');
    for (i = 0; i < numberOfDivs; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-cell');
        div.style.width = (480 / n) + 'px';
        div.style.height = (480 / n) + 'px';
        div.addEventListener('pointerenter', () => changeGridCellColor(div));
        grid.appendChild(div);
    }
}

function removeGrid() {
    const gridCells = document.querySelectorAll('.grid .grid-cell');
    const grid = document.querySelector('.grid');
    gridCells.forEach(gridCell => grid.removeChild(gridCell));
}

function clearGrid() {
    removeGrid();
    createGrid(gridSize);
}

function getGridSize() {
    return parseInt(window.prompt("Insert grid size (must be a number)"));
}