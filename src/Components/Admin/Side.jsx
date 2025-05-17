import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuBookMarked, LuFileQuestion } from "react-icons/lu";
import { FaWeightHanging } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { PiExamFill } from "react-icons/pi";
import { MdOutlineSupportAgent, MdSubject } from "react-icons/md";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import "../Admin/Admin.css";
import Navbar from "react-bootstrap/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Side = () => {
  // Responsive sidebar
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <div>
      <Navbar expand="lg" className=" p-0">
        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
          style={{ margin: "10px" }}
        >
          <span>
            <GiHamburgerMenu style={{ color: "white" }} />
          </span>
        </button>
        <div
          class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <div className="si09">
            <div style={{ width: "100%", justifyContent: "space-between" }}>
              <div
                className="lo-ad"
                style={{
                  background: "rgb(33, 175, 231)",
                  borderBottom: "1px solid white",
                }}
              >
                <div className="">
                  <a href="/" className="tail-text">
                    <img
                      src="../Assets/logo.png"
                      alt="Logo"
                      className="admin-logo-img"
                      style={{ width: "100%" }}
                    />
                  </a>
                </div>
              </div>
              <div className="sidebar-close-icon" onClick={handleNavCollapse}>
                <AiOutlineClose />
              </div>
            </div>
            <ul>
              <Link to="/dashboard" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <MdOutlineSupportAgent style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Dashboard</span>
                </li>
              </Link>

              <Link to="/homebanner" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuAlignHorizontalJustifyStart
                      style={{ fontSize: "20px" }}
                    />
                  </span>
                  <span className="ms-2">Home Banner </span>
                </li>
              </Link>
              <Link to="/aboutus" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuAlignHorizontalJustifyStart
                      style={{ fontSize: "20px" }}
                    />
                  </span>
                  <span className="ms-2">About us</span>
                </li>
              </Link>
              <Link to="/adminservice" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuBookMarked style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Services</span>
                </li>
              </Link>


              <Link to="/adminpackages" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuBookMarked style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Packages</span>
                </li>
              </Link>

              <Link to="/adminplacescategory" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuFileQuestion style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Category</span>
                </li>
              </Link>

              <Link to="/adminplaces" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <IoPeopleOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Place Details</span>
                </li>
              </Link>

              <Link to="/admin_discount" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuFileQuestion style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Sale Discounts</span>
                </li>
              </Link>

              <Link to="/admin_gallery" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <LuFileQuestion style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Gallery</span>
                </li>
              </Link>

              <Link to="/admincontactus" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <MdSubject style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Contact Us</span>
                </li>
              </Link>

              <Link to="/userlist" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <PiExamFill style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">User List</span>
                </li>
              </Link>

              <Link to="/generalenquiry" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">General Enquiries</span>
                </li>
              </Link>

              <Link to="/categoryenquiry" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Category Enquiries</span>
                </li>
              </Link>

              <Link to="/bookinglist" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Booking List</span>
                </li>
              </Link>
              
              <Link to="/admin_testimonial" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Testimonials</span>
                </li>
              </Link>


              
              <Link to="/admin_ratings" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Ratings</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Side;
