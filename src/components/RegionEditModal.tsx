import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Region } from "../models/region";
import { ToastContext } from "../utility/ToastContext";
import { getRegions, updateRegion } from "../redux/slices/regionSlice";
import { showToastify } from "../utility/Toastify";
import { Button, Form, Modal } from "react-bootstrap";

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
      <Modal show={isOpen} centered onHide={onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Region</Modal.Title>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegionEditModal;
