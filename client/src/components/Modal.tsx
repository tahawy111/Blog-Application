import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children: any;
  title: string;
  closeText: string;
  submitText: string;
}

function ModalInstance({
  show,
  handleClose,
  children,
  title,
  closeText,
  submitText,
}: ModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {closeText}
        </Button>
        <Button variant="primary" onClick={handleClose}>
          {submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalInstance;
