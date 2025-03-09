import React, { useState, useEffect } from "react";
import "./index.css";
import userProfile from "../../../src/images/profile.png"
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Modal,
  Form,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { googleProvider, Firebase } from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

const NavbarSelf = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Checking Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Sign In Handler
  const SignInHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", { position: "top-right" });
      navigate("/");
      setShow(false);
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  // Sign Up Handler
  const SignUpHandler = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful!", { position: "top-right" });
      navigate("/");
      setShow(false);
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Success:", result.user);
      toast.success(`Welcome ${result.user.displayName}! 🎉`);
      setShow(false);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error(error.message);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", { position: "top-right" });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container fluid className="navbar-sub-container">
          <Navbar.Brand href="#" className="navbar-logo">
            Khushal Rathore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="offcanvasNavbarLabel"
                className="navbar-logo"
              >
                Khushal Rathore
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="offcanvas-body">
              <Nav className="flex-grow-1 pe-3 pages-conatiner">
                <Nav.Link as={Link} to="/" className="pages-name">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className="pages-name">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/portfolio" className="pages-name">
                  Portfolio
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className="pages-name">
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to="/services" className="pages-name">
                  Services
                </Nav.Link>

                {/* <NavDropdown title="More" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action1">Skills</NavDropdown.Item>
                  <NavDropdown.Item href="#action2">Portfolio</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>

              {/* User Auth Section */}
              {user ? (
                    <NavDropdown
                    className="custom-dropdown"
                    title={
                      <Image
                        src={user.photoURL || userProfile}
                        roundedCircle
                        alt="Profile Photo"
                        className="profile"
                      />
                    }
                    id="offcanvasNavbarDropdown"
                    align="end"
                    menuAlign={{ lg: "right" }} // ✅ Large screens ke liye align right
                  >
                    <NavDropdown.Item disabled>{user.email}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout} className="text-danger">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
              ) : (
                <Button className="sign-in-btn" onClick={() => setShow(true)}>
                  Sign In
                </Button>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>


      {/*  Sign In/Sign Up Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered className="modal">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{isSignUp ? "Sign Up" : "Sign In"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {isSignUp ? (
              <Button
                // variant=""
                className="btn-signup w-100"
                onClick={SignUpHandler}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                // variant=""
                className="btn-login w-100"
                onClick={SignInHandler}
              >
                Login
              </Button>
            )}

            <Button
              // variant="danger"
              className="btn-google mt-2"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
            <p className="mt-3 text-center">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign in here" : "Sign up here"}
              </Button>
            </p>
          </Form>
        </Modal.Body>
      </Modal>


      {/* profile modal  */}
      <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={user?.photoURL || userProfile}
            roundedCircle
            width={100}
            className="mb-3"
          />
          <h5>{user?.displayName || "User Name"}</h5>
          <p>{user?.email}</p>
        </Modal.Body>
      </Modal>


    </div>
  );
};

export default NavbarSelf;
