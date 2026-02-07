function renderCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-items");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="text-sm text-gray-400">Your cart is empty.</p>
    `;
    updateCheckoutSummary();
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex gap-4";

    div.innerHTML = `
      <div class="h-20 w-20 rounded-lg bg-cover bg-center shrink-0"
           style="background-image:url('${item.image}')">
      </div>

      <div class="flex flex-col justify-between py-1">
        <div>
          <p class="text-sm font-bold leading-tight">
            ${item.name}
          </p>
        </div>
        <p class="text-sm font-medium">
          Qty: ${item.qty} · ₹${item.price * item.qty}
        </p>
      </div>
    `;

    container.appendChild(div);
  });

  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const tax = +(subtotal * 0.08).toFixed(2); // 8% tax
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + tax + shipping;

  const subtotalEl = document.querySelector(".subtotal");
  const taxEl = document.querySelector(".tax");
  const shippingEl = document.querySelector(".shipping");
  const totalEl = document.querySelector(".total");

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.innerText = `₹${tax.toFixed(2)}`;
  if (shippingEl)
    shippingEl.innerText = shipping === 0 ? "FREE" : `₹${shipping}`;
  if (totalEl) totalEl.innerText = `₹${total.toFixed(2)}`;
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCheckout();
});
