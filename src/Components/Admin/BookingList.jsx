import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BookingList = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [PackagePrice, setPackagePrice] = useState("");

  // Booking list
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [Data, setData] = useState("");

  const [show10, setShow10] = useState();
  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  // post method form
  const formdata = new FormData();
  const [PackageName, setPackageName] = useState("");
  const [BookingUserName, setBookingUserName] = useState("");
  const [BookingUserPhone, setBookingUserPhone] = useState("");
  const [BookingUserEmail, setBookingUserEmail] = useState("");
  const [BookingDate, setBookingDate] = useState("");
  const [BookingLocation, setBookingLocatione] = useState("");
  const [TotalBookingDays, setTotalBookingDays] = useState("");
  const [TotalBookingUsers, setTotalBookingUsers] = useState("");

  const AddBookinglist = async () => {
    try {
      if (!PackageName) {
        return alert("Please add name");
      }
      if (!BookingUserName) {
        return alert("Please add email ");
      }
      if (!BookingUserPhone) {
        return alert("Please add phone number");
      }
      if (!BookingUserEmail) {
        return alert("Please add phone number");
      }
      if (!BookingDate) {
        return alert("Please Choose Date");
      }

      if (!BookingLocation) {
        return alert("Please Choose Date");
      }
      if (!TotalBookingDays) {
        return alert("Please add date");
      }
      if (!TotalBookingUsers) {
        return alert("please add memeber");
      }

      const config = {
        url: "/user/booking",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
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
  console.log(Addbooking, "Addbookingggggggggggg");
  const getbooking = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user/getbooking");
      if (res.status === 200) {
        setAddbooking(res.data.getbooking);
        setNoChangeData(res.data.getbooking);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [editid, seteditid] = useState("");
  const [status, setstatus] = useState("");

  const makeStatusChangeContactUs = async () => {
    try {
      const config = {
        url: "/user/makeStatusChangebookings",
        method: "put",
        baseURL: "http://localhost:9000/api",
        headers: {
          "Content-Type": "application/json",
        },

        data: {
          id: editid,
          status: status,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert(`${res?.data?.success}`);
        handleClose10();
        getbooking();
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };

  //Delete
  const DeleteBooking = async () => {
    try {
      const config = {
        url: "user/DeleteBooking/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getbooking();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    getbooking();
  }, []);
  console.log(Addbooking);

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addbooking.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addbooking.length / recordsperpage);
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

  //integrating get  method
  const [newData, setNewdata] = useState({});
  const [AddPackage, setAddPackage] = useState([]);
  console.log("owperjpowje", AddPackage);
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
  console.log(AddPackage);
  // Search filter
  const [nochangedata, setNoChangeData] = useState([]);
  const [searchH, setSearchH] = useState("");

  const handleFilterH = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchH(searchTerm);
    if (searchTerm !== "") {
      const filteredData = nochangedata.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      setAddbooking(filteredData);
    } else {
      setAddbooking(nochangedata);
    }
  };

  return (
    <div>
      <div className="col-lg-4 d-flex justify-content-center">
        <div class="input-group ">
          <span class="input-group-text" id="basic-addon1">
            <BsSearch />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-describedby="basic-addon1"
            onChange={handleFilterH}
          />
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Booking List</h2>
          <button className="admin-add-btn" onClick={handleShow}>
            Add Booking
          </button>
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
                <th>Category Name</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Date</th>
                <th>Location</th>
                <th>Members</th>
                <th>Day's</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + firstIndex}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PackageName}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.BookingUserName}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.BookingUserPhone}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.BookingUserEmail}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.BookingDate}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.BookingLocation}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.TotalBookingDays}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {item.TotalBookingUsers}
                    </td>

                    <td style={{ paddingTop: "20px" }}>{item.Price}</td>

                    <td>
                      {item?.status == "Pending" ? (
                        <span style={{ color: "blue" }}>{item?.status}</span>
                      ) : (
                        <span style={{ color: "green" }}>
                          {item.status == "Hold" ? (
                            <span style={{ color: "red" }}>{item?.status}</span>
                          ) : (
                            <span>{item?.status}</span>
                          )}
                        </span>
                      )}
                      <div>
                        {item?.status !== "Completed" ? (
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              type="button"
                              class="btn btn-success"
                              onClick={() => {
                                seteditid(item?._id);
                                setstatus("Completed");
                                handleShow10();
                              }}
                            >
                              Complete
                            </button>
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={() => {
                                seteditid(item?._id);
                                setstatus("Hold");
                                handleShow10();
                              }}
                            >
                              Hold
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
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
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow4();
                              setData(item?._id);
                            }}
                          />{" "}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Add booking list modal */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Add Booking list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="row">
            <div className="do-sear mt-2">
              <label>Choose Package:</label>
              <select
                className="form-control"
                onChange={(e) => setPackageName(e.target.value)}
              >
                <option>Select Package</option>
                <option>Couple Package</option>
                <option>Frinds Package</option>
                <option>Resort Booking</option>
              </select>
            </div>
          </div> */}

          <div className="row">
            <div className="do-sear mt-2">
              <label>Choose Package Name</label>
              <select
                className="form-control"
                onChange={(e) => setPackageName(e.target.value)}
              >
                <option value="">Select Package</option>
                {AddPackage?.map((item, i) => {
                  return (
                    <option value={item.PackageName}>{item.PackageName}</option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Name</label>
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
              <label>Number</label>
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
              <label>Email</label>
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
              <label>Date</label>
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
                <option>Select Location</option>
                <option>Munnar Places</option>
                <option>Wayanad Places</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>How Many Members</label>
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
              <label>How Many Day's</label>
              <input
                type="number"
                className="vi_0"
                placeholder="Enter number of days"
                onChange={(e) => setTotalBookingDays(e.target.value)}
              />
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
              onClick={AddBookinglist}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Delete booking */}
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
          <Button variant="" className="modal-close-btn" onClick={handleClose4}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn" onClick={DeleteBooking}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {modal} */}
      <Modal show={show10} onHide={handleClose10}>
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <p style={{ color: "orange", fontSize: "18px" }}>
                Are You Sure Want to {status} This Bookings?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#52f310", color: "#ffff" }}
            onClick={handleClose10}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "Success", color: "#ffff" }}
            onClick={makeStatusChangeContactUs}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

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
    </div>
  );
};

export default BookingList;
