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
    <div className="org-section-content">
      <div className="org-section-header">
        <div className="org-section-icon">
          <i className="fas fa-layer-group"></i>
        </div>
        <h3 className="org-section-title">Departments</h3>
      </div>

      <div className="org-add-section">
        <Form className="org-add-form">
          <Row className="align-items-end">
            <Col md={8}>
              <Form.Group controlId='deptName' className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-building me-2"></i>
                  Department Name
                </Form.Label>
                <Form.Control 
                  placeholder='Enter department name' 
                  type='text' 
                  value={formData.dept_name} 
                  onChange={(e) => setFormData({ ...formData, dept_name: e.target.value })}
                  className="org-form-control" 
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button onClick={addNewDepartment} className="btn-add-org-item">
                <i className="fas fa-plus-circle me-2"></i>
                Add Department
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="org-items-list">
        {departments.map((dept: DepartmentViewModel) => (
          <DepartmentList key={dept.id} department={dept} params={params} branchId={branchId} schoolId={schoolId}/>
        ))}
      </div>

      <div className="pagination-controls-modern">
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
        <DropdownButton
          className="items-per-page-dropdown"
          id="dropdown-items-per-page-dept"
          title={`Items per page: ${params.pagination?.per_page}`}
        >
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default DepartmentCard
