import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";

const PlaceCategory = () => {
  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // integrating post method service
  const [PlaceName, setPlaceName] = useState("");

  const AddPlacesDetails = async () => {
    try {
      const config = {
        url: "/admin/place",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "application/json" },
        data: {
          PlaceName: PlaceName,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddPlaces();
        handleClose1();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [newData, setNewdata] = useState({});
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

  //delete method
  const [Datass, setDatass] = useState("");
  const DeletePlaces = async () => {
    try {
      const config = {
        url: "admin/Deleteplace/" + Datass,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddPlaces();
          handleClose2();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method
  const [Data3, setData3] = useState("");
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = (item) => {
    setShow5(true);
    setData3(item);
    setPlaceName(item?.PlaceName);
  };

  const EditPlaces = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("PlaceName", PlaceName);
    formdata.append("id", Data3?._id);
    console.log(Data3?._id, "WORFEROUERU9G9ER");

    try {
      const config = {
        url: "admin/editplace/",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "Content-Type": "application/json" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Updated");
          handleClose5();
          getAddPlaces();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAddPlaces();
  }, []);
  console.log(AddPlaces);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 200;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddPlaces.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddPlaces.length / recordsperpage);
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
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="header-c ">Category</h2>
        <div className="d-flex gap-3">
          <button className="admin-add-btn" onClick={handleShow1}>
            Add Category
          </button>
        </div>
      </div>

      <div className="mb-3">
        <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Place Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + firstIndex}</td>
                  <td style={{ paddingTop: "20px" }}>{item.PlaceName}</td>
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
                          onClick={() => {
                            handleShow5();
                              setData3(item);
                              setNewdata(item);
                          }}
                        />{" "}
                      </div>
                      <div>
                        <AiFillDelete
                          className="text-danger"
                          style={{ cursor: "pointer", fontSize: "20px" }}
                          onClick={() => {
                              setDatass(item?._id);
                            handleShow2();
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

      {/* Add package modal */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Add Places</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Add Place Name</label>

              <input
                type="text"
                className="vi_0"
                placeholder="Enter Service Title"
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={handleClose1}
            >
              Close
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={AddPlacesDetails}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Edit package modal */}
      <Modal
        show={show5}
        onHide={handleClose5}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Edit Places</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Edit Place Name</label>
              <input
                type="text"
                className="vi_0"
                value={PlaceName}
                placeholder={newData?.PlaceName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose5}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn" onClick={EditPlaces}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delet package modal  */}
      <Modal
        show={show2}
        onHide={handleClose2}
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
          <Button variant="" className="modal-close-btn" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn" onClick={DeletePlaces}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlaceCategory;
