import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { IoMdEye } from "react-icons/io";

const Places = () => {
  const [show6, setShow6] = useState();
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const [shows, setShows] = useState();
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show8, setShow8] = useState();
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const [View, setView] = useState({});

  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setWOverviewDesc(data);
  };
  const handleChange2 = (e, editor) => {
    const data = editor.getData();
    setWInctutionDesc(data);
  };
  const handleChange3 = (e, editor) => {
    const data = editor.getData();
    setWExctutionDesc(data);
  };

  const handleChange5 = (e, editor) => {
    const data = editor.getData();
    setPlaceDescription(data);
  };

  const handleChange6 = (e, editor) => {
    const data = editor.getData();
    setWayDescription(data);
  };

  // integrating post method
  const [PlaceBannerImage, setPlaceBannerImage] = useState("");
  const [PlaceBannerName, setPlaceBannerName] = useState("");
  const [PlaceName, setPlaceName] = useState("");
  const [ActualPrice, setActualPrice] = useState("");
  const [OfferPrice, setOfferPrice] = useState("");
  const [PlaceDescription, setPlaceDescription] = useState("");
  const [WayDescription, setWayDescription] = useState("");
  const [WOverview, setWOverview] = useState("");
  const [WOverviewDesc, setWOverviewDesc] = useState("");
  const [WInctution, setWInctution] = useState("");
  const [WInctutionDesc, setWInctutionDesc] = useState("");
  const [WExctution, setWExctution] = useState("");
  const [WExctutionDesc, setWExctutionDesc] = useState("");
  const [PlaceCat, setPlaceCat] = useState("");
  const [TotalDay, setTotalDay] = useState("");
  const [TotalNights, setTotalNights] = useState("");
  const [PerDayPlan, setPerDayPlan] = useState("");
  const [SavePrice, setSavePrice] = useState("");



   // =======================IMAGES==================//

   const [Image5, setImage5] = useState('');
   const [imageURL2, setimageURL2] = useState('');
   const onImageChange2 = (event) => {
     if (event.target.files && event.target.files[0]) {
       setimageURL2(URL.createObjectURL(event.target.files[0]));
     }
   };
 
 
 
   const [galleryImages, setGalleryImages] = useState([]);
   const AddGalleryImage = () => {
     if (!Image5) {
       return alert("Please, Select Image");
     }
 
     const imageExists = galleryImages.find((img) => img?.imgUrl === Image5);
 
     if (imageExists) {
       return alert("Image already exists in the gallery.");
     }
 
     const obj = {
       image: Image5,
       imgUrl: imageURL2,
     };
 
     setGalleryImages([...galleryImages, obj]);
   };
   const removeItem2 = (val) => {
     const updatedGallery = galleryImages.filter((item, index) => index !== val);
     setGalleryImages(updatedGallery);
   };
 
   
   const Addplace = async () => {
    const formdata = new FormData();
    if (PlaceBannerImage) formdata.append("PlaceBannerImage", PlaceBannerImage);
    if (PlaceBannerName) formdata.append("PlaceBannerName", PlaceBannerName);
    if (PlaceName) formdata.append("PlaceName", PlaceName);
    if (PlaceDescription) formdata.append("PlaceDescription", PlaceDescription);
    if (WayDescription) formdata.append("WayDescription", WayDescription);
    if (OfferPrice) formdata.append("OfferPrice", OfferPrice);
    if (ActualPrice) formdata.append("ActualPrice", ActualPrice);
    if (WOverview) formdata.append("WOverview", WOverview);
    if (WOverviewDesc) formdata.append("WOverviewDesc", WOverviewDesc);
    if (WInctution) formdata.append("WInctution", WInctution);
    if (WInctutionDesc) formdata.append("WInctutionDesc", WInctutionDesc);
    if (WExctution) formdata.append("WExctution", WExctution);
    if (WExctutionDesc) formdata.append("WExctutionDesc", WExctutionDesc);
    if (PlaceCat) formdata.append("PlaceCat", PlaceCat);
    if (TotalDay) formdata.append("TotalDay", TotalDay);
    if (TotalNights) formdata.append("TotalNights", TotalNights);
    if (PerDayPlan) formdata.append("PerDayPlan", PerDayPlan);
    if (SavePrice) formdata.append("SavePrice", SavePrice);
  
    try {
      if (!PlaceCat) return alert("Please select place name");
      if (!PlaceBannerImage) return alert("Please add image");
  
      const config = {
        url: "/admin/wplace",
        method: "post",
        baseURL: "http://localhost:9000/api",
        headers: { "content-type": "multipart/form-data" },
        data: formdata,
      };
  
      let res = await axios(config);
      console.log('API Response:', res);
  
      if (res.status === 200) {
      
        for (let i = 0; i < galleryImages.length; i++) {
          const config = {
            url: '/admin/Addgallery',
            method: 'put',
            baseURL: 'http://localhost:9000/api',
            headers: { 'content-type': 'multipart/form-data' },
            data: {
              placeid: res.data.success?._id,
              placepicture: galleryImages[i].image
            },
          };
  
          let data = await axios(config);
          console.log('Gallery Image Response:', data);
          if (data.status === 200) {
            alert('Data added successfully');
            getAddWayanadPlaces();
            handleCloses();
            setGalleryImages("");
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  console.log("data=======",galleryImages);
  //integrating get  method
  const [AddWayanadPlaces, setAddWayanadPlaces] = useState([]);
  const getAddWayanadPlaces = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getwplace");
      if (res.status === 200) {
        setAddWayanadPlaces(res.data.getwplace);
        setNoChangeData1(res.data.getwplace);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Datas, setDatas] = useState("");
  const Deleteplace = async () => {
    try {
      const config = {
        url: "admin/Deletewplace/" + Datas,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddWayanadPlaces();
          handleClose6();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method
  const [Data11, setData11] = useState("");
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = (item) => {
    setShow5(true);
    setData11(item);
    setPlaceName(item?.PlaceName);
  };
  const Editplaces = async (e) => {
    e.preventDefault();
    const formdataedit = new FormData();
    formdataedit.append("PlaceBannerImage", PlaceBannerImage);
    formdataedit.append("PlaceBannerName", PlaceBannerName);
    formdataedit.append("PlaceName", PlaceName);
    formdataedit.append("PlaceDescription", PlaceDescription);
    formdataedit.append("WayDescription", WayDescription);
    formdataedit.append("OfferPrice", OfferPrice);
    formdataedit.append("ActualPrice", ActualPrice);
    formdataedit.append("PlaceCat", PlaceCat);
    formdataedit.append("WOverview", WOverview);
    formdataedit.append("WOverviewDesc", WOverviewDesc);
    formdataedit.append("WInctution", WInctution);
    formdataedit.append("WInctutionDesc", WInctutionDesc);
    formdataedit.append("WExctution", WExctution);
    formdataedit.append("WExctutionDesc", WExctutionDesc);
    formdataedit.append("TotalDay", TotalDay);
    formdataedit.append("TotalNights", TotalNights);
    formdataedit.append("PerDayPlan", PerDayPlan);
    formdataedit.append("SavePrice", SavePrice);
    formdataedit.append("id", Data11?._id);

    try {
      const config = {
        url: "admin/editwplace",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        headers: { "content-type": "multipart/form-data" },
        data: formdataedit,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose5();
          getAddWayanadPlaces();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddWayanadPlaces();
  }, []);
  console.log(AddWayanadPlaces);

  // pagination
  const [currenpage1, setCurrentpage1] = useState(1);
  const recordsperpage1 = 5;
  const lastIndex1 = currenpage1 * recordsperpage1;
  const firstIndex1 = lastIndex1 - recordsperpage1;
  const records1 = AddWayanadPlaces.slice(firstIndex1, lastIndex1);
  const npages1 = Math.ceil(AddWayanadPlaces.length / recordsperpage1);
  const numbers1 = [...Array(npages1 + 1).keys()].slice(1);

  function changePage1(id) {
    setCurrentpage1(id);
  }

  function prevpage1() {
    if (currenpage1 !== firstIndex1) {
      setCurrentpage1(currenpage1 - 1);
    }
  }

  function nextpage1() {
    if (currenpage1 !== lastIndex1) {
      setCurrentpage1(currenpage1 + 1);
    }
  }

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

  useEffect(() => {
    getAddPlaces();
  }, []);
  console.log(AddPlaces);

  // Search filter
  const [nochangedata, setNoChangeData1] = useState([]);
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
      setAddWayanadPlaces(filteredData);
    } else {
      setAddWayanadPlaces(nochangedata);
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
              onChange={handleFilterH}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c "> Places</h2>
          <div className="d-flex gap-3">
            <button className="admin-add-btn" onClick={handleShows}>
              Add Places
            </button>
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
                <th>S.No</th>
                <th>Category Name</th>
                <th>Banner Image</th>
                <th>Banner Title</th>
                <th>Place Images </th>
                <th>Day's</th>
                <th>Nights's</th>
                <th>Place Name</th>
                <th>Per Day Plan</th>
                <th>Description</th>
                <th>Overview</th>
                <th>Inclusion</th>
                <th>Exclusion</th>
                <th>Way to Reach</th>
                <th>Actual Price</th>
                <th>Offer Price</th>
                <th>Save Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records1?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + firstIndex1}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PlaceCat}</td>
                    <td>
                      <img
                        src={`http://localhost:9000/Places/${item?.PlaceBannerImage}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>

                    <td style={{ paddingTop: "20px" }}>
                      {item.PlaceBannerName}
                    </td>

                    <td style={{ paddingTop: "20px" }}>
                      <IoMdEye
                        style={{ fontSize: "22" }}
                        onClick={() => {
                          handleShow1();
                          setView(item);
                        }}
                      />
                    </td>

                    <td style={{ paddingTop: "20px" }}>{item.TotalDay}</td>
                    <td style={{ paddingTop: "20px" }}>{item.TotalNights}</td>

                    <td style={{ paddingTop: "20px" }}>{item.PlaceName}</td>
                    <td style={{ paddingTop: "20px" }}>{item.PerDayPlan}</td>

                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.PlaceDescription}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.WOverviewDesc}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.WInctutionDesc}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.WExctutionDesc}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">
                        {parse(`<div>${item.WayDescription}</div>`)}
                      </div>
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.ActualPrice}</td>
                    <td style={{ paddingTop: "20px" }}>{item.OfferPrice}</td>
                    <td style={{ paddingTop: "20px" }}>{item.SavePrice}</td>

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
                              handleShow5(item);
                              setData11(item);
                              setNewdata(item);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow6();
                              setDatas(item?._id);
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

        {/* Add Package modal */}
        <Modal
          show={shows}
          onHide={handleCloses}
          style={{ zIndex: "99999" }}
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Add Place Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="do-sear mt-2">
                <label>Choose Category Name</label>
                <select
                  className="form-control"
                  onChange={(e) => setPlaceCat(e.target.value)}
                >
                  <option value="">Select Category Name</option>
                  {AddPlaces?.map((item, i) => {
                    return (
                      <option value={item.PlaceName}>{item.PlaceName}</option>
                    );
                  })}
                </select>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label> Place Banner Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceBannerImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Banner Title</label>
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter Banner Title"
                    onChange={(e) => setPlaceBannerName(e.target.value)}
                  />
                </div>
              </div>
{/* 
              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceImage1(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceImage2(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceImage3(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceImage4(e.target.files[0])}
                  />
                </div>
              </div> */}

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Name</label>
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter Place Name"
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Day's</label>
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter Total Days"
                    onChange={(e) => setTotalDay(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Night's</label>
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter Total Nights"
                    onChange={(e) => setTotalNights(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Day Palns with Place name</label>
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter Day Palns with Place Name"
                    onChange={(e) => setPerDayPlan(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Description</label>
                  <CKEditor editor={ClassicEditor} onChange={handleChange5} />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Overview Description</label>
                  <CKEditor editor={ClassicEditor} onChange={handleChange1} />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Inclusion Description</label>
                  <CKEditor editor={ClassicEditor} onChange={handleChange2} />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Exclusion Description</label>
                  <CKEditor editor={ClassicEditor} onChange={handleChange3} />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>How to Reach</label>
                  <CKEditor editor={ClassicEditor} onChange={handleChange6} />
                </div>
              </div>
              <div className="row">
                <div className="do-sear mt-2">
                  <label>Actual Price</label>
                  <input
                    type="number"
                    className="vi_0"
                    placeholder="Enter Actual Price"
                    onChange={(e) => setActualPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="do-sear mt-2">
                  <label>Offer Price</label>
                  <input
                    type="number"
                    className="vi_0"
                    placeholder="Enter Offer Price"
                    onChange={(e) => setOfferPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Save Price</label>
                  <input
                    type="number"
                    className="vi_0"
                    placeholder="Enter Save Price"
                    onChange={(e) => setSavePrice(e.target.value)}
                  />
                </div>
              </div>

              <hr />
              <h3>
                <b>Carousel Images</b>
              </h3>
              {/* Images */}
              <div className="row mb-2">
                <div className="do-sear mt-2">
                  <label>Add Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) =>{ setImage5(e.target.files[0]);onImageChange2(e)}}
                  />
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddGalleryImage}
                  >
                    Add
                  </Button>
                </div>

                <Table bordered className="sdfsd-table-head mt-2">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryImages?.map((item, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Image
                              src={item?.imgUrl}
                              alt="pic"
                              style={{ width: "75px", height: "75px" }}
                            />
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
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() => {
                                    // setData1(item?._id);
                                    removeItem2(i)
                                    // handleShow8()
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleCloses}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={Addplace}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal
          show={show5}
          onHide={handleClose5}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Edit Place Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="do-sear mt-2">
                <label>Choose Category Name</label>
                <select
                  className="form-control"
                  onChange={(e) => setPlaceCat(e.target.value)}
                >
                  <option value="">Select Category Name</option>
                  {AddPlaces?.map((item, i) => {
                    return (
                      <option value={item.PlaceName}>{item.PlaceName}</option>
                    );
                  })}
                </select>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label> Place Banner Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) => setPlaceBannerImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Banner Title</label>
                  <input
                    type="text"
                    className="vi_0"
                    value={PlaceBannerName}
                    placeholder={newData?.PlaceBannerName}
                    onChange={(e) => setPlaceBannerName(e.target.value)}
                  />
                </div>
              </div>

    
              <div className="row">
                <div className="do-sear mt-2">
                  <label>Place Name</label>
                  <input
                    type="text"
                    className="vi_0"
                    value={PlaceName}
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Day's</label>
                  <input
                    type="text"
                    className="vi_0"
                    value={TotalDay}
                    placeholder="Enter Total Days"
                    onChange={(e) => setTotalDay(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Night's</label>
                  <input
                    type="text"
                    className="vi_0"
                    value={TotalNights}
                    placeholder="Enter Total Nights"
                    onChange={(e) => setTotalNights(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Day Palns with Place name</label>
                  <input
                    type="text"
                    className="vi_0"
                    value={PerDayPlan}
                    placeholder="Enter Day Palns with Place Name"
                    onChange={(e) => setPerDayPlan(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={handleChange5}
                    data={PlaceDescription}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Overview Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={handleChange1}
                    data={WOverviewDesc}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Inclusion Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={handleChange2}
                    data={WInctutionDesc}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>Exclusion Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={handleChange3}
                    data={WExctutionDesc}
                  />
                </div>
              </div>

              <div className="row">
                <div className="do-sear mt-2">
                  <label>How to Reach</label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={handleChange6}
                    data={WayDescription}
                  />
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Actual Price</label>
                    <input
                      type="number"
                      className="vi_0"
                      placeholder="Enter Actual Price"
                      onChange={(e) => setActualPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Offer Price</label>
                    <input
                      type="number"
                      className="vi_0"
                      placeholder="Enter Offer Price"
                      onChange={(e) => setOfferPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="do-sear mt-2">
                    <label>Save Price</label>
                    <input
                      type="number"
                      className="vi_0"
                      placeholder="Enter Save Price"
                      value={SavePrice}
                      onChange={(e) => setSavePrice(e.target.value)}
                    />
                  </div>
                </div>

                <hr />
              <h3>
                <b>Carousel Images</b>
              </h3>
              {/* Images */}
              <div className="row mb-2">
                <div className="do-sear mt-2">
                  <label>Add Place Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="vi_0"
                    onChange={(e) =>{ setImage5(e.target.files[0]);onImageChange2(e)}}
                  />
                  <Button
                    className="mx-2 modal-add-btn"
                    variant=""
                    onClick={AddGalleryImage}
                  >
                    Add
                  </Button>
                </div>

                <Table bordered className="sdfsd-table-head mt-2">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryImages?.map((item, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Image
                              src={item?.imgUrl}
                              alt="pic"
                              style={{ width: "75px", height: "75px" }}
                            />
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
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() => {
                                    // setData1(item?._id);
                                    removeItem2(i)
                                    // handleShow8()
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
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose5}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={Editplaces}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delet modal  */}
        <Modal
          show={show6}
          onHide={handleClose6}
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
              onClick={handleClose6}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={Deleteplace}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Slider Image modal  */}
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              About Showcase Images
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <div>
           <Table bordered className="sdfsd-table-head mt-2">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryImages?.map((item, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Image
                              src={item?.imgUrl}
                              alt="pic"
                              style={{ width: "75px", height: "75px" }}
                            />
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
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() => {
                                    // setData1(item?._id);
                                    removeItem2(i)
                                    // handleShow8()
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose1}
            >
              Close
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
                        prevpage1();
                      }}
                    >
                      &lt;
                    </a>{" "}
                  </li>
                </span>
              </li>
              {numbers1?.map((n, i) => {
                return (
                  <li className="active-next" key={i}>
                    <a
                      href="#"
                      className="inactive"
                      onClick={() => changePage1(n)}
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
                      nextpage1();
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
    </div>
  );
};

export default Places;
