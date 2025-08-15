import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { formatPrice, getImageUrl, truncateText } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product, showQuickAdd = true }) => {
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const texts = {
    addToCart: { th: 'เพิ่มลงตะกร้า', en: 'Add to Cart' },
    quickView: { th: 'ดูรายละเอียด', en: 'Quick View' },
    outOfStock: { th: 'สินค้าหมด', en: 'Out of Stock' },
    inCart: { th: 'อยู่ในตะกร้า', en: 'In Cart' },
    size: { th: 'ไซส์', en: 'Size' },
    color: { th: 'สี', en: 'Color' },
    featured: { th: 'สินค้าแนะนำ', en: 'Featured' }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    setIsLoading(true);
    try {
      await addToCart(product, selectedSize, selectedColor, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const isProductInCart = isInCart(product.id, selectedSize, selectedColor);

  return (
    <div className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
      <Link to={`/products/${product.id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image-container">
          <img
            src={getImageUrl(product.images[0], 'medium')}
            alt={t(product.name)}
            className="product-image"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="product-badges">
            {product.featured && (
              <span className="badge featured-badge">
                {t(texts.featured)}
              </span>
            )}
            {!product.inStock && (
              <span className="badge out-of-stock-badge">
                {t(texts.outOfStock)}
              </span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="product-actions">
            <button
              onClick={handleQuickView}
              className="action-button quick-view-button"
              aria-label={t(texts.quickView)}
            >
              👁️
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">
            {truncateText(t(product.name), 50)}
          </h3>
          
          <p className="product-description">
            {truncateText(t(product.description), 80)}
          </p>

          <div className="product-price">
            {formatPrice(product.price)}
          </div>

          {/* Size and Color Options */}
          {showQuickAdd && product.inStock && (
            <div className="product-options">
              {product.sizes && product.sizes.length > 1 && (
                <div className="option-group">
                  <label className="option-label">{t(texts.size)}:</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="option-select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}

              {product.colors && product.colors.length > 1 && (
                <div className="option-group">
                  <label className="option-label">{t(texts.color)}:</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="option-select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          {showQuickAdd && (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isLoading}
              className={`add-to-cart-button ${isProductInCart ? 'in-cart' : ''}`}
            >
              {isLoading ? (
                <span className="loading-spinner">⏳</span>
              ) : isProductInCart ? (
                t(texts.inCart)
              ) : !product.inStock ? (
                t(texts.outOfStock)
              ) : (
                t(texts.addToCart)
              )}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
