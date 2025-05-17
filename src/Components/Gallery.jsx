import React, { useState, useEffect } from "react";
import "../Styles/gallery.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Aos from "aos";

const Gallery = () => {

    const navigate = useNavigate();

    useEffect(() => {
        Aos.init();
      }, []);
    
  //integrating get  method
  const [AddGallery, setAddGallery] = useState([]);
  const getAddGallery = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getgallery");
      if (res.status === 200) {
        setAddGallery(res.data.getgallery);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddGallery();
  }, []);
  console.log(AddGallery);

  return (
    <div>
      <div>
        <img
          src="../Assets/gallerybg8.jpg"
          alt=""
          className="viewmore-banner "
        />
        <div className="gbg-title">
          <h2  data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="3000"
                >Gallery</h2>
          <p
                  style={{ color: "white", textAlign: "center" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </p>
        </div>
      </div>

      <Container fluid>
        <div className="row mt-2 mb-3">
            {AddGallery?.map((item, i) => {
              return (
                <div className="col-md-4 mb-2"  data-aos="zoom-in-down"
                data-aos-delay="50"
                data-aos-duration="3000">
                <div className="gallery-box">
                  <img
                    src={`http://localhost:9000/Gallery/${item?.GalleryImage}`}
                    alt=""
                    className="gallery-img"
                  />
                  <div className="place-name">
                    <div>
                      <b>{item.LocationName}</b>
                    </div>
                    {/* <div>Rating star</div> */}
                  </div>
                </div>
                </div>
              );
            })}
          </div>
      </Container>
    </div>
  );
};

export default Gallery;
