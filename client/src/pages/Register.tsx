import React, { ReactElement } from "react";
import { Form, Col, Button } from "react-bootstrap";

interface Props {}

export default function Register({}: Props): ReactElement {
  function handleSubmit(): void {}

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter full name" required />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" required />
      </Form.Group>

      <Form.Group controlId="formGridAddress2">
        <Form.Label>Address 2 (Optional)</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State/Province</Form.Label>
          <Form.Control as="select" defaultValue="Choose..." required>
            <option disabled>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip/Postal Code</Form.Label>
          <Form.Control required />
        </Form.Group>
      </Form.Row>

      <Form.Group id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
