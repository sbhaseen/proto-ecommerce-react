import React, { ReactElement, useRef } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
// import { useHistory } from "react-router";

export default function Checkout(): ReactElement {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const streetRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const postalRef = useRef<HTMLInputElement>(null);

  // const history = useHistory();

  // const [error, setError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault();
    return;
  }
  return (
    <>
      <h1>Checkout</h1>
      <Row xs={1} md={2}>
        <Container as={Col} className="order-md-2">
          <h2>Your Cart</h2>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Container>
        <Form as={Col} onSubmit={handleSubmit}>
          {/* {error ? <Alert variant="danger">{error}</Alert> : null} */}

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              ref={nameRef}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              required
            />
          </Form.Group>

          <hr />

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" ref={streetRef} required />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control ref={cityRef} required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State/Province</Form.Label>
              <Form.Control ref={stateRef} required></Form.Control>
            </Form.Group>

            <Form.Group controlId="formGridZip">
              <Form.Label>Zip/Postal Code</Form.Label>
              <Form.Control ref={postalRef} required />
            </Form.Group>
          </Form.Row>

          <hr />

          <Form.Group id="billingShippingSameCheckbox">
            <Form.Check
              type="checkbox"
              label="Shipping address is the same as my billing address"
            />
          </Form.Group>

          <Form.Group id="saveForNextTimeCheckbox">
            <Form.Check
              type="checkbox"
              label="Save this information for next time"
            />
          </Form.Group>

          <hr />

          <h2>Payment</h2>

          <Form.Check type="radio" id="radioCC" label="Credit card" />
          <Form.Check type="radio" id="radioPP" label="PayPal" />

          <br />

          <Form.Row>
            <Form.Group as={Col} controlId="nameOnCard">
              <Form.Label>Name on card</Form.Label>
              <Form.Control type="text" />
              <Form.Text className="text-muted">
                Full name as displayed on card
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="cardNumber">
              <Form.Label>Credit card number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="cardExpiry">
              <Form.Label>Expiry</Form.Label>
              <Form.Control type="month" />
            </Form.Group>

            <Form.Group as={Col} controlId="cardExpiry">
              <Form.Label>CCV</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Confirm Order
          </Button>
        </Form>
      </Row>
    </>
  );
}
