import React from "react";
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  loading: true,
  error: "",
  post: {},
  //   cartItems: [],
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: "",
        post: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: "Something went wrong!",
        post: {},
      };
    // case "ADD_TO_CART": {
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems, action.payload],
    //   };
    // }
    default:
      return state;
  }
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, qty: 1 }],
      };
    }

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    // products: products,
    cartItems: [],
  });

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);

  const addToCart = function(item) {
    console.log(item);
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <CartContext.Provider
      value={{
        resData: state.post,
        loading: state.loading,
        error: state.error,
        cartItems: cartState.cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
