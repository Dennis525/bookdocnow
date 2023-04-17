import { useEffect, useReducer, useState } from "react";

//import data from "../data";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Doctor from "../components/Doctor";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, doctors: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  //const [doctors, setDoctors] = useState([]);
  const [{ loading, error, doctors }, dispatch] = useReducer(logger(reducer), {
    doctors: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/doctors");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setDoctors(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>BookDocNow</title>
      </Helmet>
      <h1>Featured Doctors</h1>
      <div className="doctors">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {doctors.map((doctor) => (
              <Col key={doctor.name} sm={6} md={4} lg={3} className="mb-3">
                <Doctor doctor={doctor}></Doctor>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
