import React from "react";
import Cards from "./Cards";

import Box from "@mui/material/Box";

function CardBox({ data, addInCart, filter, filteredData }) {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 290px)",
          justifyContent: "center",
        }}
      >
        {filteredData.map((data) => (
          <Cards
            key={data.id}
            data={data}
            addInCart={addInCart}
            filter={filter}
          />
        ))}
      </Box>
    </>
  );
}

export default CardBox;
