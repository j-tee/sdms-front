import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { ScoreSheet } from '../models/scoreSheet'

const ScoreSheetDetailsModal = (props: any) => {
  const {isOpen, params, scoreSheet, setDetailsModalOpen, onRequestClose, branchId, schoolId} = props
  const [score_sheet, setScore_sheet] = useState<ScoreSheet>({})
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
  return (
    <Modal show={isOpen} onHide={onRequestClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{scoreSheet && scoreSheet.subject_name} {scoreSheet && scoreSheet.assessment_name} {scoreSheet && scoreSheet.assessment_date}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <p><strong>{scoreSheet && scoreSheet.assessment_date} </strong></p>
          </Col>
          </Row>
        <Row>
          <Col md={4}>
            <p><strong>Student: </strong>{scoreSheet && scoreSheet.student_name}</p>
          </Col>
        </Row>
        <div className="row">
          <div className="col-md-4">
            <p><strong>Score: </strong>{scoreSheet && scoreSheet.student_score}</p>
          </div>
          <div className="col-md-4">
            <p><strong>Base Mark: </strong>{scoreSheet && scoreSheet.base_mark}</p>
          </div>
          <div className="col-md-4">
            <p><strong>Remarks: </strong>{scoreSheet && scoreSheet.remarks}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ScoreSheetDetailsModal