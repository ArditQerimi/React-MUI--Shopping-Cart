import React from "react";
import Cards from "./Cards";
import { useContext } from "react";
import { CartContext } from "../context/Context";
import Box from "@mui/material/Box";
// console.log(CartContext);

function CardBox() {
  const { cartItems } = useContext(CartContext);
  const { resData, loading, error } = useContext(CartContext);
  //   console.log(cartItems);
  console.log(resData);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
          p: 1,
          my: 4,

          bgcolor: "background.paper",
          borderRadius: 4,
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* <b>{loading ? "loading" : null}</b>
        <b>{error ? error : null}</b> */}

        {resData.length > 0
          ? resData.map((data) => <Cards key={data.id} data={data} />)
          : ""}
        {/* <Cards /> */}
      </Box>
    </>
  );
}

export default CardBox;
