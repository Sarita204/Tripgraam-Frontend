import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/packagedetails.css";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import parse from "html-react-parser";
import { FaStar } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PackageDetails = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const location = useLocation();
  const data = location.state;

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setCUMessage(data);
  };

  //integrating get  method
  const [AddServices, setAddServices] = useState([]);
  const getAddServices = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getservice");
      if (res.status === 200) {
        setAddServices(res.data.getservice);
        // setNoChangeData1(res.data.getservice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddServices();
  }, []);

  // ===============PLACE DETAILS================//

  //integrating get  method of places
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

  // ======================RATINGS======================//
  //integrating get  method reatings
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

  const total = AddRatings.filter(
    (item) => item?.packagename == AddWayanadPlaces?.packagename
  ).reduce((acc, num) => acc + Number(num?.rate), 0);
  console.log(total, "total");
  const avg = total / AddRatings.length;

  // Enquiry Form //

  const [edit, setEdit] = useState({}); // getting place name by default

  // =================REQUEST CALL BACK MODAL=====================//
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

      // if (!CatName) {
      //   return alert("Please  Choose name");
      // }
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
          ServiceText: edit?.ServiceText,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getcategory();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method Category Enquiry
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

  return (
    <div>
      <div className="d-flex">
        <div className="first">
          <div>
            <img
              src="../Assets/gallerybg8.jpg"
              alt=""
              className="packagedetails-banner "
            />
          </div>
        </div>
        <div className="first">
          <div className="right-imgs">
            <div className="col-md-6">
              <img
                src="../Assets/gallerybg8.jpg"
                alt=""
                className="packagedetails-right-img"
              />
            </div>
            <div className="col-md-6">
              <img
                src="../Assets/gallerybg8.jpg"
                alt=""
                className="packagedetails-right-img"
              />
            </div>
          </div>

          <div className="right-imgs">
            <div className="col-md-6">
              <img
                src="../Assets/gallerybg8.jpg"
                alt=""
                className="packagedetails-right-img"
              />
            </div>
            <div className="col-md-6">
              <img
                src="../Assets/gallerybg8.jpg"
                alt=""
                className="packagedetails-right-img"
              />
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="row">
          <div className="col-md-8 mb-2">
            <div>
              <div>
                <h3>
                  <b>{data.ServiceText}</b>
                </h3>
                <p>
                  <Button>
                    <div>
                      <FaStar />{" "}
                      <span>
                        {AddRatings.filter(
                          (data) => data?.packagename == data?.ServiceText
                        ).length
                          ? (
                              AddRatings.filter(
                                (data) => data?.packagename == data?.ServiceText
                              ).reduce(
                                (acc, val) => acc + Number(val.rate),
                                0
                              ) /
                              AddRatings.filter(
                                (data) => data?.packagename == data?.ServiceText
                              ).length
                            ).toFixed(1)
                          : 0}
                        (
                        {
                          AddRatings.filter(
                            (data) => data?.packagename == data?.ServiceText
                          ).length
                        }
                        )
                      </span>
                    </div>
                  </Button>
                </p>
              </div>

              <div className="d-flex">
<span>{data.PackageDay} Days & {data.PackageNight} Nights</span>
<span>{data.PackagePlan}</span>
                
              </div>
              <br />

              <br />
              <div>
                <h3>
                  <b>{data.ServiceText} Highlights</b>
                </h3>
                <div>{parse(`<div>${data.PackageHighlights}</div>`)}</div>
              </div>

              
              <br />
              <div>
                <h3>
                  <b>{data.ServiceText} Benefits</b>
                </h3>
                <div>{parse(`<div>${data.PackageBenefit}</div>`)}</div>
              </div>

              <br />

              <div>
                <h3>
                  <b>Overview</b>
                </h3>
                <div>
                  <b>Activity Time: </b>
                  <span>
                    {data.ActivityStartTime} AM To {data.ActivityEndTime} PM
                  </span>
                </div>

                <div>
                  <b>Activity Duration: </b>
                  <span>{data.ActivityDuration} hours Approximately</span>
                </div>

                <div>
                  <b>Activities: </b>
                 <div>{data.PackageActivity}</div>
                </div>

                <div>
                  <b>Map</b>
                  <span>{data.map}</span>
                </div>

                <div>
                  <b>How to reach: -</b>

                  <div>{parse(`<div>${data.WaytoReach}</div>`)}</div>
                </div>
              </div>

              <br />

              <div>
                <h3>
                  <b>Policies</b>
                </h3>
                <div>{parse(`<div>${data.PolicyDesc}</div>`)}</div>
              </div>

              <br />

              <div>
                <h3>
                  <b>Day Plan Details</b>
                </h3>

                <div>
                  <div className="row mt-2 mb-3">
                    <div>
                      <Button>Day {data.Day}</Button>
                    </div>
                  </div>

                  <div className="row mt-2 mb-2">
                    <div className="col-md-6">
                      <img
                        src={`http://localhost:9000/Homeservices/${data?.ActivityImage}`}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div>{parse(`<div>${data.ActivityDesc}</div>`)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div style={{ position: "sticky", top: "120px" }}>
              <div>
                <h4 style={{ textAlign: "left" }}>Enquiry Now..!</h4>

                <div>
                  <form className="enquiry-form mb-3">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="vi_0 mb-2"
                      onChange={(e) => setCUName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      className="vi_0 mb-2"
                      onChange={(e) => setCUPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Your Phone Number"
                      className="vi_0 mb-2"
                      onChange={(e) => setCUEmail(e.target.value)}
                    />

                    <input
                      type="time"
                      placeholder="Enter How many Travellers"
                      className="vi_0 mb-2"
                      onChange={(e) => setCatTime(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Enter How many Travellers"
                      className="vi_0 mb-2"
                      onChange={(e) => setCMember(e.target.value)}
                    />
                    <div className="row">
                      <div className="do-sear mt-2">
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <Button
                      variant=""
                      className="submit mt-2"
                      onClick={() => {
                        Addcategoryenquery();
                        setEdit(true);
                      }}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PackageDetails;
