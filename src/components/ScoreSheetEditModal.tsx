import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ScoreSheet } from '../models/scoreSheet'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { ToastContext } from '../utility/ToastContext'
import { getScoreSheets, updateScoreSheet } from '../redux/slices/scoreSheetSlice'
import { showToastify } from '../utility/Toastify'
import { get } from 'http'

const ScoreSheetEditModal = (props: any) => {
  const {isOpen, params, scoreSheet, setEditModalOpen, onRequestClose, branchId, schoolId} = props
  const [score_sheet, setScore_sheet] = useState<ScoreSheet>({})
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [validScore, setValidScore] = useState(false)

  useEffect(() => {
    if (scoreSheet) {
      setScore_sheet((prevData) => ({
        ...prevData,
        assessment_id: scoreSheet.assessment_id,
        id: scoreSheet.id,
        score: scoreSheet.score,
        remarks: scoreSheet.remarks,
        
      }))
    }
  }, [scoreSheet])

  const validateScore = () => {
    setShowToast(true)
    if(score_sheet.score !== undefined && score_sheet.score > scoreSheet.base_mark) {
      showToastify('Score cannot be greater than the base mark', 'error')
      return false
    }
    return true
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // dispatch(updateScoreSheet(branchId, schoolId, params.id, updatedScoreSheet
    if (!validateScore()) {
      return
    }
    const updatedScoreSheet = {
      id: score_sheet.id,
      assessment_id: score_sheet.assessment_id,
      score: score_sheet.score,
      remarks: score_sheet.remarks
    }
    dispatch(updateScoreSheet({...updatedScoreSheet})).then((response) => {
      showToastify(response.payload.message, response.payload.status)
      if (response.payload.status === 'success') {
        setEditModalOpen(false)
        dispatch(getScoreSheets({...params, paginate: true})).then((response) => {
          if (response.payload.status === 'error') {
            showToastify(response.payload.message, response.payload.status)
          }
        })
      }
    })
    // setEditModalOpen(false)
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Score Sheet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form goes here */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="score">
            <Form.Label>Score</Form.Label>
            <Form.Control type="number" placeholder="Score" 
            onChange={(e) => setScore_sheet({ ...scoreSheet, score: e.target.value })}
            value={score_sheet.score} />

          </Form.Group>
          <Form.Group controlId="remarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control as="textarea" placeholder="Comment"
            onKeyUp={validateScore}
            onChange={(e) => setScore_sheet({ ...scoreSheet, remarks: e.target.value })}
             value={score_sheet.remarks || ''} />
          </Form.Group>
          <Button variant="primary" type="submit"> Update </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ScoreSheetEditModal