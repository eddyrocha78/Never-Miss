import React, { useState } from 'react';
import Modal from 'react-modal';

// Define the custom styles for the modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement
//Modal.setAppElement('#yourAppElement');

export const ForgotPasswordModal = () => {
  // Define the state for the modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Define the function to open the modal
  function openModal() {
    setModalIsOpen(true);
  }

  // Define the function to close the modal
  function closeModal() {
    setModalIsOpen(false);
  }

  // Define the function to handle the form submission
  const handleSubmit= async (event) => {
    event.preventDefault();
    /*try {
      const response = await fetch(process.env.BACKEND_URL + 'api/admin/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }*/
    closeModal();
  };

  return (
    <div>
      {/* The link to open the modal */}
      <a href="#" onClick={openModal}>Forgot password?</a>
      {/* The modal component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Forgot Password Modal"
      >
        {/* The modal content */}
        <div>
          <h3>Forgot password?</h3>
          <p>Please enter your email address to reset your password.</p>
        {/* The form to get the email input */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <button type="submit">Submit</button>
        </form>
        </div>
        {/* The button to close the modal */}
        <div>  
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </Modal>
    </div>
  );
}
