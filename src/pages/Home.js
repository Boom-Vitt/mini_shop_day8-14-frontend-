import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import { categories } from '../data/products';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();
  const { featuredProducts, loadFeaturedProducts, loading } = useProducts();

  const texts = {
    welcome: { th: 'ยินดีต้อนรับสู่ร้านเสื้อผ้าไทย', en: 'Welcome to Thai Clothing Store' },
    subtitle: { 
      th: 'ค้นพบเสื้อผ้าไทยคุณภาพดี ผ้าไหมไทยแท้ และแฟชั่นสมัยใหม่',
      en: 'Discover quality Thai clothing, authentic Thai silk, and modern fashion'
    },
    shopNow: { th: 'เลือกซื้อเลย', en: 'Shop Now' },
    featuredProducts: { th: 'สินค้าแนะนำ', en: 'Featured Products' },
    categories: { th: 'หมวดหมู่สินค้า', en: 'Product Categories' },
    viewAll: { th: 'ดูทั้งหมด', en: 'View All' },
    whyChooseUs: { th: 'ทำไมต้องเลือกเรา', en: 'Why Choose Us' },
    quality: { th: 'คุณภาพดี', en: 'High Quality' },
    qualityDesc: { 
      th: 'ผ้าไหมไทยแท้และวัสดุคุณภาพสูง',
      en: 'Authentic Thai silk and high-quality materials'
    },
    authentic: { th: 'ของแท้', en: 'Authentic' },
    authenticDesc: { 
      th: 'สินค้าไทยแท้ 100% จากช่างฝีมือไทย',
      en: '100% authentic Thai products from skilled Thai artisans'
    },
    modern: { th: 'ทันสมัย', en: 'Modern Design' },
    modernDesc: { 
      th: 'ดีไซน์ทันสมัยผสมผสานกับความเป็นไทย',
      en: 'Modern designs blended with Thai heritage'
    },
    shipping: { th: 'จัดส่งฟรี', en: 'Free Shipping' },
    shippingDesc: { 
      th: 'จัดส่งฟรีเมื่อซื้อครบ 1,000 บาท',
      en: 'Free shipping on orders over 1,000 THB'
    }
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{t(texts.welcome)}</h1>
            <p className="hero-subtitle">{t(texts.subtitle)}</p>
            <Link to="/products" className="hero-cta">
              {t(texts.shopNow)}
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600" 
              alt="Thai Clothing"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t(texts.featuredProducts)}</h2>
            <Link to="/products" className="view-all-link">
              {t(texts.viewAll)} →
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            loading={loading}
            columns={4}
            showQuickAdd={true}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">{t(texts.categories)}</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">
                  {getCategoryIcon(category.id)}
                </div>
                <h3 className="category-name">{t(category.name)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t(texts.whyChooseUs)}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">{t(texts.quality)}</h3>
              <p className="feature-description">{t(texts.qualityDesc)}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">{t(texts.authentic)}</h3>
              <p className="feature-description">{t(texts.authenticDesc)}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">{t(texts.modern)}</h3>
              <p className="feature-description">{t(texts.modernDesc)}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">{t(texts.shipping)}</h3>
              <p className="feature-description">{t(texts.shippingDesc)}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (categoryId) => {
  const icons = {
    shirts: '👔',
    pants: '👖',
    dresses: '👗',
    skirts: '🩱',
    traditional: '🥻',
    accessories: '💍'
  };
  return icons[categoryId] || '👕';
};

export default Home;
