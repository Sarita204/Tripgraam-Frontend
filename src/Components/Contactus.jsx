import React, { useState, useEffect } from "react";
import "../Styles/contactus.css";
import { FaQuestion } from "react-icons/fa";
import { Button, Modal, Row, Container, Card } from "react-bootstrap";
import { TbPhoneCall } from "react-icons/tb";
import { MdMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaPinterestSquare } from "react-icons/fa";
import Aos from "aos";
import axios from "axios";

const Contactus = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  // post method form
  const formdata = new FormData();
  const [GUName, setGUName] = useState("");
  const [GUPhone, setGUPhone] = useState("");
  const [GUEmail, setGUEmail] = useState("");
  const [GUTime, setGUTime] = useState("");
  const [GUMessage, setGUMessage] = useState("");

  const Addgeneralquery = async () => {
    // formdata.append("GrText", GrText);
    try {
      if (!GUName) {
        return alert("Please add name");
      }
      if (!GUEmail) {
        return alert("Please add email ");
      }
      if (!GUPhone) {
        return alert("Please add phone number");
      }
      if (!GUTime) {
        return alert("Please choose availability Time");
      }
      if (!GUMessage) {
        return alert("Please add phone number");
      }

      const config = {
        url: "/user/general",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: {
          GUName: GUName,
          GUPhone: GUPhone,
          GUEmail: GUEmail,
          GUTime: GUTime,
          GUMessage: GUMessage,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        window.location.reload();
        getgeneral();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  // get method form
  const [general, setgeneral] = useState([]);
  const getgeneral = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user/getgeneral");
      if (res.status === 200) {
        setgeneral(res.data.getgeneral);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getgeneral();
  }, []);
  console.log(general);

  //integrating get  method contact us
  const [Addcontactus, setAddcontactus] = useState([]);
  const getAddcontactus = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getcontactus");
      if (res.status === 200) {
        setAddcontactus(res.data.getcontactus);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddcontactus();
  }, []);
  console.log(Addcontactus);

  //integrating get  method contact us
  const [Addsocial, setAddsocial] = useState([]);
  const getAddsocial = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getsocial");
      if (res.status === 200) {
        setAddsocial(res.data.getsocial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddsocial();
  }, []);
  console.log(Addsocial);

  return (
    <div>
      <div className="conatctbg-img">
        <div>
          <h2 className="contact-headding">CONTACT US</h2>
        </div>
      </div>

      <Container>
        <div className="row mb-3">
          <div className="col-md-6">
            <form className="enquiry-form mt-2">
              <div className="col-lg-12 mb-2">
                <label>Name :</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="vi_0 "
                  onChange={(e) => setGUName(e.target.value)}
                />
              </div>

              <div className="col-lg-12 mb-2">
                <label>Email ID :</label>

                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="vi_0 "
                  onChange={(e) => setGUEmail(e.target.value)}
                />
              </div>

              <div className="col-lg-12 mb-2">
                <label>Phone Number :</label>
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  className="vi_0 "
                  onChange={(e) => setGUPhone(e.target.value)}
                />
              </div>

              <div className="col-lg-12 mb-2">
                <label>Availability Time :</label>
                <input
                  type="time"
                  placeholder="Enter the time for your call"
                  className="vi_0"
                  onChange={(e) => setGUTime(e.target.value)}
                />
              </div>

              <textarea
                placeholder="Enter Your Message"
                className="text-area"
                onChange={(e) => setGUMessage(e.target.value)}
              ></textarea>
              <Button variant="" className="submit" onClick={Addgeneralquery}>
                Submit
              </Button>
            </form>
          </div>

          {/* picture & address card  */}
          <div className="col-md-6 mt-2">
            <div
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="3000"
            >
              <img
                src="../Assets/contact.jpg"
                alt=""
                style={{ width: "100%", height: "230px" }}
              />
            </div>

            <div className="col-md-12 mt-2">
              <div
                style={{ boxShadow: "2px 2px 2px 2px black" }}
                data-aos="zoom-in"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="3000"
              >
                <Card>
                  <Card.Body>
                    <div style={{ padding: "2px 10px" }}>
                      <div className="row ">
                        <div className="col-md-2">
                          <p style={{ margin: "revert" }}>
                            <TbPhoneCall style={{ fontSize: "24px" }} />
                          </p>
                        </div>
                        <div className="col-md-8">
                          <div className="">
                            <p style={{ margin: "0px", fontWeight: "bold" }}>
                              Phone Number
                            </p>
                            {Addcontactus?.map((val, i) => {
                              return (
                                <p style={{ margin: "0px" }}>{val.CPhone}</p>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-2">
                          <p style={{ margin: "revert" }}>
                            <MdMailOutline style={{ fontSize: "24px" }} />
                          </p>
                        </div>
                        <div className="col-md-8">
                          <div className="">
                            <p style={{ margin: "0px", fontWeight: "bold" }}>
                              Email ID
                            </p>
                            {Addcontactus?.map((val, i) => {
                              return (
                                <p style={{ margin: "0px" }}>{val.CEmail}</p>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-2">
                          <p style={{ margin: "revert" }}>
                            <CiLocationOn style={{ fontSize: "24px" }} />
                          </p>
                        </div>
                        <div className="col-md-8">
                          <div className="">
                            <p style={{ margin: "0px", fontWeight: "bold" }}>
                              Address
                            </p>
                            {Addcontactus?.map((val, i) => {
                              return (
                                <p style={{ margin: "0px" }}>{val.CAddress}</p>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contactus;
