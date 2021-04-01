import React, { ReactElement } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart(): ReactElement {
  return (
    <>
      <h1>Shopping Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Alpha</td>
            <td>2</td>
            <td>$4.00</td>
            <td>$8.00</td>
            <td>Remove</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Beta</td>
            <td>1</td>
            <td>$1.00</td>
            <td>$1.00</td>
            <td>Remove</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Gamma</td>
            <td>1</td>
            <td>$5.00</td>
            <td>$5.00</td>
            <td>Remove</td>
          </tr>
        </tbody>
      </Table>
      <p>Sub-total:</p>
      <p>Taxes:</p>
      <p>Total:</p>
      <Button as={Link} to="checkout">
        Checkout
      </Button>
    </>
  );
}
