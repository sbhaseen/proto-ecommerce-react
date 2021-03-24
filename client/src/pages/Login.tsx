import React, { ReactElement } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

export default function Login({}: Props): ReactElement {
  function handleLogin(): void {}

  return (
    <>
      <Form onSubmit={handleLogin} className="mb-4">
        <h1>Login</h1>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <p>
        Need an account? Register <Link to="register">here</Link>.
      </p>
    </>
  );
}
