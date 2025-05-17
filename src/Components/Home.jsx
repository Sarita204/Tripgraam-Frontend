import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import { Button, Modal, Row, Container, Card } from "react-bootstrap";
import { FaRegFaceSmile } from "react-icons/fa6";
import Aos from "aos";
import { GoArrowDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import parse from "html-react-parser";
import Carousel from "react-multi-carousel";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaStar } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaQuoteLeft } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";

const Home = () => {
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setCUMessage(data);
  };

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    Aos.init();
  }, []);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const responsive1 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const responsive2 = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const imageCarouselOptions = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    dots: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      600: { items: 1 },
      700: { items: 1 },
      1000: { items: 1 },
    },
  };

  // BOOKING MODAL POT METHOD
  const [PackageName, setPackageName] = useState("");
  const [BookingUserName, setBookingUserName] = useState("");
  const [BookingUserPhone, setBookingUserPhone] = useState("");
  const [BookingUserEmail, setBookingUserEmail] = useState("");
  const [BookingDate, setBookingDate] = useState("");
  const [BookingLocation, setBookingLocatione] = useState("");
  const [TotalBookingDays, setTotalBookingDays] = useState("");
  const [TotalBookingUsers, setTotalBookingUsers] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageChange = (e) => {
    const packageData = JSON.parse(e.target.value);
    setSelectedPackage(packageData);
  };

  const [datapack, setDatapack] = useState({});
  const [edit, setEdit] = useState({});
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
          PackageName: datapack?.ServiceText,
          Price: datapack?.PackagePrice,
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
        handleClose();
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

  // =================REQUEST CALL BACK MODAL=====================//
  // post method form
  const formdata = new FormData();
  const [CUName, setCUName] = useState("");
  const [CUPhone, setCUPhone] = useState("");
  const [CUEmail, setCUEmail] = useState("");
  const [CUMessage, setCUMessage] = useState("");
  const [CatTime, setCatTime] = useState("");
  const [CMember, setCMember] = useState("");
  // const [CatName, setCatName] = useState("");

  const Addcategoryenquery = async () => {
    try {
      if (!CUName) {
        return alert("Please add name");
      }
      if (!CUPhone) {
        return alert("Please add phone number ");
      }
      if (!CUEmail) {
        return alert("Please add email id");
      }
      if (!CatTime) {
        return alert("Please Choose Travel Date");
      }
      if (!CMember) {
        return alert("Please add Travel Counts");
      }
      if (!CUMessage) {
        return alert("Please add message");
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
          // CatName: CatName,
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

  // ==================HOME BANNER==================//

  // Home banner get  method
  const [AddBanner, setAddBanner] = useState([]);
  const getAddBanner = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getbanner");
      if (res.status === 200) {
        setAddBanner(res.data.getbanner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddBanner();
  }, []);

  // ===============BEST OF TRIPGRAAM===================//

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

  // =====================PACKAGES=================//
  //integrating get  method of packages
  const [newData, setNewdata] = useState({});
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
  console.log(AddWayanadPlaces, "AddWayanadPlacessssssssssssss");

  // ====================DISCOUTS/OFFERS=======================//
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

  // ==================TESTIMONIALS==================//
  //integrating get  method of testimonial
  const [AddTestimonial, setAddTestimonial] = useState([]);
  const getAddTestimonial = async () => {
    try {
      let res = await axios.get(
        "http://localhost:9000/api/admin/gettestimonial"
      );
      if (res.status === 200) {
        setAddTestimonial(res.data.gettestimonial);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddTestimonial();
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

  // ================ABOUT US====================//
  //integrating get  method  of about us
  const [AddAboutus, setAddAboutus] = useState([]);
  const getAddAboutus = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getabout");
      if (res.status === 200) {
        setAddAboutus(res.data.getabout);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddAboutus();
  }, []);

  return (
    <div>
      {/* home banner  */}
      <div>
        {AddBanner?.map((val, i) => {
          return (
            <div className="first-banner-component">
              <video
                src={`http://localhost:9000/Homebanner/${val?.BannerImage}`}
                autoPlay
                loop
                muted
                className="home-banner"
                style={{ height: "auto", width: "100%", opacity: "0.6" }}
              />
              <div className="caption-display">
                {/* Caption */}

                <div
                  data-aos="zoom-in-down"
                  data-aos-offset="200"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                >
                  <h2 className="caption text-center ">
                    {parse(`<div>${val?.BannerText}</div>`)}
                    <FaRegFaceSmile
                      className="gelatine"
                      style={{
                        color: "black",
                        fontSize: "40px",
                        background: "yellow",
                        borderRadius: "35px",
                      }}
                    />
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
        {/* fixed icons  */}
        {/* <div className="fixed-icon">
          <div>
            < FaQuestion style={{ color: "white", fontSize: "40px", padding: "7px" }} onClick={handleShow1} />
          </div>
        </div> */}
      </div>

      {/* About us  */}
      <Container>
        {AddAboutus?.map((item, i) => {
          return (
            <div className="row mt-2 mb-3">
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={`http://localhost:9000/Aboutus/${item?.AboutImage1}`}
                      alt=""
                      className="about-img1"
                    />
                  </div>
                  <div className="col-md-6 mt-5">
                    <img
                      src={`http://localhost:9000/Aboutus/${item?.AboutImage2}`}
                      alt=""
                      className="about-img2"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-7">
                <div>
                  <h3>
                    <b>About us</b>
                  </h3>
                  <p>{parse(`<div>${item.AboutDesc}</div>`)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Container>

      {/* BEST OF TRIPGRAM PACKAGES */}
      <div className="best-of-tripgram-component">
        <div>
          <h2 className="headding">Best Of Tripgram</h2>
        </div>
        <Container>
          <Carousel
            responsive={responsive}
            margin={10}
            autoPlay={true}
            infinite={true}
            autoPlaySpeed={5000}
            transitionDuration={500}
          >
            {AddServices?.map((item, i) => {
              return (
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div className="card best-tripgrm-crd">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:9000/Homeservices/${item?.ServiceImage}`}
                      className="best-tripgrm-crd-img"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span>
                            {item.PackageDay} Days & {item.PackageNight} Nights
                          </span>
                        </div>

                        <div>
                          <FaStar />{" "}
                          <span>
                            {AddRatings.filter(
                              (data) => data?.packagename == item?.ServiceText
                            ).length
                              ? (
                                  AddRatings.filter(
                                    (data) =>
                                      data?.packagename == item?.ServiceText
                                  ).reduce(
                                    (acc, val) => acc + Number(val.rate),
                                    0
                                  ) /
                                  AddRatings.filter(
                                    (data) =>
                                      data?.packagename == item?.ServiceText
                                  ).length
                                ).toFixed(1)
                              : 0}
                            (
                            {
                              AddRatings.filter(
                                (data) => data?.packagename == item?.ServiceText
                              ).length
                            }
                            )
                          </span>
                        </div>
                      </div>

                      <div className="mb-2">{item?.ServiceText}</div>
                      <div className="mb-2">{item.PackagePlan}</div>
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
                        <div className=" d-flex gap-2 text-align-center mb-2">
                          INR {item.PackagePrice}
                          <span style={{ textDecoration: "line-through" }}>
                            INR {item.PackageOffer}
                          </span>{" "}
                          <span style={{ color: "green", fontSize: "12px" }}>
                            SAVE {item.PackageSaveprie}
                          </span>{" "}
                        </div>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-flex gap-2 mb-2">
                        <Button
                          className="viewmore-btn"
                          onClick={() =>
                            navigate("/packagedetails", { state: item })
                          }
                          variant=""
                        >
                          Explore
                        </Button>
                        <Button
                          variant=""
                          onClick={() => {
                            handleShow();
                            setDatapack(item);
                          }}
                          className="book-now"
                          style={{ width: "100%", margin: "0" }}
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card.Footer>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </Container>
      </div>

      {/* BEST OF MUNNAR PLACES */}

      <div className="best-of-tripgram-component mt-5 pb-3">
        <div>
          <h2 className="headding">Best Of Munnar</h2>
        </div>
        <Container>
          <div className="shake">
            <span
              onClick={() => navigate("/moreplaces", { state: "Munnar" })}
              className="animation-box"
            >
              <FaArrowRight style={{ fontSize: "20px" }} />
            </span>
          </div>
          <Carousel responsive={responsive1} margin={5}>
            {AddWayanadPlaces.filter(
              (items) => items?.PlaceCat === "Munnar"
            )?.map((item, i) => {
              return (
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div className="card best-munnar-waynad-crd">
                    <div>
                      <OwlCarousel
                        autoPlay={true}
                        infinite={true}
                        autoPlaySpeed={5000}
                        transitionDuration={500}
                        className="owl-theme image-carousel"
                        {...imageCarouselOptions}
                      >
                        {item?.PlaceImages.map((ele) => {
                          return (
                            <div className="item">
                              <Card.Img
                                key={ele._id}
                                variant="top"
                                src={`http://localhost:9000/Places/${ele?.placepicture}`}
                                className="best-munnar-waynad-crd-img card-img-rounded"
                              />
                            </div>
                          );
                        })}
                      </OwlCarousel>
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <div>
                            <span>{item.TotalDay} Days</span> &{" "}
                            <span>{item.TotalNights} Nights</span>
                          </div>

                          <div>
                            <FaStar />{" "}
                            <span>
                              {AddRatings.filter(
                                (data) => data?.packagename == item?.PlaceName
                              ).length
                                ? (
                                    AddRatings.filter(
                                      (data) =>
                                        data?.packagename == item?.PlaceName
                                    ).reduce(
                                      (acc, val) => acc + Number(val.rate),
                                      0
                                    ) /
                                    AddRatings.filter(
                                      (data) =>
                                        data?.packagename == item?.PlaceName
                                    ).length
                                  ).toFixed(1)
                                : 0}
                              (
                              {
                                AddRatings.filter(
                                  (data) => data?.packagename == item?.PlaceName
                                ).length
                              }
                              )
                            </span>
                          </div>
                        </div>
                        <div className="mb-2">{item.PlaceName}</div>
                        <div className="mb-2">
                          <span>{item.PerDayPlan}</span>
                        </div>

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
                          <div className=" d-flex gap-2 text-align-center mb-2">
                            INR {item.ActualPrice}
                            <span style={{ textDecoration: "line-through" }}>
                              INR {item.OfferPrice}
                            </span>{" "}
                            <span style={{ color: "green", fontSize: "12px" }}>
                              SAVE INR {item.SavePrice}
                            </span>{" "}
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </div>
                    <Card.Footer>
                      <div className="d-flex gap-2 mb-2">
                        <Button
                          className="viewmore-btn"
                          onClick={() =>
                            navigate("/viewplace", { state: item })
                          }
                          variant=""
                        >
                          Viewmore
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
          </Carousel>
        </Container>
      </div>

      {/* Best-of-Wayanad-components  */}

      <div className="best-of-tripgram-component pt-4 mb-3">
        <div>
          <h2 className="headding">Best Of Wayanad</h2>
        </div>
        <Container>
          <Carousel responsive={responsive1} margin={5}>
            {AddWayanadPlaces.filter(
              (items) => items?.PlaceCat === "Wayanad"
            )?.map((item, i) => {
              return (
                <div
                  className="item"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div className="card best-munnar-waynad-crd">
                    <div>
                      <OwlCarousel
                        autoPlay={true}
                        infinite={true}
                        autoPlaySpeed={5000}
                        transitionDuration={500}
                        className="owl-theme image-carousel"
                        {...imageCarouselOptions}
                      >
                        {item?.PlaceImages.map((ele) => {
                          return (
                            <div className="item">
                              <Card.Img
                                key={ele._id}
                                variant="top"
                                src={`http://localhost:9000/Places/${ele?.placepicture}`}
                                className="best-munnar-waynad-crd-img"
                              />
                            </div>
                          );
                        })}
                      </OwlCarousel>
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <div>
                            <span>{item.TotalDay} Days</span> &{" "}
                            <span>{item.TotalNights} Nights</span>
                          </div>
                          <div>
                            <FaStar />{" "}
                            <span>
                              {AddRatings.filter(
                                (data) => data?.packagename == item?.PlaceName
                              ).length
                                ? (
                                    AddRatings.filter(
                                      (data) =>
                                        data?.packagename == item?.PlaceName
                                    ).reduce(
                                      (acc, val) => acc + Number(val.rate),
                                      0
                                    ) /
                                    AddRatings.filter(
                                      (data) =>
                                        data?.packagename == item?.PlaceName
                                    ).length
                                  ).toFixed(1)
                                : 0}
                              (
                              {
                                AddRatings.filter(
                                  (data) => data?.packagename == item?.PlaceName
                                ).length
                              }
                              )
                            </span>
                          </div>{" "}
                        </div>
                        <div className="mb-2">{item.PlaceName}</div>
                        <div className="mb-2">
                          <span>{item.PerDayPlan}</span>
                        </div>
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
                            <span style={{ color: "green", fontSize: "12px" }}>
                              SAVE INR {item.SavePrice}
                            </span>{" "}
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </div>
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
          </Carousel>
        </Container>

        <div className="bounce2 mt-4">
          <span
            onClick={() => navigate("/moreplaces", { state: "Wayanad" })}
            style={{ textDecoration: "none" }}
          >
            <p
              style={{
                margin: "0px",
                textDecoration: "none",
                color: "black",
              }}
            >
              <GoArrowDown style={{ fontSize: "22px" }} />
            </p>
            <p
              style={{
                margin: "0px",
                textDecoration: "none",
                color: "black",
              }}
            >
              <b>Unlimited</b>
            </p>
          </span>
        </div>
      </div>

      {/* Testimonials  */}
      <div className="container mt-4 pb-5 ">
        <div>
          <h2 className="headding">Testimonials</h2>
        </div>
        <Container
        // style={{ boxShadow: "none", background: "none" }}
        >
          <Carousel
            responsive={responsive2}
            autoPlay={true}
            infinite={true}
            autoPlaySpeed={5000}
            transitionDuration={500}
            margin={10}
          >
            {AddTestimonial?.map((item, i) => {
              return (
                <div
                  class="item"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="3000"
                >
                  <div className="col-md-11">
                    <Card
                      className="text-center"
                      style={{ height: "15rem", border: "1px solid lightblue" }}
                    >
                      <Card.Header>
                        <FaQuoteLeft
                          style={{ color: "#19c4e3", margin: "10px 0px" }}
                        />
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          {parse(`<div>${item.TDesc}</div>`)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </Container>
      </div>

      {/* Enquiry Modal */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999999" }}>
        <div>
          {AddDiscount?.map((item, i) => {
            return (
              <div
                className="top-nav-header"
                style={{ borderBottom: "1px solid lightgray" }}
              >
                <div className="main-header">
                  <div className="modl-header-content">
                    <div className="">
                      <span>
                        <b>{item.SaleName}</b> Save Upto{" "}
                        <b>{item.SalePercentage}</b> On Your Trip
                      </span>
                    </div>

                    <div className="">
                      <Button
                        variant=""
                        style={{ background: "#686868", color: "white" }}
                      >
                        {item.timeLeft === "Expired" ? "" : item.timeLeft}
                      </Button>
                    </div>
                  </div>
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
        </div>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            {" "}
            Request a Callback
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="row">
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
          </div> */}

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
                type="number"
                className="vi_0"
                placeholder="Enter phone number"
                onChange={(e) => setCUPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Mail ID</label>
              <input
                type="email"
                className="vi_0"
                placeholder="Enter Email ID"
                onChange={(e) => setCUEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Travel Date</label>
              <input
                type="date"
                className="vi_0"
                placeholder="Enter Travel Date"
                onChange={(e) => setCatTime(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Travel Count</label>
              <input
                type="number"
                className="vi_0"
                placeholder="Enter Total Travel Counts"
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
              background: "#16cae5",
              color: "black",
            }}
            onClick={Addcategoryenquery}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Book now Modal */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999999" }}>
        <Modal.Header closeButton style={{ backgroundColor: "#19c4e3" }}>
          <Modal.Title style={{ color: "black" }}>Book Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Name</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Your Name"
                onChange={(e) => setBookingUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Phone Number</label>
              <input
                type="number"
                className="vi_0"
                placeholder="Enter Phone Number"
                onChange={(e) => setBookingUserPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Email ID</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Your Email ID"
                onChange={(e) => setBookingUserEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Journey Start Date</label>
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
              <label>Total Members</label>
              <input
                type="number"
                className="vi_0"
                placeholder="Enter Number of Total Members"
                onChange={(e) => setTotalBookingUsers(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Total Day's</label>
              <input
                type="number"
                className="vi_0"
                placeholder="Enter Total Number of days"
                onChange={(e) => setTotalBookingDays(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              background: "#19c4e3 ",
              color: "black",
            }}
            onClick={AddBookinglist}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
