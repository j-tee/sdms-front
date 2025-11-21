import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getExitProfiles } from '../redux/slices/exitProfileSlice';
import { Card } from 'react-bootstrap';
import ExitProfileDialog from './ExitProfileDialog';
import '../css/ExitProfiles.css';

const ExitProfileCard = (props: any) => {
    const { schoolId, branchId, tabIndex, params, student } = props;
    const dispatch = useDispatch<AppDispatch>()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return (
        <>
            <Card className='exit-profile-card'>
                <Card.Header className='exit-profile-card-header'>
                    <h4 className='exit-profile-student-id'>{student && student.full_name}</h4>
                </Card.Header>
                <Card.Body className='exit-profile-card-body'>
                    <div className='exit-profile-avatar-wrapper'>
                        {student && student.image_url ? (
                            <img 
                                src={student.image_url} 
                                alt={student.full_name}
                                className='exit-profile-avatar'
                            />
                        ) : (
                            <div className='exit-profile-avatar-placeholder'>
                                <i className="fas fa-user"></i>
                            </div>
                        )}
                    </div>
                    
                    <div className='exit-profile-info'>
                        <div className='exit-profile-info-item'>
                            <div className='exit-profile-info-icon'>
                                <i className="fas fa-users"></i>
                            </div>
                            <div className='exit-profile-info-content'>
                                <div className='exit-profile-info-label'>Class Group</div>
                                <div className='exit-profile-info-value'>{student && student.student_class}</div>
                            </div>
                        </div>
                        
                        <div className='exit-profile-info-item'>
                            <div className='exit-profile-info-icon'>
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div className='exit-profile-info-content'>
                                <div className='exit-profile-info-label'>Academic Year</div>
                                <div className='exit-profile-info-value'>{student && student.academic_year}</div>
                            </div>
                        </div>
                        
                        <div className='exit-profile-info-item'>
                            <div className='exit-profile-info-icon'>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className='exit-profile-info-content'>
                                <div className='exit-profile-info-label'>Academic Term</div>
                                <div className='exit-profile-info-value'>
                                    {student && student.academic_term_name} - {student && student.academic_term_start_date}/{student && student.academic_term_end_date}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
                
                <Card.Footer className='exit-profile-card-footer'>
                    <button onClick={openModal} className="add-exit-profile-btn">
                        <i className="fas fa-plus-circle"></i>
                        Add Exit Profile
                    </button>
                </Card.Footer>
            </Card>
            
            <ExitProfileDialog 
                params={params}
                tabIndex={tabIndex}
                student={student}
                isOpen={isModalOpen}
                onClose={closeModal}
                onRequestClose={() => closeModal} 
            />
        </>
    )
}

export default ExitProfileCard