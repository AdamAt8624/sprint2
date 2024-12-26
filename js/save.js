function renderSavedMemes() {
    const saveGallery = document.querySelector('.save-gallery');
    saveGallery.innerHTML = ''; // Clear the save-gallery section before rendering

    const savedMemes = loadFromStorage('meme'); // Load saved memes from local storage

    savedMemes.forEach(meme => {
        const memeArticle = document.createElement('article');
        memeArticle.classList.add('saved-meme'); // Optional: Add a class for styling

        // Create a new canvas for each saved meme
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300; // Set canvas width
        canvas.height = 300; // Set canvas height

        // Load the image and render it along with the text
        const img = new Image();
        img.src = meme.imgUrl; // Get the image URL from saved meme data

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image on the canvas

            // Render each line of text on the canvas
            meme.lines.forEach(line => {
                ctx.fillStyle = line.color;
                ctx.font = `${line.size}px ${line.font}`;
                ctx.fillText(line.txt, line.x, line.y);
            });
        };

        // Add click event to load this meme into the meme editor
        canvas.addEventListener('click', () => {
            loadMemeToEditor(meme); // Load the meme's image and lines into the editor
        });

        // Append the canvas to the article
        memeArticle.appendChild(canvas);

        // Append the article to the save gallery
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
    // Hide the meme gallery and show the meme editor
    document.querySelector('.meme-gallery').classList.add('hidde');
    document.querySelector('.meme-edit').classList.remove('hidde');
    document.querySelector('.saveMeme').classList.add('hidde');

    // Set the selected meme's image URL
    elIMG = new Image();
    elIMG.src = meme.imgUrl;
    gMeme.selectedImgId = meme.imgId;

    // Set the meme lines (text)
    gMeme.lines = meme.lines; // Copy the saved lines into the gMeme object
    gMeme.selectedLineIdx = 0; // Optionally reset the selected line to the first line

    // Render the meme (image and text) on the canvas
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
    console.log(json);
    return JSON.parse(json) || []; 
}

