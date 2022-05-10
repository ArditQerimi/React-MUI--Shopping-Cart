import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import BackspaceIcon from "@mui/icons-material/Backspace";

function ShoppingCart({
  cartItems,
  addInCart,
  removeFromCart,
  removeProductFromCart,
  clearAll,
}) {
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  return (
    <>
      {
        <TableContainer align="right">
          <Table
            sx={{ width: 500 }}
            aria-label="spanning table"
            component={Paper}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Shopping Cart
                </TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center" colSpan={4}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product images</TableCell>
                <TableCell>List of Products</TableCell>
                <TableCell align="center">Qty.</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Sum</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item.id}
                  style={{
                    alignItems: "center",
                  }}
                >
                  <TableCell button>
                    <ListItemAvatar>
                      <img
                        src={item.image}
                        width="70px"
                        height="70px"
                        image={item.image}
                        style={{ objectFit: "contain", borderRadius: 35 }}
                      />
                    </ListItemAvatar>
                    <ListItemText />
                  </TableCell>
                  <TableCell>
                    {/* Title */}
                    {item.title}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="25px"
                      variant="contained"
                      color="error"
                      onClick={() => addInCart(item)}
                    >
                      +
                    </Button>
                    <Box>{item.quantity}</Box>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </Button>
                  </TableCell>
                  <TableCell align="center">$</TableCell>
                  <TableCell align="center">
                    {/* Price */}
                    {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeProductFromCart(item)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Total
                </TableCell>
                <TableCell align="center">{totalPrice.toFixed(2)}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Clear All
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => clearAll()}>
                    <BackspaceIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
}

export default ShoppingCart;
