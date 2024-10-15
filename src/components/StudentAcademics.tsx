import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Col, Modal, Nav, Row, Tab } from 'react-bootstrap';
import StudentSubjectCard from './StudentSubjectCard';
import StudentLessonsCard from './StudentLessonsCard';
import StudentAssessmentCard from './StudentAssessmentCard';
import StudentEvaluationCard from './StudentEvaluationCard';
import StudentAcademicYearDropDown from './StudentAcademicYearDropDown';
import StudentAcademicTermDropDown from './StudentAcademicTermDropDown';
import { getStudentClassGroup } from '../redux/slices/classGroupSlice';
import { getStudentAcademicYears } from '../redux/slices/calendarSlice';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';
type AnyType = {
    [key: string]: string;
};
const StudentAcademics = (props: any) => {
    const { isOpen, student, onRequestClose, stage, branchId, schoolId, setAcademicsModalOpen } = props;
    const [index, SetIndex] = useState<string | null>('first')
    const { class_group } = useSelector((state: RootState) => state.classGroup)
    
    const dispatch = useDispatch<AppDispatch>();
    const [params, setParams] = useState({
        student_id: student.id,
        academic_year_id: 0,
        academic_term_id: 0,
    });
    const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
        // Update the formData state with the new value
        setParams((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    

    useEffect(() => {
        if (student && student.id) {
            dispatch(getStudentAcademicYears({ student_id: student.id }));
        }
    }, [dispatch, student])

    useEffect(() => {
        if (params.academic_year_id && params.academic_term_id && student) {
            dispatch(getStudentClassGroup({ ...params }));
        }
    }, [dispatch, params, student])
    return (
        <>
            <Modal show={isOpen} animation centered onHide={onRequestClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Academics</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    <Row style={{ marginBottom: '10px' }}>
                        <Col>
                            <StudentAcademicYearDropDown studentId={student.id} onChange={handleInputChange} />
                        </Col>
                        <Col>
                            <StudentAcademicTermDropDown studentId={student.id} yearId={params.academic_year_id} onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>{class_group && class_group.class_grp_name}</h6>
                        </Col>
                    </Row>
                    <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
                        <Row style={{ marginTop: '10px' }}>
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
                                    <Tab.Pane eventKey="first"><StudentSubjectCard params={params} class_group={class_group} student={student} tabIndex={index} /></Tab.Pane>
                                    <Tab.Pane eventKey="second"><StudentLessonsCard params={params} class_group={class_group} student={student} tabIndex={index} /></Tab.Pane>
                                    <Tab.Pane eventKey="third"><StudentAssessmentCard params={params} class_group={class_group} tabIndex={index} student={student} /></Tab.Pane>
                                    <Tab.Pane eventKey="fourth"><StudentEvaluationCard params={params} class_group={class_group} tabIndex={index} student={student} /></Tab.Pane>
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