import React, { ReactElement, useRef, useState } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth, handleRegisterUser } from "../contexts/AuthContext";

export default function Register(): ReactElement {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const psw1Ref = useRef<HTMLInputElement>(null);
  const psw2Ref = useRef<HTMLInputElement>(null);

  const streetRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const postalRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const [error, setError] = useState("");

  const { dispatch } = useAuth();

  async function handleSubmit(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault();

    if (psw1Ref.current?.value !== psw2Ref.current?.value) {
      return setError("Passwords do not match.");
    }

    const newUserData = {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      password: psw1Ref.current!.value,
      street: streetRef.current!.value,
      city: cityRef.current!.value,
      state: stateRef.current!.value,
      postalCode: postalRef.current!.value,
      country: countryRef.current!.value,
    };

    try {
      setError("");
      await handleRegisterUser(dispatch, newUserData);
      history.push("/");
    } catch (error) {
      if (!error.response) {
        setError("Failed to register user.");
      }
      setError(error.response.data.message);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4">
        <h1>Register</h1>

        {error ? <Alert variant="danger">{error}</Alert> : null}

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

        <Form.Group controlId="formGridPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={psw1Ref}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGridPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={psw2Ref}
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

          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control ref={countryRef} required></Form.Control>
          </Form.Group>

          <Form.Group controlId="formGridZip">
            <Form.Label>Zip/Postal Code</Form.Label>
            <Form.Control ref={postalRef} required />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="I am not a robot." required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <p>
        Already have an account? Login <Link to="login">here</Link>.
      </p>
    </>
  );
}
