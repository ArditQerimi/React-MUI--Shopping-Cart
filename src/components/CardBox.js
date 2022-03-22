import React from "react";
import Cards from "./Cards";
import { useContext } from "react";
import { CartContext } from "../context/Context";
import Box from "@mui/material/Box";

function CardBox() {
  const { cartItems } = useContext(CartContext);
  const { resData, loading, error } = useContext(CartContext);
  //   console.log(cartItems);
  console.log(resData);
  return (
    <>
      <Box
        sx={{
          display: "grid",
          //   gap: 4,
          gridTemplateColumns: "repeat(auto-fit, 290px)",
          justifyContent: "center",
          //   m: 1,
        }}
        // item
        // xs={12}
        // sm={6}
        // md={4}
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
