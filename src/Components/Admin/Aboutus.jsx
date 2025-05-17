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

const Aboutus = () => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // integrating post method aboutus
  const formdata = new FormData();
  const [AboutImage1, setAboutImage1] = useState("");
  const [AboutImage2, setAboutImage2] = useState("");
  const [AboutDesc, setAboutDesc] = useState("");

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setAboutDesc(data);
  };

  const AddAboutusDetais = async () => {
    formdata.append("AboutImage1", AboutImage1);
    formdata.append("AboutImage2", AboutImage2);
    formdata.append("AboutDesc", AboutDesc);

    try {
      if (!AboutImage1) {
        return alert("Please add Image");
      }
      if (!AboutImage2) {
        return alert("Please add Image");
      }
      if (!AboutDesc) {
        return alert("Please add Description");
      }

      const config = {
        url: "/admin/about",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddAboutus();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method
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
  //delete method
  const [Data, setData] = useState("");
  const DeleteAboutus = async () => {
    try {
      const config = {
        url: "admin/Deleteabout/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddAboutus();
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
    setAboutImage1(item?.AboutImage1);
    setAboutImage2(item.AboutImage2);
    setAboutDesc(item.AboutDesc);
  };

  const editService = async (e) => {
    e.preventDefault();
    formdata.append("AboutImage1", AboutImage1);
    formdata.append("AboutImage2", AboutImage2);
    formdata.append("AboutDesc", AboutDesc);

    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editabout",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddAboutus();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddAboutus();
  }, []);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddAboutus.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddAboutus.length / recordsperpage);
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
                  // onChange={handleFilterH1}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="header-c ">About us</h2>
                <div className="d-flex gap-3">
                <div>
            {AddAboutus?.length !== 0 ? (
              ""
            ) : (
              <>
                <button className="admin-add-btn" onClick={handleShow}>
                  Add About us
                </button>
              </>
            )}
          </div>
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
                    <th>Image</th>
                    <th>Description</th>
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
                            src={`http://localhost:9000/Aboutus/${item?.AboutImage1}`}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>

                        <td>
                          <Image
                            src={`http://localhost:9000/Aboutus/${item?.AboutImage2}`}
                            alt="pic"
                            style={{ width: "75px", height: "75px" }}
                          />
                        </td>
                        <td style={{ paddingTop: "20px" }}>
                          {parse(`<div>${item.AboutDesc}</div>`)}
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
      
        {/* Add about modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Add About us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add About Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setAboutImage1(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add About Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setAboutImage2(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>
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
                onClick={AddAboutusDetais}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit about modal */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Edit About us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add About Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setAboutImage1(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add About Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setAboutImage2(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>
                <CKEditor editor={ClassicEditor} 
                data={AboutDesc}
                onChange={handleChange} />
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

        {/* Delet about modal  */}
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
              onClick={DeleteAboutus}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Aboutus;
