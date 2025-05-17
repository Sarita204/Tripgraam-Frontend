import React, { useEffect } from "react";
import { FaUserShield } from "react-icons/fa";
import { BsFillMoonStarsFill, BsSearch, BsSun } from "react-icons/bs";
// import { useTheme } from "../Context/ThemeContext";
import { Form, FormCheck } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import "../Admin/Admin.css";
import swal from "sweetalert";

const AdminHeader = () => {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const logOut = () => {
    swal({
      title: "Yeah!",
      text: "Successfully Logged Out",
      icon: "success",
      button: "Ok!",
    });
    setTimeout(() => {
      window.location.assign("/admin");
    }, 5000);
    sessionStorage.removeItem("admin");
  };

  return (
    <div>
      <div className="header">
        <div className="row justify-content-between align-items-center">
          <div
            className="mb-3"
            style={{
              border: "1px solid #80808029",
              height: "80px",
              backgroundColor: "#80808029",
            }}
          >
            <div
              className="d-flex justify-content-end mt-6"
              style={{ fontSize: "40px", padding: "18px 35px" }}
             
            >
              <AiOutlineLogout  onClick={logOut}
                style={{ color: "rgb(33, 175, 231)", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
