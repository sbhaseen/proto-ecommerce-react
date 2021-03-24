import axios from "axios";
import React, { ReactElement, useState, useEffect } from "react";
import { Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_PATHS } from "../API";
import { Item, PaginatedItems } from "../common-interfaces";
import PaginationNav from "../components/PaginationNav";
import styles from "./Items.module.css";

export default function Items(): ReactElement {
  const [items, setItems] = useState<PaginatedItems>();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);

  const itemLimit = 12;

  useEffect(() => {
    axios
      .get(`${API_PATHS.getAllItems}?page=${currentPage}&limit=${itemLimit}`)
      .then((res) => {
        setItems(res.data);
        if (res.data.total) {
          setTotalPages(res.data.total.pages);
        }

        if (res.data.next) {
          setNextPage(res.data.next);
        } else {
          setNextPage(null);
        }

        if (res.data.previous) {
          setPreviousPage(res.data.previous);
        } else {
          setPreviousPage(null);
        }
      })
      .catch((err) => {
        return err;
      });
    setLoading(false);
  }, [currentPage]);

  function handleNextPage(): void {
    if (nextPage !== null && nextPage < totalPages) {
      setCurrentPage(nextPage);
    } else {
      return;
    }
  }

  function handlePreviousPage(): void {
    if (previousPage !== null) {
      setCurrentPage(previousPage);
    } else {
      return;
    }
  }

  function handleGoToPage(page: number): void {
    if (page <= totalPages && page > 0) {
      setCurrentPage(page);
    } else {
      return;
    }
  }

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
    <>
      <h1 className="text-center">Items</h1>
      <div className={styles.cardsContainer}>
        {loading ? (
          <h1>Loading...</h1>
        ) : items?.data ? (
          items.data.map(mapCards)
        ) : (
          <p>No Data</p>
        )}
      </div>
      {!loading && items?.data ? (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          <PaginationNav
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
            totalPages={totalPages}
            handleGoToPage={handleGoToPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </Pagination>
      ) : null}
    </>
  );
}
