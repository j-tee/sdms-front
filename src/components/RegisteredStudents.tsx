import React, { useState } from 'react'
import RegistrationList from './RegistrationList';
import { StudentRegViewModel } from '../models/student';
import { Button, Card, Row } from 'react-bootstrap';
import RegistrationEditModal from './RegistrationEditModal';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { getStudentRegistration } from '../redux/slices/studentRegSlice';
import '../css/Registration.css';

const RegisteredStudents = (props: any) => {
    const {params, students, branchId, schoolId, index} = props;
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const { academic_term } = useSelector((state: RootState) => state.calendar);
    const { registration } = useSelector((state: RootState) => state.studentReg);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleOpenEditModal = (student: StudentRegViewModel) => {
      dispatch(getCurrentTerm(branchId));
      dispatch(
            getStudentRegistration({
              student_id: student.id,
              academic_term_id: academic_term.id,
              class_group_id: student.class_group_id,
            })
          ).then(() => setEditModalOpen(true));
        // setEditModalOpen(true);
    }
  return (
    <div>
    {students.map((student:StudentRegViewModel) => (
      <Card key={student.id} className='student-registration-card'>
      <Card.Body className="student-card-body">
        <div className='student-avatar-wrapper'>
          {student.image_url ? (
            <img
              src={student.image_url}
              alt={`${student.first_name} ${student.last_name}`}
              className='student-avatar'
            />
          ) : (
            <div className='student-avatar-placeholder'>
              <i className="fas fa-user"></i>
            </div>
          )}
        </div>
        <div className="student-info">
          <span><strong>ID Number:</strong> {student.student_id}</span>
          <span><strong>Name:</strong> {student.last_name} {student.first_name}</span>
          <span><i className="fas fa-venus-mars"></i> <strong>Gender:</strong> {student.gender}</span>
          <span><i className="fas fa-users"></i> <strong>Parents/Guardian:</strong> {student.fathers_name} / {student.mothers_name}</span>
        </div>       
      </Card.Body>
        <Card.Footer className='student-card-footer'>        
          {index === 'registered' && (
            <>
              <Button onClick={(e) => handleOpenEditModal(student)} className='registration-btn registration-btn-update'>
                <i className="fas fa-edit"></i>
                Update Registration Details
              </Button>
              <Button className='registration-btn registration-btn-view'>
                <i className="fas fa-eye"></i>
                View Registration Details
              </Button>
              <Button className='registration-btn registration-btn-delete'>
                <i className="fas fa-trash-alt"></i>
                Delete Registration Details
              </Button>
            </>
          )}        
        </Card.Footer>
    </Card>
    ))}
    
     <RegistrationEditModal
        branchId={branchId}
        schoolId={schoolId}
        isOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        registration={registration}
      />
    </div>
  )
}

export default RegisteredStudents
