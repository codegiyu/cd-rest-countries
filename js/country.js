const backBtn = document.querySelector(".back");
const loadingScreen = document.querySelector("#loading-screen");
const countryWrap = document.querySelector("#country");
const countryCode = window.location.search.split("=")[1];

backBtn.addEventListener("click", () => history.back())

async function getCountryDetails() {
    if (!countryCode) {
        alert("Country code not found! Returning to home screen")
        window.location.href = '/'
    } else {
        const res = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await res.json();

        // console.log(data);
        const country = data.find(el => el.cca3 == countryCode)
        const countryData = {
            commonName: country.name.common,
            nativeName: Object.entries(country.name.nativeName)[0][1].common,
            flag: country.flags.svg,
            population: country.population.toLocaleString(),
            tld: country.tld,
            region: country.region,
            subregion: country.subregion,
            borderCountries: formatBorderCountries(data, country.borders),
            capital: country.capital,
            currencies: Object.entries(country.currencies).map(item => item[1].name).join(", "),
            languages: Object.values(country.languages).join(", "),
        }

        // console.log("country: ", country)
        console.log("country data: ", countryData)
        renderCountryData(countryData)
    }
}

function formatBorderCountries(data, arr) {
    const borders = arr.reduce((acc, curr) => {
        acc[curr] = true;
        return acc
    }, {})

    return data.reduce((acc, curr) => {
        if (borders[curr.cca3]) {
            acc.push({
                name: curr.name.common,
                code: curr.cca3
            })
        }

        return acc
    }, [])
}

function renderCountryData(obj) {
    let bordersHtml = obj.borderCountries.reduce((acc, curr) => {
        acc += `<a href="country.html?country=${curr.code}" class="text-decoration-none w-auto h-auto p-0 m-0">
                    <button class="bc rounded m-0 py-1 px-3">
                        <p class="fs-small fw-600 opacity-9 m-0 p-0">${curr.name}</p>
                    </button>
                </a>`
        return acc
    }, "");
    console.log("Borders Html: ", bordersHtml)

    card = `<div class="flag ratio ratio-4x3">
                <img src="${obj.flag}" alt="Flag of ${obj.commonName}" class="img-fluid">
            </div>
            <div class="details h-100 d-flex align-items-center">
                <div class="details-wrap w-100">
                    <h2 class="country-name h3 fw-800 mb-4">${obj.commonName}</h2>
                    <div class="detail-columns my-3">
                        <div class="column1">
                            <p class="fw-600 fs-small mb-2">Native Name: <span class="native_name fw-300 opacity-9">${obj.nativeName}</span></p>
                            <p class="fw-600 fs-small mb-2">Population: <span class="population fw-300 opacity-9">${obj.population}</span></p>
                            <p class="fw-600 fs-small mb-2">Region: <span class="region fw-300 opacity-9">${obj.region}</span></p>
                            <p class="fw-600 fs-small mb-2">Sub-Region: <span class="sub-region fw-300 opacity-9">${obj.subregion}</span></p>
                            <p class="fw-600 fs-small mb-3">Capital: <span class="capital fw-300 opacity-9">${obj.capital}</span></p>
                        </div>
                        <div class="column2">
                            <p class="fw-600 fs-small mb-2">Top Level Domain: <span class="tld fw-300 opacity-9">${obj.tld}</span></p>
                            <p class="fw-600 fs-small mb-2">Currencies: <span class="currencies fw-300 opacity-9">${obj.currencies}</span></p>
                            <p class="fw-600 fs-small mb-2">Languages: <span class="languages fw-300 opacity-9">${obj.languages}</span></p>
                        </div>
                    </div>
                    <div class="borders mt-4 mt-lg-5 mb-5 mb-lg-0">
                        <p class="fw-600 m-0 mt-1 mb-lg-0">Border Countries: </p>
                        <div id="bcs" class="border-countries d-flex flex-wrap ms-0 ms-lg-0">
                            ${bordersHtml}
                        </div>
                    </div>
                    
                </div>
            </div>`
    console.log("Card: ", card);
    countryWrap.innerHTML = card;
}

getCountryDetails();