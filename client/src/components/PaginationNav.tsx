import React, { ReactElement } from "react";
import { Pagination } from "react-bootstrap";

interface Props {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleGoToPage: (page: number) => void;
}

export default function PaginationNav(props: Props): ReactElement {
  return (
    <Pagination style={{ display: "flex", justifyContent: "center" }}>
      <Pagination.First
        onClick={() => props.handleGoToPage(1)}
        disabled={props.currentPage === 1 ? true : false}
        title="First Page"
      />
      <Pagination.Prev
        onClick={() => props.handlePreviousPage()}
        disabled={props.previousPage === null ? true : false}
        title="Previous Page"
      />
      {/* <Pagination.Item active> */}
      <input
        type="number"
        id="currentPage"
        name="currentPage"
        min="1"
        max={props.totalPages}
        value={props.currentPage}
        onChange={(e) => props.handleGoToPage(parseInt(e.target.value))}
        style={{ width: "6em" }}
      />
      {/* </Pagination.Item> */}
      <Pagination.Item disabled>of</Pagination.Item>
      <Pagination.Item disabled>{props.totalPages}</Pagination.Item>

      <Pagination.Next
        onClick={() => props.handleNextPage()}
        disabled={props.nextPage === null ? true : false}
        title="Next Page"
      />
      <Pagination.Last
        onClick={() => props.handleGoToPage(props.totalPages)}
        disabled={props.currentPage === props.totalPages ? true : false}
        title="Last Page"
      />
    </Pagination>
  );
}
