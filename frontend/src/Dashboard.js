import "./dashboard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link  } from "react-router-dom";
import api from "./api";

// Icons
import { BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";



function Dashboard({ user, setUser }) {
    




    return (
        <div className="dashboard-container">
            {/* Left Side Group */}
            <div className="left-side-group">
                
            </div>

            {/* Navigation Bottom bar */}
            <div className="bottom-container">
                <div id="home-group">
                    <button className="wrap-icon"><AiFillHome id="home-button"/></button>
                </div>
                <div id="add-category-group">
                    <button className="wrap-icon"><FaPlus id="add-category-button"></FaPlus></button>
                </div>
                <div id="profile-group">
                    <button className="wrap-icon"><Link to="/profile"><BsPersonFill id="profile-button"/></Link></button>
                </div>
            </div>


        </div>
    );
}

export default Dashboard;