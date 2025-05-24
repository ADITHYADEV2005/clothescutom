// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Dummy products data

const product = products.find(p => p.id === productId);
const container = document.getElementById("product-detail");

if (product) {
  document.title = product.name;

  container.innerHTML = `
    <div style="max-width: 1500px;text-align: center; margin: auto; background: #fff; padding-bottom: 20px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1);">
      <img src="${product.image}" alt="${product.name}" style="width: 400px; height: 400px; object-fit: cover; border-radius: 10px; display: block; margin: 0 auto 20px;">
      <h2 style="margin-bottom: 10px; font-size: 24px;">${product.name}</h2>
      <h3 style="color: green; margin-bottom: 15px;">${product.price}</h3>
      <p style="font-size: 16px; color: #333;">${product.description}</p>
      <a href="design.html"><button class="buy-now">Buy Now</button></a>
     

    </div>
  `;
} else {
  container.innerHTML = `<p style="text-align: center; padding: 20px;">Product not found!</p>`;
}
// Example snippet when submitting measurements
function submitMeasurements() {
  const chest = document.getElementById("chest").value;
  const waist = document.getElementById("waist").value;
  const unit = document.getElementById("unitSelect").value;

  // Store in localStorage
  localStorage.setItem("chest", chest);
  localStorage.setItem("waist", waist);
  localStorage.setItem("unit", unit);

  // Redirect to next page
  window.location.href = "cloth.html";
}

