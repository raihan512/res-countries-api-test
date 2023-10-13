const adSelectOption = (arr, selectId) => {
  arr.forEach((arrItem) => {
    let newOption = document.createElement("option");
    newOption.setAttribute("value", `${arrItem}`);
    newOption.innerText = `${arrItem}`;
    selectId.appendChild(newOption);
  });
};

// fName --- filter name & fnames --- filter Names
const selectionArray = (countries, fName) => {
  let filters = [];
  for (let country of countries) {
    let fNames = country[fName];
    if (fNames) {
      // If array || capital
      if (Array.isArray(fNames)) {
        //         for (let fName = 0; fName < fNames.length; fName++) {
        for (let fName of fNames) {
          if (filters.includes(fName)) continue;
          else filters.push(fName);
        }
      }
      //       If Object || Language
      else if (typeof fNames === "object") {
        for (let fName in fNames) {
          if (filters.includes(fNames[fName])) continue;
          else filters.push(fNames[fName]);
        }
      }
      //       If string || Regions
      else if (typeof fNames === "string") {
        if (filters.includes(fNames)) continue;
        else filters.push(fNames);
      }
    }
  }
  return filters;
};

// // Select option from select element
filterArea.onchange = async function (e) {
  let changedField = e.target.getAttribute("id");
  let targetedF = e.target.value;
  switch (changedField) {
    case "selected-region":
      filteredCountries(
        `https://restcountries.com/v3.1/region/${targetedF}`,
        targetedF,
        "Region"
      );
      break;
    case "selected-capital":
      filteredCountries(
        `https://restcountries.com/v3.1/capital/${targetedF}`,
        targetedF,
        "Capital"
      );
      break;
    case "selected-language":
      filteredCountries(
        `https://restcountries.com/v3.1/lang/${targetedF}`,
        targetedF,
        "Language"
      );
      break;
  }
};
