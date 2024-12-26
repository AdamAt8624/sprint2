// Get elements
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const links = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('.section');



function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}
document.querySelector('header button').addEventListener('click', function() {
    document.getElementById('nav').classList.toggle('open');
});

document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav');
    const button = document.querySelector('header button');
    
    // Check if the click was outside of the nav or the button
    if (!nav.contains(event.target) && event.target !== button) {
        nav.classList.remove('open');
    }
});
