import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
function Doctor(props) {
  const { doctor } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    book: { bookItems },
  } = state;
  const addToBookHandler = async (bookItem) => {
    const existItem = bookItems.find((x) => x._id === doctor._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/doctors/${bookItem._id}`);
    if (data.countInAvailability < quantity) {
      window.alert("Sorry. You are out of slot");
      return;
    }
    ctxDispatch({
      type: "ADD_BOOK",
      payload: { ...bookItem, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/doctor/${doctor.specialist}`}>
        <img src={doctor.image} className="card-img-top" alt={doctor.name} />
      </Link>
      <Card.Body>
        <Link to={`/doctor/${doctor.specialist}`}>
          <Card.Title>{doctor.name}</Card.Title>
        </Link>
        <Rating rating={doctor.rating} numReviews={doctor.numReviews} />
        <Card.Text>{doctor.specialist}</Card.Text>
        <Card.Text>Ksh. {doctor.appointmentprice}</Card.Text>
        <Card.Text>Time: {doctor.time}</Card.Text>
        <Card.Text>
          Available booking slot {doctor.countInAvailability}
        </Card.Text>
        {doctor.countInAvailability === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToBookHandler(doctor)}>Book Doctor</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Doctor;
