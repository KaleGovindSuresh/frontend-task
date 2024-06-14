import React, { useState } from "react";
import "./sidebar.css";
import { IoIosHome, IoIosWallet } from "react-icons/io";
import { GiBassetHoundHead } from "react-icons/gi";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <div className="menu-btn" onClick={toggleMenu}>
        <MdOutlineKeyboardDoubleArrowLeft className="arrow_button" />
      </div>
      <div className="user-details">
        <p>
          <span className="st_span">ST</span> <span className="company_name">Shihaan Tech</span>
        </p>
      </div>
      <div className="nav">
        <div className="menu">
          <ul>
            <li className="active">
              <IoIosHome className="icon" />
              <span className="text">Home</span>
            </li>
            <li className="assets">
              <GiBassetHoundHead className="icon" />
              <span className="text">Assets</span>
            </li>
            <li className="wallet">
              <IoIosWallet className="icon" />
              <span className="text">Wallet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
