import React from 'react';

function Modal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>This is a modal!</p>
      </div>
    </div>
  );
}

export default Modal;
