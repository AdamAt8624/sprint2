function addText() {
    textinput.value = 'Add text here';
    gMeme.lines.push({
        txt: 'Add text here',
        size: 20,
        color: 'white',
        font: 'Arial',
        strokeColor: 'red',

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
    const imgContent = elCanvas.toDataURL('image/jpeg'); // Get the data URL of the canvas image (JPEG format)
    elLink.href = imgContent; // Set the href to the generated image data URL
    elLink.download = 'my-meme.jpg'; // Define the filename for the download (optional)
}

let brushColor = 'black'; 
function triggerColorPicker(tool) {
    if (tool === 'brush') {
        const colorPicker = document.getElementById('brushColorPicker');
        colorPicker.click(); 
    } else if (tool === 'fill') {
        const strokeColorPicker = document.getElementById('strokeColorPicker');
        strokeColorPicker.click(); 
    }
}
let strokeColoro='red'
function updateStrokeColor(event) {
     strokeColoro = event.target.value;
     console.log('Selected strokeColoro color:', strokeColoro);

    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColoro;  
    renderMame(); 
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
function onUploadImg(ev) {
    ev.preventDefault();
    const canvasData = elCanvas.toDataURL('image/jpeg'); // Get the image data from the canvas
    console.log(canvasData);

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl);

        document.querySelector('.share-container').innerHTML = `
        <a href="${uploadedImgUrl}" target="_blank">BABA</a>
        <p>Image url: ${uploadedImgUrl}</p>
        <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
           Share on Facebook  
        </button>`;
    }

    uploadImg(canvasData, onSuccess);
}

