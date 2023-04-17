import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import DoctorScreen from "./screens/DoctorScreen";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { Store } from "./Store";
import BookScreen from "./screens/BookScreen";
import SigninScreen from "./screens/SigninScreen";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FillformScreen from "./screens/FillformScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceBookScreen from "./screens/PlaceBookScreen";
import BookedScreen from "./screens/BookedScreen";
import BookHistoryScreen from "./screens/BookHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import DoctorListScreen from "./screens/DoctorListScreen";
import DoctorEditScreen from "./screens/DoctorEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import BookListScreen from "./screens/BookListScreen";
import HelpPage from "./screens/HelpScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { book, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("formdetails");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            style={{ backgroundColor: "#343a40", color: "white" }}
            variant="dark"
            expand="lg"
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>BookDocNow</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/book" className="nav-link">
                    Book
                    {book.bookItems.length > 0 && (
                      <Badge pill bg="danger">
                        {book.bookItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/bookhistory">
                        <NavDropdown.Item>Book History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign in
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/doctors">
                        <NavDropdown.Item>Doctors</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/book">
                        <NavDropdown.Item>Books</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  {userInfo && userInfo.isDoc && (
                    <NavDropdown title="Doctor" id="doc-nav-dropdown">
                      <LinkContainer to="/admin/book">
                        <NavDropdown.Item>Books</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  <Link to="/help" className="nav-link">
                    Help
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/doctor/:specialist" element={<DoctorScreen />} />
              <Route path="/book" element={<BookScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/fillform" element={<FillformScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placebook" element={<PlaceBookScreen />} />
              <Route
                path="/book/:id"
                element={
                  <ProtectedRoute>
                    <BookedScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookhistory"
                element={
                  <ProtectedRoute>
                    <BookHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/doctors"
                element={
                  <AdminRoute>
                    <DoctorListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/doctor/:id"
                element={
                  <AdminRoute>
                    <DoctorEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/book"
                element={
                  <AdminRoute>
                    <BookListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/help" element={<HelpPage />}></Route>
            </Routes>
          </Container>
        </main>
        <footer
          style={{ backgroundColor: "#343a40", color: "#f8f9fa" }}
          className="py-3"
        >
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <h5>About Us</h5>
                <p>
                  BookDocNow is a MoH Accredited web based platform to offer
                  healthcare service through appointment to enable patients
                  access quality healthcare. It is affordable and convenient
                  service 🏥
                </p>
              </Col>
              <Col sm={12} md={6}>
                <h5>Contact Us</h5>
                <p>
                  Kijabe Street <br />
                  Parklands, Nairobi <br />
                  Phone: (254) 700 120000 <br />
                  Email: info@bookdocnow.com
                </p>
              </Col>
            </Row>
            <hr />
            <div className="text-center">
              <p>
                &copy; All rights reserved {new Date().getFullYear()} Developed
                by Dennis
              </p>
            </div>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
