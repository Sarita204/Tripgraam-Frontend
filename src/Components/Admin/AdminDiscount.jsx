import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";

const AdminDiscount = () => {
  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // integrating post method service
  const [SaleName, setSaleName] = useState("");
  const [SalePercentage, setSalePercentage] = useState("");
  const [startDate, setstartDate] = useState("");
  const [duration, setduration] = useState("");


  const AddDiscountDetails = async () => {
    try {
      const config = {
        url: "/admin/discount",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "application/json" },
        data: {
          SaleName: SaleName,
          SalePercentage: SalePercentage,
          startDate:startDate,
          duration:duration,

        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddDiscount();
        handleClose1();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //integrating get  method
  const [newData, setNewdata] = useState({});
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

  //delete method
  const [Datass, setDatass] = useState("");
  const DeleteDiscount = async () => {
    try {
      const config = {
        url: "admin/Deletediscount/" + Datass,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddDiscount();
          handleClose2();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    getAddDiscount();
  }, []);
  console.log(AddDiscount);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 200;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddDiscount.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddDiscount.length / recordsperpage);
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options).replace(/\//g, "-");
  };


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="header-c ">Sale Discount</h2>
        <div className="d-flex gap-3">
          <div>
            {AddDiscount?.length !== 0 ? (
              ""
            ) : (
              <>
                <button className="admin-add-btn" onClick={handleShow1}>
                  Add Sale Discount
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Sales Name</th>
              <th>Sales Percentage</th>
              <th>Sale Start Date</th>
              <th>Sale Duration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + firstIndex}</td>
                  <td style={{ paddingTop: "20px" }}>{item.SaleName}</td>
                  <td style={{ paddingTop: "20px" }}>{item.SalePercentage}</td>
                  <td style={{ paddingTop: "20px" }}>{formatDate(item.startDate)}</td>
                  <td style={{ paddingTop: "20px" }}>{item.duration}</td>

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

      {/* Add package modal */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Add Places</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Sale Name</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Sale Name"
                onChange={(e) => setSaleName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Sale Percentage</label>
              <input
                type="text"
                className="vi_0"
                placeholder="Enter Sale %"
                onChange={(e) => setSalePercentage(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Sale Start Date</label>
              <input
                type="date"
                className="vi_0"
                placeholder="choose Sale start date"
                onChange={(e) => setstartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="do-sear mt-2">
              <label>Sale duration</label>
              <input
                type="number"
                className="vi_0"
                placeholder="duration of sale"
                onChange={(e) => setduration(e.target.value)}
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
              onClick={AddDiscountDetails}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

  

      {/* Delet modal  */}
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
          <Button variant="" className="modal-add-btn" onClick={DeleteDiscount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDiscount;
