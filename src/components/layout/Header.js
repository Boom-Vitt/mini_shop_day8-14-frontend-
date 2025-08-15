import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import SearchBar from '../common/SearchBar';
import './Header.css';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const texts = {
    storeName: { th: 'ร้านเสื้อผ้าไทย', en: 'Thai Clothing Store' },
    home: { th: 'หน้าแรก', en: 'Home' },
    products: { th: 'สินค้า', en: 'Products' },
    categories: { th: 'หมวดหมู่', en: 'Categories' },
    cart: { th: 'ตรวจสอบ', en: 'Cart' },
    language: { th: 'EN', en: 'ไทย' },
    search: { th: 'ค้นหาสินค้า...', en: 'Search products...' }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Store Name */}
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <div className="logo">
              <span className="logo-icon">👗</span>
            </div>
            <h1 className="store-name">{t(texts.storeName)}</h1>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="header-search desktop-only">
          <SearchBar placeholder={t(texts.search)} />
        </div>

        {/* Navigation and Actions */}
        <div className="header-actions">
          {/* Language Toggle */}
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle Language"
          >
            {t(texts.language)}
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="cart-link">
            <div className="cart-icon">
              <span className="cart-symbol">🛒</span>
              {cart.itemCount > 0 && (
                <span className="cart-badge">{cart.itemCount}</span>
              )}
            </div>
            <span className="cart-text desktop-only">{t(texts.cart)}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle mobile-only"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link 
                to="/" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(texts.home)}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/products" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(texts.products)}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle">
                {t(texts.categories)}
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link 
                    to="/products?category=shirts" 
                    className="dropdown-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'th' ? 'เสื้อเชิ้ต' : 'Shirts'}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=pants" 
                    className="dropdown-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'th' ? 'กางเกง' : 'Pants'}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=dresses" 
                    className="dropdown-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'th' ? 'ชุดเดรส' : 'Dresses'}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=traditional" 
                    className="dropdown-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'th' ? 'ชุดไทย' : 'Traditional Thai'}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products?category=accessories" 
                    className="dropdown-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'th' ? 'เครื่องประดับ' : 'Accessories'}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Mobile Search */}
          <div className="mobile-search mobile-only">
            <SearchBar placeholder={t(texts.search)} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
