import React, { useContext, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import ManagementRoles from './ManagementRoles';
import ManageAccount from './ManageAccount';

const ManageUserAccount = (props: any) => {
  const { schoolId, branchId, email, isOpen, onRequestClose, setManageUserModalOpen } = props;
  const [key, setKey] = useState<string>('role');
  return (
    <Modal show={isOpen} onHide={onRequestClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage User Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k as string)}
          className="mb-3"
        >
          <Tab eventKey="role" title="Manage Roles">
            <ManagementRoles schoolId={schoolId} branchId={branchId} email={email} isOpen={isOpen} />
          </Tab>
          <Tab eventKey="account" title="Manage Account">
            <ManageAccount schoolId={schoolId} branchId={branchId} email={email} isOpen={isOpen} />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setManageUserModalOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ManageUserAccount
