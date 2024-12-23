const canvasSection=document.querySelector('.meme-edit')

var gImgs = [
    {id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny']},
    {id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: 'animal'},
    {id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: 'animal'},
    {id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: 'animal'},
    {id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: 'bad'},
    {id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: 'funny'},
    {id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: 'funny'},
    {id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: 'happy'},
    {id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: 'funny'},
    {id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: 'happy'},
    {id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: 'bad'},
    {id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: 'funny'},
    {id: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: 'happy'},
    {id: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: 'sad'},
    {id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: 'sad'},
    {id: 16, url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: 'happy'},
    {id: 17, url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: 'bad'},
    {id: 18, url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: 'funny'},

];
function toggleGallery() {
    const memeGallery = document.querySelector('.meme-gallery');
    memeGallery.classList.remove('hidde');

    const canvasSection=document.querySelector('.meme-edit')
    canvasSection.classList.add('hidde')

        renderGallery(gImgs)
   
}
function renderGallery(gImg) {
    const gallery = document.querySelector('.Gallery'); 
    gallery.innerHTML = '';

    
    gImg.forEach(img => {
        const article = document.createElement('article');
        article.classList.add('meme-list');  

        const imgElement = document.createElement('img');
        imgElement.id = img.id;
        imgElement.src = img.url;  
        imgElement.alt = img.keywords
        imgElement.onclick = () => onMemepick(imgElement);  
        article.appendChild(imgElement);
        
        gallery.appendChild(article);
    });
}

renderGallery(gImgs)
function onMemepick(imgElement){
    console.log(imgElement.src)
}
