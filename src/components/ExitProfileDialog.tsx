import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal, Table } from 'react-bootstrap'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addExitProfile, getExitProfiles } from '../redux/slices/exitProfileSlice';
import { showToastify } from '../utility/Toastify';
import { ExitProfile } from '../models/exitProfile';
import { formatDate } from '../models/utilities';
import { exit } from 'process';

const ExitProfileDialog = (props:any) => {
    const { isOpen, onClose, onRequestClose, student, params, tabIndex } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { exitProfiles } = useSelector((state: RootState) => state.exitProfile);
    const [showToast, setShowToast] = useState(false);

    const [exitProfileDetails, setExitProfileDetails] = useState({
        exit_date: '',
        reason: '',
        exit_category: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setExitProfileDetails({
            ...exitProfileDetails,
            [name]: value, // Dynamically update the state for the specific input field
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const exitProfile:ExitProfile = {
            exit_date: exitProfileDetails.exit_date,
            reason: exitProfileDetails.reason,
            student_id: student.student_id,
            academic_term_id: params.academic_term_id,
            class_group_id: params.class_group_id,
            exit_category:exitProfileDetails.exit_category
        };

        // Dispatch exit profile to the Redux store
        dispatch(addExitProfile({ ...exitProfile })).then(
            (res: any) => {
                dispatch(getExitProfiles({ ...params, student_id: student.student_id }));
                setShowToast(true);
                showToastify(res.payload.message, res.payload.status);
            }
        );
    }
    useEffect(() => {
        if (isOpen) {
            dispatch(getExitProfiles({ ...params, student_id: student.student_id })).then((res: any) => {
                setShowToast(true);
                showToastify(res.payload.message, res.payload.status);
            });
        }
    }, [dispatch, isOpen, params, student, student.student_id, tabIndex])
  return (
    <Modal show={isOpen} centered animation onHide={onRequestClose} size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>Exit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {student && (
            <p>
                <span>{student.full_name}</span><br />
            </p>
            )}
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId='exit_category'>
                <Form.Label>Exit Category</Form.Label>
                <Form.Select onChange={handleInputChange} as='select' name='exit_category'>
                    <option value=''>---Select Category---</option>
                    <option value='Graduated'>Graduated</option>
                    <option value='Expelled'>Expelled</option>
                    <option value='Withdrawn'>Withdrawn</option>
                    <option value='Transferred'>Transferred</option>
                    <option value='Deceased'>Deceased</option>
                    <option value='Others'>Others</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId='exit_date'>
                <Form.Label>Exit Date</Form.Label>
                <Form.Control
                type='date'
                name='exit_date'
                placeholder='Enter Exit Date'
                // value={exitProfileDetails.exit_date}
                onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group controlId='reason'>
                <Form.Label>Reason</Form.Label>
                <Form.Control
                as='textarea'
                name='reason'
                placeholder='Enter Reason'
                // value={exitProfileDetails.reason}
                onChange={handleInputChange}
                />
            </Form.Group>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Close</Button>
                <Button variant='primary' type='submit'>Save</Button>
            </Modal.Footer>
            </Form>
            <Card>
                <Table size='sm' striped bordered hover borderless>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Exit Date</th>
                            <th>Exit Category</th>
                            <th>School</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exitProfiles.map((exitProfile: any) => (
                            <tr key={exitProfile.id}>
                                <td>{exitProfile.id_number}</td>
                                <td>{formatDate(exitProfile.exit_date)}</td>
                                <td>{exitProfile.exit_category}</td>
                                <td>{exitProfile.school_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Modal.Body>   
    </Modal>
  )
}

export default ExitProfileDialog