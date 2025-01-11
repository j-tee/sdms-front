import React, { useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteRegion, getRegions } from '../redux/slices/regionSlice';
import { Region } from '../models/region';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

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
      <Modal show={isOpen} onHide={onRequestClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete {region?.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this  region?</p>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" onClick={onRequestClose}>
						Close
					</button>
					<button className="btn btn-danger" onClick={() => handleDelete(region)}>
						Delete
					</button>
				</Modal.Footer>
			</Modal>
    </>
  )
}

export default RegionalDeleteModal
