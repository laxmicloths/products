async function loadProducts() {
  const response = await fetch('products.json');
  const products = await response.json();

  const container = document.getElementById('product-list');

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <strong>${product.price}</strong>
    `;
    container.appendChild(card);
  });

  // Modal logic
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".product-img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}

loadProducts();
