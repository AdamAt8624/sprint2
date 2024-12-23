var funny = 0;
var sad = 0;
var bad = 0;
var happy = 0;
var animal = 0;

// حلقة لحساب عدد الصور التي تحتوي على كل كلمة مفتاحية
gImgs.forEach(img => {
    
        if (img.keywords === 'funny') funny++;
        else if (img.keywords === 'bad') bad++;
        else if (img.keywords === 'happy') happy++;
        else if (img.keywords === 'animal') animal++;
        else if (img.keywords === 'sad') sad++;
    });

function filterGallery() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();  // الحصول على النص المدخل وتحويله إلى حروف صغيرة

    if (searchValue === '') {
        // إذا كانت خانة البحث فارغة، عرض جميع الصور
        renderGallery(gImgs);
    } else {
        // تصفية الصور بناءً على الكلمة المدخلة
        const filteredImgs = gImgs.filter(img => {
            const keywords = Array.isArray(img.keywords) ? img.keywords : [img.keywords];
            return keywords.some(keyword => keyword.toLowerCase().includes(searchValue));
        });

        renderGallery(filteredImgs);  // عرض الصور المصفاة
    }
}
function filterByCategory(category) {

let filteredImgs;

if (category === 'all') {
    // عند اختيار "All" نعرض جميع الصور
    filteredImgs = gImgs;
} else {
    // تصفية الصور بناءً على الفئة المحددة
    filteredImgs = gImgs.filter(img => {
        const keywords = Array.isArray(img.keywords) ? img.keywords : [img.keywords];
        return keywords.some(keyword => keyword.toLowerCase() === category.toLowerCase());
    });
}

// عرض الصور المصفاة
renderGallery(filteredImgs);
}
