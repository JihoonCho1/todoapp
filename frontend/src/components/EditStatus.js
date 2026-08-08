import './editStatus.css';
import React, { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import api from '../api';

function EditStatus({isOpen, user, setUser, onClose}) {
    const [text, setText] = useState(user.statusMessage);
    const [showPicker, setShowPicker] = useState(false);
    const [tempEmoji, setTempEmoji] = useState(user?.statusEmoji || null); // Before Save button is clicked
    const statusLength = text.length;

    const handleSave = async () => {
        try {
            const res = await api.put('/profile/status', {
                statusMessage: text,
                statusEmoji: tempEmoji
            });
            console.log('RESPONSE', res.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error);
        }
    }

    if (!isOpen) return null;
    

    return (
        <div className="overlay">
            <div className="emoji-picker-container">
                {showPicker && (
                        <>
                            <EmojiPicker
                                onEmojiClick={(emojiData) => {
                                    setTempEmoji(emojiData.emoji);
                                    setShowPicker(false);
                                }}
                            />
                        </>
                    )}
            </div>
            <div className="edit-status-overlay">
                <div className="status-contents">
                    <div className="header-contents">
                        <h2>Edit Status</h2>

                        {/* Close Button */}
                        <RxCross1 id="close-button" 
                            onClick={() => {
                                setTempEmoji(user.statusEmoji);
                                onClose();
                            }}/>
                    </div>  
                    
                    {/* Status Message Field */}
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

                            {/* Emoji button to pick status emoji */}
                            <div className="emoji-icon" onClick={() => setShowPicker(!showPicker)}>
                                {tempEmoji ? tempEmoji : <BsEmojiSmile id="emoji-icon"/>}
                            </div>
                        </div>

                        {/* Character Count */}
                        <p id="count-chars">{statusLength}/40</p>

                        {/* Save Button */}
                        <button className="save-button" onClick={handleSave}>Save</button>
                    </div>
                    
                </div>
                
            </div>

        </div>
    )
}

export default EditStatus;