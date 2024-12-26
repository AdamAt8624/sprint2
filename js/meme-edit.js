let elCanvas, gCtx, elIMG, textinput;
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: "Add text here",
            size: 20,
            color: 'white',
            font: 'Arial',
            strokeColor: 'red',
            x: 50,
            y: 50
        }
    ],
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
};

document.addEventListener('DOMContentLoaded', () => {
    elCanvas = document.querySelector('canvas');
    gCtx = elCanvas.getContext('2d');
    textinput = document.querySelector(".memeTextInput");

    renderMame();
    renderSavedMemes(); // Render saved memes as soon as the page loads

    elCanvas.addEventListener('mousedown', handleMouseDown);
    elCanvas.addEventListener('mousemove', handleMouseMove);
    elCanvas.addEventListener('mouseup', handleMouseUp);
    elCanvas.addEventListener('mouseleave', handleMouseLeave);

    // Add touch event listeners
    elCanvas.addEventListener('touchstart', handleTouchStart);
    elCanvas.addEventListener('touchmove', handleTouchMove);
    elCanvas.addEventListener('touchend', handleTouchEnd);
    elCanvas.addEventListener('touchcancel', handleTouchCancel);

    document.querySelector(".font-select").addEventListener('change', changeFont);
    textinput.addEventListener('input', setLinetext);
});

function renderMame() {
    gCtx.clearRect(0, 0, elCanvas.width, elCanvas.height);
    if (elIMG) {
        gCtx.drawImage(elIMG, 0, 0, elCanvas.width, elCanvas.height);
    }

    gMeme.lines.forEach((line, idx) => {
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.strokeStyle = line.strokeColor;  // Stroke color
        gCtx.lineWidth = 2;
        gCtx.strokeText(line.txt, line.x, line.y);

        gCtx.fillText(line.txt, line.x, line.y);

        if (gMeme.selectedLineIdx === idx) {
            const textWidth = gCtx.measureText(line.txt).width;
            const textHeight = line.size;
            gCtx.strokeStyle = 'red';
            gCtx.lineWidth = 2;
            gCtx.strokeRect(line.x - 5, line.y - textHeight, textWidth + 10, textHeight + 5);
        }
    });
}

function onMemepick(imgElement) {
    document.querySelector('.saveMeme').classList.add('hidde');
    document.querySelector('.meme-gallery').classList.add('hidde');
    document.querySelector('.meme-edit').classList.remove('hidde');
    
    elIMG = new Image();
    elIMG.src = imgElement.src;

    elIMG.onload = () => {
        elCanvas.width = elIMG.width;
        elCanvas.height = elIMG.height;
        renderMame();
    };

    elIMG.onerror = () => {
        console.error("Failed to load image, possibly due to CORS issue.");
    };
}

function handleMouseDown(e) {
    startDragging(e.offsetX, e.offsetY);
}

function handleMouseMove(e) {
    if (gMeme.isDragging) {
        continueDragging(e.offsetX, e.offsetY);
    }
}

function handleMouseUp() {
    stopDragging();
}

function handleMouseLeave() {
    stopDragging();
}

// Touch Event Handlers
function handleTouchStart(e) {
    const touch = e.touches[0];
    const rect = elCanvas.getBoundingClientRect();
    startDragging(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleTouchMove(e) {
    if (gMeme.isDragging) {
        const touch = e.touches[0];
        const rect = elCanvas.getBoundingClientRect();
        continueDragging(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault(); 
    }
}

function handleTouchEnd() {
    stopDragging();
}

function handleTouchCancel() {
    stopDragging();
}

// Dragging Logic
function startDragging(x, y) {
    gMeme.lines.forEach((line, idx) => {
        const textWidth = gCtx.measureText(line.txt).width;
        const textHeight = line.size;
        if (
            x >= line.x && x <= line.x + textWidth &&
            y >= line.y - textHeight && y <= line.y
        ) {
            gMeme.selectedLineIdx = idx;
            gMeme.isDragging = true;
            gMeme.dragStartX = x - line.x;
            gMeme.dragStartY = y - line.y;
        }
    });
}

function continueDragging(x, y) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.x = x - gMeme.dragStartX;
    line.y = y - gMeme.dragStartY;
    renderMame();
}

function stopDragging() {
    gMeme.isDragging = false;
}

function cleanGmeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: "Add text here",
                size: 20,
                color: 'black',
                font: 'Arial',
                strokeColor: 'red',

                x: 50,
                y: 50
            }
        ],
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0,
    };
    return gMeme;
}
