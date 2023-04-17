import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";

export default function FillformScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    book,
    userInfo,
    book: { fillForm },
  } = state;
  const [fullName, setFullName] = useState(fillForm.fullName || "");
  const [date, setDate] = useState(fillForm.date || "");
  const [number, setNumber] = useState(fillForm.number || "")
  const [address, setAddress] = useState(fillForm.address || "");
  const [city, setCity] = useState(fillForm.city || "");
  const [postalCode, setPostalCode] = useState(fillForm.postalCode || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/fillform");
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_FORM_DETAILS",
      payload: {
        fullName,
        date,
        number,
        address,
        city,
        postalCode,
      },
    });
    localStorage.setItem(
      "formdetails",
      JSON.stringify({
        fullName,
        date,
        number,
        address,
        city,
        postalCode,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Fill Form</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Fill Details</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>
              Set Appointment Day : (
              {book.bookItems.map((bookItem) => bookItem.time)})
            </Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="number">
            <Form.Label>
              Your Number
            </Form.Label>
            <Form.Control
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
