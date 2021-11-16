const colorMode = {
    selectedColor: 1,
    randomColor: 2,
    eraseColor: 3
}

const colorSelector = document.querySelector('.color-selector');
const gridSizeSelector = document.querySelector('.grid-size-selector');

let currentColorMode = colorMode.selectedColor;
let selectedColor = colorSelector.value;
let gridSize = parseInt(gridSizeSelector.value);
createGrid(gridSize);

colorSelector.addEventListener('change', () => selectedColor = colorSelector.value);
gridSizeSelector.addEventListener('change', () => {
    gridSize = parseInt(gridSizeSelector.value);
    removeGrid();
    createGrid(gridSize);
});

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('pointerenter', () => button.classList.add('scale-button'));
    button.addEventListener('pointerleave', () => button.classList.remove('scale-button'));

    if (button.classList[0] === 'color-mode') {
        button.addEventListener('click', () => {
            buttons.forEach(button => button.classList.remove('selected-button'))
            button.classList.add('selected-button');
            currentColorMode = colorMode.selectedColor;
        })
    }
    else if (button.classList[0] === 'rainbow-mode') {
        button.addEventListener('click', () => {
            buttons.forEach(button => button.classList.remove('selected-button'))
            button.classList.add('selected-button');
            currentColorMode = colorMode.randomColor;
        })
    }
    else if (button.classList[0] === 'eraser') {
        button.addEventListener('click', () => {
            buttons.forEach(button => button.classList.remove('selected-button'))
            button.classList.add('selected-button');
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
    const grid = document.querySelector('.grid');
    for (i = 0; i < n; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        for (j = 0; j < n; j++) {
            const rowCell = document.createElement('div');
            rowCell.classList.add('grid-cell');
            rowCell.addEventListener('pointerenter', () => {
                if (!mouseDown) return;
                changeGridCellColor(rowCell)
            });
            rowCell.addEventListener('mousedown', () => changeGridCellColor(rowCell));
            row.appendChild(rowCell);
        }
        grid.appendChild(row);
    }
    return 'SUCCESS';
}

function removeGrid() {
    const gridRows = document.querySelectorAll('.grid .grid-row');
    const grid = document.querySelector('.grid');
    gridRows.forEach(gridRow => grid.removeChild(gridRow));
}

function clearGrid() {
    removeGrid();
    createGrid(gridSize);
}

let mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}