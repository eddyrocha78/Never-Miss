import React, { useState } from "react";
import Modal from "react-modal";

// Define the custom styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement("#yourAppElement");

function ForgotPasswordModal() {
  // Define the state for the modal visibility
  const [modalIsOpen, setIsOpen] = useState(false);

  // Define the function to open the modal
  function openModal() {
    setIsOpen(true);
  }

  // Define the function to close the modal
  function closeModal() {
    setIsOpen(false);
  }

  // Define the function to handle the form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Perform your logic to reset the password here
    // For example, you can call an API endpoint with the email address
    // Then, you can display a success message or an error message
    // Finally, you can close the modal
    closeModal();
  }

  return (
    <div>
      {/* Add a button to trigger the modal */}
      <button onClick={openModal}>Forgot Password?</button>
      {/* Render the modal component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Forgot Password Modal"
      >
        {/* Add a close button to the modal */}
        <button onClick={closeModal}>X</button>
        {/* Add a form to the modal */}
        <form onSubmit={handleSubmit}>
          <h2>Reset your password</h2>
          <p>Please enter your email address and we will send you a link to reset your password.</p>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <button type="submit">Send</button>
        </form>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal;
