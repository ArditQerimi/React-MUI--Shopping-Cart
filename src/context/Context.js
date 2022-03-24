import React from "react";
import { createContext, useReducer, useEffect, useContext } from "react";
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
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "SHOW_HIDE_CART": {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }

    // return {
    //   ...state,
    //   item: state.item.filter((curElem) => {
    //     return curElem.id !== action.payload;
    //   }),
    // };
    // case "CART_QTY":
    //   const updatedCart = state.item.map((curElem) => {
    //     if (curElem.id === action.payload) {
    //       return { ...curElem, quantity: curElem.quantity + 1 };
    //     }
    //     return curElem;
    //   });

    //   return { ...state, item: updatedCart };

    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    // products: products,
    showCart: false,
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
    // console.log(item);
    cartDispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = function(id) {
    console.log(id);
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const showHideCart = () => {
    cartDispatch({ type: "SHOW_HIDE_CART" });
  };

  const changeQuantity = function(item) {
    return cartDispatch({
      type: "CART_QTY",
      payload: item,
    });

    // dispatch({
    //   type: "CART_QTY",
    //   payload: {
    //     id: item.id,
    //     quantity: e.target.value,
    //   },
    // });
  };

  return (
    <CartContext.Provider
      value={{
        resData: state.post,
        loading: state.loading,
        error: state.error,
        cartItems: cartState.cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        showHideCart,
        showCart: cartState.showCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return useContext(CartContext);
};
