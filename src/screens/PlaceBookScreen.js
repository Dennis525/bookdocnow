import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { getError } from "../utils";
import { toast } from "react-toastify";
import Axios from "axios";
import LoadingBox from "../components/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceBookScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { book, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //ROUNDOFF 2 2DP

  book.bookItemsPrice = round2(
    book.bookItems.reduce((a, c) => a + c.quantity * c.appointmentprice, 0)
  );

  book.taxPrice = round2(0.1 * book.bookItemsPrice);

  book.totalPrice = book.bookItemsPrice + book.taxPrice;

  const placeBookHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/book",
        {
          bookItems: book.bookItems,
          fillForm: book.fillForm,
          paymentMethod: book.paymentMethod,
          bookItemsPrice: book.bookItemsPrice,
          taxPrice: book.taxPrice,
          totalPrice: book.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CLEAR_BOOK" });
      dispatch({ typpe: "CREATE_SUCCESS" });
      localStorage.removeItem("bookItems");
      navigate(`/book/${data.book._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!book.paymentMethod) {
      navigate("/payment");
    }
  }, [book, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Book</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Booking</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {book.fillForm.fullName}
                <br />
                <strong>Number: </strong>
                {book.fillForm.number}
                <br />
                <strong>Appointment Date:</strong>
                {book.fillForm.date}
              </Card.Text>
              <Link to="/fillForm">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {book.paymentMethod}
              </Card.Text>
              <Link to="payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Doctors</Card.Title>
              <ListGroup variant="flush">
                {book.bookItems.map((bookItem) => (
                  <ListGroup.Item key={bookItem._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={bookItem.image}
                          alt={bookItem.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/doctor/${bookItem.specialist}`}>
                          {bookItem.name}
                        </Link>
                      </Col>
                      <Col md={2}>
                        <span>{bookItem.specialist}</span>
                      </Col>
                      <Col md={4}>
                        <span>{bookItem.time}</span>
                      </Col>
                      <Col md={2}>
                        <span>Ksh. {bookItem.appointmentprice}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/book">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Book Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Details</Col>
                    <Col>Ksh {book.bookItemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>Ksh. {book.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Book Total</strong>
                    </Col>
                    <Col>
                      <strong>Ksh. {book.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeBookHandler}
                      disabled={book.bookItems.length === 0}
                    >
                      Place Book
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
