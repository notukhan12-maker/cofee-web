//   Application Logic Script
    
        // Menu Items Data Store
        const menuItems = [
            {
                id: 1,
                name: "Imperial Geisha Pour-Over",
                category: "pour-over",
                price: 18.00,
                rating: 4.9,
                description: "Panama Hacienda La Esmeralda Geisha. Fragrant notes of jasmine, white peach, and bergamot with an impossibly delicate tea-like body.",
                image: "https://placehold.co/600x400/2c1e19/f7f4f0?text=Geisha+Pour+Over",
                details: "Brewed precisely at 92°C using V60 artisan dripper with mineral-balanced mountain spring water."
            },
            {
                id: 2,
                name: "Velvet Signature Cortado",
                category: "espresso",
                price: 7.50,
                rating: 4.8,
                description: "Double ristretto shot of our proprietary dark roast paired with textured organic whole milk in a custom ceramic tumbler.",
                image: "https://placehold.co/600x400/2c1e19/f7f4f0?text=Signature+Cortado",
                details: "Served in our handmade artisanal stoneware cup with a complimentary dark chocolate cacao nib."
            },
            {
                id: 3,
                name: "Kyoto 24-Hour Cold Drip",
                category: "cold",
                price: 12.00,
                rating: 4.9,
                description: "Slow-dripped single-origin Ethiopian Yirgacheffe extracted over 24 hours. Exceptionally smooth with zero bitterness and deep fruit tones.",
                image: "https://placehold.co/600x400/2c1e19/f7f4f0?text=Kyoto+Cold+Drip",
                details: "Served over a hand-carved crystal clear ice sphere with a twist of organic orange peel."
            },
            {
                id: 4,
                name: "Madagascar Vanilla Latte",
                category: "espresso",
                price: 9.00,
                rating: 4.7,
                description: "Infused with house-made syrup crafted from organic Madagascar vanilla bean pods and steamed oat milk.",
                image: "https://placehold.co/600x400/2c1e19/f7f4f0?text=Vanilla+Latte",
                details: "Topped with micro-foam latte art and a dusting of golden cane sugar."
            },
            {
                id: 5,
                name: "Almond Frangipane Croissant",
                category: "bakery",
                price: 8.50,
                rating: 5.0,
                description: "Flaky all-butter French pastry filled with rich almond cream, toasted sliced almonds, and a hint of dark rum.",
                image: "https://placehold.co/600x400/2c1e19/f7f4f0?text=Almond+Croissant",
                details: "Baked fresh every morning at 6:00 AM by our resident Parisian pastry chef."
            },
            {
                id: 6,
                name: "Nitro Cold Brew & Truffle",
                category: "cold",
                price: 14.00,
                rating: 4.9,
                description: "Infused with micro-nitrogen gas for a cascading velvety head, paired with a handmade artisanal dark chocolate truffle.",
                image: "https://placehold.co/600x400/2c1e19/f7f4f0?text=Nitro+Cold+Brew",
                details: "Nitrogen-pressured on tap at precisely 2°C for ultimate creaminess."
            }
        ];

        // Locations Data Store
        const locationsData = {
            nyc: {
                name: "Velvet Brew Soho Flagship",
                address: "482 Broome Street, New York, NY 10013",
                hours: "Monday – Sunday: 7:00 AM – 7:00 PM",
                phone: "+1 (212) 555-0198",
                image: "https://placehold.co/800x600/1e1411/d4af37?text=Soho+New+York",
                badge: "Soho Flagship Sanctuary"
            },
            paris: {
                name: "Velvet Brew Le Marais",
                address: "14 Rue de Turenne, 75004 Paris, France",
                hours: "Monday – Sunday: 8:00 AM – 8:00 PM",
                phone: "+33 1 42 72 00 90",
                image: "https://placehold.co/800x600/1e1411/d4af37?text=Le+Marais+Paris",
                badge: "Parisian Salon"
            },
            tokyo: {
                name: "Velvet Brew Ginza",
                address: "6-10-1 Ginza, Chuo City, Tokyo 104-0061",
                hours: "Monday – Sunday: 8:00 AM – 9:00 PM",
                phone: "+81 3 5550 1234",
                image: "https://placehold.co/800x600/1e1411/d4af37?text=Ginza+Tokyo",
                badge: "Ginza Siphon Bar"
            }
        };

        // Shopping Cart State
        let cart = [];

        // DOM Loaded Initialization
        document.addEventListener('DOMContentLoaded', () => {
            renderMenu('all');
            switchLocation('nyc');
            setupEventListeners();
        });

        // Setup Event Listeners
        function setupEventListeners() {
            // Mobile Menu
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const closeMobileMenu = document.getElementById('closeMobileMenu');
            const mobileMenu = document.getElementById('mobileMenu');
            
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            });
            closeMobileMenu.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            });
            document.querySelectorAll('.mobile-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                });
            });

            // Cart Drawer Toggle
            const cartBtn = document.getElementById('cartBtn');
            const closeCart = document.getElementById('closeCart');
            const cartDrawer = document.getElementById('cartDrawer');
            const cartOverlay = document.getElementById('cartOverlay');
            const cartPanel = document.getElementById('cartPanel');

            cartBtn.addEventListener('click', () => openCart());
            closeCart.addEventListener('click', () => closeCartDrawer());
            cartOverlay.addEventListener('click', () => closeCartDrawer());

            // Menu Filter Buttons
            document.querySelectorAll('.menu-filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.menu-filter-btn').forEach(b => {
                        b.classList.remove('bg-gold', 'text-espresso', 'shadow-lg');
                        b.classList.add('bg-espressoLight', 'border', 'border-gold/30', 'text-champagne');
                    });
                    e.target.classList.remove('bg-espressoLight', 'border', 'border-gold/30', 'text-champagne');
                    e.target.classList.add('bg-gold', 'text-espresso', 'shadow-lg');
                    renderMenu(e.target.getAttribute('data-category'));
                });
            });

            // Modal Close
            document.getElementById('closeModal').addEventListener('click', closeModal);
            document.getElementById('itemModal').addEventListener('click', (e) => {
                if (e.target.id === 'itemModal') closeModal();
            });
        }

        // Render Menu Items
        function renderMenu(category) {
            const grid = document.getElementById('menuGrid');
            grid.innerHTML = '';
            
            const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
            
            filtered.forEach(item => {
                const card = document.createElement('div');
                card.className = "bg-espressoLight rounded-2xl overflow-hidden border border-gold/20 flex flex-col justify-between group hover:border-gold/60 transition-all duration-300 shadow-xl";
                card.innerHTML = `
                    <div class="relative overflow-hidden aspect-[16/10] cursor-pointer" onclick="openItemModal(${item.id})">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-4 right-4 bg-espresso/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gold border border-gold/30">
                            $${item.price.toFixed(2)}
                        </div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-serif font-bold text-xl text-champagne cursor-pointer hover:text-gold transition-colors" onclick="openItemModal(${item.id})">${item.name}</h3>
                                <span class="text-xs text-gold flex items-center gap-1"><i class="fa-solid fa-star"></i> ${item.rating}</span>
                            </div>
                            <p class="text-champagne/70 text-xs sm:text-sm font-light leading-relaxed mb-6">${item.description}</p>
                        </div>
                        <div class="flex items-center justify-between pt-4 border-t border-gold/10">
                            <button onclick="openItemModal(${item.id})" class="text-xs font-semibold text-gold hover:underline uppercase tracking-wider">View Details</button>
                            <button onclick="addToCart(${item.id})" class="px-4 py-2 rounded-full bg-gold text-espresso font-semibold text-xs hover:bg-goldHover transition-all shadow-md flex items-center gap-2">
                                <i class="fa-solid fa-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Modal Details Logic
        function openItemModal(id) {
            const item = menuItems.find(i => i.id === id);
            if (!item) return;

            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
                <div class="aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-md border border-gold/20">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex justify-between items-start mb-3">
                    <h3 class="font-serif text-2xl font-bold text-espresso">${item.name}</h3>
                    <span class="font-serif text-2xl font-bold text-gold">$${item.price.toFixed(2)}</span>
                </div>
                <p class="text-charcoal/80 text-sm font-light mb-4">${item.description}</p>
                <div class="p-4 rounded-xl bg-champagneMuted/60 border border-gold/20 mb-6">
                    <h4 class="font-serif font-bold text-espresso text-xs uppercase tracking-wider text-gold mb-1"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Preparation Secret</h4>
                    <p class="text-xs text-charcoal/70">${item.details}</p>
                </div>
                <button onclick="addToCart(${item.id}); closeModal();" class="w-full py-3.5 rounded-full bg-espresso text-champagne font-semibold text-sm hover:bg-espressoLight transition-all shadow-lg text-center">
                    Add to Cart ($${item.price.toFixed(2)})
                </button>
            `;

            const modal = document.getElementById('itemModal');
            modal.classList.remove('opacity-0', 'pointer-events-none');
            document.getElementById('modalContent').classList.remove('scale-95');
            document.getElementById('modalContent').classList.add('scale-100');
        }

        function closeModal() {
            const modal = document.getElementById('itemModal');
            modal.classList.add('opacity-0', 'pointer-events-none');
            document.getElementById('modalContent').classList.remove('scale-100');
            document.getElementById('modalContent').classList.add('scale-95');
        }

        // Coffee Quiz Logic
        let quizState = {};
        function selectQuizOption(step, value) {
            quizState[`step${step}`] = value;
            
            if (step < 3) {
                document.querySelector(`.quiz-step[data-step="${step}"]`).classList.add('hidden');
                document.querySelector(`.quiz-step[data-step="${step + 1}"]`).classList.remove('hidden');
            } else {
                // Show result
                document.querySelector('.quiz-step[data-step="3"]').classList.add('hidden');
                const resultBox = document.getElementById('quizResult');
                resultBox.classList.remove('hidden');

                const titleElem = document.getElementById('resultTitle');
                const descElem = document.getElementById('resultDesc');
                
                if (quizState.step1 === 'light') {
                    titleElem.innerText = "Ethiopian Yirgacheffe Reserve";
                    descElem.innerText = "High-altitude washed beans featuring delicate jasmine notes, bergamot, and white tea finish.";
                } else if (quizState.step1 === 'medium') {
                    titleElem.innerText = "Colombian El Paraiso Estate";
                    descElem.innerText = "Balanced caramel sweetness with juicy stone fruit acidity and creamy body.";
                } else {
                    titleElem.innerText = "Sumatra Mandheling Dark Roast";
                    descElem.innerText = "Deep earthy complexity, dark chocolate fudge, and low acidity.";
                }
            }
        }

        function resetQuiz() {
            quizState = {};
            document.getElementById('quizResult').classList.add('hidden');
            document.querySelector('.quiz-step[data-step="1"]').classList.remove('hidden');
        }

        // Location Switcher Logic
        function switchLocation(key) {
            const loc = locationsData[key];
            if (!loc) return;

            document.querySelectorAll('.loc-tab-btn').forEach(btn => {
                btn.classList.remove('bg-espresso', 'text-champagne', 'shadow-md');
                btn.classList.add('bg-white', 'text-charcoal', 'border', 'border-gold/30');
            });
            const activeBtn = document.getElementById(`locBtn-${key}`);
            activeBtn.classList.remove('bg-white', 'text-charcoal', 'border', 'border-gold/30');
            activeBtn.classList.add('bg-espresso', 'text-champagne', 'shadow-md');

            document.getElementById('locationInfo').innerHTML = `
                <span class="text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-2 block">${loc.badge}</span>
                <h3 class="font-serif text-3xl font-bold text-espresso mb-4">${loc.name}</h3>
                <p class="text-charcoal/80 text-sm font-light mb-4 flex items-center gap-3"><i class="fa-solid fa-location-dot text-gold"></i> ${loc.address}</p>
                <p class="text-charcoal/80 text-sm font-light mb-4 flex items-center gap-3"><i class="fa-solid fa-clock text-gold"></i> ${loc.hours}</p>
                <p class="text-charcoal/80 text-sm font-light mb-6 flex items-center gap-3"><i class="fa-solid fa-phone text-gold"></i> ${loc.phone}</p>
                <a href="#reservation" class="inline-block px-6 py-3 rounded-full bg-espresso text-champagne text-xs font-semibold uppercase tracking-wider hover:bg-espressoLight transition-all">Book at this House</a>
            `;

            document.getElementById('locImage').src = loc.image;
            document.getElementById('locBadge').innerText = loc.name;
        }

        // Cart Drawer Logic
        function openCart() {
            const drawer = document.getElementById('cartDrawer');
            const overlay = document.getElementById('cartOverlay');
            const panel = document.getElementById('cartPanel');

            drawer.classList.remove('pointer-events-none');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            panel.classList.remove('translate-x-full');
            renderCartItems();
        }

        function closeCartDrawer() {
            const drawer = document.getElementById('cartDrawer');
            const overlay = document.getElementById('cartOverlay');
            const panel = document.getElementById('cartPanel');

            drawer.classList.add('pointer-events-none');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            panel.classList.add('translate-x-full');
        }

        function addToCart(id) {
            const item = menuItems.find(i => i.id === id);
            if (!item) return;

            const existing = cart.find(c => c.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...item, quantity: 1 });
            }

            updateCartBadge();
            showToast(`Added ${item.name} to your selection.`);
        }

        function updateCartBadge() {
            const badge = document.getElementById('cartBadge');
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            badge.innerText = totalCount;
            if (totalCount > 0) {
                badge.classList.remove('scale-0');
                badge.classList.add('scale-100');
            } else {
                badge.classList.remove('scale-100');
                badge.classList.add('scale-0');
            }
        }

        function renderCartItems() {
            const list = document.getElementById('cartItemsList');
            const subtotalElem = document.getElementById('cartSubtotal');
            list.innerHTML = '';

            if (cart.length === 0) {
                list.innerHTML = `
                    <div class="text-center py-16 text-champagne/50">
                        <i class="fa-solid fa-bag-shopping text-4xl mb-3 text-gold/40"></i>
                        <p class="font-serif text-lg">Your selection is currently empty.</p>
                        <p class="text-xs mt-1">Explore our signature menu to add items.</p>
                    </div>
                `;
                subtotalElem.innerText = '$0.00';
                return;
            }

            let subtotal = 0;
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                const div = document.createElement('div');
                div.className = "flex items-center gap-4 p-4 rounded-xl bg-espressoLight border border-gold/20";
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover border border-gold/30">
                    <div class="flex-1">
                        <h4 class="font-serif font-bold text-champagne text-sm">${item.name}</h4>
                        <span class="text-gold text-xs font-semibold">$${item.price.toFixed(2)}</span>
                        <div class="flex items-center gap-3 mt-2">
                            <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 rounded-full bg-espresso text-champagne border border-gold/30 flex items-center justify-center text-xs hover:bg-gold hover:text-espresso"><i class="fa-solid fa-minus"></i></button>
                            <span class="text-xs font-bold text-champagne">${item.quantity}</span>
                            <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 rounded-full bg-espresso text-champagne border border-gold/30 flex items-center justify-center text-xs hover:bg-gold hover:text-espresso"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-champagne/40 hover:text-gold text-sm p-2"><i class="fa-solid fa-trash-can"></i></button>
                `;
                list.appendChild(div);
            });

            subtotalElem.innerText = `$${subtotal.toFixed(2)}`;
        }

        function updateQty(id, delta) {
            const item = cart.find(c => c.id === id);
            if (!item) return;
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(c => c.id !== id);
            }
            updateCartBadge();
            renderCartItems();
        }

        function removeFromCart(id) {
            cart = cart.filter(c => c.id !== id);
            updateCartBadge();
            renderCartItems();
            showToast("Item removed from selection.");
        }

        function checkout() {
            if (cart.length === 0) {
                showToast("Please add items before checking out.");
                return;
            }
            showToast("Secure checkout simulation initiated. Thank you!");
            cart = [];
            updateCartBadge();
            renderCartItems();
            setTimeout(() => {
                closeCartDrawer();
            }, 1500);
        }

        // Reservation Form Handler
        function handleReservation(e) {
            e.preventDefault();
            document.getElementById('reservationForm').classList.add('hidden');
            document.getElementById('reservationSuccess').classList.remove('hidden');
        }

        function resetReservation() {
            document.getElementById('reservationForm').reset();
            document.getElementById('reservationForm').classList.remove('hidden');
            document.getElementById('reservationSuccess').classList.add('hidden');
        }

        // Newsletter Handler
        function subscribeNewsletter(e) {
            e.preventDefault();
            showToast("Successfully joined the Private Connoisseur Journal.");
            e.target.reset();
        }

        // Toast Notification Helper
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = msg;
            toast.classList.remove('translate-y-24', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-24', 'opacity-0');
            }, 3000);
        }