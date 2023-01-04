// variables 
let initalGridSize = 32;

const gridContainer = document.querySelector('.gridContent');

// function to create the grid
function createGrid() {
    let gridWidth = gridContainer.offsetWidth / initalGridSize;

    gridContainer.style.gridTemplateColumns = `repeat(${initalGridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
    gridContainer.style.gridTemplateRows = `repeat(${initalGridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;

    if (initalGridSize < 4) {
        gridContainer.style.gridTemplateColumns = `repeat(${initalGridSize},1fr`;
        gridContainer.style.gridTemplateRows = `repeat(${initalGridSize}, 1fr`;
    }

    for (let i = 0; i < initalGridSize ** 2; i++) {
        const gridSquares = document.createElement('div');
        gridSquares.classList.add('gridItems');
        gridSquares.setAttribute('draggable', 'false');
        gridContainer.appendChild(gridSquares);

        // to avoid double borders 
        gridSquares.classList.add('topLeftBorder');
    }

    // to avoid double border 
    // add a right border the the right most items
    const rightItems = document.querySelectorAll(`.gridItems:nth-child(${initalGridSize}n)`);
    for (let i = 0; i < rightItems.length; i++) {
        rightItems[i].setAttribute('rightSide', 'true');
        rightItems[i].classList.toggle('rightBorder');
    }

    // add a bottom border to the bottom most items
    let gridContent = document.querySelectorAll('.gridItems');
    const lastItems = Array.from(gridContent).slice(-`${initalGridSize}`);
    for (let i = 0; i < lastItems.length; i++) {
        lastItems[i].setAttribute('bottomSide', 'true');
        lastItems[i].classList.toggle('bottomBorder');
    }
}

createGrid();

gridContent = document.querySelectorAll('.gridItems');

// pick the pen colour
let penInk = '#000000';
const penColour = document.querySelector('#selectColour');
penColour.addEventListener('input', (e) => {
    penInk = e.target.value;
});

// toggle button colours when clicked
const rainbowBtn = document.getElementById('rainbowButton');
const shadingBtn = document.getElementById('shadingButton');
const lightenBtn = document.getElementById('lightenButton');
const eraseBtn = document.getElementById('eraserButton');
const toggleGridLineBtn = document.getElementById('gridLines');
const clearGridBtn = document.getElementById('clearGrid');

// resource: https://stackoverflow.com/questions/55445418/how-to-toggle-button-colour-when-it-is-clicked-and-change-the-colour-back-to-its
// toggle rainbow button
rainbowBtn.addEventListener('click', function () {
    // remove the other buttons
    shadingBtn.classList.remove('active');
    lightenBtn.classList.remove('active');
    eraseBtn.classList.remove('active');

    this.classList.toggle('active');

    if (rainbowBtn.getAttribute('#rainbowButton') === rainbowBtn.innerHTML) {
        rainbowBtn.innerHTML = rainbowBtn.getAttribute('#rainbowButton');
    } else {
        rainbowBtn.setAttribute('button.active', rainbowBtn.innerHTML);
    }
}, false);

// toggle shading button
shadingBtn.addEventListener('click', function () {
    // remove the other buttons
    rainbowButton.classList.remove('active');
    lightenBtn.classList.remove('active');
    eraseBtn.classList.remove('active');

    this.classList.toggle('active');

    if (shadingBtn.getAttribute('#shadingButton') === shadingBtn.innerHTML) {
        shadingBtn.innerHTML = shadingBtn.getAttribute('#shadingButton');
    } else {
        shadingBtn.setAttribute('button.active', shadingBtn.innerHTML);
    }
}, false);

// toggle lighten button
lightenBtn.addEventListener('click', function () {
    // remove the other buttons
    rainbowButton.classList.remove('active');
    shadingBtn.classList.remove('active');
    eraseBtn.classList.remove('active');

    this.classList.toggle('active');

    if (lightenBtn.getAttribute('#lightenButton') === lightenBtn.innerHTML) {
        lightenBtn.innerHTML = lightenBtn.getAttribute('#lightenButton');
    } else {
        lightenBtn.setAttribute('button.active', lightenBtn.innerHTML);
    }
}, false);

// toggle erase button
eraseBtn.addEventListener('click', function () {
    // remove the other buttons
    rainbowButton.classList.remove('active');
    shadingBtn.classList.remove('active');
    lightenBtn.classList.remove('active');

    this.classList.toggle('active');

    if (eraseBtn.getAttribute('#eraserButton') === eraseBtn.innerHTML) {
        eraseBtn.innerHTML = eraseBtn.getAttribute('#eraserButton');
    } else {
        eraseBtn.setAttribute('button.active', eraseBtn.innerHTML);
    }
}, false);

// toggle grid line button
toggleGridLineBtn.addEventListener('click', function () {
    this.classList.toggle('active');

    if (toggleGridLineBtn.getAttribute('#gridLines') === toggleGridLineBtn.innerHTML) {
        toggleGridLineBtn.innerHTML = toggleGridLineBtn.getAttribute('#gridLines');
    } else {
        toggleGridLineBtn.setAttribute('button.active', toggleGridLineBtn.innerHTML);
    }
}, false);

// toggle clear grid button
clearGridBtn.addEventListener('click', function () {
    this.classList.toggle('active');

    if (clearGridBtn.getAttribute('#clearGrid') === clearGridBtn.innerHTML) {
        clearGridBtn.innerHTML = clearGridBtn.getAttribute('#clearGrid');
    } else {
        clearGridBtn.setAttribute('button.active', clearGridBtn.innerHTML);
    }
}, false);

// change grid size 
let gridSizeSlider = document.getElementById('sliderBar');

function changeRange(value) {
    let labels = document.querySelectorAll('#rangeValue');
    for (let i = 0; i < labels.length; i++) {
        labels[i].textContent = value;
    }
    // gridSizeSlider.style.width = (value / 64) * 100 + '%';
    gridSizeSlider.style.width = (value / 64) * 100;
}

function clickingAction() {
    // toggle grid lines 
    const toggleGridLines = document.querySelector('#gridLines');

    toggleGridLines.addEventListener('click', () => {
        for (i = 0; i < gridContent.length; i++) {
            //toggle top and left cell borders
            gridContent[i].classList.toggle('topLeftBorder');
            //toggle the remaining right borders
            if (gridContent[i].dataset.right) {
                gridContent[i].classList.toggle('rightBorder');
            }
            // toggle the remaining bottom borders
            if (gridContent[i].dataset.bottom) {
                gridContent[i].classList.toggle('bottomBorder');
            }
        }
    });

}

clickingAction();