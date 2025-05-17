import React, { useState } from "react";
import "../Styles/login.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate();

  const [UEmail, setUEmail] = useState("");
  const [RPsswrd, setRPsswrd] = useState("");

  const loginUser = async () => {
    try {
      const config = {
        url: "/user/userLogin",
        method: "post",
        baseURL: "http://localhost:9000/api",
        headers: { "content-type": "application/json" },
        data: { UEmail: UEmail, RPsswrd: RPsswrd },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully login");
        sessionStorage.setItem("user", JSON.stringify(res.data.success));
        window.location.assign("/");
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login-bg">
        <div className="container">
          <div className="mt-1 item">
            <div className="log-0">
              <div
                className="urban-0"
                style={{
                  backgroundImage: "url('../Assets/login1.jpg')",
                  height: "400px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  padding: "120px 0px",
                  width: "421px",
                  objectFit:"cover"
                }}
              >
                <h2 className="login-caption">
                  Welcome To <br />
                  Tripgraam
                </h2>
                <div className="mobile-dif ">
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "gray",
                    }}
                  >
                    Enter your Email ID
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder=" Enter your Email ID "
                      className="vi_0"
                      value={UEmail}
                      onChange={(e) => setUEmail(e.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "gray",
                    }}
                  >
                    Enter your Password
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder=" Enter your password"
                      className="vi_0"
                      value={RPsswrd}
                      onChange={(e) => setRPsswrd(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    variant=""
                    className="login-btn mt-2 mb-1"
                    onClick={(e) => loginUser(e)}
                  >
                    <a style={{ color: "white" }}>Log in</a>
                  </Button>
                  <p>
                    Don't have an account ?{" "}
                    <a href="/register" style={{ color: "black" }}>
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
