import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Styles/header.css";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { WiTime9 } from "react-icons/wi";
import axios from "axios";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {

  const navigate = useNavigate();
  const [search, setsearch] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  const user = JSON.parse(sessionStorage.getItem("user"));

  const userLogout = () => {
    sessionStorage.removeItem("user");
    window.location.assign("/");
  };
  const [AddWayanadPlaces, setAddWayanadPlaces] = useState([]);
  const getAddWayanadPlaces = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getwplace");
      if (res.status === 200) {
        setAddWayanadPlaces(res.data.getwplace);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddWayanadPlaces();
  }, []);
  console.log(AddWayanadPlaces, "search,,,");


  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm, "efiowri");
  //   const searchfilter = AddWayanadPlaces.filter((item)=> item.PlaceCat.toLowerCase().includes(searchpack.toLowerCase()) )
  // console.log(searchfilter,"eru90u9f0")
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search for Destintion",
    "Search for Tours",
    "Search for Packages",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change 2000 to adjust the speed of animation

    return () => clearInterval(interval);
  }, []);

  //integrating get  method
  const [newData, setNewdata] = useState({});
  const [AddDiscount, setAddDiscount] = useState([]);

  const getAddDiscount = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getdiscount");
      if (res.status === 200) {
        setAddDiscount(res.data.getdiscount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddDiscount();
  }, []);
  console.log(AddDiscount);


  

  return (
    <div
      className="headers"
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "999",
        backgroundColor: "white",
      }}
    >
      {/* Top Nav Start */}
      {AddDiscount?.map((item, i) => {
        return (
          <div
            className="top-nav-header"
            style={{ borderBottom: "1px solid lightgray" }}
          >
            <div className="main-header">
              <Container>
                <div className="header-content">
                  <div className="sale-text">
                    <span>
                      <b>{item.SaleName}</b> Save Upto{" "}
                      <b>{item.SalePercentage}</b> On Your Trip
                    </span>
                  </div>

                  <div className="timer-button">
                    <Button
                      variant=""
                      style={{ background: "#686868", color: "white" }}
                    >
                    {item.timeLeft === "Expired" ? "" : item.timeLeft}
                    </Button>
                  </div>
                </div>
              </Container>
              <div className="scrolling-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="60"
                  viewBox="0 0 24 38"
                  fill="none"
                >
                  <path
                    d="M24 0H14.5L5 38H14.5L24 0Z"
                    fill="white"
                    fill-opacity="0.5"
                  ></path>
                  <path
                    d="M12 0H9.95238L0 38H2.04762L12 0Z"
                    fill="white"
                    fill-opacity="0.5"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        );
      })}
      {/* Top Nav End */}

      {["xl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          style={{ padding: "0px", background: "white", zIndex: "999" }}
        >
          <Container>
            {/* <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            > */}
            {/* <Offcanvas.Body
                style={{ padding: "0px 60px", justifyContent: "space-between" }}
              > */}
            <Nav className="" style={{ alignItems: "center" }}>
              <div>
                <a href="/">
                  <img src="../Assets/logo.jpeg" alt="" className="logo-img" />
                </a>{" "}
                <br />
                <b>Made In India With ❤️</b>
              </div>
            </Nav>
           
            <div className="serach mt-3">
              <span style={{ position: "absolute", padding: "8px 5px" }}>
                <IoSearch style={{ fontSize: "20px" }} />
              </span>
              <input
                type="text"
                placeholder={placeholders[placeholderIndex]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="vi_2 text-typer-animation"
                style={{ padding: "6px 28px", borderRadius: "12px" }}
              />
               {searchTerm ? (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    background: "white",
                    top: "67px",
                    left: "36%",
                    padding: "10px 44px",
                    width: "40%",
                  }}
                >
                  {AddWayanadPlaces
                    .filter((item) => {
                      if (searchTerm.value === "") {
                        return item;
                      }
                      if (
                        item.PlaceCat
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return item;
                      } else {
                        return console.log("not found");
                      }
                    })
                    .map((item) => (
                      <div  onClick={() =>
                       navigate("/moreplaces", { state: item.PlaceCat })
                      }>
                        <div className="search-food_0">
                          {/* <img
                             src={`http://localhost:9000/Places/${ele?.placepicture}`}
                            alt="search-image"
                            style={{ width: "40px", height: "40px" }}
                          /> */}
                          <h6 style={{ color: "black" }}>{item.PlaceCat}</h6>
                        </div>
                      </div>
                    ))}
                </div>
              ) : null}
            </div>

            <div className="navbar-right-content">
              {user ? (
                <div className="dropdown" style={{ paddingTop: "9px" }}>
                  <div style={{ color: "#2A9DF4", cursor: "pointer" }}>
                    {/* {user?.profile ? ( */}
                    <Dropdown>
                      <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                        {user?.UProfile ? (
                          <img
                            src={`http://localhost:9000/User/${user?.UProfile}`}
                            style={{
                              borderRadius: "100%",
                              width: "30px",
                              height: "30px",
                            }}
                            alt=""
                          />
                          
                        ) : (
                          <FaRegUserCircle
                            style={{
                              borderRadius: "100%",
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="/bookingdetails">
                          Booking History
                        </Dropdown.Item>
                        <Dropdown.Item onClick={userLogout}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              ) : (
                <Nav.Link href="/login" className="tail-text user">
                  Signup/Login
                </Nav.Link>
              )}
            </div>
            {/* </Offcanvas.Body> */}
            {/* </Navbar.Offcanvas> */}
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default Header;
