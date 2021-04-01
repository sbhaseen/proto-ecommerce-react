import axios from "axios";
import React, { ReactElement, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { API_PATHS } from "../API";

export default function Login(): ReactElement {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const history = useHistory();

  async function handleLogin(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault();

    const userLoginData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      setError("");
      await axios.post(API_PATHS.loginUser, userLoginData);
      history.push("/");
    } catch (error) {
      setError("Failed to login.");
    }
  }

  return (
    <>
      <Form onSubmit={handleLogin} className="mb-4">
        <h1>Login</h1>
        {error ? <Alert>{error}</Alert> : null}
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
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
