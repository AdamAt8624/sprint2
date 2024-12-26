let elCanvas, gCtx, elIMG, textinput;
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: "Add text here",
            size: 20,
            color: 'black',
            font: 'Arial',
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
        gCtx.fillText(line.txt, line.x, line.y);
        if (gMeme.selectedLineIdx === idx) {
            const textWidth = gCtx.measureText(line.txt).width;
            const textHeight = line.size;
            gCtx.strokeStyle = 'black';
            gCtx.lineWidth = 2;
            gCtx.strokeRect(line.x - 5, line.y - textHeight, textWidth + 10, textHeight + 5);
        }
    });

}

function selectLine() {
    if (gMeme.selectedLineIdx + 1 == gMeme.lines.length) gMeme.selectedLineIdx = 0;
    else {
        gMeme.selectedLineIdx += 1;
    }
    renderMame();
}

function onMemepick(imgElement) {
    document.querySelector('.saveMeme').classList.add('hidde');
    document.querySelector('.meme-gallery').classList.add('hidde');
    document.querySelector('.meme-edit').classList.remove('hidde');
console.log(imgElement)
   

    elIMG = new Image();

    elIMG.src = imgElement.src;
    gMeme.selectedImgId = imgElement.id;
    
    elIMG.onload = () => {
        renderMame();
    };

    elIMG.onerror = () => {
        console.error("Failed to load image, possibly due to CORS issue.");
    };
}


function handleMouseDown(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    gMeme.lines.forEach((line, idx) => {
        const textWidth = gCtx.measureText(line.txt).width;
        const textHeight = line.size;
        if (
            mouseX >= line.x && mouseX <= line.x + textWidth &&
            mouseY >= line.y - textHeight && mouseY <= line.y
        ) {
            gMeme.selectedLineIdx = idx;
            gMeme.isDragging = true;
            gMeme.dragStartX = mouseX - line.x;
            gMeme.dragStartY = mouseY - line.y;
        }
    });
}

function handleMouseMove(e) {
    if (gMeme.isDragging) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        const line = gMeme.lines[gMeme.selectedLineIdx];
        line.x = mouseX - gMeme.dragStartX;
        line.y = mouseY - gMeme.dragStartY;

        renderMame();
    }
}

function handleMouseUp() {
    gMeme.isDragging = false;
}

function handleMouseLeave() {
    gMeme.isDragging = false;
}

function addText() {
    textinput.value = 'Add text here';
    gMeme.lines.push({
        txt: 'Add text here',
        size: 20,
        color: 'black',
        font: 'Arial',
        x: 50,
        y: 50 + gMeme.lines.length * 30
    });
    gMeme.selectedLineIdx += 1;
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    renderMame();
}

function deletLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = Math.max(0, gMeme.selectedLineIdx - 1);
    renderMame();
}

function setLinetext() {
    gMeme.lines[gMeme.selectedLineIdx].txt = textinput.value;
    renderMame();
}

function changeFont() {
    const fontSelect = document.querySelector(".font-select");
    gMeme.lines[gMeme.selectedLineIdx].font = fontSelect.value;
    renderMame();
}

function sizeFont(bs) {
    if (bs == 'big') gMeme.lines[gMeme.selectedLineIdx].size += 3;
    else gMeme.lines[gMeme.selectedLineIdx].size -= 3;
    renderMame();
}

function fonton(fcl) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    const textWidth = gCtx.measureText(line.txt).width;
    if (fcl == "left") line.x = 10;
    else if (fcl == "center") line.x = (elCanvas.width - textWidth) / 2;
    else line.x = elCanvas.width - textWidth - 10;

    renderMame();
}


function download(elLink) {
    const dataURL = elCanvas.toDataURL('image/jpeg');
    elLink.href = dataURL; 
}
