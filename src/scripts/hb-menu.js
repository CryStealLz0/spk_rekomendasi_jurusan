const hamburger = document.querySelector('.hamburger');
const navbarBar = document.querySelector('.navbar_bar');

hamburger.addEventListener('click', () => {
    navbarBar.classList.toggle('active');
});
