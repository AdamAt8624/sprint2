// Get elements
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const links = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('.section');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});


function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}



