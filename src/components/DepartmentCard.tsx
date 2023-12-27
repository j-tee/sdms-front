import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Department, DepartmentParams, DepartmentViewModel } from '../models/department';
import { addDepartment, getDepartments } from '../redux/slices/departmentSlice';
import { showToastify } from '../utility/Toastify';
import DepartmentList from './DepartmentList';
import PaginationComponent from './PaginationComponent';

const DepartmentCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { showToast, setShowToast } = useContext(ToastContext)
  const { departments, pagination} = useSelector((state: RootState) => state.department)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<DepartmentParams>({
    branch_id: 0,
    school_id: 0,
    paginate:true,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })

  const [formData, setFormData] = useState<Department>({
    dept_name: '',
    branch_id: 0
  })

  useEffect(() => {
    setFormData((prevData) => (
      { ...prevData, branch_id: branchId }
    ))
  }, [branchId])

  const addNewDepartment = () => {
    dispatch(addDepartment({ ...formData, branch_id: branchId }))
    .then((res: any) => {
      setShowToast(true)
      // showToastify(res.payload.message, res.payload.status)
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId }))
    })
  }

  useEffect(() => {
    if(tabIndex === 'first'){
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId }))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status) 
      })
    }   
  }, [branchId, tabIndex, dispatch, schoolId, params])
  
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
      },
    }));
  };
  return (
    <div>
      <Card.Subtitle className='d-flex justify-content-center fs-3 text-muted'>
        Departments
      </Card.Subtitle>
      <Card.Body>
        <Form>
          <Row className='d-flex flex-column flex-lg-row gap-2 mb-4 mb-lg-2'>
            <Col>
              <Form.Group controlId='deptName'>
                {/* <Form.Label>Department Name</Form.Label> */}
                <Form.Control placeholder='Department Name' type='text' value={formData.dept_name} onChange={(e) => setFormData({ ...formData, dept_name: e.target.value })} />
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={addNewDepartment}>Add New Department</Button>
            </Col>
          </Row>
        </Form>
        {departments.map((dept: DepartmentViewModel) => (
          <DepartmentList key={dept.id} department={dept} params={params} branchId={branchId} schoolId={schoolId}/>
        ))}
        <div className="d-flex px-2 justify-content-between align-items-center">
        <PaginationComponent
          params={params}
          activePage={pagination?.current_page}
          itemsCountPerPage={pagination?.per_page}
          totalItemsCount={pagination?.total_items || 0}
          pageRangeDisplayed={5}
          totalPages={pagination?.total_pages}
          hideDisabled={pagination?.total_pages === 0}
          hideNavigation={pagination?.total_pages === 1}
          onChange={handlePageChange}
        />
        <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${params.pagination?.per_page}`}>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
      
      </Card.Body>
    </div>
  )
}

export default DepartmentCard
