const products = [
  {
    id: 1,
    name: "Classic Copper Stockpot",
    category: "cookware",
    price: 189,
    brand: "Prestige",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAarbCZbXYTUExM4Y0A-VrhOM2_coSln4XZcKWPIjVJ_JZ5hEinJlVciJxOBhPKIBF9Q6n0XeauWPtSvV3_5_1yL86UIsLzV78JfmVZ37GQ6rpm6a8KP_jtQCtHBn2sfYUBX2eFrnO7qDG5B0j6Ykis5xnxXXO7QjjbAxq72wfu9Z8HRyH0VcAtz3iws72uOhlYKDy2rbEzFQeQGvmCx6AlojACANXuGsXIJ97BcT3RWOf0IS_lZ3zBqHs_n0ps9Di0rthd5jg8UB",
  
  },
  {
    id: 2,
    name: "Non-Stick Fry Pan",
    category: "cookware",
    price: 89,
    brand: "Pigeon",
    image: "assets/images/products/frypan.jpg",
    description: "Durable non-stick fry pan for everyday cooking",
   
  },
  {
    id: 3,
    name: "Air Fryer Pro",
    category: "appliances",
    price: 499,
    brand: "Bajaj",
    image: "assets/images/products/airfryer.jpg",
   
  },
  {
    id: 4,
    name: "Ceramic Dinner Set",
    category: "tableware",
    price: 299,
    brand: "Milton",
    image: "assets/images/products/dinnerset.jpg",
   
  },
  {
    id: 5,
    name: "Ceramic Storage Set",
    category: "storage",
    price: 299,
    brand: "Milton",
    image: "assets/images/products/dinnerset.jpg",
   
  },
];

products.forEach((product) => {
  if (!product.slug) {
    product.slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});
