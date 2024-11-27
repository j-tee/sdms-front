import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents } from '../redux/slices/studentSlice'
import { StudentParams } from '../models/student'
import { Table } from 'react-bootstrap'

const StudentListCard = (props: any) => {
    const { tabIndex, schoolId, branchId } = props
    const {students, pagination} = useSelector((state: RootState) => state.student)
    const dispatch = useDispatch<AppDispatch>()
    const [params, setParams] = useState<StudentParams>({
        school_id: schoolId,
        branch_id: branchId,
        parent_id: 0,
        stage_id: 0,
        classgroup_id: 0,
        subject_id: 0,
        admission_id: 0,
        academic_year_id: 0,
        academic_term_id: 0,
        pagination: {
            current_page: 1,
            per_page: 10,
            total_items: 0,
            total_pages: 0
        },
        paginate: true
    })

    useEffect(() => {
        if (tabIndex === 'fourth') {
            dispatch(getStudents({ ...params }))
        }
    }, [tabIndex, schoolId, branchId, params, dispatch])
  return (
    <>
    <h1>Student List</h1>
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                </tr>
        </thead>

        <tbody>
            {students.map((student, index) => (
                <tr key={student.id}>
                    <td>{student.student_id}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                </tr>
            ))}
        </tbody>
    </Table>
        
    </>
  )
}

export default StudentListCard