import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useContext } from "react";
import { CartContext } from "../context/Context";

const styles = (theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "24px",
  },

  card: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    gridGap: "8px",
    minHeight: 280,
    backgroundImage: `url(https://via.placeholder.com/100x200)`,
    backgroundSize: "cover",
  },

  body: {
    alignSelf: "end",
    textAlign: "center",
  },

  actions: {
    display: "flex",

    justifyContent: "space-between",
  },
});

function Cards(data) {
  console.log(data);
  const { resData, loading, error } = useContext(CartContext);
  //   console.log(loading);

  return (
    <Box>
      <b>{loading ? "loading" : null}</b>
      <b>{error ? error : null}</b>
      <Card
        sx={{
          width: 250,
          height: 370,
          m: 3,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",

          alignContent: "center",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="200px"
            image={data.data.image}
            alt="green iguana"
            style={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
              <b> {data.data.title}</b>
            </Typography>
            <Typography variant="body5" color="text.secondary">
              {/* {data.data.description} */}
            </Typography>
            <Typography>Price: {data.data.price}$</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          size="small"
          style={{ justifyContent: "left" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",

            alignContent: "center",
          }}
        >
          <Button
            sx={{ mt: "auto" }}
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Cards;
