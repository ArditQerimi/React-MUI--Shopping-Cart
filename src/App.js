import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import axios from "axios";
import CardBox from "./components/CardBox";

import ShoppingCart from "./components/ShoppingCart";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badge, setBadge] = useState(cartItems.length);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setfilteredData] = useState(data);

  useEffect(() => {
    const newFilteredData = data.filter((data) => {
      return data.title.toLowerCase().includes(searchInput);
    });
    setfilteredData(newFilteredData);
    console.log(newFilteredData);
  }, [data, searchInput]);

  const onSearchChange = (event) => {
    const word = event.target.value.toLowerCase();
    setSearchInput(word);
  };

  const showHideCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addInCart = (product) => {
    console.log([...cartItems]);
    console.log([{ ...product }]);

    // Gjendet nese produkti eshte ne karte
    let isInCart = cartItems.find((item) => item.id === product.id);

    // Pastaj, nese produkti eshte ne karte, atehere mbi keto produkte {...isInCart}
    // shtohet sasia + 1 e produktit isInCart.quantity
    // perndryshe shtohet i gjithe produkti

    if (isInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...isInCart, quantity: isInCart.quantity + 1 }
            : item
        )
      );
    } else {
      // Nese produkti nuk eshte ne karte,
      // ne produktet paraprake ose ne karte te zbrazet  [...cartItems],
      // vendos produktet e reja {...product}
      // plus kuantitetin 1.
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setBadge(badge + 1);
  };

  const removeFromCart = (product) => {
    let isInCart = cartItems.find((item) => item.id === product.id);

    if (isInCart.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...isInCart, quantity: isInCart.quantity - 1 }
            : item
        )
      );
    }
    setBadge(badge - 1);
  };

  const removeProductFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
    setBadge(cartItems.length - 1);
  };

  const clearAll = (product) => {
    setCartItems([]);
    setBadge(0);

    setTimeout(() => {
      showHideCart();
    }, 3000);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Navigation
        showHideCart={showHideCart}
        addInCart={addInCart}
        removeFromCart={removeFromCart}
        badge={badge}
        setBadge={setBadge}
        onChangeHandler={onSearchChange}
        searchInput={searchInput}
      />

      {isCartOpen && (
        <ShoppingCart
          addInCart={addInCart}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          removeProductFromCart={removeProductFromCart}
          clearAll={clearAll}
        />
      )}
      <CardBox
        data={data}
        addInCart={addInCart}
        setData={setData}
        filteredData={filteredData}
      />
    </>
  );
}

export default App;
