import React, { useState, useEffect } from "react";
import "../Styles/viewmore.css";
import { CgSearch } from "react-icons/cg";
import { Button, Card, Modal, Row, Container } from "react-bootstrap";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import Aos from "aos";
import OwlCarousel from "react-owl-carousel";
import { GoArrowDown } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { MdCall } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import { FaStar } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";

const MorePlaces = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const location = useLocation();
  const data = location.state;
console.log("data", data);
  const [edit, setEdit] = useState({});

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setCUMessage(data);
  };

  // post method form
  const formdata = new FormData();
  const [CUName, setCUName] = useState("");
  const [CUPhone, setCUPhone] = useState("");
  const [CUEmail, setCUEmail] = useState("");
  const [CUMessage, setCUMessage] = useState("");
  const [CatTime, setCatTime] = useState("");
  const [CMember, setCMember] = useState("");
  const [CatName, setCatName] = useState("");

  const Addcategoryenquery = async () => {
    try {
      if (!CUName) {
        return alert("Please add name");
      }
      if (!CUPhone) {
        return alert("Please add email ");
      }
      if (!CUEmail) {
        return alert("Please add phone number");
      }
      if (!CUMessage) {
        return alert("Please add phone number");
      }
      if (!CatTime) {
        return alert("Please Choose time");
      }

      if (!CatName) {
        return alert("Please  Choose name");
      }
      if (!CMember) {
        return alert("Please add Member");
      }

      const config = {
        url: "/user/category",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "application/json" },
        data: {
          CUName: CUName,
          CUPhone: CUPhone,
          CUEmail: CUEmail,
          CUMessage: CUMessage,
          CatTime: CatTime,
          CatName: CatName,
          CMember: CMember,
          placeName: edit?.PlaceName,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getcategory();
        handleClose1();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [Addcategory, setAddcategory] = useState([]);
  const getcategory = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user/getcategory");
      if (res.status === 200) {
        setAddcategory(res.data.getcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategory();
  }, []);
  console.log(Addcategory);

  // Best of Tripgraam get method
  const [AddServices, setAddServices] = useState([]);
  const getAddServices = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getservice");
      if (res.status === 200) {
        setAddServices(res.data.getservice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddServices();
  }, []);

  //integrating get  method
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
  console.log("AddWayanadPlaces", AddWayanadPlaces);
  useEffect(() => {
    getAddWayanadPlaces();
  }, []);
  console.log(AddWayanadPlaces);

    //integrating get  method
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
    <div>
      <div>
        <div className="best-of-tripgram-component mt-5 mb-3">
          <Container>
            <div className="row">
              {AddWayanadPlaces.filter(
                (items) => items?.PlaceCat === data
              )?.map((item, i) => {
                return (
                  <div className="col-md-4 mb-3" data-aos="fade-down"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                    <div className="card">
                      <Card.Img
                        variant="top"
                        src={`http://localhost:9000/Places/${item?.PlaceImage}`}
                        className="moreplace-card-img"
                      />
                     <Card.Body>
                          <Card.Title>{item.PlaceName}</Card.Title>
                          <Card.Text>
                            <div className="d-flex justify-content-between mb-2">
                              {AddDiscount?.map((item, i) => {
                                return (
                                  <div
                                    className="mb-2"
                                    style={{
                                      backgroundColor: "#16cae5",
                                      color: "black",
                                      padding: "0px 5px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {item.SaleName}
                                  </div>
                                );
                              })}
                            </div>
                            <div className=" d-flex gap-2 mb-2">
                              INR {item.ActualPrice}
                              <span style={{ textDecoration: "line-through" }}>
                                INR {item.OfferPrice}
                              </span>{" "}
                            </div>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <div className="d-flex gap-2 mb-2">
                          <Button
                            onClick={() =>
                              navigate("/viewplace", { state: item })
                            }
                            variant=""
                            style={{ border: "2px solid lightblue" }}
                          >
                            <IoIosEye style={{ fontSize: "20px" }} />
                          </Button>
                          <Button
                            variant=""
                            onClick={() => {
                              handleShow1();
                              setEdit(item);
                            }}
                            className="book-now"
                            style={{ width: "100%", margin: "0" }}
                          >
                            Request a Callback
                          </Button>
                        </div>
                      </Card.Footer>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </div>

      {/* Enquiry Modal */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            {" "}
            Request a Callback Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label className="fw-bold">Choose Package</label>

              <select
                className="form-control"
                onChange={(e) => setCatName(e.target.value)}
              >
                <option value="">Select Package</option>
                {AddServices?.map((item, i) => {
                  return (
                    <option value={item.ServiceText}>{item.ServiceText}</option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Name</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter name"
                onChange={(e) => setCUName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Phone Number</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter phone number"
                onChange={(e) => setCUPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add mail ID</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Email id"
                onChange={(e) => setCUEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Choose Time</label>
              <input
                type="time"
                className="vi_0"
                placeholder="Enter availability time"
                onChange={(e) => setCatTime(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>How Many Members</label>
              <input
                type="number"
                className="vi_0"
                placeholder="Enter Email id"
                onChange={(e) => setCMember(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Message</label>
              <CKEditor editor={ClassicEditor} onChange={handleChange} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              background: "black ",
              color: "white",
            }}
            onClick={Addcategoryenquery}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MorePlaces;
