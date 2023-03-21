console.log('самооценка - 75 баллов');

import i18Obj from './translate.js';
const portfolioBtns = document.querySelectorAll('.btn-portfolio');
const portfolioImages = document.querySelectorAll('.portfolio-img img');

portfolioBtns.forEach(function (btnPortfolio) {
    btnPortfolio.addEventListener('click', function () {
        portfolioImages.forEach((img, index) => img.src = `./images/${btnPortfolio.dataset.season}/${index + 1}.jpg`);
        portfolioBtns.forEach((item) => {
            item.classList.remove('btn-portfolio--active');
        })
        btnPortfolio.classList.add('btn-portfolio--active');
    });
})


// кэш фото
const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {
    for (let item of seasons) {
        for (let i = 1; i <= 2; i++) {
            const img = new Image();
            img.src = `./images/${item}/${i}.jpg`;
        }
    }
}
preloadImages();


// переключение языка
const langBtns = document.querySelectorAll('.nav__lang a');
const dataList = document.querySelectorAll('[data-lang]');

function changeLang(lang) {
    dataList.forEach((item) => {
        if (i18Obj[lang][item.dataset.lang]) {
            item.innerText = i18Obj[lang][item.dataset.lang];
        };
        if (item.placeholder) {
            item.placeholder = i18Obj[lang][item.dataset.lang];
        }
        langBtns.forEach((i) => {
            i.classList.remove('nav__link--active');
            if(i.textContent==lang){
                i.classList.add('nav__link--active');
            }
        });
        
    });
    localStorage.lang = lang;
};
langBtns.forEach((btnLang) => {
    btnLang.addEventListener("click", function(){
        changeLang(btnLang.textContent);
        // langBtns.forEach((i) => {
        //     i.classList.remove('nav__link--active');
        // });
        // btnLang.classList.add('nav__link--active');
    });
    
});

// переключение темы
const buttonTheme = document.querySelector('.nav__theme a');
function changeTheme(){
    document.body.classList.toggle('light-theme');
    localStorage.theme = document.body.className;
};
buttonTheme.addEventListener('click', changeTheme);


function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        changeLang(lang);
    };
    if (localStorage.getItem('theme')){
        changeTheme();
    };
};
window.addEventListener('load', getLocalStorage);