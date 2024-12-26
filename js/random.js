const rndText=['oh my god','oh shit','fu***','such different pleasure rint ','easy sprint']
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * gImgs.length)
    
    return gImgs[randomIndex]
}
function getRandomText() {
    const randomIndex = Math.floor(Math.random() * rndText.length)
    
    return rndText[randomIndex]
}

function rnd(){
    const randomText=getRandomText()
    const randomImage = getRandomImage()
    getRandomImage()
    console.log(randomImage)
    const randomx= Math.floor(Math.random() * 301);  
    const randomy= Math.floor(Math.random() * 301); 

    const imgElement = document.createElement('img');
        imgElement.id = randomImage.id;
        imgElement.src = randomImage.url;  
        imgElement.alt = randomImage.keywords
        const randomSize = Math.floor(Math.random() * (60 - 15 + 1)) + 15;

        console.log(imgElement)
        onMemepick(imgElement)
        gMeme.lines.splice(0,1)
        gMeme.lines.push({
            txt: randomText, 
            size: randomSize,
            color: getRandomHexColor(),
            font: getRandomFont(),
            x: randomx,
            y: randomy  
        });
        renderMame()
}
function getRandomHexColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
}
function getRandomFont() {
    const fonts = [
        "Arial",
        "Times New Roman",
        "Courier New",
        "Georgia",
        "Impact",
        "Comic Sans MS",
        "Lucida Console",
        "Monaco"
    ];

    // Get a random index from the fonts array
    const randomIndex = Math.floor(Math.random() * fonts.length);
    console.log(fonts[randomIndex])
    const fontSelect = document.querySelector(".font-select");
    fontSelect.value = fonts[randomIndex]
    return fonts[randomIndex];


}