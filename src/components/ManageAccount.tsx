import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const ManageAccount = (props: any) => {
  const [isLocked, setLocked] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const handleLockAccount = () => setLocked(!isLocked);
  const handleDisableAccount = () => setDisabled(!isDisabled);
  const handleClosedAccount = () => setClosed(!isClosed);
  return (
    <div className='m-3'>
      <h4>Management Account</h4>
      <Form>
        <Row className="mb-3">
          <Col>
          <Form.Check
              type="switch"
              id="custom-switch"
              label="Lock Account"
              checked={isLocked}
              onChange={handleLockAccount}
            />
          </Col>
          <Col>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Close Account"
              checked={isClosed}
              onChange={handleClosedAccount}
            />
          </Col>
        </Row>
        
      </Form>

    </div>
  )
}

export default ManageAccount
