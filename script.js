<script>
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('ogCart') || '[]');
        document.getElementById('cartCount').textContent = cart.reduce((a,i)=>a+i.qty,0);
    }
    function addToCart(name, price) {
        let cart = JSON.parse(localStorage.getItem('ogCart') || '[]');
        const ex = cart.find(i=>i.name===name);
        if(ex) ex.qty++; else cart.push({name,price,qty:1});
        localStorage.setItem('ogCart', JSON.stringify(cart));
        updateCartCount();
        const btn = event.target;
        btn.textContent='Added ✓'; btn.style.background='#2a7a2a';
        setTimeout(()=>{btn.textContent='Add to Cart';btn.style.background='';},1500);
    }
    updateCartCount();
</script>


<script>
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('ogCart') || '[]');
        document.getElementById('cartCount').textContent = cart.reduce((a, i) => a + i.qty, 0);
    }

    function handleSubmit(btn) {
        document.querySelector('.contact-form').style.display = 'none';
        document.getElementById('successMsg').style.display = 'block';
    }

    updateCartCount();
</script>


<script>
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('ogCart') || '[]');
        document.getElementById('cartCount').textContent = cart.reduce((a, i) => a + i.qty, 0);
    }
    updateCartCount();
</script>

<script>
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('ogCart')||'[]');
        document.getElementById('cartCount').textContent = cart.reduce((a,i)=>a+i.qty,0);
    }
    function addToCart(name,price) {
        let cart = JSON.parse(localStorage.getItem('ogCart')||'[]');
        const ex = cart.find(i=>i.name===name);
        if(ex) ex.qty++; else cart.push({name,price,qty:1});
        localStorage.setItem('ogCart',JSON.stringify(cart));
        updateCartCount();
        const btn=event.target;
        btn.textContent='Added ✓';btn.style.background='#2a7a2a';
        setTimeout(()=>{btn.textContent='Add to Cart';btn.style.background='';},1500);
    }
    function filterProducts(cat,btn) {
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.category-group').forEach(g=>{
            g.style.display=(cat==='all'||g.id===cat)?'block':'none';
        });
    }
    updateCartCount();
</script>


<script>
    const SHIPPING = 80;
    const VAT_RATE = 0.14;
    let promoApplied = false;

    function getCart() {
        return JSON.parse(localStorage.getItem('ogCart') || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem('ogCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((a, i) => a + i.qty, 0);
        document.getElementById('cartCount').textContent = count;
    }

    function renderCart() {
        const cart = getCart();
        const cartList = document.getElementById('cartList');
        const emptyCart = document.getElementById('emptyCart');
        const cartContent = document.getElementById('cartContent');

        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartContent.style.display = 'grid';

        document.getElementById('itemCount').textContent = `(${cart.reduce((a, i) => a + i.qty, 0)})`;

        cartList.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <img src="images/Shirt2.jpg" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="item-meta">Size: M &nbsp;·&nbsp; Colour: Black</p>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
                        <span class="qty-num">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${idx})">Remove</button>
                </div>
                <div class="cart-item-price">P ${(item.price * item.qty).toLocaleString()}</div>
            </div>
        `).join('');

        updateTotals();
        updateCartCount();
    }

    function updateTotals() {
        const cart = getCart();
        const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
        const shipping = subtotal > 0 ? SHIPPING : 0;
        const discount = promoApplied ? subtotal * 0.1 : 0;
        const vat = (subtotal - discount) * VAT_RATE;
        const total = subtotal - discount + shipping + vat;

        document.getElementById('subtotal').textContent = `P ${subtotal.toLocaleString()}`;
        document.getElementById('shipping').textContent = `P ${shipping}`;
        document.getElementById('vat').textContent = `P ${Math.round(vat).toLocaleString()}`;
        document.getElementById('total').textContent = `P ${Math.round(total).toLocaleString()}`;
    }

    function changeQty(idx, delta) {
        let cart = getCart();
        cart[idx].qty += delta;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        saveCart(cart);
        renderCart();
    }

    function removeItem(idx) {
        let cart = getCart();
        cart.splice(idx, 1);
        saveCart(cart);
        renderCart();
    }

    function addToCart(name, price) {
        let cart = getCart();
        const existing = cart.find(i => i.name === name);
        if (existing) existing.qty++;
        else cart.push({ name, price, qty: 1 });
        saveCart(cart);
        renderCart();

        const btn = event.target;
        btn.textContent = 'Added ✓';
        btn.style.background = '#2a7a2a';
        setTimeout(() => { btn.textContent = 'Add to Cart'; btn.style.background = ''; }, 1500);
    }

    function applyPromo() {
        const code = document.getElementById('promoInput').value.trim().toUpperCase();
        if (code === 'OG10' && !promoApplied) {
            promoApplied = true;
            document.getElementById('promoInput').value = 'OG10 — 10% off applied ✓';
            document.getElementById('promoInput').disabled = true;
            updateTotals();
        } else if (promoApplied) {
            alert('Promo already applied.');
        } else {
            alert('Invalid promo code. Try OG10 for 10% off.');
        }
    }

    renderCart();
</script>

<script>
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('ogCart') || '[]');
        document.getElementById('cartCount').textContent = cart.reduce((a, i) => a + i.qty, 0);
    }
    updateCartCount();
</script>
