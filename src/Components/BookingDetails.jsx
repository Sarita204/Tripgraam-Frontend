import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Table,
  Row,
  Modal,
} from "react-bootstrap";
import "../Styles/profile.css";
import { FaLocationDot, FaPhone, FaPlus } from "react-icons/fa6";
import axios from "axios";
import moment from "moment/moment";

const BookingDetails = () => {

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [show9, setShow9] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [booked, setBooked] = useState(true);

  const [View, setView] = useState({});
  console.log(View.PackageName,"PackageName")
  const [rating, setRating] = useState("");

  //integrating get  method
  const [BookingLocation, setBookingLocatione] = useState("");
  const [Addbooking, setAddbooking] = useState([]);
  const getbooking = async () => {
    try {
      let res = await axios.get(
        `http://localhost:9000/api/user/getbookingById/${user._id}`
      );
      if (res.status === 200) {
        setAddbooking(res.data.getbooking);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getbooking();
  }, []);
  console.log(Addbooking, "q8wr98eqr9y");


  const [rate, setrate] = useState("");
  const [RpackageName, setRpackageName] = useState("")
  const [comment, setcomment] = useState("");
  const makeRating = async () => {
    if (!rate) return alert("Please select rate");
    try {
      const config = {
        url: "/api/admin/Ratings",
        method: "post",
        baseURL: "http://localhost:9000",
        headers: { "content-type": "application/json" },
        data: {
          RuserName: user?.UName,
          RuserMail: user?.UEmail,
          RuserMobile: user?.UPhone,
          rate: rate,
          comment: comment,
          packagename:View?.PackageName,

        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Thanks for give rating");
        handleClose7();
      }
    } catch (error) {
      console.log(error);
    }
  };


  //integrating get  method
  const [PackageName, setPackageName] = useState({});
  const [AddPackage, setAddPackage] = useState([]);
  const getAddPackage = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getpackage");
      if (res.status === 200) {
        setAddPackage(res.data.getpackage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddPackage();
  }, []);
  // console.log(AddPackage);

  //integrating get  method
  const [edit, setEdit] = useState({});
  const [AddRatings, setAddRatings] = useState([]);
  const getRatings = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getRatings");
      if (res.status === 200) {
        setAddRatings(res.data.getRatings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRatings();
  }, []);
  // console.log(AddRatings,"yyyyyyyyyyyyyyyy");


  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.patch(
        `http://localhost:9000/api/user/updateServiceBooking/${bookingId}`,
        { status }
      );
      getbooking(); // Refresh the booking data after update
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div>
      <div className="Booked-history-component">
        <h3 style={{ textAlign: "center" }}>Booked Service History</h3>
        <div className="Booked-history">
          <div className="Booked-history-buttons">
            <div
              className="booked-title"
              onClick={() => {
                setCompleted(false);
                setBooked(true);
              }}
            >
              Booked Services
            </div>
            <div
              className="booked-title"
              onClick={() => {
                setCompleted(true);
                setBooked(false);
              }}
            >
              Completed Services
            </div>
          </div>
        </div>

        {completed ? (
          <div>
            <h2
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Completed Services
            </h2>
            {Addbooking?.filter(
              (ele) => ele?.userId === user?._id && ele?.status === "Completed"
            ).map((item) => {
              return (
                <div
                  className="order-details-container mt-2 mb-2"
                  key={item._id}
                >
                  <div className="first-box" style={{ display: "flex" }}>
                    <div className="order-details">
                      <div>
                        <h5>Date </h5>
                        <p>{moment(item.BookingDate).format("MMM Do YYYY ")}</p>
                      </div>
                    </div>
                    <div className="order-details">
                      <div>
                        <h5>Package Name </h5>
                        <div>{item?.PackageName}</div>
                      </div>
                    </div>
                    <div className="order-details">
                      <div>
                        <h5>Location</h5>
                        <div>{item?.BookingLocation}</div>
                      </div>
                    </div>

                    <div className="order-details">
                      <div>
                        <h5>Members</h5>
                        <p>{item.TotalBookingUsers}</p>
                      </div>
                    </div>

                    <div className="order-details">
                      <div>
                        <h5>Days</h5>
                        <p>{item.TotalBookingDays}</p>
                      </div>
                    </div>

                    <div className="order-details">
                      <h5>Status</h5>
                     <div className="d-flex gap-3">
                     <Button
                        className="add-booking mt-2"
                        onClick={() =>
                          updateBookingStatus(item._id, "Completed")
                        }
                      >
                        {item.status}
                      </Button>

                      <Button
                        className="add-booking mt-2"
                        onClick={() => {
                          setView(item);
                          handleShow7();
                        }}
                      >
                        
                        Review
                      </Button>
                     </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : booked ? (
          <div>
            <h2
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "2rem",
                fontWeight: "700",
              }}
            >
              Booked Services
            </h2>
            {Addbooking?.filter(
              (ele) => ele?.userId === user?._id && ele?.status !== "Completed"
            ).map((item) => {
              return (
                <div
                  className="order-details-container mt-2 mb-2"
                  key={item._id}
                >
                  <div className="first-box" style={{ display: "flex" }}>
                    <div className="order-details">
                      <div>
                        <h5>Date </h5>
                        <p>{moment(item.BookingDate).format("MMM Do YYYY ")}</p>
                      </div>
                    </div>
                    <div className="order-details">
                      <div>
                        <h5>Package Name </h5>
                        <div>{item?.PackageName}</div>
                      </div>
                    </div>
                    <div className="order-details">
                      <div>
                        <h5>Location</h5>
                        <div>{item?.BookingLocation}</div>
                      </div>
                    </div>

                    <div className="order-details">
                      <div>
                        <h5>Members</h5>
                        <p>{item.TotalBookingUsers}</p>
                      </div>
                    </div>

                    <div className="order-details">
                      <div>
                        <h5>Days</h5>
                        <p>{item.TotalBookingDays}</p>
                      </div>
                    </div>

                    <div className="order-details">
                      <h5>Status</h5>
                      <Button
                        className="add-booking mt-2"
                        onClick={() => updateBookingStatus(item._id, "Pending")}
                      >
                        {item.status}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* View Modal */}
      <Modal show={show5} onHide={handleClose5} style={{ zIndex: "9999999" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-3 mb-2">
            <div>
              <h5>Booking Date:</h5> <br />
              <p>{moment(View.BookingDate).format("MMM Do YYYY ")}</p>
            </div>
          </div>
          <h5>Booking Date:</h5>
          <p>{moment(View.PickupDate).format("MMM Do YYYY")}</p>
          <h5>Package Name:</h5>
          <p>{View.ServiceName}</p>
          <h5>Location:</h5>
          <p>{View.Location}</p>
          <h5>Members:</h5>
          <p>{View.TotalBookingUsers}</p>
          <h5>Days:</h5>
          <p>{View.Days}</p>
          <h5>Price:</h5>
          <p>₹{View.TotalPrice}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose5}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Review Modal */}
      <Modal show={show7} onHide={handleClose7} style={{ zIndex: "9999999" }}>
          <Modal.Header closeButton></Modal.Header>
          <h4 style={{ textAlign: "center", color: "#19c4e3" }}>Review Here</h4>
          <Modal.Body>
            <div
              id="form"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog"
                role="document"
              >
                <div className="modal-content">
                  <div className="card-body text-center">
                    <img
                    alt=""
                      src=" https://i.imgur.com/d2dKtI7.png"
                      height="100"
                      width="100"
                    />
                    <div className="comment-box text-center">
                      <h4>Add a Review</h4>
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating"
                          value="5"
                          id="5"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="5">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="4"
                          id="4"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="4">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="3"
                          id="3"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="3">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="2"
                          id="2"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="2">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="1"
                          id="1"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="1">☆</label>
                      </div>
                      <div className="comment-area">
                        {" "}
                        <textarea
                          class="form-control1"
                          placeholder="Mention Your Feedback here"
                          rows="4"
                          onChange={(e) => setcomment(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="text-center mt-4">
                        {" "}
                        <button
                          class="btn  px-5"
                          onClick={makeRating}
                          style={{
                            backgroundColor:"#19c4e3",
                          }}
                        >
                          Send <i class="fa fa-long-arrow-right ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  );
};

export default BookingDetails;
