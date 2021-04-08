import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_PATHS } from "../API";
import { PaginatedItems } from "../common-interfaces";
import MapCards from "../components/MapCards";
import styles from "./Home.module.css";

export default function Home(): ReactElement {
  const [items, setItems] = useState<PaginatedItems>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_PATHS.getAllItems}?page=${1}&limit=${3}`)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    <>
      <Jumbotron>
        <h1>Welcome to an E-Commerce Starter Site!</h1>
        <p>
          All your online shopping needs in one place!{" "}
          <Link to="login">Login</Link> or <Link to="register">Register</Link>{" "}
          now to get started.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>

      {loading ? (
        <h1>Loading...</h1>
      ) : items?.data ? (
        <Container>
          <h2>Featured Items</h2>
          <Container className={styles.cardsContainer}>
            {items.data.map(MapCards)}
          </Container>
        </Container>
      ) : null}
    </>
  );
}
