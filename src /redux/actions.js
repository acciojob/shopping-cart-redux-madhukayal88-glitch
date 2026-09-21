import * as types from "./actionTypes";

export const addToCart = (product) => ({ type: types.ADD_TO_CART, payload: product });
export const removeFromCart = (id) => ({ type: types.REMOVE_FROM_CART, payload: id });
export const increaseQuantity = (id) => ({ type: types.INCREASE_QUANTITY, payload: id });
export const decreaseQuantity = (id) => ({ type: types.DECREASE_QUANTITY, payload: id });
export const addToWishlist = (product) => ({ type: types.ADD_TO_WISHLIST, payload: product });
export const removeFromWishlist = (id) => ({ type: types.REMOVE_FROM_WISHLIST, payload: id });
export const applyCoupon = (code) => ({ type: types.APPLY_COUPON, payload: code });
