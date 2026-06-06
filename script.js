/* ================= SMOOTH SCROLLING ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: targetPosition - navHeight,
      behavior: "smooth"
    });
  });
});


/* ================= PRODUCT CAROUSEL ================= */

const productGrid = document.querySelector(".product-grid");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

if (productGrid && prevBtn && nextBtn) {
  const scrollAmount = 280;

  nextBtn.addEventListener("click", () => {
    productGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    productGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
}


/* ================= CART MODAL + STATE ================= */

let cart = [];

const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.getElementById("cartModal");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItemsEl = document.querySelector(".cart-items");
const cartTotalEl = document.getElementById("cartTotal");
const cartCloseBtn = document.querySelector(".cart-close");

/* Open cart */
cartBtn.addEventListener("click", () => {
  cartModal.classList.add("active");
  cartOverlay.classList.add("active");
});

/* Close cart */
cartCloseBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function closeCart() {
  cartModal.classList.remove("active");
  cartOverlay.classList.remove("active");
}


/* ================= ADD TO CART ================= */

document.querySelectorAll(".product-card").forEach(card => {
  const btn = card.querySelector(".primary-btn");

  btn.addEventListener("click", () => {
    const name = card.querySelector("h3")?.innerText || "Product";
    const priceText = card.querySelector(".price")?.innerText || "$0";
    const price = parseFloat(priceText.replace("$", ""));

    cart.push({ name, price });
    updateCart();

    // Button feedback
    btn.textContent = "Added ✓";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }, 1000);
  });
});


/* ================= UPDATE CART UI ================= */

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    itemEl.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>$${item.price.toFixed(2)}</span>
      </div>
      <button class="cart-remove">Remove</button>
    `;

    itemEl.querySelector(".cart-remove").addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    cartItemsEl.appendChild(itemEl);
  });

  cartTotalEl.textContent = total.toFixed(2);
  cartBtn.textContent = `Cart (${cart.length})`;
}


/* ================= NAVBAR SHADOW ON SCROLL ================= */

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  navbar.style.boxShadow =
    window.scrollY > 20
      ? "0 8px 30px rgba(0,0,0,0.08)"
      : "none";
});
