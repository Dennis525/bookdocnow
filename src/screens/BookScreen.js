import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function BookScreen() {
    const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    book: { bookItems },
  } = state;

  const removeBookItemHandler = (bookItem) => {
    ctxDispatch({type: 'REMOVE_BOOK_ITEM',payload: bookItem})
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/fillform');
  }
  return (
    <div>
      <Helmet>
        <title>Booking Details</title>
      </Helmet>
      <h1>Booking Details</h1>
      <Row>
        <Col md={8}>
          {bookItems.length === 0 ? (
            <MessageBox>
              No booking details. <Link to="/">Go Booking</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {bookItems.map((bookItem) => (
                <ListGroup.Item key={bookItem._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={bookItem.image}
                        alt={bookItem.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/doctor/${bookItem.specialist}`}>
                        {bookItem.specialist}
                      </Link>
                    </Col>
                    <Col md={3}>
                        {bookItem.location}
                    </Col>
                    <Col md={3}>Ksh {bookItem.appointmentprice}</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={() => removeBookItemHandler(bookItem)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({bookItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    bookings) : Ksh
                    {bookItems.reduce(
                      (a, c) => a + c.appointmentprice * c.quantity,
                      0
                    )}{" "}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={bookItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
