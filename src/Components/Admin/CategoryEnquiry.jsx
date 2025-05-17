import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

const CategoryEnquiry = () => {
  const [show4, setShow4] = useState();
  const [Data, setData] = useState("");
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setCUMessage(data);
  };

  // post method form
  const formdata = new FormData();
  const [CUName, setCUName] = useState("");
  const [CUPhone, setCUPhone] = useState("");
  const [CUEmail, setCUEmail] = useState("");
  const [CUMessage, setCUMessage] = useState("");
  const [CatTime, setCatTime] = useState("");
  const [CMember, setCMember] = useState("");
  const [CatName, setCatName] = useState(""); // offline place name

  const Addcategoryenquery = async () => {
    try {
      if (!CatName) {
        return alert("Please add Place Name");
      }

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
          CatName: CatName,
          CMember: CMember,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getcategory();
        handleClose();
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
        setNoChangeData(res.data.getcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete
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
          handleClose4();
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

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addcategory.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addcategory.length / recordsperpage);
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

  //integrating get  method
  const [AddMunnar, setAddMunnar] = useState([]);
  const getAddMunnar = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getmunnars");
      if (res.status === 200) {
        setAddMunnar(res.data.getmunnars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddMunnar();
  }, []);
  console.log(AddMunnar);

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
      setAddcategory(filteredData);
    } else {
      setAddcategory(nochangedata);
    }
  };

  return (
    <div>
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
            <h2 className="header-c ">Category Enquiry</h2>
            <button className="admin-add-btn" onClick={handleShow}>
              Add Category Enquiry
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
                  <th>SL.NO</th>
                  <th>Place Name</th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Phone Number</th>
                  <th>Time</th>
                  <th>Member</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {records?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1 + firstIndex}</td>
                      <td style={{ paddingTop: "20px" }}>{item?.placeName}</td>
                      {/* <td style={{ paddingTop: "20px" }}>{item.CatName}</td> */}
                      <td style={{ paddingTop: "20px" }}>{item.CUName}</td>
                      <td style={{ paddingTop: "20px" }}>{item.CUEmail}</td>
                      <td style={{ paddingTop: "20px" }}>{item.CUPhone}</td>
                      <td style={{ paddingTop: "20px" }}>{item.CatTime}</td>
                      <td style={{ paddingTop: "20px" }}>{item.CMember}</td>
                      <td style={{ paddingTop: "20px" }}>
                        {parse(`<div>${item.CUMessage}</div>`)}
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

          {/* Delet modal  */}
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
                onClick={DeleteCategory}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Add Category Query
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Place Name</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter add Place name"
                  onChange={(e) => setCatName(e.target.value)}
                />
              </div>
            </div>

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
                <label>Add mail ID</label>
                <input
                  type="email"
                  className="vi_0"
                  placeholder="Enter Email id"
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
                  placeholder="Enter travel date"
                  onChange={(e) => setCatTime(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Travel Counts</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Travel Counts"
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
                onClick={Addcategoryenquery}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
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
    </div>
  );
};

export default CategoryEnquiry;
