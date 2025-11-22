import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Region } from "../models/region";
import { ToastContext } from "../utility/ToastContext";
import { getRegions, updateRegion } from "../redux/slices/regionSlice";
import { showToastify } from "../utility/Toastify";
import { Button, Form, Modal } from "react-bootstrap";
import '../css/ModernModal.css';

const RegionEditModal = (props: any) => {
  const { region, params, isOpen, onRequestClose, setEditModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<Region>({} as Region);

  useEffect(() => {
    setFormData(region);
  }, [params, dispatch, region]);

  const handleUpdate = () => {
    setShowToast(true);
    // const region = { region: { ...formData } };
    dispatch(updateRegion(formData)).then((res: any) => {
      showToastify(res.payload.message, res.payload.status);
      dispatch(getRegions(params));
    });
  };
  return (
    <>
      <Modal show={isOpen} centered onHide={onRequestClose} className="modern-modal edit-modal">
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-edit"></i> Edit Region</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Region Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Region Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onRequestClose}>
            <i className="fas fa-times"></i> Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            <i className="fas fa-save"></i> Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegionEditModal;
