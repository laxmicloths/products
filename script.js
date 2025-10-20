const PRODUCTS_PER_PAGE = 10;
let currentPage = 1;
let products = [];

async function loadProducts() {
  const response = await fetch('products.json'); // or Firebase URL
  products = await response.json();
  renderPage(currentPage);
}

function renderPage(page) {
  const container = document.getElementById('product-list');
  container.innerHTML = "";

  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach(product => {
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

  setupModal();
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = "";

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.className = i === currentPage ? "active-page" : "";
    btn.onclick = () => {
      currentPage = i;
      renderPage(currentPage);
    };
    pagination.appendChild(btn);
  }
}

// Modal logic
function setupModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".product-img").forEach(img => {
    img.onclick = () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    };
  });

  closeBtn.onclick = () => { modal.style.display = "none"; };
  modal.onclick = e => { if(e.target === modal) modal.style.display = "none"; };
}

loadProducts();
