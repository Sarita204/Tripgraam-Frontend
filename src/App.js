import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-multi-carousel/lib/styles.css";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Viewmore from "./Components/Viewmore";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Contactus from "./Components/Contactus";
import Profile from "./Components/Profile";
import BookingDetails from "./Components/BookingDetails";
import Gallery from "./Components/Gallery";
import PackageDetails from "./Components/PackageDetails";
import MorePlaces from "./Components/MorePlaces";

// ===================Admin Panel==================//

import Dashboard from "./Components/Admin/Dashboard";
import Main from "./Components/Admin/Main";
import AdminLogin from "./Components/Admin/AdminLogin";
import HomeBanner from "./Components/Admin/HomeBanner";
import Aboutus from "./Components/Admin/Aboutus";
import AdminContactus from "./Components/Admin/AdminContactus";
import UserList from "./Components/Admin/UserList";
import GeneralEnquiry from "./Components/Admin/GeneralEnquiry";
import CategoryEnquiry from "./Components/Admin/CategoryEnquiry";
import BookingList from "./Components/Admin/BookingList";
import Places from "./Components/Admin/Places";
import PlaceCategory from "./Components/Admin/PlaceCategory";
import AdminDiscount from "./Components/Admin/AdminDiscount";
import AdminGallery from "./Components/Admin/AdminGallery";
import AdminTestimonials from "./Components/Admin/AdminTestimonials";
import AdminRatings from "./Components/Admin/AdminRatings";
import AdminServices from "./Components/Admin/AdminServices";
import ItineraryDetails from "./Components/Admin/ItineraryDetails";
import AddPackage from "./Components/Admin/AddPackage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            exact
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            exact
            element={
              <>
                <Register />
              </>
            }
          />

          <Route
            path="/profile"
            exact
            element={
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            }
          />

          <Route
            path="/bookingdetails"
            exact
            element={
              <>
                <Header />
                <BookingDetails />
                <Footer />
              </>
            }
          />

          <Route
            path="/packagedetails"
            exact
            element={
              <>
                <Header />
                <PackageDetails />
                <Footer />
              </>
            }
          />

          <Route
            path="/viewplace"
            exact
            element={
              <>
                <Header />
                <Viewmore />
                <Footer />
              </>
            }
          />

          <Route
            path="/moreplaces"
            exact
            element={
              <>
                <Header />
                <MorePlaces />
                <Footer />
              </>
            }
          />

          <Route
            path="/contactus"
            exact
            element={
              <>
                <Header />
                <Contactus />
                <Footer />
              </>
            }
          />

          <Route
            path="/gallery"
            exact
            element={
              <>
                <Header />
                <Gallery />
                <Footer />
              </>
            }
          />

          {/* Admin panel  */}

          <Route
            path="/admin"
            element={
              <>
                <AdminLogin />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Main
                children={
                  <>
                    <Dashboard />
                  </>
                }
              />
            }
          />

          <Route
            path="/homebanner"
            element={
              <Main
                children={
                  <>
                    <HomeBanner />
                  </>
                }
              />
            }
          />

          <Route
            path="/aboutus"
            element={
              <Main
                children={
                  <>
                    <Aboutus />
                  </>
                }
              />
            }
          />

          <Route
            path="/adminservice"
            element={
              <Main
                children={
                  <>
                    <AdminServices />
                  </>
                }
              />
            }
          />

<Route
            path="/adminpackages"
            element={
              <Main
                children={
                  <>
                    <AddPackage />
                  </>
                }
              />
            }
          />
          
          <Route
            path="/adminitinerary"
            element={
              <Main
                children={
                  <>
                    <ItineraryDetails />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_discount"
            element={
              <Main
                children={
                  <>
                    <AdminDiscount />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_gallery"
            element={
              <Main
                children={
                  <>
                    <AdminGallery />
                  </>
                }
              />
            }
          />

          <Route
            path="/adminplaces"
            element={
              <Main
                children={
                  <>
                    <Places />
                  </>
                }
              />
            }
          />

          <Route
            path="/adminplacescategory"
            element={
              <Main
                children={
                  <>
                    <PlaceCategory />
                  </>
                }
              />
            }
          />

          <Route
            path="/admincontactus"
            element={
              <Main
                children={
                  <>
                    <AdminContactus />
                  </>
                }
              />
            }
          />

          <Route
            path="/userlist"
            element={
              <Main
                children={
                  <>
                    <UserList />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_testimonial"
            element={
              <Main
                children={
                  <>
                    <AdminTestimonials />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_ratings"
            element={
              <Main
                children={
                  <>
                    <AdminRatings />
                  </>
                }
              />
            }
          />

          <Route
            path="/generalenquiry"
            element={
              <Main
                children={
                  <>
                    <GeneralEnquiry />
                  </>
                }
              />
            }
          />

          <Route
            path="/categoryenquiry"
            element={
              <Main
                children={
                  <>
                    <CategoryEnquiry />
                  </>
                }
              />
            }
          />
          <Route
            path="/bookinglist"
            element={
              <Main
                children={
                  <>
                    <BookingList />
                  </>
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
