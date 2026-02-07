const cartItemsEl = document.getElementById("cartItems");
function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-10 text-gray-400">
          Your cart is empty 🛒
        </td>
      </tr>
    `;
    updateSummary();
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.className =
      "group hover:bg-[#f8fcf9] dark:hover:bg-[#13281a] transition-colors";

    row.innerHTML = `
      <td class="px-6 py-6">
        <div class="flex items-center gap-4">
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-24 h-24 shadow-sm border border-[#cfe7d7] dark:border-[#1e3a28]"
               style="background-image:url('${item.image}')">
          </div>

          <div class="flex flex-col">
            <span class="text-[#0d1b12] dark:text-white font-bold text-lg">
              ${item.name}
            </span>

            <div class="flex gap-4 mt-2">
              <button
                onclick="removeItem(${item.id})"
                class="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">
                <span class="material-symbols-outlined text-sm">delete</span>
                Remove
              </button>
            </div>
          </div>
        </div>
      </td>

      <td class="px-6 py-6">
        <div class="flex items-center justify-center">
          <div
            class="flex items-center bg-[#e7f3eb] dark:bg-[#1a3321] rounded-lg overflow-hidden border border-[#cfe7d7] dark:border-[#1e3a28]">
            <button
              onclick="changeQty(${item.id}, -1)"
              class="p-2 hover:bg-primary/20 transition-colors flex items-center justify-center">
              <span class="material-symbols-outlined text-base">remove</span>
            </button>

            <span class="px-4 font-bold text-[#0d1b12] dark:text-white">
              ${item.qty}
            </span>

            <button
              onclick="changeQty(${item.id}, 1)"
              class="p-2 hover:bg-primary/20 transition-colors flex items-center justify-center">
              <span class="material-symbols-outlined text-base">add</span>
            </button>
          </div>
        </div>
      </td>

      <td class="px-6 py-6 text-right">
        <span class="text-[#0d1b12] dark:text-white font-medium">
          ₹${item.price}
        </span>
      </td>

      <td class="px-6 py-6 text-right">
        <span class="text-[#0d1b12] dark:text-white font-bold text-lg">
          ₹${item.price * item.qty}
        </span>
      </td>
    `;

    cartItemsEl.appendChild(row);
  });

  updateSummary();
}

function updateSummary() {
  const cart = getCart();

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const totalItems = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  const tax = Math.round(subtotal * 0.09); // 9% GST
  const shipping = 0; // Free shipping
  const grandTotal = subtotal + tax + shipping;

  // Update UI
  const subtotalEl = document.querySelector(".subtotal");
  const taxEl = document.querySelector(".tax");
  const grandTotalEl = document.querySelector(".grand-total");
  const itemsEl = document.querySelector(".subtotal-items");

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (taxEl) taxEl.innerText = `₹${tax}`;
  if (grandTotalEl) grandTotalEl.innerText = `₹${grandTotal}`;
  if (itemsEl) itemsEl.innerText = `Subtotal (${totalItems} items)`;
}


renderCart();

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(id);
    return;
  }

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter((i) => i.id !== id);
  saveCart(cart);
  renderCart();
}




