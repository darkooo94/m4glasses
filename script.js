// Shared Product Catalog Database
const PRODUCTS = [
  {
    id: 'm4-01',
    name: 'Cyber Blade X',
    category: 'Sunglasses',
    price: 149.99,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Polarized UV400 shield frames crafted with ultra-lightweight titanium alloy and scratch-resistant matte finish.',
    features: ['Polarized Lenses', 'Titanium Frame', '100% UV400 Protection']
  },
  {
    id: 'm4-02',
    name: 'Aero Optical Pro',
    category: 'Optical',
    price: 129.99,
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist acetate optical frames featuring ergonomic spring hinges for all-day precision comfort.',
    features: ['Premium Acetate', 'Anti-Reflective Coating', 'Spring Hinges']
  },
  {
    id: 'm4-03',
    name: 'Vortex Blue Shield',
    category: 'Blue Light',
    price: 99.99,
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for developers and gamers to block 99% of high-energy visible blue light and cut eye fatigue.',
    features: ['99% Blue Light Filter', 'Flexible Polycarbonate', 'Glare Reduction']
  },
  {
    id: 'm4-04',
    name: 'Velocity Sport RX',
    category: 'Sport',
    price: 179.99,
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
    description: 'Impact-resistant wrap-around athletic shades with rubberized slip-proof temple grips.',
    features: ['TR90 Shatterproof Frame', 'Hydrophobic Lens', 'Adjustable Nose Pads']
  },
  {
    id: 'm4-05',
    name: 'Neo Classic Horizon',
    category: 'Sunglasses',
    price: 139.99,
    rating: 4.6,
    reviews: 83,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless silhouette updated with gradient tint lenses and precision laser-etched stainless steel temples.',
    features: ['Gradient UV Lenses', 'Stainless Steel Trim', 'Includes Leather Case']
  },
  {
    id: 'm4-06',
    name: 'Luminary Focus',
    category: 'Optical',
    price: 119.99,
    rating: 4.8,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek round geometry made with bio-based eco materials for eco-conscious visual perfection.',
    features: ['Bio-Based Acetate', 'Scratch Resistant', 'Ultra Slim Profile']
  }
];

// LocalStorage State Management
let cart = JSON.parse(localStorage.getItem('m4_cart') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initPage();
  if (window.lucide) lucide.createIcons();

  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.getElementById('mobile-menu')?.classList.toggle('hidden');
    });
  }
});

function saveCart() {
  localStorage.setItem('m4_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function addToCart(productId, qty = 1) {
  const item = PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...item, quantity: qty });
  }
  saveCart();
  alert(`${item.name} added to your bag!`);
}

function updateQty(productId, newQty) {
  if (newQty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.quantity = newQty;
  }
  saveCart();
  if (document.getElementById('cart-page-container')) renderCartPage();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  if (document.getElementById('cart-page-container')) renderCartPage();
}

// Router Initializer
function initPage() {
  const path = window.location.pathname.split('/').pop();

  if (path === '' || path === 'index.html') {
    renderHomePage();
  } else if (path === 'shop.html') {
    renderShopPage();
  } else if (path === 'product.html') {
    renderProductDetailPage();
  } else if (path === 'cart.html') {
    renderCartPage();
  } else if (path === 'checkout.html') {
    renderCheckoutPage();
  }
}

function renderHomePage() {
  const container = document.getElementById('home-products');
  if (!container) return;
  container.innerHTML = PRODUCTS.slice(0, 3).map(p => `
    <div class="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col">
      <a href="product.html?id=${p.id}" class="aspect-[4/3] bg-slate-900 block overflow-hidden">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition">
      </a>
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-lg font-bold text-white mb-2"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <p class="text-xs text-slate-400 mb-4 flex-grow">${p.description}</p>
        <div class="flex items-center justify-between pt-4 border-t border-slate-800">
          <span class="text-xl font-black text-white">$${p.price.toFixed(2)}</span>
          <button onclick="addToCart('${p.id}')" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderShopPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let selectedCategory = urlParams.get('category') || 'All';
  let searchQuery = '';
  let sortBy = 'featured';

  const categories = ['All', 'Sunglasses', 'Optical', 'Blue Light', 'Sport'];
  const catContainer = document.getElementById('category-filters');
  
  const renderGrid = () => {
    let filtered = PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-low') filtered.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating') filtered.sort((a,b) => b.rating - a.rating);

    const grid = document.getElementById('shop-product-grid');
    grid.innerHTML = filtered.map(p => `
      <div class="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
        <a href="product.html?id=${p.id}" class="aspect-[4/3] bg-slate-900 block">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        </a>
        <div class="p-6 flex flex-col flex-grow">
          <span class="text-xs text-cyan-400 uppercase font-bold mb-1">${p.category}</span>
          <h3 class="text-lg font-bold text-white mb-2"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p class="text-xs text-slate-400 mb-4 flex-grow">${p.description}</p>
          <div class="flex items-center justify-between pt-4 border-t border-slate-800">
            <span class="text-xl font-black text-white">$${p.price.toFixed(2)}</span>
            <button onclick="addToCart('${p.id}')" class="bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold px-4 py-2 rounded-xl text-xs border border-slate-700 transition">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  };

  if (catContainer) {
    catContainer.innerHTML = categories.map(cat => `
      <button onclick="window.location.href='shop.html?category=${encodeURIComponent(cat)}'" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedCategory === cat ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}">
        ${cat}
      </button>
    `).join('');
  }

  document.getElementById('shop-search')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });

  document.getElementById('shop-sort')?.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderGrid();
  });

  renderGrid();
}

function renderProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 'm4-01';
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const container = document.getElementById('product-detail-container');

  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <span class="text-xs text-cyan-400 font-bold uppercase tracking-wider">${product.category}</span>
          <h1 class="text-3xl font-black text-white mt-1 mb-3">${product.name}</h1>
          <p class="text-2xl font-extrabold text-white mb-4">$${product.price.toFixed(2)}</p>
          <p class="text-slate-400 text-sm mb-6">${product.description}</p>
          <ul class="space-y-2 mb-8">
            ${product.features.map(f => `
              <li class="flex items-center text-xs text-slate-300">
                <i data-lucide="check" class="w-4 h-4 text-cyan-400 mr-2"></i> ${f}
              </li>
            `).join('')}
          </ul>
        </div>
        <button onclick="addToCart('${product.id}')" class="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition">
          Add to Shopping Bag
        </button>
      </div>
    </div>
  `;
}

function renderCartPage() {
  const container = document.getElementById('cart-page-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20">
        <i data-lucide="shopping-bag" class="w-16 h-16 text-slate-600 mx-auto mb-4"></i>
        <h2 class="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <a href="shop.html" class="inline-block mt-4 bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl">Browse Frames</a>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        ${cart.map(item => `
          <div class="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <img src="${item.image}" class="w-16 h-16 rounded-xl object-cover bg-slate-900">
              <div>
                <h3 class="font-bold text-white">${item.name}</h3>
                <p class="text-sm font-bold text-cyan-400">$${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2 bg-slate-900 px-2 py-1 rounded-lg">
                <button onclick="updateQty('${item.id}', ${item.quantity - 1})" class="text-slate-400 hover:text-white font-bold px-1">-</button>
                <span class="text-sm font-bold text-white">${item.quantity}</span>
                <button onclick="updateQty('${item.id}', ${item.quantity + 1})" class="text-slate-400 hover:text-white font-bold px-1">+</button>
              </div>
              <button onclick="removeFromCart('${item.id}')" class="text-slate-500 hover:text-rose-400">
                <i data-lucide="trash-2" class="w-5 h-5"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
        <h2 class="text-lg font-bold text-white border-b border-slate-800 pb-3">Order Summary</h2>
        <div class="flex justify-between text-slate-400 text-sm"><span>Subtotal</span><span class="text-white">$${subtotal.toFixed(2)}</span></div>
        <div class="flex justify-between text-slate-400 text-sm"><span>Tax (8%)</span><span class="text-white">$${tax.toFixed(2)}</span></div>
        <div class="flex justify-between text-slate-400 text-sm"><span>Shipping</span><span class="text-cyan-400">FREE</span></div>
        <div class="flex justify-between text-lg font-bold text-white border-t border-slate-800 pt-3"><span>Total</span><span class="text-cyan-400">$${total.toFixed(2)}</span></div>
        <a href="checkout.html" class="block text-center w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl">Proceed to Checkout</a>
      </div>
    </div>
  `;
}

function renderCheckoutPage() {
  const container = document.getElementById('checkout-container');
  if (!container) return;

  if (cart.length === 0) {
    window.location.href = 'shop.html';
    return;
  }

  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0) * 1.08;

  container.innerHTML = `
    <form onsubmit="handleCheckout(event)" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-6">
        <div class="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 class="text-lg font-bold text-white">1. Shipping Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name *" required class="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
            <input type="text" placeholder="Last Name *" required class="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
          </div>
          <input type="email" placeholder="Email Address *" required class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
          <input type="text" placeholder="Street Address *" required class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
        </div>

        <div class="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 class="text-lg font-bold text-white">2. Payment Method</h2>
          <div class="space-y-2">
            <label class="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-700 cursor-pointer">
              <input type="radio" name="pay" checked class="accent-cyan-500">
              <span class="text-sm font-semibold text-white">Credit / Debit Card</span>
            </label>
            <label class="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-700 cursor-pointer">
              <input type="radio" name="pay" class="accent-cyan-500">
              <span class="text-sm font-semibold text-white">Mobile Wallet</span>
            </label>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
        <h2 class="text-lg font-bold text-white border-b border-slate-800 pb-3">Order Total</h2>
        <div class="flex justify-between text-xl font-black text-white"><span>Grand Total</span><span class="text-cyan-400">$${total.toFixed(2)}</span></div>
        <button type="submit" class="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl">Complete Order</button>
      </div>
    </form>
  `;
}

function handleCheckout(e) {
  e.preventDefault();
  const orderId = 'M4-' + Math.floor(100000 + Math.random() * 900000);
  cart = [];
  saveCart();

  document.getElementById('checkout-container').innerHTML = `
    <div class="text-center py-16 bg-slate-800/40 border border-slate-800 rounded-3xl p-8">
      <div class="w-16 h-16 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <i data-lucide="check-circle-2" class="w-8 h-8"></i>
      </div>
      <h2 class="text-3xl font-black text-white mb-2">Thank You for Your Order!</h2>
      <p class="text-slate-400 text-sm mb-6">Your order ID is <span class="text-cyan-400 font-mono font-bold">${orderId}</span>.</p>
      <a href="index.html" class="inline-block bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl">Return to Home</a>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}