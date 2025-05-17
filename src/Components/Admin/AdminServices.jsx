import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

const AdminServices = () => {
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  // package
  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // integrating post method Services/packages
  const formdata = new FormData();
  const [ServiceImage, setServiceImage] = useState("");
  const [ServiceText, setServiceText] = useState("");
  const [PackagePrice, setPackagePrice] = useState("");
  const [PackageBenefit, setPackageBenefit] = useState("");
  const [ActivityStartTime, setActivityStartTime] = useState("");
  const [ActivityEndTime, setActivityEndTime] = useState("");
  const [ActivityDuration, setActivityDuration] = useState("");
  const [WaytoReach, setWaytoReach] = useState("");
  const [PolicyDesc, setPolicyDesc] = useState("");
  const [Day, setDay] = useState("");
  const [ActivityImage, setActivityImage] = useState("");
  const [ActivityDesc, setActivityDesc] = useState("");
  const [PackageDay, setPackageDay] = useState("");
  const [PackageNight, setPackageNight] = useState("");
  const [PackagePlan, setPackagePlan] = useState("");
  const [PackageOffer, setPackageOffer] = useState("");
  const [PackageSaveprie, setPackageSaveprie] = useState("");
  const [PackageHighlights, setPackageHighlights] = useState("");
  const [PackageActivity, setPackageActivity] = useState("");
  const [map, setMap] = useState("");

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setPackageBenefit(data);
  };

  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setWaytoReach(data);
  };

  const handleChange2 = (e, editor) => {
    const data = editor.getData();
    setPolicyDesc(data);
  };

  const handleChange3 = (e, editor) => {
    const data = editor.getData();
    setActivityDesc(data);
  };

  const handleChange4 = (e, editor) => {
    const data = editor.getData();
    setPackageHighlights(data);
  };

  const handleChange5 = (e, editor) => {
    const data = editor.getData();
    setPackageActivity(data);
  };

  const AddServiceDetais = async () => {
    formdata.append("ServiceImage", ServiceImage);
    formdata.append("ServiceText", ServiceText);
    formdata.append("PackagePrice", PackagePrice);
    formdata.append("PackageBenefit", PackageBenefit);
    formdata.append("ActivityEndTime", ActivityEndTime);
    formdata.append("ActivityStartTime", ActivityStartTime);
    formdata.append("ActivityDuration", ActivityDuration);
    formdata.append("WaytoReach", WaytoReach);
    formdata.append("PolicyDesc", PolicyDesc);
    formdata.append("Day", Day);
    formdata.append("ActivityImage", ActivityImage);
    formdata.append("ActivityDesc", ActivityDesc);
    formdata.append("PackageDay", PackageDay);
    formdata.append("PackageNight", PackageNight);
    formdata.append("PackagePlan", PackagePlan);
    formdata.append("PackageOffer", PackageOffer);
    formdata.append("PackageSaveprie", PackageSaveprie);
    formdata.append("PackageHighlights", PackageHighlights);
    formdata.append("PackageActivity", PackageActivity);
    formdata.append("map", map);

    try {
      if (!ServiceImage) {
        return alert("Please add Image");
      }
      if (!ServiceText) {
        return alert("Please Choose Package Name");
      }
      if (!PackagePrice) {
        return alert("Please add Package price");
      }
      if (!PackageBenefit) {
        return alert("Please add Package Benefits");
      }
      if (!ActivityStartTime) {
        return alert("Please Choose journey start time");
      }
      if (!ActivityEndTime) {
        return alert("Please Choose journey end time");
      }
      if (!ActivityDuration) {
        return alert("Please add duration");
      }

      if (!PackageActivity) {
        return alert("Please add activities");
      }

      if (!WaytoReach) {
        return alert("Please add Way to reach");
      }
      if (!PolicyDesc) {
        return alert("Please add Policies");
      }
      if (!Day) {
        return alert("Please Add Day");
      }
      if (!ActivityImage) {
        return alert("Please Choose Visiting place image");
      }
      if (!ActivityDesc) {
        return alert("Please add Visiting place description");
      }
      if (!map) {
        return alert("Please add map");
      }

      if (!PackageDay) {
        return alert("Please add total days");
      }
      if (!PackageNight) {
        return alert("Please add total nights");
      }
      if (!PackagePlan) {
        return alert("Please Add Day plan");
      }
      if (!PackageOffer) {
        return alert("Please add offer pricee");
      }
      if (!PackageSaveprie) {
        return alert("Please add save price");
      }
      if (!PackageHighlights) {
        return alert("Please add Highlights");
      }
      const config = {
        url: "/admin/service",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddServices();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method
  const [AddServices, setAddServices] = useState([]);
  const getAddServices = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getservice");
      if (res.status === 200) {
        setAddServices(res.data.getservice);
        setNoChangeData1(res.data.getservice);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("service", AddServices);
  //delete method
  const [Data, setData] = useState("");
  const DeleteServices = async () => {
    try {
      const config = {
        url: "admin/Deleteservice/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddServices();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method
  const [Data1, setData1] = useState("");
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (item) => {
    setShow3(true);
    setData1(item);
    setServiceText(item?.ServiceText);
    setPackagePrice(item.PackagePrice);
    setPackageBenefit(item.PackageBenefit);
    setActivityStartTime(item?.ActivityStartTime);
    setActivityEndTime(item?.ActivityEndTime);
    setActivityDuration(item.ActivityDuration);
    setWaytoReach(item.WaytoReach);
    setPolicyDesc(item.PolicyDesc);
    setDay(item.Day);
    setActivityDesc(item.ActivityDesc);
  };

  const editService = async (e) => {
    e.preventDefault();
    formdata.append("ServiceImage", ServiceImage);
    formdata.append("ServiceText", ServiceText);
    formdata.append("PackagePrice", PackagePrice);
    formdata.append("PackageBenefit", PackageBenefit);
    formdata.append("ActivityEndTime", ActivityEndTime);
    formdata.append("ActivityStartTime", ActivityStartTime);
    formdata.append("ActivityDuration", ActivityDuration);
    formdata.append("WaytoReach", WaytoReach);
    formdata.append("PolicyDesc", PolicyDesc);
    formdata.append("Day", Day);
    formdata.append("ActivityImage", ActivityImage);
    formdata.append("ActivityDesc", ActivityDesc);
    formdata.append("PackageDay", PackageDay);
    formdata.append("PackageNight", PackageNight);
    formdata.append("PackagePlan", PackagePlan);
    formdata.append("PackageOffer", PackageOffer);
    formdata.append("PackageSaveprie", PackageSaveprie);
    formdata.append("PackageHighlights", PackageHighlights);
    formdata.append("PackageActivity", PackageActivity);
    formdata.append("map", map);

    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editservice",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddServices();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddServices();
  }, []);
  console.log(AddServices);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddServices.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddServices.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage(id);
  }

  function prevpage() {
    if (currenpage !== firstIndex) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage !== lastIndex) {
      setCurrentpage(currenpage + 1);
    }
  }

  // Search filter
  const [nochangedata1, setNoChangeData1] = useState([]);
  const [searchH1, setSearchH1] = useState("");

  const handleFilterH1 = (e) => {
    const searchTerm1 = e.target.value.toLowerCase();
    setSearchH1(searchTerm1);
    if (searchTerm1 !== "") {
      const filteredData1 = nochangedata1.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm1)
        )
      );
      setAddServices(filteredData1);
    } else {
      setAddServices(nochangedata1);
    }
  };

  return (
    <div>
      <div className="customerhead p-2">
        <div className="col-lg-4 d-flex justify-content-center mt-3">
          <div class="input-group ">
            <span class="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleFilterH1}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">Our Services</h2>
            <div className="d-flex gap-3">
              <button className="admin-add-btn" onClick={handleShow}>
                Add Services
              </button>
            </div>
          </div>

          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Day's</th>
                <th>Night's</th>
                <th>Package Name</th>
                <th>Day Plan</th>
                <th>Price</th>
                <th>Offer Price</th>
                <th>Save Price</th>
                <th>Highlights</th>
                <th>Benefits</th>
                <th>Activity</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Map</th>
                <th>Way to Reach</th>
                <th>Policy</th>
                <th>Day</th>
                <th>Visiting Image</th>
                <th>Visiting Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + firstIndex}</td>
                    <td>
                      <Image
                        src={`http://localhost:9000/Homeservices/${item?.ServiceImage}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.PackageDay}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PackageNight}</td>
                    <td style={{ paddingTop: "20px" }}>{item.ServiceText}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PackagePlan}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PackagePrice}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PackageOffer}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.PackageSaveprie}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.PackageHighlights}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.PackageBenefit}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.PackageActivity}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.ActivityStartTime}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.ActivityEndTime}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.ActivityDuration}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.map}</td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.WaytoReach}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.PolicyDesc}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.Day}</td>
                    <td style={{ paddingTop: "20px" }}>
                      <Image
                        src={`http://localhost:9000/Homeservices/${item?.ActivityImage}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.ActivityDesc}</div>`)}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => handleShow3(item)}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow4();
                              setData(item?._id);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <nav>
            <ul className="pagination">
              <li className="not-allow">
                <span>
                  <li className="next-prev">
                    <a
                      onClick={() => {
                        prevpage();
                      }}
                    >
                      &lt;
                    </a>{" "}
                  </li>
                </span>
              </li>
              {numbers?.map((n, i) => {
                return (
                  <li className="active-next" key={i}>
                    <a
                      href="#"
                      className="inactive"
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </a>
                  </li>
                );
              })}

              <li className="not-allow">
                <span>
                  <li
                    className="next-prev"
                    onClick={() => {
                      nextpage();
                    }}
                  >
                    &gt;{" "}
                  </li>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        {/* Add service modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Add Services</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setServiceImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Day's</label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="vi_0"
                  placeholder="Enter Total Days"
                  onChange={(e) => setPackageDay(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Nights's</label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="vi_0"
                  placeholder="Enter Total Nights"
                  onChange={(e) => setPackageNight(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Name</label>
                <input
                  type="text"
                  name=""
                  className="vi_0"
                  placeholder="Add Package Name"
                  onChange={(e) => setServiceText(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Plan</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="vi_0"
                  placeholder="Enter package plan"
                  onChange={(e) => setPackagePlan(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Price</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add Package Price"
                  onChange={(e) => setPackagePrice(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Offer Price</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add offer Price"
                  onChange={(e) => setPackageOffer(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Save Price</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add Save Price"
                  onChange={(e) => setPackageSaveprie(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Highlights</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange4} />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Benefits</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Activity</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange5} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mt-2">
                <label>Journey Start time</label>
                <input
                  type="time"
                  name=""
                  className="vi_0"
                  htmlFor="activityTime"
                  label="Start Time"
                  placeholder="Add start Time"
                  onChange={(e) => setActivityStartTime(e.target.value)}
                />
              </div>

              <div className="col-md-6 mt-2">
                <label>Journey End time</label>
                <input
                  type="time"
                  name=""
                  className="vi_0"
                  htmlFor="activityTime"
                  label="Start Time"
                  placeholder="Add end Time"
                  onChange={(e) => setActivityEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Duration</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add Activity Duration"
                  onChange={(e) => setActivityDuration(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Map</label>
                <input
                  type="text"
                  name=""
                  className="vi_0"
                  placeholder="Add location"
                  onChange={(e) => setMap(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Way to Reach</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange1} />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Policies</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange2} />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Days</label>
                <input
                  type="number"
                  name=""
                  placeholder="Add number of days"
                  className="vi_0"
                  onChange={(e) => setDay(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Visiting Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setActivityImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Visiting Description</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange3} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={AddServiceDetais}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit service modal */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Edit Services</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setServiceImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Day's</label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="vi_0"
                  placeholder="Enter Total Days"
                  value={PackageDay}
                  onChange={(e) => setPackageDay(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Nights's</label>
                <input
                  type="number"
                  name=""
                  id=""
                  className="vi_0"
                  placeholder="Enter Total Nights"
                  value={PackageNight}
                  onChange={(e) => setPackageNight(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Name</label>
                <input
                  type="text"
                  name=""
                  className="vi_0"
                  placeholder="Add Package Name"
                  value={ServiceText}
                  onChange={(e) => setServiceText(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Plan</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="vi_0"
                  placeholder="Enter package plan"
                  value={PackagePlan}
                  onChange={(e) => setPackagePlan(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Price</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add Package Price"
                  value={PackagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Offer Price</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add offer Price"
                  value={PackageOffer}
                  onChange={(e) => setPackageOffer(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Save Price</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  placeholder="Add Save Price"
                  value={PackageSaveprie}
                  onChange={(e) => setPackageSaveprie(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Highlights</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={PackageHighlights}
                  onChange={handleChange4}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Package Benefits</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={PackageBenefit}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Activity</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={PackageActivity}
                  onChange={handleChange5}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mt-2">
                <label>Journey Start time</label>
                <input
                  type="time"
                  name=""
                  className="vi_0"
                  htmlFor="activityTime"
                  label="Start Time"
                  placeholder="Add start Time"
                  value={ActivityStartTime}
                  onChange={(e) => setActivityStartTime(e.target.value)}
                />
              </div>

              <div className="col-md-6 mt-2">
                <label>Journey End time</label>
                <input
                  type="time"
                  name=""
                  className="vi_0"
                  htmlFor="activityTime"
                  label="Start Time"
                  placeholder="Add end Time"
                  value={ActivityEndTime}
                  onChange={(e) => setActivityEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Duration</label>
                <input
                  type="number"
                  name=""
                  className="vi_0"
                  value={ActivityDuration}
                  onChange={(e) => setActivityDuration(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Map</label>
                <input
                  type="text"
                  name=""
                  className="vi_0"
                  placeholder="Add location"
                  value={map}
                  onChange={(e) => setMap(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Way to Reach</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={WaytoReach}
                  onChange={handleChange1}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Policies</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={PolicyDesc}
                  onChange={handleChange2}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Days</label>
                <input
                  type="number"
                  name=""
                  value={Day}
                  className="vi_0"
                  onChange={(e) => setDay(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Visiting Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setActivityImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Visiting Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={ActivityDesc}
                  onChange={handleChange3}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose3}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={editService}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delet service modal  */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure?
                  <br /> you want to delete this data?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose4}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={DeleteServices}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminServices;
