import axios from "axios";
import React, { ReactElement, useState, useEffect } from "react";
import { Container, Pagination } from "react-bootstrap";
import { API_PATHS } from "../API";
import { PaginatedItems } from "../common-interfaces";
import MapCards from "../components/MapCards";
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
    if (nextPage === null) return;
    if (nextPage > totalPages) return;

    setCurrentPage(nextPage);
  }

  function handlePreviousPage(): void {
    if (previousPage === null) return;

    setCurrentPage(previousPage);
  }

  function handleGoToPage(page: number): void {
    if (page > totalPages) return;
    if (page <= 0) return;

    setCurrentPage(page);
  }

  return (
    <>
      <h1 className="text-center">Items</h1>
      <Container className={styles.cardsContainer}>
        {loading ? (
          <h1>Loading...</h1>
        ) : items?.data ? (
          items.data.map(MapCards)
        ) : (
          <p>No Data</p>
        )}
      </Container>
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
