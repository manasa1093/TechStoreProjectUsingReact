// ==================== IMPORTS ====================
// Importing product data from local data file
import products from "./data";
// Importing reusable ProductCard component
import ProductCard from "./components/productCard";
// Importing CartSidebar component
import CartSidebar from "./components/CartSidebar";
// Importing global styles
import "./App.css";
// Importing useState hook from React for state management
import { useState } from "react";

function App() {
  // ==================== DERIVED DATA ====================
  // Extract unique brand names from product data using Set to remove duplicates
  const allBrands = [...new Set(products.map((p) => p.brand))];
  // ==================== STATE MANAGEMENT ====================
  // Stores array of product objects added to the cart (each with a quantity property)
  const [cartItems, setCartItems] = useState([]);
  // UI State for Cart Sidebar
  const [isCartOpen, setIsCartOpen] = useState(false);
  // UI State for Theme (dark/light)
  const [theme, setTheme] = useState("dark");

  // Stores array of product IDs that the user has wishlisted
  const [wishlist, setWishList] = useState([]);

  // Stores the current search query typed by the user in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Stores the currently selected brand for filtering ("All" means show all brands)
  const [selectBrand, setSelectBrand] = useState("All");

  // Stores the current sorting preference ("default", "price-low", "price-high", "rating")
  const [sort, setSortItems] = useState("default");

  // ==================== CART FUNCTIONS ====================
  // Updates the quantity of a product in the cart. Removes it if quantity < 1.
  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }

  // Adds a product to the cart. If already in cart, increments quantity by 1.
  // If not in cart, adds it with quantity: 1.
  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Product already in cart → increase its quantity by 1
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Product not in cart → add it with quantity: 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // ==================== CART CALCULATIONS ====================
  // Total number of items in cart (sum of all quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Total price of all items in cart (price × quantity for each item)
  const cartSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // ==================== WISHLIST FUNCTION ====================
  // Toggles a product in/out of the wishlist by its ID
  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      // Already wishlisted → remove it by filtering out the ID
      setWishList(wishlist.filter((id) => id !== productId));
    } else {
      // Not wishlisted → add the product ID to the wishlist array
      setWishList([...wishlist, productId]);
    }
  }

  // ==================== FILTERING & SORTING LOGIC ====================
  // Step 1: Filter products based on search term (matches name or brand)
  //         AND the selected brand filter
  let filteredProduct = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBrand = selectBrand === "All" || product.brand === selectBrand;
    return matchSearch && matchBrand;
  });

  // Step 2: Sort the filtered products based on the selected sort option
  //         Creates a new array copy to avoid mutating the original
  let sortedProducts = [...filteredProduct].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;   // Ascending price
    if (sort === "price-high") return b.price - a.price;  // Descending price
    if (sort === "rating") return b.rating - a.rating;    // Highest rated first
    return 0; // Default: no sorting
  });

  // ==================== JSX RENDERING ====================
  return (
    <div className={`app ${theme}`}>
      {/* ========== NAVIGATION BAR ========== */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <a href="/" className="logo">
            <span className="logo-icon"></span>TechStore
          </a>

          {/* Navigation Links */}
          <ul className="nav-link">
            <li>
              <a href="#" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>
          {/* Action Buttons: Wishlist, Cart, Theme Toggle, Sign In, and Shop Now */}
          <div className="nav-actions">
            <button className="nav-btn wishlist-btn" style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "4px" }}>
              ❤️ <span className="wishlist-count" style={{ background: "red", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "0.8rem" }}>{wishlist.length}</span>
            </button>
            <button className="nav-btn cart-btn" style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "6px" }} onClick={() => setIsCartOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span className="cart-count" style={{ background: "red", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "0.8rem" }}>{cartCount}</span>
            </button>
            <button className="nav-btn theme-toggle-btn" style={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">
            The Future Of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>

          {/* Hero Description and Call-to-Action Buttons */}
          <p className="hero-description">
            Discover the latest in premium technology.From powerful computers to
            cutting-edge smartphones,find everything you need in one place
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Explore produtcs</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        {/* Stats Section - Displays key business metrics */}
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS SECTION ========== */}

      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products by Customers
          </p>

          {/* Filters Container: Search, Brand Filter, Sort Dropdown */}
          <div className="filters-container" style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
            {/* Search Input - Filters products by name or brand */}
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Brand Filter Dropdown - Shows products of selected brand only */}
            <select
              className="brand-select"
              value={selectBrand}
              onChange={(e) => setSelectBrand(e.target.value)}
            >
              <option value="All">All Brands</option>
              {allBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
            {/* Sort Dropdown - Sorts products by price or rating */}
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSortItems(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        {/* Product Grid - Maps through sorted/filtered products and renders each as a ProductCard */}
        <div className="product-grid">
          {sortedProducts.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id}
              image={data.image}
              name={data.name}
              price={data.price}
              originalPrice={data.originalPrice}
              discount={data.discount}
              rating={data.rating}
              isBestSeller={data.isBestSeller}
              isWishListed={wishlist.includes(data.id)}  // Check if this product is wishlisted
              onToggleList={() => toggleWishlist(data.id)} // Toggle wishlist handler
              onAddtoCart={() => addToCart(data)}          // Add to cart handler
            />
          ))}
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <p>&copy;2024 Techstores.All rights reserved.</p>
      </footer>

      {/* ========== CART SIDEBAR ========== */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onUpdateQuantity={updateQuantity} 
        cartSum={cartSum} 
      />
    </div>
  );
}
export default App;
