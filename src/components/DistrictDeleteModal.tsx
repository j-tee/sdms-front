import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { deleteDistrict, getDistricts } from '../redux/slices/districtSlice';
import { showToastify } from '../utility/Toastify';
import { Button, Modal } from 'react-bootstrap';
import '../css/ModernModal.css';

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
    <Modal show={isOpen} onHide={onRequestClose} className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete District</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>{district.name}</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          <i className="fas fa-times"></i> Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <i className="fas fa-trash"></i> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DistrictDeleteModal
