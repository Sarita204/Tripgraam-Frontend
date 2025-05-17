import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Styles/footer.css";
import { Button } from "react-bootstrap";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { BiUpArrowAlt } from "react-icons/bi";
import axios from "axios";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
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
      <div
        className="footer"
        style={{
          // backgroundImage: "url('../Assets/wave2.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <div class="ocean">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <Container className="mt-5">
          <div className="footer-0">
            <Row>
              <Col md={4} className="px-3">
                <div className="provid">
                  <img
                    src="../Assets/logo.jpeg"
                    alt=""
                    style={{ width: "200px", height: "60px" }}
                  />
                  {Addcontactus?.map((item, i) => {
                    return (
                      <p
                        className="mt-2"
                        style={{
                          color: "white",
                          textAlign: "justify",
                          fontSize: "18px",
                        }}
                      >
                        {item.CAddress}
                        {/* At Tripgraam, we are passionate about making travel dreams come true. Whether you're planning a solo adventure, a family or Friends vacation getaway, we're here to make it happen. Join us on this journey and let's explore the world together! */}
                      </p>
                    );
                  })}
                </div>
              </Col>
              <Col md={4} className="">
                <div className="provid">
                  <h5>Useful Links</h5>

                  <ul className="pro-links">
                    <li>
                      <a href="/munnarplacedetails">Munnar</a>
                    </li>
                    <li>
                      <a href="/wayanadplacedetails">Wayanad</a>
                    </li>
                    <li>
                      <a href="/gallery">Gallery</a>
                    </li>
                    <li>
                      <a href="/contactus">Contact us</a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={4} className="px-2">
                <div className="provid">
                  <h5>Contact Us</h5>
                  {Addcontactus?.map((item, i) => {
                    return (
                      <ul className="pro-links">
                        <li>
                          <a href="/">{item.CEmail}</a>
                        </li>
                        <li>
                          <a href="/">{item.CPhone}</a>
                        </li>
                      </ul>
                    );
                  })}
                  <div className="d-flex gap-2 text-align-center align-items-center m-auto justify-content-center">
                    <div>
                      {Addsocial?.map((item, i) => {
                        return (
                          <a href={item.CLink}>
                            <span>
                              <img
                                src={`http://localhost:9000/Contactus/${item?.CIcon}`}
                                alt=""
                                className="s-icon-img"
                              />
                            </span>
                          </a>
                        );
                      })}
                    </div>

                    {/* <div>
                      <FaSquareWhatsapp
                        style={{ fontSize: "30px", color: "#19c4e3" }}
                      />
                    </div>
                    <div>
                      <FaSquareInstagram
                        style={{ fontSize: "30px", color: "#19c4e3" }}
                      />
                    </div>
                    <div>
                      <FaSquareXTwitter
                        style={{ fontSize: "30px", color: "#19c4e3" }}
                      />
                    </div> */}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
