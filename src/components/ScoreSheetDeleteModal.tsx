import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { deleteScoreSheet, getScoreSheets } from '../redux/slices/scoreSheetSlice'
import { showToastify } from '../utility/Toastify'

const ScoreSheetDeleteModal = (props: any) => {
  const {isOpen, params, scoreSheet, setDeleteModalOpen, onRequestClose, branchId, schoolId} = props
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)

  const handleDelete = () => {
    setShowToast(true)
    dispatch(deleteScoreSheet(scoreSheet)).then((res: any) => {
      showToastify(res.payload.message, res.payload.status)
      if (res.payload.status === 'success') {
        dispatch(getScoreSheets(params))
        setDeleteModalOpen(false)
      }
    }
    )
    
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Score Sheet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this score sheet?</p>
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

export default ScoreSheetDeleteModal