import './editStatus.css';
import React, { useEffect, useState, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';

function EditStatus({isOpen, user, setUser, onClose}) {
    const [text, setText] = useState(user.statusMessage);
    const [showPicker, setShowPicker] = useState(false);
    const [emoji, setEmoji] = useState(user.statusEmoji);
    const statusLength = text.length;

    if (!isOpen) return null;


    return (
        <div className="overlay">
            <div className="emoji-picker-container">
                {showPicker && (
                        <>
                            <EmojiPicker
                                onEmojiClick={(emojiData) => {
                                    setEmoji(emojiData.emoji);
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
                            <div className="emoji-icon" onClick={() => setShowPicker(!showPicker)}>
                                {emoji ? emoji : <BsEmojiSmile id="emoji-icon"/>}
                            </div>
                            
                        </div>
                        <p id="count-chars">{statusLength}/40</p>
                        <button className="save-button" onClick={() => {
                            // Temporarily store the updated status message and emoji in the user state
                            // need to use API to update the user status in the backend
                            setUser({
                                ...user,
                                statusMessage: text,
                                statusEmoji: emoji
                            });
                            onClose();
                        }}>Save</button>
                    </div>
                    
                </div>
                
            </div>

        </div>
    )
}

export default EditStatus;