import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import ListingSpace from "./components/listing-space/ListingSpace";
import CoworkingPlan from "./components/coworking-plans/CoworkingPlan";
import Media from "./components/media/Media";
import Country from "./components/country/Country";
import State from "./components/state/State";
import City from "./components/city/City";
import Microlocation from "./components/microlocation/Microlocation";
import Amenities from "./components/amenities/Amenities";
import Login from "./components/login-page/Login";
import { useState, useContext } from "react";
import { GpState } from "./context/context";
import AddListingSpace from "./components/listing-space/AddListingSpace";
import CoworkingSpace from "./components/coworking-space/CoworkingSpace";
import Brands from "./components/brands/Brands";
import Seo from "./components/SEO/Seo";
import AddSeoForm from "./components/SEO/AddSeoForm";
import EditSeo from "./components/SEO/EditSeo";
import Addbrand from "./components/brands/Addbrand";
import EditBrand from "./components/brands/EditBrand";
function App() {
  let { isLogin } = GpState();

  localStorage.setItem("isLogin", isLogin);
  return (
    <div>
      <div className="wrapper">
        <div className={isLogin ? "mainpanel" : ""}>
          <Routes>
            <Route
              path="/listing-space"
              element={
                isLogin ? (
                  [<Sidebar key={1} />, <ListingSpace key={2} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/coworking-space"
              key="2"
              element={
                isLogin ? (
                  [<Sidebar key={3} />, <CoworkingSpace key={4} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/coworking-plan"
              key="3"
              element={
                isLogin ? (
                  [<Sidebar key={5} />, <CoworkingPlan key={6} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/media"
              key="4"
              element={
                isLogin ? (
                  [<Sidebar key={7} />, <Media key={8} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/" key="5" element={<Login key={9} />} />
            <Route
              path="/country"
              key="6"
              element={
                isLogin ? (
                  [<Sidebar key={10} />, <Country key={11} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/state"
              key="7"
              element={
                isLogin ? (
                  [<Sidebar key={12} />, <State key={13} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/city"
              key="8"
              element={
                isLogin ? (
                  [<Sidebar key={14} />, <City key={15} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/microlocation"
              key="9"
              element={
                isLogin ? (
                  [<Sidebar key={16} />, <Microlocation key={17} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/amenities"
              key="10"
              element={
                isLogin ? (
                  [<Sidebar key={18} />, <Amenities key={19} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/seo"
              key="11"
              element={
                isLogin ? (
                  [<Sidebar key={20} />, <Seo key={21} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/coworking-space/add-coworking-space"
              element={
                isLogin ? (
                  [<Sidebar key={22} />, <AddListingSpace key={23} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/seo/add-seo"
              element={
                isLogin ? (
                  [<Sidebar key={24} />, <AddSeoForm key={25} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/brands"
              element={
                isLogin ? (
                  [<Sidebar key={26} />, <Brands key={27} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/seo/editseo/:id"
              element={
                isLogin ? (
                  [<Sidebar key={28} />, <EditSeo key={29} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/brands/add-brand"
              element={
                isLogin ? (
                  [<Sidebar key={30} />, <Addbrand key={31} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/editbrand/:id"
              element={
                isLogin ? (
                  [<Sidebar key={32} />, <EditBrand key={33} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
