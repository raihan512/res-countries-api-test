const filterArea = document.getElementById("filter-area");
const selectedRegion = document.getElementById("selected-region");
const selectedCapital = document.getElementById("selected-capital");
const selectedLanguage = document.getElementById("selected-language");

const countriesContainer = document.getElementById("country-container");
const total = document.getElementById("total");

const searchCountry = document.getElementById("search-country");
const searchCountryBtn = document.getElementById("search-country-btn");

// Fetching data
const loadAllCountries = async (url) => {
  const dataFetch = await fetch(url);
  const data = await dataFetch.json();
  return data;
};

const filteredCountries = async (url, value, showingBased) => {
  let countries = await loadAllCountries(`${url}`);
  showCountries(countries, value, showingBased);
};

// Default load all country
let loadAll = filteredCountries("https://restcountries.com/v3.1/all");

// Show country on click search btn
searchCountryBtn.onclick = async function () {
  let countries = await loadAllCountries("https://restcountries.com/v3.1/all");
  let newCountries = [];
  let searchCountryValue = searchCountry.value.toLowerCase();
  if (searchCountryValue != "") {
    for (country of countries) {
      let countryString = JSON.stringify(country).toLowerCase();
      if (countryString.includes(searchCountryValue)) {
        newCountries.push(country);
      }
    }
  }
  showCountries(newCountries, searchCountryValue, "by search");
};

// show country on enter search
searchCountry.onkeyup = async function (e) {
  if (e.key === "Enter") {
    let countries = await loadAllCountries(
      "https://restcountries.com/v3.1/all"
    );
    let newCountries = [];
    let searchCountryValue = searchCountry.value.toLowerCase();
    if (searchCountryValue != "") {
      for (country of countries) {
        let countryString = JSON.stringify(country).toLowerCase();
        if (countryString.includes(searchCountryValue)) {
          newCountries.push(country);
        }
      }
    }
    showCountries(newCountries, searchCountryValue, "by search");
  }
};

const showCountries = (countries, value, showingBased) => {
  countriesContainer.innerHTML = "";
  let countryLength = countries.length > 1 ? "Countries" : "Country";
  if (showingBased) {
    total.innerText = `
      Total ${countries.length} ${countryLength} found based on ${value} ${showingBased}
    `;
  } else {
    total.innerText = `Total ${countries.length} ${countryLength} found`;
  }
  countries.forEach((country) => {
    const { flags, name } = country;
    let newCountry = document.createElement("div");
    newCountry.classList.add("class", "mb-5");

    newCountry.innerHTML = `
                    <div class="border rounded-md oveflow-hidden p-2 ">
                    <img src="${flags.png}"
                    class="rounded-md mb-3" alt="">
                    </div>
                    <p class="mt-2 text-xl font-bold text-center uppercase">${name.common}</p>
                    `;
    countriesContainer.appendChild(newCountry);
  });
};

// Region Dropdown
(async function regionDropdown() {
  let countries = await loadAllCountries("https://restcountries.com/v3.1/all");
  let regions = selectionArray(countries, "region").sort();
  adSelectOption(regions, selectedRegion);
})();
// Capital Dropdown
(async function capitalDropdown() {
  let countries = await loadAllCountries("https://restcountries.com/v3.1/all");
  let capitals = selectionArray(countries, "capital").sort();
  adSelectOption(capitals, selectedCapital);
})();
// Language Dropdown
(async function languageDropdown() {
  let countries = await loadAllCountries("https://restcountries.com/v3.1/all");
  let languages = selectionArray(countries, "languages").sort();
  adSelectOption(languages, selectedLanguage);
})();
