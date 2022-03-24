import React from "react";
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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import BackspaceIcon from "@mui/icons-material/Backspace";

import { useContext } from "react";
import { CartContext } from "../context/Context";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);

function ShoppingCart() {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  return (
    <TableContainer align="right">
      <Table
        // theme={customTheme}
        sx={{ width: 500 }}
        // align="right"
        aria-label="spanning table"
        component={Paper}
        // position="absolute"
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
            <TableRow key={item.data.id}>
              {console.log(item.data)}
              <TableCell button>
                <ListItemAvatar>
                  <img
                    src={item.data.image}
                    alt="Profile Picture"
                    // component="img"
                    width="50px"
                    // image={data.data.image}
                    // alt="green iguana"
                    style={{ objectFit: "contain" }}
                  />
                  {/* <Avatar src={item.data.image} /> */}
                </ListItemAvatar>
                <ListItemText />
              </TableCell>
              <TableCell>{item.data.title}</TableCell>
              <TableCell align="center">
                <TextField
                  sx={{ width: 100 }}
                  id="outlined-number"
                  type="number"
                  //   value={item.qty}
                />
              </TableCell>
              <TableCell align="center">{item.data.price}</TableCell>
              <TableCell align="center">{item.data.price}</TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="error">
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="center">
              Total
            </TableCell>
            <TableCell align="center">{}</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} align="center">
              Clear All
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">
              <Button variant="outlined">
                <BackspaceIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShoppingCart;
