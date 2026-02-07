const menuBtn = document.querySelector("#menuBtn");
const closeBtn = document.querySelector("#closeMenu");
const mobileMenu = document.querySelector("#mobileMenu");
const searchInput = document.getElementById("searchInput");
const dropdown = document.getElementById("searchDropdown");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
  });
}

if (closeBtn && mobileMenu) {
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });
}

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = this.value.trim().toLowerCase();

    if (!value) {
      dropdown.classList.add("hidden");
      dropdown.innerHTML = "";
      return;
    }

    const scoredProducts = products
      .map((product) => {
        const score = getSearchScore(product, value);
        return { ...product, score };
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score);

    renderDropdown(scoredProducts.slice(0, 6));
  });
}

function getSearchScore(product, query) {
  let score = 0;

  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  const brand = product.brand.toLowerCase();

  // Exact match = strong score
  if (name === query) score += 100;

  // Starts with query
  if (name.startsWith(query)) score += 50;

  // Includes query
  if (name.includes(query)) score += 30;

  if (brand.includes(query)) score += 20;
  if (category.includes(query)) score += 15;

  // Fuzzy match (typo tolerance)
  if (query.length > 3 && levenshteinDistance(name, query) <= 2) {
    score += 25;
  }

  return score;
}

function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function renderDropdown(items) {
  const isInPagesFolder = window.location.pathname.includes("/pages/");

  if (items.length === 0) {
    dropdown.innerHTML = `
      <div class="p-4 text-sm text-gray-500">
        No products found
      </div>
    `;
    dropdown.classList.remove("hidden");
    return;
  }

  dropdown.innerHTML = items
    .map((product) => {
      const productPath = isInPagesFolder
        ? `pdp.html?slug=${product.slug}`
        : `pages/pdp.html?slug=${product.slug}`;

      return `
        <a href="${productPath}"
           class="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
           
           <img src="${isInPagesFolder ? "../" : ""}${product.image}" 
                class="w-12 h-12 object-cover rounded" />

           <div class="flex-1">
             <p class="text-sm font-semibold">${highlightMatch(product.name)}</p>
             <p class="text-xs text-gray-500">${product.brand}</p>
           </div>

           <p class="font-bold text-primary">₹${product.price}</p>
        </a>
      `;
    })
    .join("");

  dropdown.classList.remove("hidden");
}

function highlightMatch(text) {
  const query = searchInput.value.trim();
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="text-primary">$1</span>`);
}

document.addEventListener("click", function (e) {
  if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

let debounceTimer;

if (searchInput) {
searchInput.addEventListener("input", function () {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const value = searchInput.value.trim().toLowerCase();

    if (!value) {
      dropdown.classList.add("hidden");
      dropdown.innerHTML = "";
      return;
    }

    const scoredProducts = products
      .map((product) => {
        const score = getSearchScore(product, value);
        return { ...product, score };
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score);

    renderDropdown(scoredProducts.slice(0, 6));
  }, 200); // 200ms delay
});

}

// cart.js (or script.js)

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById("cart-count");

  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (totalItems > 0) {
    badge.innerText = totalItems;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
