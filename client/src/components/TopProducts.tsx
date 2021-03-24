import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_PATHS } from "../API";
import { Item, PaginatedItems } from "../common-interfaces";
import styles from "./TopProducts.module.css";

export default function TopProducts(): ReactElement {
  const [items, setItems] = useState<PaginatedItems>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_PATHS.getAllItems}?page=${1}&limit=${4}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        return err;
      });
    setLoading(false);
  }, []);

  function mapCards(item: Item): ReactElement {
    return (
      <Card key={item._id} className={styles.cardFit}>
        <Card.Img
          variant="top"
          src={item.image}
          className={styles.cardImages}
        />
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

  return (
    <Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : items?.data ? (
        items.data.map(mapCards)
      ) : (
        <p>No Data</p>
      )}
    </Container>
  );
}
