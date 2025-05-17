import React, { useState, useEffect } from "react";
import "../Styles/viewmore.css";
import { CgSearch } from "react-icons/cg";
import { Button, Modal, Row, Container } from "react-bootstrap";
import { FaRegFaceSmile } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import Aos from "aos";
import OwlCarousel from "react-owl-carousel";
import { GoArrowDown } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import parse from "html-react-parser";

const Viewmore = () => {

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const location = useLocation();
  const data = location.state;


  useEffect(() => {
    Aos.init();
  }, []);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };



    // Read more read less
    const [isExpanded, setIsExpanded] = useState(true);
    const [isExpanded1, setIsExpanded1] = useState(true);
    const [isExpanded2, setIsExpanded2] = useState(true);
  
    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    };

    const toggleReadMore1 = () => {
      setIsExpanded1(!isExpanded1);
    };

    const toggleReadMore2 = () => {
      setIsExpanded2(!isExpanded2);
    };

  // post method form
  const formdata = new FormData();
  const [CUName, setCUName] = useState("");
  const [CUPhone, setCUPhone] = useState("");
  const [CUEmail, setCUEmail] = useState("");
  const [CUMessage, setCUMessage] = useState("");
  const [CatName, setCatName] = useState("");
  const [CatDate, setCatDate] = useState("");
  const [CMember, setCMember] = useState("");
  const [CatTime, setCatTime] = useState("");


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
      if (!CatDate) {
        return alert("Please Choose Date");
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
          CatName: CatName,
          CatDate: CatDate,
          CMember: CMember,
          CatTime:CatTime,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        window.location.reload();
        getcategory();
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

  //Delete
  const [Data, setData] = useState("");
  const DeleteCategory = async () => {
    try {
      const config = {
        url: "user/DeleteCategory/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getcategory();
          //   handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    getcategory();
  }, []);
  console.log(Addcategory);

  // ====================================

   // post method form
   const [PackageName, setPackageName] = useState("");
   const [BookingUserName, setBookingUserName] = useState("");
   const [BookingUserPhone, setBookingUserPhone] = useState("");
   const [BookingUserEmail, setBookingUserEmail] = useState("");
   const [BookingDate, setBookingDate] = useState("");
   const [BookingLocation, setBookingLocatione] = useState("");
   const [TotalBookingDays, setTotalBookingDays] = useState("");
   const [TotalBookingUsers, setTotalBookingUsers] = useState("");
   const [selectedPackage, setSelectedPackage] = useState(null);
 
 
   console.log("PackageName?.PackagePrice", selectedPackage?.PackagePrice);
  const[edit,setEdit] = useState({})
  console.log(edit,"editiiiiiiiiiiii")
   const AddBookinglist = async () => {
     try {
       if (!BookingUserName) {
         return alert("Please add name ");
       }
       if (!BookingUserPhone) {
         return alert("Please add phone number");
       }
       if (!BookingUserEmail) {
         return alert("Please add email");
       }
       if (!BookingDate) {
         return alert("Please Choose Date");
       }
 
       if (!BookingLocation) {
         return alert("Please Choose location");
       }
       if (!TotalBookingDays) {
         return alert("Please add days");
       }
       if (!TotalBookingUsers) {
         return alert("please add memeber");
       }
 
       const config = {
         url: "/user/booking",
         method: "post",
         baseURL: "http://localhost:9000/api",
         header: { "content-type": "application/json" },
         data: {
           PackageName: selectedPackage?.ServiceText,
           Price: selectedPackage?.PackagePrice,
           BookingUserName: BookingUserName,
           BookingUserPhone: BookingUserPhone,
           BookingUserEmail: BookingUserEmail,
           BookingDate: BookingDate,
           BookingLocation: BookingLocation,
           TotalBookingDays: TotalBookingDays,
           TotalBookingUsers: TotalBookingUsers,
           userId: user?._id,
         },
       };
       let res = await axios(config);
       if (res.status === 200) {
         alert(res.data.success);
         getbooking();
       }
     } catch (error) {
       console.log(error);
       alert(error.response.data.msg);
     }
   };
 
   //integrating get  method
   const [Addbooking, setAddbooking] = useState([]);
   const getbooking = async () => {
     try {
       let res = await axios.get("http://localhost:9000/api/user/getbooking");
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
   console.log(Addbooking);



  //integrating get  method
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
  console.log(AddServices);

  const handlePackageChange = (e) => {
    const packageData = JSON.parse(e.target.value);
    setSelectedPackage(packageData);
  };

  //integrating get  method
  const [AddMunnarPlaces, setAddMunnarPlaces] = useState([]);
  const getAddMunnarPlaces = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getmplace");
      if (res.status === 200) {
        setAddMunnarPlaces(res.data.getmplace);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddMunnarPlaces();
  }, []);
  console.log(AddMunnarPlaces);

  
// ===================CHOOSE MAIN PLACES=====================//
  //integrating get  method of choose places
  const [AddPlaces, setAddPlaces] = useState([]);
  const getAddPlaces = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getplace");
      if (res.status === 200) {
        setAddPlaces(res.data.getplace);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddPlaces();
  }, []);

  return (
    <div>
      <div className="viewmorepage-banner">
        <img
          src={`http://localhost:9000/Places/${data?.PlaceBannerImage}`}
          alt=""
          className="viewmore-banner"
        />

        {/* caption   */}
        <div class="caption-container">
          <div
            data-aos="zoom-in-down"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="3000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
          >
            <h2 className="place-caption">{data.PlaceBannerName}</h2>
            <p
              style={{ color: "white", textAlign: "center" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </p>
          </div>
        </div>

        {/* fixed icons  */}
        {/* <div className="fixed-icon">

                    <div>
                        < FaQuestion style={{ color: "white", fontSize: "40px", padding: "7px" }} onClick={handleShow1} />
                    </div>
                </div> */}
      </div>

      <div className="container mb-2">
        <div>
          <h2 className="headding2">{data.PlaceName}</h2>
        </div>

        <div className="row">
          <div className="col-md-5">
            <img
              src={`http://localhost:9000/Places/${data?.PlaceImage}`}
              alt=""
              className="viewmore-img"
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-delay="20"
              data-aos-duration="3000"
            />
          </div>

          <div className="col-md-7">
            <p className="descritin"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="3000"
            >
              {parse(`<div>${data?.PlaceDescription}</div>`)}
            </p>{" "}
          </div>
        </div>
      </div>


{/* =======================Overview=========================  */}
      <div className="container mb-2">
      <div className="Overview">
                      <h3>{data?.WOverview}</h3>
                      {isExpanded ? (
                        <>
                          {" "}
                          <div data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                            {parse(
                              `<div>${(data?.WOverviewDesc).slice(
                                0,
                                500
                              )}....</div>`
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div id="more" className={isExpanded ? "hidden" : ""}>
                            <div data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                              {parse(`<div>${data?.WOverviewDesc}</div>`)}
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        id="toggleReadMore"
                        className="read-more"
                        onClick={toggleReadMore}
                      >
                        {isExpanded ? "Read more" : "Read Less"}
                      </button>
                    </div>
  
</div>


{/* =======================Inclusion=========================  */}
<div className="container mb-2">
      <div className="Overview">
                      <h3>{data?.WInctution}</h3>
                      {isExpanded1 ? (
                        <>
                          {" "}
                          <div data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                            {parse(
                              `<div>${(data?.WInctutionDesc).slice(
                                0,
                                500
                              )}....</div>`
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div id="more" className={isExpanded1 ? "hidden" : ""}>
                            <div data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                              {parse(`<div>${data?.WOverviewDesc}</div>`)}
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        id="toggleReadMore"
                        className="read-more"
                        onClick={toggleReadMore1}
                      >
                        {isExpanded1 ? "Read more" : "Read Less"}
                      </button>
                    </div>
  
</div>


{/* =======================Exclusion=========================  */}
<div className="container mb-2">
      <div className="Overview">
                      <h3>{data?.WExctution}</h3>
                      {isExpanded2 ? (
                        <>
                          {" "}
                          <div data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                            {parse(
                              `<div>${(data?.WExctutionDesc).slice(
                                0,
                                500
                              )}....</div>`
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div id="more" className={isExpanded2 ? "hidden" : ""}>
                            <div data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000">
                              {parse(`<div>${data?.WExctutionDesc}</div>`)}
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        id="toggleReadMore"
                        className="read-more"
                        onClick={toggleReadMore2}
                      >
                        {isExpanded2 ? "Read more" : "Read Less"}
                      </button>
                    </div>
  
</div>



{/* =======================HOW TO REACH=========================  */}
      <div className="container mt-3">
        <div>
          <h4 style={{ textAlign: "left" }}>
            <b>How to Reach</b>
          </h4>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div style={{ textAlign: "justify" }}>
              <div
                className="mb-2"
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="3000"
              >
                <p>{parse(`<div>${data?.WayDescription}</div>`)}</p>
              </div>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp;
          <div className="col-md-4">
            <div>
              <h4 style={{ textAlign: "left" }}>Book Now..!</h4>
            </div>
            <div>
              {/* <form className="enquiry-form mb-3">
              <div className="row mb-2">
            <div className="do-sear mt-2">
            </div>
            <select className="vi_0" onChange={handlePackageChange}>
              {AddServices?.map((item, i) => (
                <option key={i} value={JSON.stringify(item)}>
                  {item.ServiceText}
                </option>
              ))}
            </select>
          </div>

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
                  type="date"
                  placeholder="Choose date of Travel"
                  className="vi_0 mb-2"
                  onChange={(e) => setCatDate(e.target.value)}
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
                    <CKEditor editor={ClassicEditor} onChange={handleChange} />
                  </div>
                </div>
                <Button
                  variant=""
                  className="submit mt-2"
                  onClick={Addcategoryenquery}

                >
                  Submit
                </Button>
              </form> */}
              <form action="POST" className="enquiry-form mb-3">

              <div className="row">
            <div className="do-sear mt-2">
            </div>
            <select className="form-control" onChange={handlePackageChange}>
              {AddServices?.map((item, i) => (
                <option key={i} value={JSON.stringify(item)}>
                  {item.ServiceText}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Name"
                onChange={(e) => setBookingUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <input
                type="number"
                className="vi_0"
                placeholder="Enter Number"
                onChange={(e) => setBookingUserPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <input
                type="text"
                className="vi_0"
                placeholder="Enter email"
                onChange={(e) => setBookingUserEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <input
                type="Date"
                className="vi_0"
                placeholder="Choose Date"
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Choose Location:</label>
              <select
                className="form-control"
                onChange={(e) => setBookingLocatione(e.target.value)}
              >
                {AddPlaces?.map((item, i) => (
                  <option key={i} value={item.PlaceName}>
                    {item.PlaceName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <input
                type="number"
                className="vi_0"
                placeholder="Enter number of members"
                onChange={(e) => setTotalBookingUsers(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <input
                type="number"
                className="vi_0"
                placeholder="Enter number of days"
                onChange={(e) => setTotalBookingDays(e.target.value)}
              />
            </div>
          </div>

          <Button className="mt-1" onClick={AddBookinglist} variant="" style={{backgroundColor:"#19c4e3", color:"white"}}>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewmore;
