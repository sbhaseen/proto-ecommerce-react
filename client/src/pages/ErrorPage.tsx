import React, { ReactElement } from "react";

export default function ErrorPage(): ReactElement {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>404: Page not found.</h1>
    </div>
  );
}
