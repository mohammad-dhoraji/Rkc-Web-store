document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.dataset.id;
    const product = products.find((p) => p.id == productId);

    if (product) {
      window.location.href = `pages/pdp.html?slug=${product.slug}`;
    }
  });
});

document.querySelectorAll(".product-card").forEach((card) => {
  
  const btn = card.querySelector(".add-to-cart-btn");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();   
    const product = {
      id: Number(card.dataset.id),
      name: card.querySelector("h3").innerText,
      price: Number(
        card.querySelector(".text-primary").innerText.replace("₹", ""),
      ),
      image: card.querySelector("img").src,
    };

    addToCart(product);
    btn.innerText = "Added ✓";
    setTimeout(() => (btn.innerText = "Add to Cart"), 1200);
  });
});
