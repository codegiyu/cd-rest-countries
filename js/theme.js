const body = document.querySelector("body");   // document.body
const themeSwitch = document.getElementById("switch");
const lightTheme = document.getElementById("light");
const darkTheme = document.getElementById("dark");

const themeState = localStorage.getItem('themeState');

window.addEventListener('load', switchTheme);

themeSwitch.addEventListener('click', switchTheme);

function switchTheme() {

    if (darkTheme.classList.contains('hide') || themeState === "light") {
        localStorage.setItem('themeState', "dark");
        lightTheme.classList.add('hide');
        darkTheme.classList.remove('hide');
        body.classList.add('dark-mode');
    } else {
        localStorage.setItem('themeState', "light");
        lightTheme.classList.remove('hide');
        darkTheme.classList.add('hide');
        body.classList.remove('dark-mode');
    }
}