import React, { useEffect, useState } from "react";
import "../Admin/Admin.css";
import Card from "react-bootstrap/Card";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const Dashboard = () => {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const token = sessionStorage.getItem("token");

  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [Adduser, setAdduser] = useState([]);
  const getAdduser = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user/getuser");
      if (res.status === 200) {
        setAdduser(res.data.getuser);
        setNoChangeData(res.data.getuser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Data, setData] = useState("");
  const Deleteuserlist = async () => {
    try {
      const config = {
        url: "user/Deleteuser/" + Data?._id,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAdduser();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  // };

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

  //integrating get  method
  const [Addgeneral, setAddgeneral] = useState([]);
  const getgeneral = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user/getgeneral");
      if (res.status === 200) {
        setAddgeneral(res.data.getgeneral);
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getAdduser();
    getbooking();
    getgeneral();
    getcategory();
  }, []);
  console.log();

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Adduser.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Adduser.length / recordsperpage);
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
      setAdduser(filteredData);
    } else {
      setAdduser(nochangedata);
    }
  };

  return (
    <div>
      <h2 className="header-c ">Dashboard</h2>

      <div className="cards-container">
        <Card
          style={{
            width: "14rem",
            height: "120px",
            padding: "20px",
            boxShadow: "1px 0px 10px 1px black",
            borderRadius: "10px",
          }}
        >
          <Card.Body>
            <Card.Title>All Registered Users</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {Adduser?.length}
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card
          style={{
            width: "14rem",
            height: "120px",
            padding: "20px",
            boxShadow: "1px 0px 10px 1px black",
            borderRadius: "10px",
          }}
        >
          <Card.Body>
            <Card.Title>Total Bookings </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {Addbooking?.length}
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card
          style={{
            width: "14rem",
            height: "120px",
            padding: "20px",
            boxShadow: "1px 0px 10px 1px black",
            borderRadius: "10px",
          }}
        >
          <Card.Body>
            <Card.Title>Total General Enquiry</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {Addgeneral?.length}
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card
          style={{
            width: "14rem",
            height: "120px",
            padding: "20px",
            boxShadow: "1px 0px 10px 1px black",
            borderRadius: "10px",
          }}
        >
          <Card.Body>
            <Card.Title>Total Category Enquiry</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {Addcategory?.length}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>

      <div>
        <h2 className="header-c ">User List</h2>

        <div className="srch-icon">
          <div>
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

          <div>
            <Button variant="" className="admin-add-btn">
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="/userlist"
              >
                View All Users
              </a>
            </Button>
          </div>
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
                <th>Profile Image</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + firstIndex}</td>
                    <td>
                      <img
                        src={`http://localhost:9000/User/${item?.UProfile}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.UName}</td>
                    <td style={{ paddingTop: "20px" }}>{item.UPhone}</td>
                    <td style={{ paddingTop: "20px" }}>{item.UEmail}</td>
                    <td style={{ paddingTop: "20px" }}>{item.UAddress}</td>
                    <div>
                      <AiFillDelete
                        className="text-danger"
                        style={{ cursor: "pointer", fontSize: "20px" }}
                        onClick={() => {
                          handleShow4();
                          setData(item);
                        }}
                      />
                    </div>
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
              onClick={Deleteuserlist}
            >
              Delete
            </Button>
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

export default Dashboard;
