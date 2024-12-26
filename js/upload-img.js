
function onImgInput(ev) {
    loadImageFromInput(ev, (img) => {
        elIMG = img;

        elCanvas.width = elIMG.width;
        elCanvas.height = elIMG.height;

        document.querySelector('.meme-gallery').classList.add('hidde');
        document.querySelector('.meme-edit').classList.remove('hidde');
        onMemepick(elIMG)
        renderMame();
    });
    console.log('nnn')
    
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.onload = () => {
            onImageReady(img); 
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(ev.target.files[0]); 
}
