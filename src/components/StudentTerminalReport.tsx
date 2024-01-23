import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTerminalReport } from '../redux/slices/scoreSheetSlice';

const StudentTerminalReport = (props: any) => {
  const { schoolId, branchId, index } = props;
  const {student_reports} = useSelector((state: RootState) => state.scoreSheet)
  const {academic_term} = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState({
    program_id: 0,
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
    class_group_id: 0,
    subject_id: 0,
    academic_term_id: academic_term.id,
    student_id: 0,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      branch_id: branchId,
      school_id: schoolId,
      academic_term_id: academic_term.id
    }))
  } , [branchId, schoolId, academic_term.id])

  useEffect(() => {
    if(index==='tr'){
      dispatch(getTerminalReport({...params}))
    }
    
  } , [params, dispatch, index])
  return (
    <div>

    </div>
  )
}

export default StudentTerminalReport
