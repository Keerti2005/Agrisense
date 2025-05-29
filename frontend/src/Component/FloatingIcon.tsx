import React, { useState } from 'react';
import styled from 'styled-components';

const IconButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #0056b3;
  }
`;

interface ModalOverlayProps {
  isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
`;

interface FloatingIconProps {
  modalTitle?: string;
  modalMessage?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
  modalTitle = 'Hello!',
  modalMessage = 'This is a pop-up modal!',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Close modal on Escape key press
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <IconButton onClick={toggleModal}>+</IconButton>
      <ModalOverlay isOpen={isOpen} aria-hidden={!isOpen}>
        <ModalContent>
          <h2>{modalTitle}</h2>
          <p>{modalMessage}</p>
          <button onClick={closeModal}>Close</button>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default FloatingIcon;
