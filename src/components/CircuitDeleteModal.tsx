import React, { useContext } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { deleteCircuit, getCircuits } from "../redux/slices/circuitSlice";
import { showToastify } from "../utility/Toastify";
import { Button, Modal } from "react-bootstrap";

const CircuitDeleteModal = (props: any) => {
  const { isOpen, onRequestClose, setDeleteModalOpen, params, circuit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const handleDelete = () => {
    dispatch(deleteCircuit({ id: circuit.id })).then((res: any) => {
      showToastify(res.payload.message, res.payload.status);
      dispatch(getCircuits(params));
      setDeleteModalOpen(false);
    });
  };
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Circuit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {circuit.name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CircuitDeleteModal;
