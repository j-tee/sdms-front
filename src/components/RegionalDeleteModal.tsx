import React, { useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteRegion, getRegions } from '../redux/slices/regionSlice';
import { Region } from '../models/region';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

const RegionalDeleteModal = (props: any) => {
	const {region, params,isOpen, onRequestClose, setDeleteModalOpen} = props;
	const {setShowToast} = useContext(ToastContext)
	const dispatch = useDispatch<AppDispatch>();
	const handleDelete = (region: Region) => {
		dispatch(deleteRegion(region)).then((res: any) => {
			showToastify(res.payload.message, res.payload.status)
			dispatch(getRegions(params));
		})
	}

	useEffect(() => {
		console.log(region)
	}, [dispatch, region, params])
  return (
    <>
      <Modal show={isOpen} onHide={onRequestClose} className="modern-modal delete-modal">
				<Modal.Header closeButton>
					<Modal.Title><i className="fas fa-trash-alt"></i> Delete {region?.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="delete-icon">
						<i className="fas fa-exclamation-triangle"></i>
					</div>
					<p className="delete-message">Are you sure you want to delete <strong>{region?.name}</strong>?</p>
					<p className="delete-warning">This action cannot be undone.</p>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" onClick={onRequestClose}>
						<i className="fas fa-times"></i> Close
					</button>
					<button className="btn btn-danger" onClick={() => handleDelete(region)}>
						<i className="fas fa-trash"></i> Delete
					</button>
				</Modal.Footer>
			</Modal>
    </>
  )
}

export default RegionalDeleteModal
