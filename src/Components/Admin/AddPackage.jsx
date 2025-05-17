import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import axios from "axios";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";

const AddPackage = () => {

    const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [show10, setShow10] = useState();
  const [show11, setShow11] = useState();
  const [show15, setShow15] = useState();
  const [show16, setShow16] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  const handleClose11 = () => setShow11(false);
  const handleShow11 = () => setShow11(true);

  const handleClose15 = () => setShow15(false);
  const handleShow15 = () => setShow15(true);

  const handleClose16 = () => setShow16(false);
  const handleShow16 = () => setShow16(true);

  // itenirary
  const [show3, setShow3] = useState();
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // MenuChart
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  //Edit itenirary
  const [show6, setShow6] = useState();
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  // MenuChart
  const [show7, setShow7] = useState();
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [data, setData] = useState([]);
  const [unique, setunique] = useState("");
  const getPackage = async () => {
    try {
      await axios
        .get("http://localhost:9000/api//getallpackage")
        .then((res) => {
          if (res.status == 200) {
            setData(res.data.success);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [wrap, setWrap] = useState([]);
  const getTripPackage = async () => {
    try {
      await axios
        .get("http://saisathish.info/api/v1//getalltrippackage")
        .then((res) => {
          if (res.status == 200) {
            setWrap(res.data.success);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(wrap);
  useEffect(() => {
    getPackage();
    getTripPackage();
  }, []);

  // Add Itinerary
  const [itineraries, setitineraries] = useState([]);
  const [dayName, setdayName] = useState("");
  const [itinerarytext, setItinerarytext] = useState("");

  function arrayitin() {
    if (!dayName) {
      return alert("Please Add Day");
    }
    if (!itinerarytext) {
      return alert("Please Add ItineraryText");
    }
    let obj = { dayName, text: itinerarytext };
    itineraries.push(obj);
  }
  // Add MenuChart
  const [menuchart, setMenuchart] = useState([]);
  const [daysName, setDaysname] = useState("");
  const [morning, setmorning] = useState("");
  const [afternoon, setafternoon] = useState("");
  const [evining, setevining] = useState("");
  const [night, setnight] = useState("");

  function menuChart() {
    if (!daysName) return alert("Please add dayname");
    if (!morning) return alert("Please add morning menu");
    if (!afternoon) return alert("Please add afternoon menu");
    if (!evining) return alert("Please add evining menu");
    if (!night) return alert("Please add night menu");
    let obj1 = { daysName, morning, afternoon, evining, night };
    menuchart.push(obj1);
  }
  // Add package
  const [packagename, setpackagename] = useState("");
  const [price, setprice] = useState("");
  const [lodingdetails, setlodingdetails] = useState("");
  const [packageimage, setPackageimage] = useState("");
  const [journeytitle, setJourneytitle] = useState("");
  const [tripname, settripname] = useState("");

  const [packageAdded, setPackageAdded] = useState({});

  const addPackages = async () => {
    // only add one package
    if (packageAdded[tripname]) {
      alert(`You can only add one ${tripname} !!!`);
      return;
    }
    setPackageAdded((prev) => ({ ...prev, [tripname]: true }));
    try {
      let config = {
        url: "/addpackage",
        method: "post",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "multipart/form-data" },
        data: {
          packagetype: tripname,
          packagename: packagename,
          price: price,
          journeytitle: journeytitle,
          menuchart: menuchart,
          lodingdetails: lodingdetails,
          packageimage: packageimage,
          itinerary: itineraries,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);
        handleClose();
        window.location.reload(true);
        alert("Packages add successfully");
        setpackagename("");
        setprice("");
        setlodingdetails("");
        setPackageimage("");
        setJourneytitle("");
        settripname("");
      }
    } catch (error) {
      console.log(error);
      if (error.res) {
        alert(`${error.res.data.error}`);
      }
    }
  };

  // Update Packages==========

  // function menuChart1() {
  //   let obj1 = {
  //     daysName: daysName1,
  //     morning: morning1,
  //     afternoon: afternoon1,
  //     evining: evining1,
  //     night: night1,
  //   };
  //   menuchart1.push(obj1);
  // }

  const [edit, setedit] = useState("");
  const [packagename1, setpackagename1] = useState("");
  const [price1, setprice1] = useState("");
  const [lodingdetails1, setlodingdetails1] = useState("");
  const [packageimage1, setPackageimage1] = useState("");
  const [journeytitle1, setJourneytitle1] = useState("");
  const [tripname1, settripname1] = useState("");
  const updatePackages = async () => {
    try {
      let config = {
        url: "/updatepackage",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "multipart/form-data" },
        data: {
          id: edit,
          packagetype: tripname1,
          packagename: packagename1,
          price: price1,
          journeytitle: journeytitle1,
          lodingdetails: lodingdetails1,
          packageimage: packageimage1,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        console.log(res.data.success);
        handleClose();
        window.location.reload(true);
        alert(`${res.data.success}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(`${error.response.data.error}`);
      }
    }
  };
  // =========

  const removePackage = async (id) => {
    try {
      await axios
        .delete("http://localhost:9000/api//removepackage/" + id)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.success);
            window.location.reload(true);
            alert("Packages delete successfully");
          }
        });
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(`${error.response.data.error}`);
      }
    }
  };

  //   Row Filter
  const [itempage, setItempage] = useState(5);

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 5;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = data.slice(visitedPage, visitedPage + productPerPage);
  const pageCount = Math.ceil(data.length / productPerPage);

  // Add  singal itineary
  const [newday, setNewday] = useState("");
  const [newitinearys, setNewitinearys] = useState("");
  const addItinearyPackages = async () => {
    try {
      let config = {
        url: "/newitineary",
        method: "post",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
        data: {
          id: unique?._id,
          dayName: newday,
          text: newitinearys,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);

        handleClose10();
        alert("Itienary add successfully");
        setunique(res.data.success);
      }
    } catch (error) {
      console.log(error);
      if (error.res) {
        alert(`${error.res.data.error}`);
      }
    }
  };

  // Remove Singal Itineary
  const [newremove1, setnewremove1] = useState("");
  const removeSingalItineary = async (id) => {
    try {
      let config = {
        url: "/newitinearydelete",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
        data: {
          id: unique?._id,
          removeId: newremove1?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);

        alert("Itineary delete successfully");
        handleClose16();
        setunique(res.data.success);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(`${error.response.data.error}`);
      }
    }
  };

  // Update singal Itinerary
  const [editItinerary, seteditItinerary] = useState("");
  const [dayName1, setdayName1] = useState("");
  const [itinerarytext1, setItinerarytext1] = useState("");
  const updateItinearyPackages = async (id) => {
    try {
      let config = {
        url: "/newitinearyupdate",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
        data: {
          id: unique?._id,
          editId: editItinerary,
          dayName: dayName1,
          text: itinerarytext1,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);
        alert("Itienary update successfully");
        setunique(res.data.success);
      }
    } catch (error) {
      console.log(error);
      if (error.res) {
        alert(`${error.res.data.error}`);
      }
    }
  };

  // Add singal menuChart
  const [daysnamemenuchart, setdaysNamemenuchart] = useState("");
  const [morningmenuchart, setMorningmenuchart] = useState("");
  const [afternoonmenuchart, setafternoonmenuchart] = useState("");
  const [eviningmenuchart, seteviningmenuchart] = useState("");
  const [nightmenuchart, setnightmenuchart] = useState("");
  const addMenuChartPackages = async () => {
    try {
      let config = {
        url: "/newmenuchart",
        method: "post",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
        data: {
          id: unique?._id,
          daysName: daysnamemenuchart,
          morning: morningmenuchart,
          afternoon: afternoonmenuchart,
          evining: eviningmenuchart,
          night: nightmenuchart,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);
        handleClose11();
        alert("Menuchart add successfully");
        setunique(res.data.success);
        setdaysNamemenuchart("");
        setMorningmenuchart("");
        setafternoonmenuchart("");
        seteviningmenuchart("");
        setnightmenuchart("");
      }
    } catch (error) {
      console.log(error);
      if (error.res) {
        alert(`${error.res.data.error}`);
      }
    }
  };

  // Remove Singal Itineary
  const [newremove, setnewremove] = useState("");
  const removeSingalMenuchart = async (id) => {
    try {
      let config = {
        url: "/newmenuchartdelete",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
        data: {
          id: unique?._id,
          removeId: newremove?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);
        handleClose15();
        alert("Menuchart delete successfully");
        setunique(res.data.success);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(`${error.response.data.error}`);
      }
    }
  };

  // Update singal MenuCharrt
  const [editmenucharts, seteditmenucharts] = useState("");
  // const [menuchart1, setMenuchart1] = useState([]);
  const [daysName1, setDaysname1] = useState("");
  const [morning1, setmorning1] = useState("");
  const [afternoon1, setafternoon1] = useState("");
  const [evining1, setevining1] = useState("");
  const [night1, setnight1] = useState("");

  const updateMenuchartPackages1 = async () => {
    try {
      let config = {
        url: "/newmenuupdate",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
        data: {
          id: unique?._id,
          editId: editmenucharts,
          daysName: daysName1,
          morning: morning1,
          afternoon: afternoon1,
          evining: evining1,
          night: night1,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        // console.log(res.data.success);
        handleClose7();
        alert("Menuchart update successfully");
        setunique(res.data.success);
      }
    } catch (error) {
      console.log(error);
      if (error.res) {
        alert(`${error.res.data.error}`);
      }
    }
  };

  return (
    <div>
        <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Package List</h2>
          <button className="btn-primary btn" onClick={handleShow}>
            Add Package
          </button>
        </div>
        <div className="row p-2 align-items-end justify-content-around mb-3">
          {/* <div
            className="input-group col-lg-4"
            style={{ width: "auto", height: "35px", marginTop: "20px" }}
          >
            <span class="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleFilter}
            />
          </div> */}
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  <div style={{ width: "150px" }}>Package Type</div>
                </th>
                <th>
                  <div style={{ width: "150px" }}>Package Name </div>
                </th>
                <th>
                  <div style={{ width: "150px" }}> Package Image</div>
                </th>

                <th>
                  <div style={{ width: "180px" }}>Date of Journey Title </div>
                </th>

                <th>Price</th>
                <th>
                  {" "}
                  <div style={{ width: "150px" }}>Date</div>
                </th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {displayPage?.slice(0, itempage)?.map((ele, index) => {
                return (
                  <tr key={ele?._id}>
                    <td>{index + 1}</td>
                    <td>{ele?.packagetype}</td>
                    <td>{ele?.packagename}</td>
                    <td>
                      <img
                        src={`http://saisathish.info/Product/${ele?.packageimage}`}
                        style={{ width: "100%", height: "100px" }}
                      />
                    </td>
                    <td>{ele?.journeytitle}</td>

                    <td>₹{ele?.price}</td>
                    <td style={{ width: "120px" }}>
                      {moment(ele?.createdAt).format("ll")}
                    </td>
                    {/* <td>{ele?.startdate}</td>
                    <td>{ele?.returndate}</td> */}
                    <td>
                      <div className="d-flex gap-2 fs-4">
                        <AiFillEye
                          title="View"
                          className="text-primary"
                          onClick={() => {
                            handleShow2();
                            setunique(ele);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        <BiSolidEdit
                          title="Edit"
                          className="text-success"
                          onClick={() => {
                            handleShow1();
                            setedit(ele);
                            setprice1(ele?.price);
                            setlodingdetails1(ele?.lodingdetails);
                            setpackagename1(ele?.packagename);
                            setJourneytitle1(ele?.journeytitle);
                            settripname1(ele?.packagetype);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        {/* <AiFillDelete
                          title="Delete"
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            removePackage(ele?._id);
                          }}
                        /> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {/* ))} */}
            </tbody>
          </Table>
        </div>

        <Pagination style={{ float: "right" }}>
          <Pagination.First onClick={() => setPageNumber(0)} />
          <Pagination.Prev
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
          />
          {Array.from({ length: pageCount }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index === pageNumber}
              onClick={() => setPageNumber(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
            }
          />
          <Pagination.Last onClick={() => setPageNumber(pageCount - 1)} />
        </Pagination>
        {/* Add Package modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Add Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            

              <div className="row">
                <div className="do-sear mt-2">
                  <label htmlFor="upload">Package Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="upload"
                    onChange={(e) => setPackageimage(e.target.files[0])}
                    className="vi_0"
                  />
                </div>
              </div>
            </div>

            <div className="do-sear mt-2">
              <label>Date of Journey Title</label>
              <input
                type="text"
                placeholder="Enter Your Date of Journey Title"
                value={journeytitle}
                onChange={(e) => {
                  setJourneytitle(e.target.value);
                }}
                className="vi_0"
              />
            </div>

            <div className="do-sear mt-2">
              <label>Price Per Person</label>
              <input
                type="text"
                placeholder="Price"
                className="vi_0"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>

            <div className="do-sear mt-2">
              <label>Lodging Details</label>
              <CKEditor
                editor={ClassicEditor}
                data={lodingdetails}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setlodingdetails(data);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <div className="d-flex">
              <Button variant="success" onClick={handleShow3}>
                Itinerary
              </Button>
              <Button className="mx-2" variant="success" onClick={handleShow4}>
                Menu Chart
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button className="mx-2" variant="primary" onClick={addPackages}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Edit Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            
              <div className="row">
                <div className="do-sear mt-2">
                  <label htmlFor="upload1">Package Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="upload1"
                    onChange={(e) => setPackageimage1(e.target.files[0])}
                    className="vi_0"
                  />
                </div>
              </div>
            </div>

            <div className="do-sear mt-2">
              <label>Date of Journey Title</label>
              <input
                type="text"
                placeholder="Enter Your Date of Journey Title"
                value={journeytitle1}
                onChange={(e) => {
                  setJourneytitle1(e.target.value);
                }}
                className="vi_0"
              />
            </div>

            <div className="do-sear mt-2">
              <label>Price Per Person</label>
              <input
                type="text"
                placeholder="Price"
                className="vi_0"
                value={price1}
                onChange={(e) => setprice1(e.target.value)}
              />
            </div>

            <div className="do-sear mt-2">
              <label>Lodging Details</label>
              <CKEditor
                editor={ClassicEditor}
                data={lodingdetails1}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setlodingdetails1(data);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <div className="d-flex">
              <Button
                className="mx-2"
                variant="primary"
                onClick={updatePackages}
              >
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* View Package modal */}
        <Modal show={show2} size="lg" onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Package Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td className="fw-bold">Package Name :</td>
                  <td>{unique?.packagename}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Price :</td>
                  <td>₹{unique?.price}</td>
                </tr>
                {/* <tr>
                  <td className="fw-bold">Start Date :</td>
                  <td>{unique?.startdate}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Return Date :</td>
                  <td>{unique?.returndate}</td>
                </tr> */}
                <tr>
                  <td className="fw-bold">Itinerary :</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={handleShow10}
                      style={{ float: "inline-end" }}
                    >
                      Add Itinerary
                    </Button>
                    {unique?.itinerary?.map((items) => {
                      return (
                        <div className="mb-5 " style={{ textAlign: "left" }}>
                          <h6>{items?.dayName}</h6>
                          <p> {parse(`<div>${items?.text}</div>`)}</p>
                          <div
                            style={{
                              float: "right",
                              display: "flex",
                              gap: " 13px",
                            }}
                          >
                            <BiSolidEdit
                              title="Edit"
                              style={{
                                cursor: "pointer",
                                fontSize: "25px",
                                color: "blue",
                                marginBottom: "20px",
                              }}
                              onClick={() => {
                                setdayName1(items?.dayName);
                                setItinerarytext1(items?.text);
                                seteditItinerary(items?._id);
                                handleShow6();
                              }}
                            />
                            <MdDeleteForever
                              title="Delete"
                              style={{
                                cursor: "pointer",
                                fontSize: "25px",
                                color: "red",
                              }}
                              onClick={() => {
                                setnewremove1(items);
                                handleShow16();
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">Menu Chart :</td>
                  <td>
                    <div>
                      <div className="mb-2" style={{ float: "inline-end" }}>
                        <Button
                          className="mx-2"
                          variant="success"
                          onClick={handleShow11}
                        >
                          Add Menu Chart
                        </Button>
                      </div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th>Morning</th>
                            <th>Afternoon</th>
                            <th>Evining</th>
                            <th>Night</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unique?.menuchart?.map((ele) => {
                            return (
                              <tr>
                                <td>{ele?.daysName}</td>
                                <td>{ele?.morning}</td>
                                <td>{ele?.afternoon}</td>
                                <td>{ele?.evining}</td>
                                <td>{ele?.night}</td>
                                <div style={{ display: "flex", gap: " 13px" }}>
                                  <BiSolidEdit
                                    title="Edit"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "25px",
                                      color: "blue",
                                    }}
                                    onClick={() => {
                                      seteditmenucharts(ele?._id);
                                      setDaysname1(ele?.daysName);
                                      setmorning1(ele?.morning);
                                      setafternoon1(ele?.afternoon);
                                      setevining1(ele?.evining);
                                      setnight1(ele?.night);
                                      handleShow7();
                                    }}
                                  />
                                  <MdDeleteForever
                                    title="Delete"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "25px",
                                      color: "red",
                                    }}
                                    onClick={() => {
                                      setnewremove(ele);
                                      handleShow15();
                                    }}
                                  />
                                </div>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">Lodging Details :</td>
                  <td>
                    <div>{parse(`<div>${unique?.lodingdetails}</div>`)}</div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose2}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Itinerary */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Add Itinerary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="do-sear mt-2">
              <label>Day</label>
              <input
                type="text"
                placeholder="Enter Day"
                className="vi_1"
                value={dayName}
                onChange={(e) => {
                  setdayName(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Itinerary</label>
              <CKEditor
                style={{ height: "300px" }}
                editor={ClassicEditor}
                data={itinerarytext}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setItinerarytext(data);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose3}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose3();
                arrayitin();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Menu chart */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Add Menu Chart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="do-sear mt-2">
              <label>Day</label>
              <input
                type="text"
                placeholder="Enter Days"
                className="vi_1"
                value={daysName}
                onChange={(e) => {
                  setDaysname(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Morning</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={morning}
                onChange={(e) => {
                  setmorning(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Afternoon</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={afternoon}
                onChange={(e) => {
                  setafternoon(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Evining</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={evining}
                onChange={(e) => {
                  setevining(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Night</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={night}
                onChange={(e) => {
                  setnight(e.target.value);
                }}
              />
            </div>
            {/* <div className="do-sear mt-2">
              <label>Menu Chart</label>
              <CKEditor
                editor={ClassicEditor}
                data={menuchart}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setmenuchart(data);
                }}
              />
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose4}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                menuChart();
                handleClose4();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Edit Itinerary */}
        <Modal
          show={show6}
          onHide={handleClose6}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Edit Itinerary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="do-sear mt-2">
              <label>Day</label>
              <input
                type="text"
                placeholder="Enter Day"
                className="vi_1"
                value={dayName1}
                onChange={(e) => {
                  setdayName1(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Itinerary</label>
              <CKEditor
                style={{ height: "300px" }}
                editor={ClassicEditor}
                data={itinerarytext1}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setItinerarytext1(data);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                handleClose6();
                updateItinearyPackages();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Menu chart */}
        <Modal
          show={show7}
          onHide={handleClose7}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Edit Menu Chart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="do-sear mt-2">
              <label>Day</label>
              <input
                type="text"
                placeholder="Enter Days"
                className="vi_1"
                value={daysName1}
                onChange={(e) => {
                  setDaysname1(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Morning</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={morning1}
                onChange={(e) => {
                  setmorning1(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Afternoon</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={afternoon1}
                onChange={(e) => {
                  setafternoon1(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Evining</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={evining1}
                onChange={(e) => {
                  setevining1(e.target.value);
                }}
              />
            </div>
            <div className="do-sear mt-2">
              <label>Night</label>
              <input
                type="text"
                placeholder="Enter your menu"
                className="vi_1"
                value={night1}
                onChange={(e) => {
                  setnight1(e.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                updateMenuchartPackages1();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Add new singal itinerary */}
      <Modal
        show={show10}
        onHide={handleClose10}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Add Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="do-sear mt-2">
            <label>Day</label>
            <input
              type="text"
              placeholder="Enter Day"
              className="vi_1"
              value={newday}
              onChange={(e) => {
                setNewday(e.target.value);
              }}
            />
          </div>
          <div className="do-sear mt-2">
            <label>Itinerary</label>
            <CKEditor
              style={{ height: "300px" }}
              editor={ClassicEditor}
              data={newitinearys}
              onChange={(event, editor) => {
                const data = editor.getData();
                setNewitinearys(data);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              addItinearyPackages();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* You want to delete itineary */}
      <Modal
        show={show16}
        onHide={handleClose16}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-danger">Are you sure want delete ?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              removeSingalItineary();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Add singal Menu chart  */}
      <Modal
        show={show11}
        onHide={handleClose11}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Add Menu Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="do-sear mt-2">
            <label>Day</label>
            <input
              type="text"
              placeholder="Enter Days"
              className="vi_1"
              value={daysnamemenuchart}
              onChange={(e) => {
                setdaysNamemenuchart(e.target.value);
              }}
            />
          </div>
          <div className="do-sear mt-2">
            <label>Morning</label>
            <input
              type="text"
              placeholder="Enter your menu"
              className="vi_1"
              value={morningmenuchart}
              onChange={(e) => {
                setMorningmenuchart(e.target.value);
              }}
            />
          </div>
          <div className="do-sear mt-2">
            <label>Afternoon</label>
            <input
              type="text"
              placeholder="Enter your menu"
              className="vi_1"
              value={afternoonmenuchart}
              onChange={(e) => {
                setafternoonmenuchart(e.target.value);
              }}
            />
          </div>
          <div className="do-sear mt-2">
            <label>Evining</label>
            <input
              type="text"
              placeholder="Enter your menu"
              className="vi_1"
              value={eviningmenuchart}
              onChange={(e) => {
                seteviningmenuchart(e.target.value);
              }}
            />
          </div>
          <div className="do-sear mt-2">
            <label>Night</label>
            <input
              type="text"
              placeholder="Enter your menu"
              className="vi_1"
              value={nightmenuchart}
              onChange={(e) => {
                setnightmenuchart(e.target.value);
              }}
            />
          </div>
          {/* <div className="do-sear mt-2">
              <label>Menu Chart</label>
              <CKEditor
                editor={ClassicEditor}
                data={menuchart}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setmenuchart(data);
                }}
              />
            </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              addMenuChartPackages();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* You want to delete menuchart */}
      <Modal
        show={show15}
        onHide={handleClose15}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Menu Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-danger">Are you sure want delete ?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              removeSingalMenuchart();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
 
    </div>
  )
}

export default AddPackage