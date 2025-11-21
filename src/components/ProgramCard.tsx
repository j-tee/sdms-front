import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getDepartments } from '../redux/slices/departmentSlice';
import { DepartmentParams, DepartmentViewModel } from '../models/department';
import { Program, ProgramParams, ProgramViewModel } from '../models/program';
import { addProgram, getPrograms } from '../redux/slices/programSlice';
import { showToastify } from '../utility/Toastify';
import ProgramList from './ProgramList';
import PaginationComponent from './PaginationComponent';
import { QueryParams } from '../models/queryParams';

const ProgramCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { showToast, setShowToast } = useContext(ToastContext)
  const { departments } = useSelector((state: RootState) => state.department)
  const { pagination, programs } = useSelector((state: RootState) => state.program)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<QueryParams>({
    branch_id: 0,
    school_id: 0,
    department_id: 0,
    paginate: false,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })

  const [formData, setFormData] = useState<Program>({
    prog_name: '',
    department_id: 0,
  })

  const handleSubmit = () => {
    dispatch(addProgram({ ...formData }))
    .then((res: any) => {
      setShowToast(true)
      // showToastify(res.payload.message, res.payload.status)
      dispatch(getPrograms({ ...params, branch_id: branchId, department_id: formData.department_id, paginate: true }))
    })
  }

  useEffect(() => {
    if (tabIndex === 'second') {
      dispatch(getPrograms({ ...params, branch_id: branchId, department_id: formData.department_id, paginate: true }))
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId, paginate: false }))
    }
  }, [tabIndex, dispatch, params, formData])

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
          <i className="fas fa-project-diagram"></i>
        </div>
        <h3 className="org-section-title">Programs</h3>
      </div>

      <div className="org-add-section">
        <Form className="org-add-form">
          <Row>
            <Col md={4}>
              <Form.Group controlId='deptId' className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-layer-group me-2"></i>
                  Department
                </Form.Label>
                <Form.Control 
                  as='select' 
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: parseInt(e.target.value) })}
                  className="org-form-control"
                >
                  <option value={''}>---Select Department---</option>
                  {departments.map((dept: DepartmentViewModel) => (
                    <option value={dept.id} key={dept.id}>{dept.dept_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group controlId='programName' className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-graduation-cap me-2"></i>
                  Program Name
                </Form.Label>
                <Form.Control 
                  type='text' 
                  placeholder='Enter program name' 
                  onChange={(e) => setFormData({ ...formData, prog_name: e.target.value })}
                  className="org-form-control" 
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <div className="org-form-group">
                <Form.Label className="org-form-label" style={{opacity: 0}}>Action</Form.Label>
                <Button onClick={handleSubmit} className="btn-add-org-item">
                  <i className="fas fa-plus-circle me-2"></i>
                  Add Program
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="org-items-list">
        {programs.map((prog: ProgramViewModel) => (
          <ProgramList key={prog.id} params={params} schoolId={schoolId} branchId={branchId} prog={prog} />
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
          id="dropdown-items-per-page-prog"
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

export default ProgramCard
