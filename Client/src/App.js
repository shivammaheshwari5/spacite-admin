import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Commercial from "./components/commercial-properties/Commercial";
import Residential from "./components/residential-properties/Residential";
import ResPropertyType from "./components/residential-property-type/ResPropertyType";
import Media from "./components/media/Media";
import Country from "./components/country/Country";
import State from "./components/state/State";
import City from "./components/city/City";
import Microlocation from "./components/microlocation/Microlocation";
import Amenities from "./components/amenities/Amenities";
import Builders from "./components/builders/Builders";
import Login from "./components/login-page/Login";
import { useState, useContext } from "react";
import { AppContext } from "./context/context";

function App() {
  const myModal = useContext(AppContext);

  const { isLogin } = myModal;

  localStorage.setItem("isLogin", isLogin);
  return (
    <div>
      <div className="wrapper">
        <div className={isLogin ? "mainpanel" : ""}>
          <Routes>
            <Route
              path="/commercial"
              element={
                isLogin ? (
                  [<Sidebar key={1} />, <Commercial key={2} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/residential-properties"
              key="2"
              element={
                isLogin ? (
                  [<Sidebar key={3} />, <Residential key={4} />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/residential-property-type"
              key="3"
              element={
                isLogin ? (
                  [<Sidebar key={5} />, <ResPropertyType key={6} />]
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
              path="/builders"
              key="11"
              element={
                isLogin ? (
                  [<Sidebar key={20} />, <Builders key={21} />]
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
