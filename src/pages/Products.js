import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useProducts } from '../hooks/useProducts';
import { useApp } from '../context/AppContext';
import ProductGrid from '../components/product/ProductGrid';
import { categories } from '../data/products';
import { sortProducts } from '../utils/helpers';
import './Products.css';

const Products = () => {
  const { t } = useLanguage();
  const { state } = useApp();
  const { products, loadProducts, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const texts = {
    products: { th: 'สินค้าทั้งหมด', en: 'All Products' },
    filters: { th: 'ตัวกรอง', en: 'Filters' },
    sortBy: { th: 'เรียงตาม', en: 'Sort by' },
    category: { th: 'หมวดหมู่', en: 'Category' },
    all: { th: 'ทั้งหมด', en: 'All' },
    clearFilters: { th: 'ล้างตัวกรอง', en: 'Clear Filters' },
    showingResults: { th: 'แสดงผล', en: 'Showing' },
    resultsFor: { th: 'ผลการค้นหาสำหรับ', en: 'Results for' },
    noResults: { th: 'ไม่พบสินค้า', en: 'No products found' },
    sortOptions: {
      featured: { th: 'สินค้าแนะนำ', en: 'Featured' },
      'price-low': { th: 'ราคาต่ำ-สูง', en: 'Price: Low to High' },
      'price-high': { th: 'ราคาสูง-ต่ำ', en: 'Price: High to Low' },
      'name-th': { th: 'ชื่อ ก-ฮ', en: 'Name A-Z (Thai)' },
      'name-en': { th: 'ชื่อ A-Z', en: 'Name A-Z (English)' }
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    // Handle URL parameters
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';

    setSelectedCategory(category);

    // Apply filters and sorting
    let filtered = [...products];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => {
        const currentLang = state.language || 'th';
        const name = product.name[currentLang] || product.name.th || '';
        const description = product.description[currentLang] || product.description.th || '';
        return name.toLowerCase().includes(searchLower) ||
               description.toLowerCase().includes(searchLower);
      });
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
  }, [products, searchParams, sortBy, state.language]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const currentSearch = searchParams.get('search') || '';

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div className="header-content">
            <h1 className="page-title">
              {currentSearch ? t(texts.resultsFor) : t(texts.products)}
              {currentSearch && <span className="search-term">"{currentSearch}"</span>}
            </h1>
            
            <div className="results-info">
              {t(texts.showingResults)} {filteredProducts.length} รายการ
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="mobile-filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {t(texts.filters)} {showFilters ? '▲' : '▼'}
          </button>
        </div>

        <div className="products-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'mobile-open' : ''}`}>
            <div className="filters-header">
              <h3>{t(texts.filters)}</h3>
              <button onClick={clearFilters} className="clear-filters">
                {t(texts.clearFilters)}
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-title">{t(texts.category)}</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={() => handleCategoryChange('all')}
                  />
                  <span className="filter-label">{t(texts.all)}</span>
                </label>
                
                {categories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <span className="filter-label">{t(category.name)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="filter-group">
              <h4 className="filter-title">{t(texts.sortBy)}</h4>
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-select"
              >
                {Object.entries(texts.sortOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {t(label)}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              columns={3}
              showQuickAdd={true}
              emptyMessage={currentSearch ? 
                `${t(texts.noResults)} "${currentSearch}"` : 
                t(texts.noResults)
              }
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
