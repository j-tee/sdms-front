import React from 'react'
import RegistrationList from './RegistrationList';
import { StudentRegViewModel } from '../models/student';

const RegisteredStudents = (props: any) => {
    const {params, students, branchId, schoolId} = props;
    // const {registrations} = useSelector((state:RootState) => state.studentReg)
  return (
    <div>
    {students.map((student:StudentRegViewModel) => (
      <RegistrationList key={student.id} params={params} student={student} branchId={branchId} schoolId={schoolId} />
    ))}
    </div>
  )
}

export default RegisteredStudents
