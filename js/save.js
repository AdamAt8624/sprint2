function renderSavedMemes() {
    const saveGallery = document.querySelector('.save-gallery');
    saveGallery.innerHTML = ''; 

    const savedMemes = loadFromStorage('meme'); 

    savedMemes.forEach(meme => {
        const memeArticle = document.createElement('article');
        memeArticle.classList.add('saved-meme'); 

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300; 
        canvas.height = 300; 

        const img = new Image();
        img.src = meme.imgUrl; 

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 

            meme.lines.forEach(line => {
                ctx.fillStyle = line.color;
                ctx.font = `${line.size}px ${line.font}`;
                ctx.fillText(line.txt, line.x, line.y);
            });
        };

        canvas.addEventListener('click', () => {
            loadMemeToEditor(meme); 
        });

        memeArticle.appendChild(canvas);

        saveGallery.appendChild(memeArticle);
    });
}
function toggleSave(){
    document.querySelector('.saveMeme').classList.remove('hidde');

    document.querySelector('.meme-gallery').classList.add('hidde');
    document.querySelector('.meme-edit').classList.add('hidde');


    renderSavedMemes()
}
function loadMemeToEditor(meme) {
    document.querySelector('.meme-gallery').classList.add('hidde');
    document.querySelector('.meme-edit').classList.remove('hidde');
    document.querySelector('.saveMeme').classList.add('hidde');

    elIMG = new Image();
    elIMG.src = meme.imgUrl;
    gMeme.selectedImgId = meme.imgId;

    gMeme.lines = meme.lines;
    gMeme.selectedLineIdx = 0; 

    elIMG.onload = () => {
        renderMame();
    };
}

function saveToStorage(key) {
    const memeData = {
        imgId: gMeme.selectedImgId,
        imgUrl: elIMG.src,
        lines: gMeme.lines
    };

    let memes = JSON.parse(localStorage.getItem(key));

    if (!Array.isArray(memes)) {
        memes = [];
    }

    memes.push(memeData); 
    localStorage.setItem(key, JSON.stringify(memes)); 
    alert('Meme saved!');
}



function loadFromStorage(meme) {
    const json = localStorage.getItem(meme);
    return JSON.parse(json) || []; 
}

