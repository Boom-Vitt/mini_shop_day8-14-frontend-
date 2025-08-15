import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addToCart, getCartItemQuantity } = useCart();
  const { getProductById } = useProducts();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const texts = {
    loading: { th: 'กำลังโหลด...', en: 'Loading...' },
    error: { th: 'เกิดข้อผิดพลาด', en: 'Error occurred' },
    notFound: { th: 'ไม่พบสินค้า', en: 'Product not found' },
    backToProducts: { th: 'กลับไปหน้าสินค้า', en: 'Back to Products' },
    size: { th: 'ไซส์', en: 'Size' },
    color: { th: 'สี', en: 'Color' },
    quantity: { th: 'จำนวน', en: 'Quantity' },
    addToCart: { th: 'เพิ่มลงตะกร้า', en: 'Add to Cart' },
    outOfStock: { th: 'สินค้าหมด', en: 'Out of Stock' },
    inStock: { th: 'มีสินค้า', en: 'In Stock' },
    description: { th: 'รายละเอียดสินค้า', en: 'Product Description' },
    specifications: { th: 'ข้อมูลจำเพาะ', en: 'Specifications' },
    category: { th: 'หมวดหมู่', en: 'Category' },
    availableSizes: { th: 'ไซส์ที่มี', en: 'Available Sizes' },
    availableColors: { th: 'สีที่มี', en: 'Available Colors' },
    selectSize: { th: 'เลือกไซส์', en: 'Select Size' },
    selectColor: { th: 'เลือกสี', en: 'Select Color' },
    added: { th: 'เพิ่มแล้ว', en: 'Added' }
  };

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await getProductById(id);

      if (productData) {
        setProduct(productData);
        setSelectedSize(productData.sizes?.[0] || '');
        setSelectedColor(productData.colors?.[0] || '');
      } else {
        setError(t(texts.notFound));
      }
    } catch (err) {
      setError(err.message || t(texts.error));
    } finally {
      setLoading(false);
    }
  }, [id, getProductById, t, texts.notFound, texts.error]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = async () => {
    if (!product || !product.inStock) return;
    
    if (!selectedSize && product.sizes?.length > 0) {
      alert(t(texts.selectSize));
      return;
    }
    
    if (!selectedColor && product.colors?.length > 0) {
      alert(t(texts.selectColor));
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(product, selectedSize, selectedColor, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const currentCartQuantity = product ? getCartItemQuantity(product.id, selectedSize, selectedColor) : 0;

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-state">
          <div className="loading-spinner">⏳</div>
          <p>{t(texts.loading)}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <p>{error || t(texts.notFound)}</p>
          <button 
            onClick={() => navigate('/products')}
            className="back-button"
          >
            {t(texts.backToProducts)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={getImageUrl(product.images[selectedImage], 'large')}
              alt={t(product.name)}
              className="main-product-image"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                >
                  <img
                    src={getImageUrl(image, 'small')}
                    alt={`${t(product.name)} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{t(product.name)}</h1>
            <div className="product-price">{formatPrice(product.price)}</div>
            <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? t(texts.inStock) : t(texts.outOfStock)}
            </div>
          </div>

          <div className="product-description">
            <h3>{t(texts.description)}</h3>
            <p>{t(product.description)}</p>
          </div>

          {/* Product Options */}
          {product.inStock && (
            <div className="product-options">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="option-group">
                  <label className="option-label">{t(texts.size)}:</label>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="option-group">
                  <label className="option-label">{t(texts.color)}:</label>
                  <div className="color-options">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="option-group">
                <label className="option-label">{t(texts.quantity)}:</label>
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-button"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="add-to-cart-button-detail"
              >
                {isAddingToCart ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    {t(texts.added)}
                  </>
                ) : (
                  <>
                    {t(texts.addToCart)}
                    {currentCartQuantity > 0 && (
                      <span className="cart-count">({currentCartQuantity})</span>
                    )}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Product Specifications */}
          <div className="product-specifications">
            <h3>{t(texts.specifications)}</h3>
            <div className="spec-list">
              <div className="spec-item">
                <span className="spec-label">{t(texts.category)}:</span>
                <span className="spec-value">{product.category}</span>
              </div>
              {product.sizes && (
                <div className="spec-item">
                  <span className="spec-label">{t(texts.availableSizes)}:</span>
                  <span className="spec-value">{product.sizes.join(', ')}</span>
                </div>
              )}
              {product.colors && (
                <div className="spec-item">
                  <span className="spec-label">{t(texts.availableColors)}:</span>
                  <span className="spec-value">{product.colors.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
