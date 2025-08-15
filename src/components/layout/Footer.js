import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  const texts = {
    storeName: { th: 'ร้านเสื้อผ้าไทย', en: 'Thai Clothing Store' },
    description: { 
      th: 'ร้านเสื้อผ้าไทยคุณภาพดี ผ้าไหมไทยแท้ และเสื้อผ้าแฟชั่นสมัยใหม่',
      en: 'Quality Thai clothing store with authentic Thai silk and modern fashion'
    },
    quickLinks: { th: 'ลิงก์ด่วน', en: 'Quick Links' },
    categories: { th: 'หมวดหมู่สินค้า', en: 'Categories' },
    contact: { th: 'ติดต่อเรา', en: 'Contact Us' },
    home: { th: 'หน้าแรก', en: 'Home' },
    products: { th: 'สินค้าทั้งหมด', en: 'All Products' },
    about: { th: 'เกี่ยวกับเรา', en: 'About Us' },
    privacy: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' },
    terms: { th: 'ข้อกำหนดการใช้งาน', en: 'Terms of Service' },
    shirts: { th: 'เสื้อเชิ้ต', en: 'Shirts' },
    pants: { th: 'กางเกง', en: 'Pants' },
    dresses: { th: 'ชุดเดรส', en: 'Dresses' },
    traditional: { th: 'ชุดไทย', en: 'Traditional Thai' },
    accessories: { th: 'เครื่องประดับ', en: 'Accessories' },
    address: { 
      th: '123 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
      en: '123 Silom Road, Silom, Bang Rak, Bangkok 10500'
    },
    phone: { th: 'โทร: 02-123-4567', en: 'Phone: 02-123-4567' },
    email: { th: 'อีเมล: info@thaiclothing.com', en: 'Email: info@thaiclothing.com' },
    hours: { 
      th: 'เวลาทำการ: จันทร์-อาทิตย์ 10:00-20:00',
      en: 'Hours: Mon-Sun 10:00-20:00'
    },
    followUs: { th: 'ติดตามเรา', en: 'Follow Us' },
    copyright: { 
      th: '© 2024 ร้านเสื้อผ้าไทย สงวนลิขสิทธิ์',
      en: '© 2024 Thai Clothing Store. All rights reserved.'
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">👗</span>
                <h3>{t(texts.storeName)}</h3>
              </div>
              <p className="footer-description">
                {t(texts.description)}
              </p>
              <div className="social-links">
                <span className="social-title">{t(texts.followUs)}:</span>
                <div className="social-icons">
                  <a href="#" aria-label="Facebook" className="social-link">📘</a>
                  <a href="#" aria-label="Instagram" className="social-link">📷</a>
                  <a href="#" aria-label="Line" className="social-link">💬</a>
                  <a href="#" aria-label="Twitter" className="social-link">🐦</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">{t(texts.quickLinks)}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t(texts.home)}</Link></li>
              <li><Link to="/products">{t(texts.products)}</Link></li>
              <li><Link to="/about">{t(texts.about)}</Link></li>
              <li><Link to="/privacy">{t(texts.privacy)}</Link></li>
              <li><Link to="/terms">{t(texts.terms)}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-title">{t(texts.categories)}</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=shirts">{t(texts.shirts)}</Link></li>
              <li><Link to="/products?category=pants">{t(texts.pants)}</Link></li>
              <li><Link to="/products?category=dresses">{t(texts.dresses)}</Link></li>
              <li><Link to="/products?category=traditional">{t(texts.traditional)}</Link></li>
              <li><Link to="/products?category=accessories">{t(texts.accessories)}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">{t(texts.contact)}</h4>
            <div className="contact-info">
              <p className="contact-item">
                <span className="contact-icon">📍</span>
                {t(texts.address)}
              </p>
              <p className="contact-item">
                <span className="contact-icon">📞</span>
                {t(texts.phone)}
              </p>
              <p className="contact-item">
                <span className="contact-icon">✉️</span>
                {t(texts.email)}
              </p>
              <p className="contact-item">
                <span className="contact-icon">🕒</span>
                {t(texts.hours)}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>{t(texts.copyright)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
