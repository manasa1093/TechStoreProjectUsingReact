export default function ProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  isBestSeller,
  isWishListed,
  onToggleList,
  onAddtoCart,
}) {
  return (
    <div className="product-card">
      {/* Discount Badge */}
      {discount && <span className="discount-badge">{discount}</span>}

      {/* Wishlist Button */}
      <button 
        className={`wishlist-icon-btn ${isWishListed ? 'active' : ''}`} 
        onClick={onToggleList} 
      >
        {isWishListed ? "❤️" : "🤍"}
      </button>

      {/* ProductImage */}
      <div className="image-container">
        <img src={image} alt={name} className="product-image"></img>
      </div>

      {/* content */}

      <div className="card-content">
        <h3 className="product-name">{name}</h3>

        {/* Rating */}
        <div className="rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </span>
          <span className="rating-value">{rating}</span>
          {isBestSeller && <span className="bestSeller-tag">Best Seller</span>}
        </div>

        {/* Price */}
        <div className="price-row">
          <span className="price">₹ {price}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>

        {/* Button */}

        <button className="add-btn" onClick={onAddtoCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
