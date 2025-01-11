import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { deleteDistrict, getDistricts } from '../redux/slices/districtSlice';
import { showToastify } from '../utility/Toastify';
import { Button, Modal } from 'react-bootstrap';

const DistrictDeleteModal = (props: any) => {
  const { isOpen, onRequestClose, setDeleteModalOpen, params, district } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const handleDelete = () => {
    dispatch(deleteDistrict({
      id: district.id,
      name: '',
      region_id: 0
    })).then((res: any) => {
      showToastify(res.payload.message, res.payload.status);
      dispatch(getDistricts(params));
      setDeleteModalOpen(false);
    });
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete District</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {district.name}?</p>
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
  )
}

export default DistrictDeleteModal
