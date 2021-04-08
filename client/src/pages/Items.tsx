import React, { ReactElement, useState, useEffect } from "react";
import { Container, Pagination } from "react-bootstrap";
import { getAllItems } from "../API";
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

  async function getPaginatedData(
    currentPage: number,
    itemLimit: number
  ): Promise<any> {
    try {
      const res = await getAllItems(currentPage, itemLimit);

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
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPaginatedData(currentPage, itemLimit);
  }, [currentPage, itemLimit]);

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
          <p>Loading...</p>
        ) : items?.data ? (
          items.data.map(MapCards)
        ) : (
          <p>No data to display.</p>
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
