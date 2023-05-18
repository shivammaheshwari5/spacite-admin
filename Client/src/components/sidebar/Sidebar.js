import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../login-page/Gupta-Promoters-Logo.svg";
import {
  HiOutlineBuildingOffice2,
  HiOutlineBuildingOffice,
} from "react-icons/hi2";
import { MdOutlinePermMedia, MdOutlineRealEstateAgent } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { BiMapPin } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineCash } from "react-icons/hi";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidenav">
        <div className="logo-sidebar">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>
        <div className="nav-menu-wrapper">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to="/commercial">
                <HiOutlineBuildingOffice2 className="icon" />
                Commercial Properties
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/residential-properties">
                <HiOutlineBuildingOffice className="icon" />
                Residential Properties
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/residential-property-type">
                <HiOutlineBuildingOffice className="icon" />
                Residential Property Type
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/media">
                <MdOutlinePermMedia className="icon" />
                Media
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/country">
                <IoEarthOutline className="icon" />
                Country
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/state">
                <BiMapPin className="icon" />
                State
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/city">
                <GiModernCity className="icon" />
                City
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/microlocation">
                <IoLocationOutline className="icon" />
                Microlocation
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/amenities">
                <HiOutlineCash className="icon" />
                Amenities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/builders">
                <MdOutlineRealEstateAgent className="icon" />
                Builders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
