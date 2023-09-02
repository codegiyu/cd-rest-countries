const body = document.querySelector("body");   // document.body
const themeSwitch = document.getElementById("switch");
const lightTheme = document.getElementById("light");
const darkTheme = document.getElementById("dark");
const searchForm = document.querySelector("form.search");
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownBox = document.getElementById("dropdown-box");
const dropdownItems = document.querySelectorAll(".dropdown-item");
const loadingScreen = document.getElementById("loading-screen");
const searchResultsHeading = document.getElementById("search-results-heading");
const searchTerm = document.getElementById("search-term");
const resultsNumber = document.getElementById("results-number");
const countriesDisplay = document.getElementById("countries");


window.onload = () => {
    // console.log(window)
    fetchCountries();
}

dropdownBtn.addEventListener("click", fetchCountries);

async function fetchCountries() {
    loadingScreen.classList.remove("hide");

    const response = await fetch("https://restcountries.com/v3.1/all");
    const countriesData = await response.json();

    const result = countriesData.map(item => {
        return {
            name: item.name.common,
            code: item.cca3,
            flag: item.flags.svg,
            population: item.population.toLocaleString(),
            continent: item.region,
            capital: item.capital
        }
    })
    console.log(result)
    renderCountries(result);

    loadingScreen.classList.add("hide");
}

function renderCountries(arr) {
    let countriesCard = "";
    arr.forEach(country => {
        countriesCard += `<a href="country.html?state=${country.code}" class="text-decoration-none m-0 p-0">
                    <div class="country-card rounded pb-3">
                        <div class="flag ratio ratio-16x9">
                            <img src="${country.flag}" alt="Flag of ${country.name}" class="img-fluid">
                        </div>
                        <div class="card-body d-flex flex-column py-4 px-4">
                            <h2 class="country-name h5 fw-800 mb-3">${country.name}</h2>
                            <p class="fw-600 fs-small mb-1">Population: <span class="population fw-300 opacity-9">${country.population}</span></p>
                            <p class="fw-600 fs-small mb-1">Continent: <span class="region fw-300 opacity-9">${country.continent}</span></p>
                            <p class="fw-600 fs-small mb-3">Capital: <span class="capital fw-300 opacity-9">${country.capital}</span></p>
                        </div>
                    </div>
                </a>`
    })
    countriesDisplay.innerHTML = countriesCard;
}