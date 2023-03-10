// variables 
let initalGridSize = 32;

const gridContainer = document.querySelector('.gridContent');

let backgroundColourSetter = '#ffffff';
gridContainer.style.backgroundColor = backgroundColourSetter;

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
    let gridContents = document.querySelectorAll('.gridItems');
    const lastItems = Array.from(gridContents).slice(-`${initalGridSize}`);
    for (let i = 0; i < lastItems.length; i++) {
        lastItems[i].setAttribute('bottomSide', 'true');
        lastItems[i].classList.toggle('bottomBorder');
    }
}

createGrid();

gridContents = document.querySelectorAll('.gridItems');

// pick the pen colour
let penInk = '#000000';
const penColour = document.querySelector('#selectColour');
penColour.addEventListener('input', (e) => {
    penInk = e.target.value;
});

// background colour 
const backgroundColourSelector = document.querySelector('#backgroundSelectColour');

const buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        buttons[i].classList.toggle('active');
    });
}

// toggle button colours when clicked
const rainbowBtn = document.querySelector('#rainbowButton');
const shadingBtn = document.querySelector('#shadingButton');
const lightenBtn = document.querySelector('#lightenButton');
const eraseBtn = document.querySelector('#eraserButton');
const toggleGridLineBtn = document.getElementById('gridLines');
const clearGridBtn = document.getElementById('clearGrid');

// toggle rainbow button
let rainbowChoice = false;
rainbowBtn.addEventListener('click', () => {
    if (rainbowChoice) {
        rainbowChoice = false;
    } else {
        rainbowChoice = true;
        shadingChoice = false;
        shadingBtn.classList.remove('active');
        lightenChoice = false;
        lightenBtn.classList.remove('active');
        eraserChoice = false;
        eraseBtn.classList.remove('active');
    }
});

// toggle shading button
let shadingChoice = false;
shadingBtn.addEventListener('click', () => {
    if (shadingChoice) {
        shadingChoice = false;
    } else {
        shadingChoice = true;
        rainbowChoice = false;
        rainbowBtn.classList.remove('active');
        lighten = false;
        lightenButton.classList.remove('active');
        eraserChoice = false;
        eraseBtn.classList.remove('active');
    }
});

// toggle lighten button
let lightenChoice = false;
lightenBtn.addEventListener('click', () => {
    if (lightenChoice) {
        lightenChoice = false;
    } else {
        lightenChoice = true;
        rainbowChoice = false;
        rainbowBtn.classList.remove('active');
        shadingChoice = false;
        shadingBtn.classList.remove('active');
        eraserChoice = false;
        eraseBtn.classList.remove('active');
    }
});

// toggle erase button
let eraserChoice = false;
eraseBtn.addEventListener('click', () => {
    if (eraserChoice) {
        eraserChoice = false;
    } else {
        eraserChoice = true;
        rainbowChoice = false;
        rainbowBtn.classList.remove('active');
        shadingChoice = false;
        shadingBtn.classList.remove('active');
        lightenChoice = false;
        lightenBtn.classList.remove('active');
    }

});

// change grid size 
let gridSizeSlider = document.getElementById('sliderBar');

// function for the labels
function changeRange(value) {
    let labels = document.querySelectorAll('#rangeValue');
    for (let i = 0; i < labels.length; i++) {
        labels[i].textContent = value;
    }
    // gridSizeSlider.style.width = (value / 64) * 100 + '%';
    gridSizeSlider.style.width = (value / 64) * 100;
}

// change the actual grid
function changeGrid(value) {
    let gridLabels = document.querySelectorAll('#rangeValue');
    // gridSizeSlider.style.width = (value / 64) * 100 + '%';
    gridSizeSlider.style.width = (value / 64) * 100;
    for (let i = 0; i < gridLabels.length; i++) {
        gridLabels[i].textContent = value;
    }

    initalGridSize = parseInt(value);
    deleteGrid();
    createGrid();
    clickingAction();
    reloadGrid();

    // if the toggle for grid lines is off, turn it back on
    const gridButton = document.querySelector('#gridLines');
    if (gridButton.classList.contains('gridLineButton')) {
        // do nothing 
    } else {
        gridButton.classList.toggle('gridLineButton');
    }
}

function deleteGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeEventListener('mousedown', drawClick);
        gridContainer.removeEventListener('mouseenter', activateClick);
        gridContainer.lastChild = null;
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function reloadGrid() {
    deleteGrid();
    createGrid();
    clickingAction();
}

// clear grid button functions 
function fadeGrid(contents) {
    contents.classList.add('fadeEffect');
}

// toggle clear grid button
let root = document.documentElement;
const clearGridButton = document.querySelector('#clearGrid');
function clearGrid() {
    // clear the background colour upon clear
    root.style.setProperty('--bgColour', backgroundColourSetter);
    gridContents = document.querySelectorAll('.gridItems');
    for (let i = 0; i < gridContents.length; i++) {
        fadeGrid(gridContents[i]);
    }

    setTimeout(function () {
        for (let i = 0; i < gridContents.length; i++) {
            gridContents[i].style.backgroundColor = '';
            gridContents[i].removeAttribute('squareInked');
            gridContents[i].removeAttribute('squareDone');
            gridContents[i].classList.remove('fadeEffect');
        }
    }, 1500);
    gridContainer.style.backgroundColor = backgroundColourSetter;

    // turn off the button after a little delay
    setTimeout(function () {
        clearGridBtn.classList.remove('active');
    }, 1000);
}

clearGridButton.addEventListener('click', clearGrid);

// random colour generator for the rainbow mode
// resource: https://code.tutsplus.com/tutorials/how-to-code-a-random-color-generator-in-javascript--cms-39861
function randomRainbowColour() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// resource: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
// convert rgb to hex
function rgbToHex(rgb) {
    let seperator = rgb.indexOf(',') > -1 ? ',' : ' ';

    // rgb(r,g,b) --> [r,g,b]
    rgb = rgb.substr(4).split(')')[0].split(seperator);

    let r, g, b;
    r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1) {
        r = '0' + r;
    }

    if (g.length == 1) {
        g = '0' + g;
    }

    if (b.length == 1) {
        b = '0' + b;
    }

    return '#' + r + g + b;
}

// function to adjust the colours for shading and lightening
function adjustColour(rgbToHex, rgb, colourAmount) {
    let color = rgbToHex(rgb);
    return (
        '#' +
        color
            .replace(/^#/, '')
            .replace(/../g, (color) =>
                ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + colourAmount)).toString(16)).substr(-2)
            )
    );
}

// functions for the actual drawing
// this function allows for individual grid squares to be coloured
function drawClick(e) {
    if (rainbowChoice) {
        e.target.style.backgroundColor = randomRainbowColour;
        e.target.setAttribute('squareInked', 'true');
        e.target.removeAttribute('squareDone');
    } else if (eraserChoice) {
        e.target.style.backgroundColor = '';
        e.target.removeAttribute('squareInked');
        e.target.removeAttribute('squareDone');
    } else if (shadingChoice) {
        // check to see if the grid square has been shaded, if not set the shade attribute to one 
        // this will be necessary for the background colour will also be shaded
        if (!e.target.dataset.Shade) {
            e.target.setAttribute('squareShade', '1');
        } else {
            // if the grid square has been shaded, keep track of the number of times the square has been shaded
            // increment accordingly
            let shadeCounter = parseInt(e.target.getAttribute('squareShade'));
            shadeCounter++;
            e.target.setAttribute('squareShade', `${shadeCounter}`);
        }

        // if the background is transparent
        if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transperent') {
            e.target.style.backgroundColor = backgroundColourSetter;
        }

        e.target.style.backgroundColor = adjustColour(rgbToHex, e.target.style.backgroundColor, -10);
    } else if (lightenChoice) {
        if (!e.target.dataset.Lighten) {
            e.target.setAttribute('squareLighten', '1');
        } else {
            // if the grid square has been shaded, keep track of the number of times the square has been shaded
            // decrement accordingly
            let lightenCounter = parseInt(e.target.getAttribute('squareLighten'));
            lightenCounter--;
            e.target.setAttribute('squareLighten', `${lightenCounter}`);
        }

        // if the background is transparent
        if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transperent') {
            e.target.style.backgroundColor = backgroundColourSetter;
        }

        e.target.style.backgroundColor = adjustColour(rgbToHex, e.target.style.backgroundColor, +10);
    } else {
        e.target.style.backgroundColor = penInk;
        e.target.setAttribute('squareInked', 'true');
        e.target.removeAttribute('squareDone');
    }
}

