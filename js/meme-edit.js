let elCanvas;
let gCtx;

function onMemepick(imgElement) {
    const memeGallery = document.querySelector('.meme-gallery');
    memeGallery.classList.add('hidde')
    canvasSection.classList.remove('hidde')
    elCanvas = document.querySelector('canvas');
    gCtx = elCanvas.getContext('2d');

    const elIMG = new Image();
    elIMG.src = imgElement.src; 

    elIMG.onload = function () {
        gCtx.clearRect(0, 0, elCanvas.width, elCanvas.height); 
        gCtx.drawImage(elIMG, 0, 0, elCanvas.width, elCanvas.height);  
    };

    if (elIMG.complete) {
        elIMG.onload();
    }
}
