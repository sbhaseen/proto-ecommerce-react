import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./Footer.module.css";

export default function Footer(): ReactElement {
  return (
    <footer>
      <Container className="text-center mb-4">
        <p>&copy; ProtoCommerce - {new Date().getFullYear()} </p>
        <Row className={styles.footerIcons}>
          <a href="https://facebook.com">
            <FontAwesomeIcon icon={["fab", "facebook-square"]} />
          </a>
          <a href="https://twitter.com">
            <FontAwesomeIcon icon={["fab", "twitter-square"]} />
          </a>
          <a href="https://instagram.com">
            <FontAwesomeIcon icon={["fab", "instagram-square"]} />
          </a>
        </Row>
      </Container>
    </footer>
  );
}
