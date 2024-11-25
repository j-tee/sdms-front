import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Dropdown, DropdownButton, Row, Tab, Tabs } from 'react-bootstrap';
import RegisteredStudents from './RegisteredStudents';
import UnregisteredStudent from './UnregisteredStudent';
import NewlyAdmittedStudents from './NewlyAdmittedStudents';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { QueryParams } from '../models/queryParams';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { getRegisteredStudents, getRegistrationInformation } from '../redux/slices/studentRegSlice';
import ContunuingStudents from './ContunuingStudents';
import PaginationComponent from './PaginationComponent';


const StudentRegistration = (props: any) => {
  const { schoolId, branchId, tabIndex} = props;
  
    
  const [tabKey, setTabKey] = useState<string>('newly_admitted');
  // const dispatch = useDispatch<AppDispatch>()
  // const [params, setParams] = useState<QueryParams>({
  //     reg_date: '',
  //     stage_id: 0,
  //     program_id: 0,
  //     department_id: 0,
  //     branch_id: 0,
  //     school_id: 0,
  //     academic_term_id: 0,
  //     class_group_id: 0,
  //     student_id: 0,
  //     pagination: {
  //       current_page: 1,
  //       per_page: 10,
  //       total_items: 0,
  //       total_pages: 0
  //     }
  //   });
 
  // useEffect(() => {
  //   if (tabIndex === 'second')
  //     dispatch(getCurrentTerm(branchId))
  // }, [tabIndex, schoolId, branchId, dispatch])
  
 
  return (
    <>
    <Tabs
      id="controlled-tab-example"
      activeKey={tabKey}
      onSelect={(k) => k && setTabKey(k)}
      className="mb-3"
    >
      <Tab eventKey="newly_admitted" title="Newly Admitted Students">
        <NewlyAdmittedStudents schoolId={schoolId} branchId={branchId} tabIndex={tabKey} />
      </Tab>
      <Tab eventKey="contunuing" title="Contunuing Students">
        <ContunuingStudents schoolId={schoolId} branchId={branchId} tabIndex={tabKey} />
      </Tab>
    </Tabs>
    </>
  )
}

export default StudentRegistration
