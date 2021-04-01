import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { API_PATHS } from "../API";
import { Item } from "../common-interfaces";

interface ParamTypes {
  id: string;
}

export default function ItemDetails(): ReactElement {
  let { id } = useParams<ParamTypes>();

  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_PATHS.getItemById}${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => history.push("/err"));

    setLoading(false);
  }, [history, id]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Row xs={1} md={2}>
          <Col>
            <Image src={item?.image} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>Product: {item?.productName}</Card.Text>
                <Card.Text>Brand: {item?.brand}</Card.Text>
                <Card.Text>
                  Stock Quantity: {item?.stockQty ?? `Out of Stock`}
                </Card.Text>
                <Card.Text>Price: {item?.price.toFixed(2)}</Card.Text>
                <Button>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
