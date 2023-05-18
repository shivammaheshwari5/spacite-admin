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
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  localStorage.setItem("isLogin", isLogin);
  return (
    <div>
      <div className="wrapper">
        <div className={isLogin ? "mainpanel" : ""}>
          <Routes>
            <Route
              path="/commercial"
              element={
                isLogin ? [<Sidebar />, <Commercial />] : <Navigate to="/" />
              }
            />
            <Route
              path="/residential-properties"
              element={
                isLogin ? [<Sidebar />, <Residential />] : <Navigate to="/" />
              }
            />
            <Route
              path="/residential-property-type"
              element={
                isLogin ? (
                  [<Sidebar />, <ResPropertyType />]
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/media"
              element={isLogin ? [<Sidebar />, <Media />] : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={
                <Login onLogin={(loginStatus) => setIsLogin(loginStatus)} />
              }
            />
            <Route
              path="/country"
              element={
                isLogin ? [<Sidebar />, <Country />] : <Navigate to="/" />
              }
            />
            <Route
              path="/state"
              element={isLogin ? [<Sidebar />, <State />] : <Navigate to="/" />}
            />
            <Route
              path="/city"
              element={isLogin ? [<Sidebar />, <City />] : <Navigate to="/" />}
            />
            <Route
              path="/microlocation"
              element={
                isLogin ? [<Sidebar />, <Microlocation />] : <Navigate to="/" />
              }
            />
            <Route
              path="/amenities"
              element={
                isLogin ? [<Sidebar />, <Amenities />] : <Navigate to="/" />
              }
            />
            <Route
              path="/builders"
              element={
                isLogin ? [<Sidebar />, <Builders />] : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
