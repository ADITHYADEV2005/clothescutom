var sidenav = document.querySelector(".side-navbar")


function showNavbar()
{
    sidenav.style.left= "0%"  
}

function closeNavbar()
{
    sidenav.style.left= "-60%"    
}
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buy-now");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            // Redirect to product page with query string
            window.location.href = `product.html?id=${productId}`;
        });
    });
});
function toggleCurrencyList() {
    const currencyList = document.getElementById('currency-list');
    currencyList.style.display = currencyList.style.display === 'block' ? 'none' : 'block';
}

// JavaScript function to select the currency and update the text
function selectCurrency(currency) {
    document.getElementById('currency-text').innerText = currency;
    document.getElementById('currency-list').style.display = 'none';
}

// Close the currency list if clicked outside
document.addEventListener('click', function (event) {
    const currencyDropdown = document.querySelector('.currency-dropdown');
    if (!currencyDropdown.contains(event.target)) {
        document.getElementById('currency-list').style.display = 'none';
    }
});
function toggleCountryList() {
    const countryList = document.getElementById('country-list');
    countryList.style.display = countryList.style.display === 'block' ? 'none' : 'block';
}

// JavaScript function to select the country and update the world icon
function selectCountry(country) {
    // Update the world icon text with the selected country
    document.querySelector('.world-icon i').textContent = country;
    document.getElementById('country-list').style.display = 'none'; // Hide the country list after selection
}

// Close the country list if clicked outside
document.addEventListener('click', function (event) {
    const worldIcon = document.querySelector('.world-icon');
    if (!worldIcon.contains(event.target)) {
        document.getElementById('country-list').style.display = 'none';
    }
});
window.onload = function() {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      updatePageForCountry(savedCountry);
    } else {
      updatePageForCountry("World"); // Default content if none selected
    }
  };
  function updatePageForCountry(countryName) {
    // Example: show/hide or load specific country content
    document.querySelectorAll(".country-content").forEach(el => {
      el.style.display = "none";
    });
  
    const countrySection = document.getElementById(countryName.toLowerCase());
    if (countrySection) {
      countrySection.style.display = "block";
    }
  }
    