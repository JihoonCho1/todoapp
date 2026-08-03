import "./dashboard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link  } from "react-router-dom";
import api from "./api";
// Icons
import { BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";


import Calendar from "./components/Calendar";
import EditStatus from "./components/EditStatus";



function Dashboard({ user, setUser }) {
    const [isProfileEditOpen, setProfileEditOpen] = useState(false);
    
    const handleBannerClick = () => {
        console.log("Clicked");
        setProfileEditOpen(true);
    }

    return (
        
        <div className="dashboard-container">
            <title>Dashboard</title>

            

            {/* Left Side Group */}
            <div className="left-side-container">
                <div className="profile-banner" onClick={handleBannerClick}>
                    <div className="profile-img">
                        <img src={`http://localhost:8000${user.profileImage}`} alt="profile"></img>
                    </div>
                    <div className="profile-detail">
                        <p id="name">{user.username}</p>
                        <p id="status-message">{user.statusMessage}</p>
                    </div>
                    <div className="status-emoji">
                        <p id="emoji">{user.statusEmoji ? user.statusEmoji : <BsEmojiSmile id="emoji-icon"/>}</p>
                    </div>
                </div>
                <Calendar className="calendar-view"></Calendar>
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
            <EditStatus 
                isOpen={isProfileEditOpen}
                user={user}
                setUser={setUser}
                onClose={() => setProfileEditOpen(false)}
            />
        </div>
    );
}

export default Dashboard;