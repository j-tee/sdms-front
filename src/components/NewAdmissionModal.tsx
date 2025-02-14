import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import ParentCard from './ParentCard';
import StudentDetails from './StudentDetails';
import AdmissionAdd from './AdmissionAdd';

const NewAdmissionModal = (props: any) => {
    const { schoolId, branchId, params, isOpen, setNewAdmissionModalOpen, onRequestClose } = props;
    const [resetState, setResetState] = useState(false);
    const [step, setStep] = useState(0);
    const handleClose = () => {
        setNewAdmissionModalOpen(false)
        window.location.reload()
    }

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };
    const handleReset = () => {
        setResetState(prev => !prev); // Toggle to trigger reset in children
        setStep(0); // Reset step to start over
    };
    return (
        <Modal show={isOpen} centered animation onHide={onRequestClose} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>New Admission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 0 && <ParentCard schoolId={schoolId} branchId={branchId} resetState={resetState} />}
                {step === 1 && <StudentDetails schoolId={schoolId} branchId={branchId} resetState={resetState} />}
                {step === 2 && <AdmissionAdd schoolId={schoolId} branchId={branchId} resetState={resetState} onSuccess={handleReset}/>}

                <div style={{ marginTop: '20px' }}>
                    <Button onClick={handleBack} disabled={step === 0}>
                        Back
                    </Button>
                    <Button onClick={handleNext} disabled={step === 2} style={{ marginLeft: '10px' }}>
                        Next
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-secondary' onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewAdmissionModal