import * as types from "./actionTypes";

const initialState = {
  cart: [],
  wishlist: [],
  discount: 0,
  appliedCoupon: null,
};

// Example coupons
const COUPONS = {
  SAVE10: 10,
  SAVE20: 20,
  FLAT50: 50,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART: {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }

    case types.REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case types.INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case types.DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };

    case types.ADD_TO_WISHLIST: {
      const exists = state.wishlist.find((item) => item.id === action.payload.id);
      if (exists) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }

    case types.REMOVE_FROM_WISHLIST:
      return { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload) };

    case types.APPLY_COUPON: {
      const percent = COUPONS[action.payload];
      if (!percent) return { ...state, discount: 0, appliedCoupon: null };
      return { ...state, discount: percent, appliedCoupon: action.payload };
    }

    default:
      return state;
  }
};

export default reducer;
