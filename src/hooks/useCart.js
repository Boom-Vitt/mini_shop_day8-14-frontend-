import { useApp } from '../context/AppContext';
import { ACTIONS } from '../context/AppContext';

export const useCart = () => {
  const { state, dispatch } = useApp();

  // Ensure cart is properly initialized
  const cart = state.cart || { items: [], total: 0, itemCount: 0 };
  
  // Add item to cart
  const addToCart = (product, size, color, quantity = 1) => {
    if (!product.inStock) {
      throw new Error('Product is out of stock');
    }
    
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { product, size, color, quantity }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (cartItemId) => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: cartItemId
    });
  };
  
  // Update cart item quantity
  const updateCartItem = (cartItemId, quantity) => {
    dispatch({
      type: ACTIONS.UPDATE_CART_ITEM,
      payload: { cartItemId, quantity }
    });
  };
  
  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };
  
  // Check if product is in cart
  const isInCart = (productId, size, color) => {
    if (!cart.items || !Array.isArray(cart.items)) {
      return false;
    }
    return cart.items.some(
      item => item.id === productId && item.size === size && item.color === color
    );
  };

  // Get cart item by product details
  const getCartItem = (productId, size, color) => {
    if (!cart.items || !Array.isArray(cart.items)) {
      return null;
    }
    return cart.items.find(
      item => item.id === productId && item.size === size && item.color === color
    );
  };

  // Get cart item quantity
  const getCartItemQuantity = (productId, size, color) => {
    const item = getCartItem(productId, size, color);
    return item ? item.quantity : 0;
  };
  
  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    isInCart,
    getCartItem,
    getCartItemQuantity
  };
};
