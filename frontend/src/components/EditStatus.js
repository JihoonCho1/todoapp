import './editStatus.css';
import React, { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';

function EditStatus({isOpen, user, setUser, onClose}) {
    const [text, setText] = useState(user.statusMessage);
    const [showPicker, setShowPicker] = useState(false);
    const statusLength = text.length;

    if (!isOpen) return null;


    return (
        <div className="edit-status-overlay">
            <div className="status-contents">
                <div className="header-contents">
                    <h2>Edit Status</h2>
                    <RxCross1 id="close-button" onClick={onClose}/>
                </div>  
                
                <div className="status-message-field">
                    <p className="input-text">Status Message:</p>
                    <div className="input-box-wrapper">
                        <input 
                            className="edit-message" 
                            type="text" 
                            placeholder="What are you thinking?"
                            value={text}
                            maxLength={40}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="emoji-icon">
                            {user.statusEmoji ? user.statusEmoji : <BsEmojiSmile id="emoji-icon"/>}
                        </div>
                        
                    </div>
                    <p id="count-chars">{statusLength}/40</p>
                </div>
            </div>
        </div>
    )
}

export default EditStatus;