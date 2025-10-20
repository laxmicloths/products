async function loadProducts() {
  const response = await fetch('products.json');
  const products = await response.json();

  const container = document.getElementById('product-list');

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <strong>${product.price}</strong>
    `;
    container.appendChild(card);
  });
}

loadProducts();
