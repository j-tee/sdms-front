import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Col, Modal, Nav, Row, Tab } from 'react-bootstrap';
import StudentSubjectCard from './StudentSubjectCard';
import StudentLessonsCard from './StudentLessonsCard';
import StudentAssessmentCard from './StudentAssessmentCard';
import StudentEvaluationCard from './StudentEvaluationCard';

const StudentAcademics = (props: any) => {
    const { isOpen, onRequestClose, stage, params, branchId, schoolId, setAcademicsModalOpen } = props;
    const dispatch = useDispatch<AppDispatch>();
    const { setShowToast } = useContext(ToastContext);
    const [index, SetIndex] = useState<string | null>('first')
    return (
        <>
            <Modal show={isOpen} animation centered onHide={onRequestClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Academics</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={2} className='border-right'>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Subjects</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Lessons</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">Assessments</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="fourth">Evaluation / Reports</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first"><StudentSubjectCard params={params} tabIndex={index} /></Tab.Pane>
                                    <Tab.Pane eventKey="second"><StudentLessonsCard params={params} tabIndex={index} /></Tab.Pane>
                                    <Tab.Pane eventKey="third"><StudentAssessmentCard params={params} tabIndex={index} /></Tab.Pane>
                                    <Tab.Pane eventKey="fourth"><StudentEvaluationCard params={params} tabIndex={index} /></Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default StudentAcademics