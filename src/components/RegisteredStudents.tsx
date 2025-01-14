import React, { useState } from 'react'
import RegistrationList from './RegistrationList';
import { StudentRegViewModel } from '../models/student';
import { Button, Card, Row } from 'react-bootstrap';
import RegistrationEditModal from './RegistrationEditModal';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { getStudentRegistration } from '../redux/slices/studentRegSlice';

const RegisteredStudents = (props: any) => {
    const {params, students, branchId, schoolId, index} = props;
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const { academic_term } = useSelector((state: RootState) => state.calendar);
    const { registration } = useSelector((state: RootState) => state.studentReg);
    const dispatch = useDispatch<AppDispatch>();

    const handleOpenModal = (student: StudentRegViewModel) => {
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
      // <RegistrationList key={student.id} params={params} student={student} branchId={branchId} schoolId={schoolId} />
      <Card>
      {/* <Card.Header>
        <Card.Title>
          <a href="#" onClick={() => handleOpenModal(student)}>
            {student.admission_id} {student.last_name} {student.first_name}
          </a>
        </Card.Title>
      </Card.Header> */}
      <Card.Body className="d-flex flex-row gap-2">
        <Card.Img
          variant="top"
          src={student.image_url}
          style={{ width: "100px", height: "100px" }}
        />
        <Card.Text className="d-flex flex-column">
        <span>ID Number {student.student_id}</span>
          <span>Name:{student.admission_id} {student.last_name} {student.first_name}</span>          
          <span>Gender: {student.gender} </span>
          <span>Parents/Guardian: {student.fathers_name} / {student.mothers_name}</span>
        </Card.Text>       
      </Card.Body>
        <Card.Footer className='d-flex justify-content-start gap-2'>        
          {index === 'registered' && (
            <><Button variant='outline-primary' size='sm'>Edit</Button>
            <Button variant='outline-info' size='sm'>Details</Button>
            <Button variant='outline-danger' size='sm'>Delete</Button></>
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
