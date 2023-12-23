import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap';

const BranchDetails = (props: any) => {
  const { branch, isOpen, onRequestClose, setBranchDetailsModalOpen } = props;
  return (
    <Modal show={isOpen} centered animation onHide={onRequestClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Details: {branch.branch_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>School Name</strong>
          </Col>
          <Col>
            {branch.school_name}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Branch Name</strong>
          </Col>
          <Col>
            {branch.branch_name}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Postal Address</strong>
          </Col>
          <Col>
            {branch.postal_address}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Website</strong>
          </Col>
          <Col>
            {branch.website}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Email Addresse</strong>
          </Col>
          <Col>
            {branch.email_address}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Residential Address</strong>
          </Col>
          <Col>
            {branch.residential_address}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Phone 2</strong>
          </Col>
          <Col>
            {branch.phone1}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Phone 1</strong>
          </Col>
          <Col>
            {branch.phone2}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Category</strong>
          </Col>
          <Col>
            {branch.category_name}
          </Col>
        </Row>
        <Row className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
          <Col>
            <strong>Owership Category</strong>
          </Col>
          <Col>
            {branch.ownership}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={() => setBranchDetailsModalOpen(false)}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default BranchDetails
