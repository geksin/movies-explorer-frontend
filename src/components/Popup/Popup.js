import React from 'react';
import "./Popup.css";

function Popup({isOpen, onClose, messagePopup}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container`}>
                <button type="button" className={`popup__close-button`} onClick={onClose}></button>
                <p className="popup__text">{messagePopup}</p>
            </div>
        </div>
    )      
}

export default Popup; 