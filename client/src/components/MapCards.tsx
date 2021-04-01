import React, { ReactElement } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Item } from "../common-interfaces";
import styles from "./MapCards.module.css";

export default function MapCards(item: Item): ReactElement {
  return (
    <Card key={item._id} className={styles.cardFit}>
      <Card.Img variant="top" src={item.image} className={styles.cardImages} />
      <Card.Body>
        <Card.Title>{item.productName}</Card.Title>
        <Card.Text>{item.brand}</Card.Text>
        <Card.Text>
          <Link to={`/items/${item._id}`}>View Product</Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">In Stock: {item.stockQty}</small>
      </Card.Footer>
    </Card>
  );
}
