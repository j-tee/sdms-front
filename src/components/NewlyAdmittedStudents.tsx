import React, { useEffect, useState } from 'react'
import { Card, Col, Dropdown, DropdownButton, Row, Tab, Tabs } from 'react-bootstrap'
import AcademicYearDropDown from './AcademicYearDropDown'
import AcademicTermDropDown from './AcademicTermDropDown'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown'
import StageDropDown from './StageDropDown'
import { QueryParams } from '../models/queryParams'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getCurrentTerm } from '../redux/slices/calendarSlice'
import { getRegisteredStudents, getRegistrationInformation } from '../redux/slices/studentRegSlice'
import { getPrograms } from '../redux/slices/programSlice'
import { getStages } from '../redux/slices/stageSlice'
import RegisteredStudents from './RegisteredStudents'
import UnregisteredStudent from './UnregisteredStudent'
import PaginationComponent from './PaginationComponent'
import '../css/Registration.css'

const NewlyAdmittedStudents = (props: any) => {
  const { schoolId, branchId, tabIndex, tabKey } = props;
  // const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { all_unregistered_students,admitted_but_not_registered,
    admitted_but_not_registered_pagination,
     registered, registered_pagination } = useSelector((state: RootState) => state.studentReg)  
  const [key, setKey] = useState<string>('registered');
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
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
        current_page: 1,
      },
    }));
  };
// useEffect(()=>{
//   if(tabKey === 'newly_admitted'){
//      setParams((prevData) => ({
//           ...prevData,
//           pagination: {
//             ...prevData.pagination,
//             current_page: 1,
//           },
//         }))
//   }
// },[])
useEffect(()=>{
  // if(!academic_term){
  //   dispatch(getCurrentTerm(branchId))
  // }
  if(tabKey === 'newly_admitted'){    
  dispatch(getRegisteredStudents({ ...params, paginate:true, branch_id: branchId, school_id: schoolId }))
  dispatch(getRegistrationInformation({ ...params, branch_id: branchId, school_id: schoolId }))

  }
  },[params, tabIndex, dispatch, branchId, schoolId])
  return (
    <Card className='registration-container'>
      <Card.Header className='registration-header'>
        <Card.Title className='registration-title'>Newly Admitted Students Registration</Card.Title>
      </Card.Header>
      <Card.Body className='registration-body'>
        <Row className='filter-row'>
          <Col>
            <AcademicYearDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} />
          </Col>
          <Col>
            <AcademicTermDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} yearId={undefined} />
          </Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row filter-row'>
          <Col>
            <DepartmentDropDown onChange={handleInputChange} admission={undefined} branchId={branchId} schoolId={schoolId} />
          </Col>
          <Col>
            <ProgramDropDown admission={undefined} onChange={handleInputChange} departmentId={params.department_id} branchId={branchId} />
          </Col>
          <Col>
            <StageDropDown lesson={(undefined)} onChange={handleInputChange} admission={undefined} branchId={branchId} />
          </Col>
        </Row>
        <Row className='my-4'>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {k && setKey(k); setParams((prevData) => ({
              ...prevData,
              pagination: {
                ...prevData.pagination,
                current_page: 1,
              },
            }))}}
            className="registration-tabs mb-3"
          >
            <Tab eventKey="registered" title="Registered Students">
              <RegisteredStudents students={registered} index={key} params={params} branchId={branchId} schoolId={schoolId} />
            </Tab>
            <Tab eventKey="unregistered" title="Unregistered Students">
              <UnregisteredStudent students={admitted_but_not_registered} academic_term_id={params.academic_term_id} onChange={handleInputChange}  index={key} params={params} branchId={branchId} schoolId={schoolId} />
            </Tab>
          </Tabs>
        </Row>
        {key === "registered" &&(<div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={params}
              activePage={registered_pagination?.current_page}
              itemsCountPerPage={registered_pagination?.per_page}
              totalItemsCount={registered_pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={registered_pagination?.total_pages}
              hideDisabled={registered_pagination?.total_pages === 0}
              hideNavigation={registered_pagination?.total_pages === 1}
              onChange={handlePageChange}
            />
            <DropdownButton
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </DropdownButton>
          </div>) }
          {key === "unregistered" &&(<div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={params}
              activePage={admitted_but_not_registered_pagination?.current_page}
              itemsCountPerPage={admitted_but_not_registered_pagination?.per_page}
              totalItemsCount={admitted_but_not_registered_pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={admitted_but_not_registered_pagination?.total_pages}
              hideDisabled={admitted_but_not_registered_pagination?.total_pages === 0}
              hideNavigation={admitted_but_not_registered_pagination?.total_pages === 1}
              onChange={handlePageChange}
            />
            <DropdownButton
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </DropdownButton>
          </div>) }
        
      </Card.Body>
    </Card>
  )
}

export default NewlyAdmittedStudents