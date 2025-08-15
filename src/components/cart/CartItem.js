import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { t } = useLanguage();
  const { updateCartItem, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const texts = {
    size: { th: 'ไซส์', en: 'Size' },
    color: { th: 'สี', en: 'Color' },
    quantity: { th: 'จำนวน', en: 'Quantity' },
    remove: { th: 'ลบ', en: 'Remove' },
    total: { th: 'รวม', en: 'Total' },
    outOfStock: { th: 'สินค้าหมด', en: 'Out of Stock' }
  };

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      await updateCartItem(item.cartItemId, newQuantity);
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm(t({ th: 'คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?', en: 'Are you sure you want to remove this item from cart?' }))) {
      try {
        await removeFromCart(item.cartItemId);
      } catch (error) {
        console.error('Error removing cart item:', error);
      }
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className={`cart-item ${!item.inStock ? 'out-of-stock' : ''}`}>
      {/* Product Image */}
      <div className="cart-item-image">
        <Link to={`/products/${item.id}`}>
          <img
            src={getImageUrl(item.image, 'small')}
            alt={t(item.name)}
            className="item-image"
          />
        </Link>
        {!item.inStock && (
          <div className="out-of-stock-overlay">
            <span>{t(texts.outOfStock)}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="cart-item-info">
        <div className="item-details">
          <Link to={`/products/${item.id}`} className="item-name">
            {t(item.name)}
          </Link>
          
          <div className="item-options">
            {item.size && (
              <span className="item-option">
                {t(texts.size)}: {item.size}
              </span>
            )}
            {item.color && (
              <span className="item-option">
                {t(texts.color)}: {item.color}
              </span>
            )}
          </div>
          
          <div className="item-price">
            {formatPrice(item.price)}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="quantity-controls">
          <label className="quantity-label">{t(texts.quantity)}:</label>
          <div className="quantity-selector">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
              className="quantity-button"
            >
              -
            </button>
            <span className="quantity-display">
              {isUpdating ? '...' : item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="quantity-button"
            >
              +
            </button>
          </div>
        </div>

        {/* Item Total and Remove */}
        <div className="item-actions">
          <div className="item-total">
            <span className="total-label">{t(texts.total)}:</span>
            <span className="total-price">{formatPrice(itemTotal)}</span>
          </div>
          
          <button
            onClick={handleRemove}
            className="remove-button"
            aria-label={t(texts.remove)}
          >
            🗑️ {t(texts.remove)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