// function to draw on the grid when the square is clicked 
// this function allows for multiple grid squares to be coloured
function activateClick(e) {
    if (e.buttons > 0) {
        if (rainbowChoice) {
            e.target.style.backgroundColor = randomRainbowColour();
            e.target.setAttribute('squareInked', 'true');
            e.target.removeAttribute('squareDone');
        } else if (eraserChoice) {
            e.target.style.backgroundColor = '';
            e.target.removeAttribute('squareInked');
            e.target.removeAttribute('squareDone');
        } else if (shadingChoice) {
            // check to see if the grid square has been shaded, if not set the shade attribute to one 
            // this will be necessary for the background colour will also be shaded
            if (!e.target.dataset.Shade) {
                e.target.setAttribute('squareShade', '1');
            }

            // if the background is transparent
            if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transperent') {
                e.target.style.backgroundColor = backgroundColourSetter;
            }

            e.target.style.backgroundColor = adjustColour(rgbToHex, e.target.style.backgroundColor, -10);
        } else if (lightenChoice) {
            if (!e.target.dataset.Lighten) {
                e.target.setAttribute('squareLighten', '1');
            } else {
                // if the grid square has been shaded, keep track of the number of times the square has been shaded
                // decrement accordingly
                let lightenCounter = parseInt(e.target.getAttribute('squareLighten'));
                lightenCounter--;
                e.target.setAttribute('squareLighten', `${lightenCounter}`);
            }

            // if the background is transparent
            if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transperent') {
                e.target.style.backgroundColor = backgroundColourSetter;
            }

            e.target.style.backgroundColor = adjustColour(rgbToHex, e.target.style.backgroundColor, +10);
        } else {
            e.target.style.backgroundColor = penInk;
            e.target.setAttribute('squareInked', 'true');
            e.target.removeAttribute('squareDone');
        }
    }
}

function clickingAction() {
    gridContents = document.querySelectorAll('.gridItems');
    for (let i = 0; i < gridContents.length; i++) {
        gridContents[i].addEventListener('mousedown', drawClick);
        // if mouse is over the square 
        // colour will only be changed if the mouse is pressed down 
        gridContents[i].addEventListener('mouseenter', activateClick);
    }

    // change the background colour
    backgroundColourSelector.addEventListener('input', (e) => {
        gridContents = document.querySelectorAll('.gridItems');
        backgroundColourSetter = e.target.value;

        for (let i = 0; i < gridContents.length; i++) {
            if (!gridContents[i].dataset.Inked) {
                gridContainer.style.backgroundColor = backgroundColourSetter;
            }
        }
    });

    // toggle grid lines 
    const toggleGridLines = document.querySelector('#gridLines');

    toggleGridLines.addEventListener('click', () => {
        for (i = 0; i < gridContents.length; i++) {
            //toggle top and left cell borders
            gridContents[i].classList.toggle('topLeftBorder');
            //toggle the remaining right borders
            if (gridContents[i].dataset.right) {
                gridContents[i].classList.toggle('rightBorder');
            }
            // toggle the remaining bottom borders
            if (gridContents[i].dataset.bottom) {
                gridContents[i].classList.toggle('bottomBorder');
            }
        }
    });
}

clickingAction();