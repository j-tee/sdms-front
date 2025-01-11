import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getExitProfiles } from '../redux/slices/exitProfileSlice';
import { Card } from 'react-bootstrap';
import ExitProfileDialog from './ExitProfileDialog';

const ExitProfileCard = (props: any) => {
    const { schoolId, branchId, tabIndex, params, student } = props;
    const dispatch = useDispatch<AppDispatch>()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return (
        <>
            <Card>
                <Card.Header>
                    <h4>{student && student.full_name}</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={student && student.image_url} style={{ width: "100px", height: "100px" }} />
                    <Card.Text>
                        {student && student.student_class}<br />
                        {student && student.academic_year}<br />
                        {student && student.academic_term_name} - {student && student.academic_term_start_date}/{student && student.academic_term_end_date}

                    </Card.Text>
                    {/* <Card.Text>
                       
                    </Card.Text> */}
                    <Card.Footer>
                    <button onClick={openModal} className="btn btn-primary">Add Exit Profile</button>
                    </Card.Footer>
                        
                </Card.Body>
                <ExitProfileDialog params={params}
                tabIndex={tabIndex}
                    student={student}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onRequestClose={() => closeModal} />
            </Card>
        </>
    )
}

export default ExitProfileCard