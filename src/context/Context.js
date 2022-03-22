import React from "react";
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  loading: true,
  error: "",
  post: {},
  cartItems: [],
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
    case "ADD_TO_CART": {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //   console.log(children);
  const [state, dispatch] = useReducer(CartReducer, initialState);
  //   console.log(state.post);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR" });
      });
    // res.json());
  }, []);

  return (
    <CartContext.Provider
      value={{
        resData: state.post,
        loading: state.loading,
        error: state.error,
        cartItems: state.cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
