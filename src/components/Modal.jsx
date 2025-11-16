import "../styles/Modal.css";


function Modal({onClose}) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p></p>
        <button onClick={onClose}>Return to Menu</button>
      </div>
    </div>
  );
}

export default Modal