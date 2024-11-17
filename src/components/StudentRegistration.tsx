import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Row, Tab, Tabs } from 'react-bootstrap';
import RegisteredStudents from './RegisteredStudents';
import UnregisteredStudent from './UnregisteredStudent';
import NewlyAdmittedStudents from './NewlyAdmittedStudents';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { QueryParams } from '../models/queryParams';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { getRegisteredStudents, getRegistrationInformation } from '../redux/slices/studentRegSlice';
import ContunuingStudents from './ContunuingStudents';


const StudentRegistration = (props: any) => {
  const { schoolId, branchId, tabIndex} = props;
  const { reg_info, registrations } = useSelector((state: RootState) => state.studentReg)  
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  
  const [tabKey, setTabKey] = useState<string>('newly_admitted');
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<QueryParams>({
      reg_date: '',
      stage_id: 0,
      program_id: 0,
      department_id: 0,
      branch_id: 0,
      school_id: 0,
      academic_term_id: 0,
      class_group_id: 0,
      student_id: 0,
      pagination: {
        current_page: 1,
        per_page: 10,
        total_items: 0,
        total_pages: 0
      }
    });
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'department_id': {
        dispatch(getPrograms({ ...params, branch_id: branchId, department_id: parseInt(value), paginate: false }))
        break;
      }
      case 'program_id': {
        if (branchId)
          dispatch(getStages({ ...params, branch_id: branchId, department_id: 0, paginate: false }))
        break;
      }
    }
  };
  useEffect(() => {
    if (tabIndex === 'second')
      dispatch(getCurrentTerm(branchId))
    dispatch(getRegisteredStudents({ ...params, academic_term_id: params.academic_term_id ? params.academic_term_id : academic_term.id, branch_id: branchId, school_id: schoolId }))
    dispatch(getRegistrationInformation({ ...params, academic_term_id: params.academic_term_id ? params.academic_term_id : academic_term.id, branch_id: branchId, school_id: schoolId }))
  }, [tabIndex, schoolId, branchId, dispatch, params])

  return (
    <>
    <Tabs
      id="controlled-tab-example"
      activeKey={tabKey}
      onSelect={(k) => k && setTabKey(k)}
      className="mb-3"
    >
      <Tab eventKey="newly_admitted" title="Newly Admitted Students">
        <NewlyAdmittedStudents academic_term_id={params.academic_term_id} reg_info={reg_info} registrations={registrations} handleInputChange={handleInputChange} schoolId={schoolId} branchId={branchId} tabIndex={tabKey} />
      </Tab>
      <Tab eventKey="contunuing" title="Contunuing Students">
        <ContunuingStudents academic_term_id={params.academic_term_id} handleInputChange={handleInputChange} schoolId={schoolId} branchId={branchId} tabIndex={tabKey} />
      </Tab>
    </Tabs>
    </>
  )
}

export default StudentRegistration
