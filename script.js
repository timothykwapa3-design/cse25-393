
  // ====== CART STATE ======
let cart = [];

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  el.textContent = total;
  el.classList.toggle('visible', total > 0);
}

// ====== PAGES ======
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'cart') renderCart();
  if (id === 'home') renderCollection('All');
}

// ====== COLLECTION ======
let activeFilter = 'All';

function filterCat(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCollection(cat);
}

function renderCollection(cat) {
  const filtered = cat === 'All' ? products : products.filter(p => p.type === cat);
  document.getElementById('collection-count').textContent = filtered.length + ' PIECE' + (filtered.length !== 1 ? 'S' : '');
  const grid = document.getElementById('collection-grid');
  grid.innerHTML = filtered.map(p => {
    const inCart = cart.find(c => c.id === p.id);
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-img-wrap">
          <img class="product-img" src="${imgMap[p.key]}" alt="${p.name}">
        </div>
        <div class="product-badge">Limited</div>
        <div class="product-info">
          <div class="product-type">${p.type}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          ${p.gsm ? `
          <div class="quality-row">
            <div class="quality-gsm">${p.gsm}</div>
            <div class="quality-text">Heavyweight fabric — premium feel, long-lasting robustness. As used by Olympus on select pieces.</div>
          </div>` : ''}
          <div class="product-footer">
            <div class="product-price">P${p.price.toLocaleString()} <span>BWP</span></div>
            <button class="add-btn ${inCart ? 'added' : ''}" onclick="addToCart(${p.id}, event)">
              ${inCart ? '✓ Added' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addToCart(id, e) {
  e.stopPropagation();
  const prod = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...prod, qty: 1 });
  }
  updateCartCount();
  renderCollection(activeFilter);
  showToast(prod.name + ' added to cart');
}

// ====== CART RENDER ======
function renderCart() {
  const list = document.getElementById('cart-items-list');
  if (cart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-title">Your cart is empty</div>
        <div class="empty-cart-sub">Explore the collection and add pieces you love.</div>
        <button class="btn-gold" onclick="showPage('home')">Shop Collection</button>
      </div>`;
    updateSummary();
    return;
  }
  list.innerHTML = cart.map(item => `
    <div class="cart-item" id="ci-${item.id}">
      <img class="cart-item-img" src="${imgMap[item.key]}" alt="${item.name}">
      <div>
        <div class="cart-item-type">${item.type}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Size: M &nbsp;|&nbsp; Colour: As shown</div>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <div class="qty-num">${item.qty}</div>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price-col">
        <div class="cart-item-price">P${(item.price * item.qty).toLocaleString()}</div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');
  updateSummary();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartCount();
  renderCollection(activeFilter);
  renderCart();
}

function updateSummary() {
  const sub = getCartTotal();
  const vat = Math.round(sub * 0.14);
  const total = sub + vat;
  document.getElementById('s-subtotal').textContent = 'P' + sub.toLocaleString();
  document.getElementById('s-vat').textContent = 'P' + vat.toLocaleString();
  document.getElementById('s-total').textContent = 'P' + total.toLocaleString();
  if (sub > 0) document.getElementById('s-shipping').textContent = 'P80';
  else document.getElementById('s-shipping').textContent = 'Calculated at checkout';
}



 <script>
    /* ── Cart stored in localStorage ── */
    function getCart() { return JSON.parse(localStorage.getItem('olympus-cart') || '[]'); }
    function saveCart(c) { localStorage.setItem('olympus-cart', JSON.stringify(c)); }

    function addToCart(btn, name, price) {
      const cart = getCart();
      const existing = cart.find(i => i.name === name);
      if (existing) { existing.qty++; }
      else { cart.push({ name, price, qty: 1 }); }
      saveCart(cart);
      btn.textContent = '✓ Added';
      btn.classList.add('in-cart');
      showToast(name + ' added to cart');
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2600);
    }

    /* ── Category filter ── */
    function filter(type, btn) {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cards = document.querySelectorAll('.card');
      let count = 0;
      cards.forEach(c => {
        const show = type === 'All' || c.dataset.type === type;
        c.style.display = show ? '' : 'none';
        if (show) count++;
      });
      document.getElementById('col-count').textContent = count + ' PIECE' + (count !== 1 ? 'S' : '');
    }
  </script>
