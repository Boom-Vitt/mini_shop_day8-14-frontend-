import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import { formatPrice, isValidEmail, isValidThaiPhone } from '../utils/helpers';
import './Checkout.css';

const Checkout = () => {
  const { t } = useLanguage();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    province: '',
    postalCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const texts = {
    checkout: { th: 'ชำระเงิน', en: 'Checkout' },
    shippingInfo: { th: 'ข้อมูลการจัดส่ง', en: 'Shipping Information' },
    paymentInfo: { th: 'ข้อมูลการชำระเงิน', en: 'Payment Information' },
    orderSummary: { th: 'สรุปคำสั่งซื้อ', en: 'Order Summary' },
    firstName: { th: 'ชื่อ', en: 'First Name' },
    lastName: { th: 'นามสกุล', en: 'Last Name' },
    email: { th: 'อีเมล', en: 'Email' },
    phone: { th: 'เบอร์โทรศัพท์', en: 'Phone Number' },
    address: { th: 'ที่อยู่', en: 'Address' },
    district: { th: 'เขต/อำเภอ', en: 'District' },
    province: { th: 'จังหวัด', en: 'Province' },
    postalCode: { th: 'รหัสไปรษณีย์', en: 'Postal Code' },
    paymentMethod: { th: 'วิธีการชำระเงิน', en: 'Payment Method' },
    creditCard: { th: 'บัตรเครดิต', en: 'Credit Card' },
    bankTransfer: { th: 'โอนเงินผ่านธนาคาร', en: 'Bank Transfer' },
    cardNumber: { th: 'หมายเลขบัตร', en: 'Card Number' },
    expiryDate: { th: 'วันหมดอายุ', en: 'Expiry Date' },
    cvv: { th: 'CVV', en: 'CVV' },
    notes: { th: 'หมายเหตุ', en: 'Notes' },
    subtotal: { th: 'ยอดรวม', en: 'Subtotal' },
    shipping: { th: 'ค่าจัดส่ง', en: 'Shipping' },
    tax: { th: 'ภาษี', en: 'Tax' },
    total: { th: 'รวมทั้งหมด', en: 'Total' },
    placeOrder: { th: 'สั่งซื้อ', en: 'Place Order' },
    backToCart: { th: 'กลับไปตะกร้า', en: 'Back to Cart' },
    required: { th: 'กรุณากรอกข้อมูล', en: 'This field is required' },
    invalidEmail: { th: 'รูปแบบอีเมลไม่ถูกต้อง', en: 'Invalid email format' },
    invalidPhone: { th: 'รูปแบบเบอร์โทรไม่ถูกต้อง', en: 'Invalid phone number format' },
    free: { th: 'ฟรี', en: 'Free' }
  };

  // Calculate totals
  const subtotal = cart.total;
  const shippingCost = subtotal > 1000 ? 0 : 50;
  const taxRate = 0.07;
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + shippingCost + taxAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'district', 'province', 'postalCode'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = t(texts.required);
      }
    });

    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = t(texts.invalidEmail);
    }

    // Phone validation
    if (formData.phone && !isValidThaiPhone(formData.phone)) {
      newErrors.phone = t(texts.invalidPhone);
    }

    // Payment method validation
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = t(texts.required);
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = t(texts.required);
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = t(texts.required);
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      alert(t({ th: 'สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ', en: 'Order placed successfully! Thank you for your purchase.' }));
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(t({ th: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', en: 'An error occurred. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>ตะกร้าสินค้าว่าง</h2>
          <p>กรุณาเลือกสินค้าก่อนทำการชำระเงิน</p>
          <button onClick={() => navigate('/products')} className="continue-shopping-btn">
            เลือกซื้อสินค้า
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>{t(texts.checkout)}</h1>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-content">
          {/* Left Column - Forms */}
          <div className="checkout-forms">
            {/* Shipping Information */}
            <div className="form-section">
              <h2>{t(texts.shippingInfo)}</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">{t(texts.firstName)} *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">{t(texts.lastName)} *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">{t(texts.email)} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">{t(texts.phone)} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08X-XXX-XXXX"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">{t(texts.address)} *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="district">{t(texts.district)} *</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={errors.district ? 'error' : ''}
                  />
                  {errors.district && <span className="error-message">{errors.district}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="province">{t(texts.province)} *</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className={errors.province ? 'error' : ''}
                  />
                  {errors.province && <span className="error-message">{errors.province}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="postalCode">{t(texts.postalCode)} *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    maxLength="5"
                    className={errors.postalCode ? 'error' : ''}
                  />
                  {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="form-section">
              <h2>{t(texts.paymentInfo)}</h2>
              
              <div className="form-group">
                <label>{t(texts.paymentMethod)}</label>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                    />
                    <span>{t(texts.creditCard)}</span>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleInputChange}
                    />
                    <span>{t(texts.bankTransfer)}</span>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === 'credit-card' && (
                <>
                  <div className="form-group">
                    <label htmlFor="cardNumber">{t(texts.cardNumber)} *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">{t(texts.expiryDate)} *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={errors.expiryDate ? 'error' : ''}
                      />
                      {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">{t(texts.cvv)} *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        className={errors.cvv ? 'error' : ''}
                      />
                      {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="notes">{t(texts.notes)}</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="หมายเหตุเพิ่มเติม..."
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h2>{t(texts.orderSummary)}</h2>
              
              <div className="order-items">
                {(cart.items || []).map(item => (
                  <div key={item.cartItemId} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{t(item.name)}</span>
                      <span className="item-details">
                        {item.size && `${item.size} `}
                        {item.color && `/ ${item.color}`}
                      </span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-line">
                  <span>{t(texts.subtotal)}:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="summary-line">
                  <span>{t(texts.shipping)}:</span>
                  <span>{shippingCost === 0 ? t(texts.free) : formatPrice(shippingCost)}</span>
                </div>
                
                <div className="summary-line">
                  <span>{t(texts.tax)} (7%):</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-line total-line">
                  <span>{t(texts.total)}:</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="checkout-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="place-order-btn"
                >
                  {isSubmitting ? 'กำลังดำเนินการ...' : t(texts.placeOrder)}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="back-to-cart-btn"
                >
                  {t(texts.backToCart)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
