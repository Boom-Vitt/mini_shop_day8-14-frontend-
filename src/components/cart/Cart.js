import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { t } = useLanguage();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const texts = {
    cart: { th: 'ตะกร้าสินค้า', en: 'Shopping Cart' },
    emptyCart: { th: 'ตะกร้าสินค้าว่าง', en: 'Your cart is empty' },
    continueShopping: { th: 'เลือกซื้อสินค้าต่อ', en: 'Continue Shopping' },
    clearCart: { th: 'ล้างตะกร้า', en: 'Clear Cart' },
    subtotal: { th: 'ยอดรวม', en: 'Subtotal' },
    shipping: { th: 'ค่าจัดส่ง', en: 'Shipping' },
    tax: { th: 'ภาษี', en: 'Tax' },
    total: { th: 'รวมทั้งหมด', en: 'Total' },
    checkout: { th: 'ชำระเงิน', en: 'Proceed to Checkout' },
    items: { th: 'รายการ', en: 'items' },
    item: { th: 'รายการ', en: 'item' },
    free: { th: 'ฟรี', en: 'Free' },
    calculated: { th: 'คำนวณเมื่อชำระเงิน', en: 'Calculated at checkout' },
    confirmClear: { 
      th: 'คุณต้องการล้างสินค้าทั้งหมดในตะกร้าหรือไม่?', 
      en: 'Are you sure you want to clear all items from your cart?' 
    }
  };

  const handleClearCart = () => {
    if (window.confirm(t(texts.confirmClear))) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Calculate totals
  const subtotal = cart.total || 0;
  const shippingCost = subtotal > 1000 ? 0 : 50; // Free shipping over 1000 THB
  const taxRate = 0.07; // 7% VAT
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + shippingCost + taxAmount;

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">{t(texts.cart)}</h1>
        </div>
        
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>{t(texts.emptyCart)}</h2>
          <p>เริ่มเลือกซื้อสินค้าที่คุณชื่นชอบได้เลย</p>
          <Link to="/products" className="continue-shopping-button">
            {t(texts.continueShopping)}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">
          {t(texts.cart)} ({cart.itemCount || 0} {(cart.itemCount || 0) === 1 ? t(texts.item) : t(texts.items)})
        </h1>
        <button onClick={handleClearCart} className="clear-cart-button">
          🗑️ {t(texts.clearCart)}
        </button>
      </div>

      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {(cart.items || []).map(item => (
            <CartItem key={item.cartItemId} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">สรุปคำสั่งซื้อ</h3>
            
            <div className="summary-line">
              <span className="summary-label">{t(texts.subtotal)}:</span>
              <span className="summary-value">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="summary-line">
              <span className="summary-label">{t(texts.shipping)}:</span>
              <span className="summary-value">
                {shippingCost === 0 ? t(texts.free) : formatPrice(shippingCost)}
              </span>
            </div>
            
            <div className="summary-line">
              <span className="summary-label">{t(texts.tax)} (7%):</span>
              <span className="summary-value">{formatPrice(taxAmount)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-line total-line">
              <span className="summary-label">{t(texts.total)}:</span>
              <span className="summary-value total-value">{formatPrice(finalTotal)}</span>
            </div>

            {shippingCost > 0 && (
              <div className="shipping-notice">
                <small>
                  💡 ซื้อเพิ่ม {formatPrice(1000 - subtotal)} เพื่อได้รับการจัดส่งฟรี!
                </small>
              </div>
            )}
            
            <button onClick={handleCheckout} className="checkout-button">
              {t(texts.checkout)}
            </button>
            
            <Link to="/products" className="continue-shopping-link">
              {t(texts.continueShopping)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
