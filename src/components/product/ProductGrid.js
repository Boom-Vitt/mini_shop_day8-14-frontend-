import React from 'react';
import ProductCard from './ProductCard';
import { useLanguage } from '../../hooks/useLanguage';
import './ProductGrid.css';

const ProductGrid = ({ 
  products, 
  loading = false, 
  error = null, 
  showQuickAdd = true,
  columns = 4,
  emptyMessage 
}) => {
  const { t } = useLanguage();

  const texts = {
    loading: { th: 'กำลังโหลด...', en: 'Loading...' },
    noProducts: { th: 'ไม่พบสินค้า', en: 'No products found' },
    error: { th: 'เกิดข้อผิดพลาด', en: 'An error occurred' }
  };

  if (loading) {
    return (
      <div className="product-grid-container">
        <div className="loading-state">
          <div className="loading-spinner-large">⏳</div>
          <p>{t(texts.loading)}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <p>{t(texts.error)}: {error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-container">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <p>{emptyMessage || t(texts.noProducts)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className={`product-grid columns-${columns}`}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showQuickAdd={showQuickAdd}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
