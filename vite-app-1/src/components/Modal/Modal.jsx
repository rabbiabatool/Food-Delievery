import React from 'react';
import './Modal.css'; // Make sure to style your modal

const Modal=({onClose,children})=>{

  return(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>

  );

}

// const Modal = ({ onClose, children }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={onClose} className="close-button">Close</button>
//         {children}
//       </div>
//     </div>
//   );
// };

export default Modal;
