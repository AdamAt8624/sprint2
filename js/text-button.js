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
    try {
        const imgContent = elCanvas.toDataURL('image/jpeg');
        elLink.href = imgContent;
    } catch (err) {
        console.error("Canvas is tainted: ", err);
    }
}
let brushColor = 'black'; 

function triggerColorPicker(tool) {
    if (tool === 'brush') {
        const colorPicker = document.getElementById('brushColorPicker');
        colorPicker.click(); // Programmatically trigger the color picker
    }
    
}

function updateBrushColor(event) {
    brushColor = event.target.value; 
    console.log('Selected brush color:', brushColor);
     gMeme.lines[gMeme.selectedLineIdx].color = brushColor;
     renderMame()
}

function selectLine() {
    if (gMeme.selectedLineIdx + 1 == gMeme.lines.length) gMeme.selectedLineIdx = 0;
    else {
        gMeme.selectedLineIdx += 1;
    }
    renderMame();
}