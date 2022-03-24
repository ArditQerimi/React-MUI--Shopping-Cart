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

function Cards(data) {
  //   console.log(data);
  const { loading, error, addToCart } = useContext(CartContext);

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
            onClick={() => addToCart(data)}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Cards;
