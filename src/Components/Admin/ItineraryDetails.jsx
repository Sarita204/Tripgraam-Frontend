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
import { useNavigate } from "react-router-dom";

const ItineraryDetails = () => {

    const [show, setShow] = useState();
    const [show4, setShow4] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
  
    const [show1, setShow1] = useState();
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
  
    const navigate = useNavigate();
    
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
  
      try {
        // if (!ServiceImage) {
        //   return alert("Please add Image");
        // }
        // if (!ServiceText) {
        //   return alert("Please Choose Package Name");
        // }
        // if (!PackagePrice) {
        //   return alert("Please add Package price");
        // }
        // if (!PackageBenefit) {
        //   return alert("Please add Package Benefits");
        // }
        // if (!ActivityStartTime) {
        //   return alert("Please Choose journey start time");
        // }
        // if (!ActivityEndTime) {
        //   return alert("Please Choose journey end time");
        // }
        // if (!ActivityDuration) {
        //   return alert("Please add duration");
        // }
  
        // if (!WaytoReach) {
        //   return alert("Please add Way to reach");
        // }
        // if (!PolicyDesc) {
        //   return alert("Please add Policies");
        // }
        // if (!Day) {
        //   return alert("Please Add Day");
        // }
        // if (!ActivityImage) {
        //   return alert("Please Choose Visiting place image");
        // }
        // if (!ActivityDesc) {
        //   return alert("Please add Visiting place description");
        // }
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
          handleClose2();
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
        
        <div className="mt-2 mb-2">
            <button  onClick={() =>
                            navigate("/adminservice")
                          }>back</button>
            Add Itinerary Deatails <Button onClick={handleShow2}>Add</Button>
            </div>

          <Table bordered className="sdfsd-table-head">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Day</th>
                <th>Image</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {AddServices?.map((item, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td style={{ paddingTop: "20px" }}>{item.Day} Day</td>

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


              {/* Itinerary add Modal  */}
        <Modal
          show={show2}
          onHide={handleClose2}
          style={{ zIndex: "99999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              {" "}
              Itinerary Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <Button
              variant=""
              style={{
                background: "black ",
                color: "white",
              }}
              onClick={AddServiceDetais}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ItineraryDetails