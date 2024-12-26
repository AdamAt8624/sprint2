'use '
var funny = 0;
var sad = 0;
var bad = 0;
var happy = 0;
var animal = 0;

gImgs.forEach(img => {
    
        if (img.keywords === 'funny') funny++;
        else if (img.keywords === 'bad') bad++;
        else if (img.keywords === 'happy') happy++;
        else if (img.keywords === 'animal') animal++;
        else if (img.keywords === 'sad') sad++;
    });

function filterGallery() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();  

    if (searchValue === '') {
        renderGallery(gImgs);
    } else {
        const filteredImgs = gImgs.filter(img => {
            const keywords = Array.isArray(img.keywords) ? img.keywords : [img.keywords];
            return keywords.some(keyword => keyword.toLowerCase().includes(searchValue));
        });

        renderGallery(filteredImgs);  
    }
}
function filterByCategory(category) {

let filteredImgs;

if (category === 'all') {
    filteredImgs = gImgs;
} else {
    filteredImgs = gImgs.filter(img => {
        const keywords = Array.isArray(img.keywords) ? img.keywords : [img.keywords];
        return keywords.some(keyword => keyword.toLowerCase() === category.toLowerCase());
    });
}

renderGallery(filteredImgs);
}
