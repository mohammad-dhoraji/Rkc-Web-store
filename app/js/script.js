const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});
