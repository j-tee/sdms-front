import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown'
import StageDropDown from './StageDropDown'
import { getPrograms } from '../redux/slices/programSlice'
import { ProgramParams } from '../models/program'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getStages } from '../redux/slices/stageSlice'
import { StageParams } from '../models/stage'
import { addClassGroup, getClassGroups } from '../redux/slices/classGroupSlice'
import { ClassGroup } from '../models/classGroup'
import { showToastify } from '../utility/Toastify'
import ClassGroupList from './ClassGroupList'
import PaginationComponent from './PaginationComponent'
import { QueryParams } from '../models/queryParams'

const ClassGroupCard = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stages } = useSelector((state: RootState) => state.stage)
  const { class_groups, pagination } = useSelector((state: RootState) => state.classGroup)
  const { schoolId, branchId, tabIndex } = props;
  const { setShowToast } = useContext(ToastContext)
  const [formData, setFormData] = useState<ClassGroup>({
    class_name: '',
    capacity: 0,
    program_id: 0,
    stage_id: 0,
  })
  const [params, setParams] = useState<QueryParams>({
    stage_id: 0,
    class_group_id: 0,
    department_id: 0,
    branch_id: 0,
    program_id: 0,
    school_id: 0,
    class_name: '',
      pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
    }
    })

  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    
    switch (field) {
      case 'class_name':
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'capacity':
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'stage_id':
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
      case 'program_id':
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        if(branchId)
        dispatch(getStages({ ...params, branch_id: branchId, department_id: params.department_id, paginate: false })) 
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (tabIndex === 'fourth') {
      dispatch(getClassGroups({ ...params, branch_id: branchId, school_id: schoolId, paginate:true } as any))
      dispatch(getPrograms({ ...params, paginate:false } as any))
      if (stages.length === 0 && branchId) {
        dispatch(getStages({ ...params, branch_id: branchId, department_id: params.department_id }))
      }
    }
  }, [branchId, dispatch, params, schoolId, stages.length, tabIndex])

  const handleSubmit = () => {
    dispatch(addClassGroup({...formData})).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      dispatch(getClassGroups({ ...params, branch_id: branchId, school_id: schoolId, paginate:true } as any))
    })
  }
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
  
  return (
    <div className="org-section-content">
      <div className="org-section-header">
        <div className="org-section-icon">
          <i className="fas fa-users-class"></i>
        </div>
        <h3 className="org-section-title">Class Groups</h3>
      </div>

      <div className="org-add-section">
        <Form className="org-add-form">
          <Row>
            <Col md={4}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-layer-group me-2"></i>
                  Department
                </Form.Label>
                <DepartmentDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-project-diagram me-2"></i>
                  Program
                </Form.Label>
                <ProgramDropDown admission={undefined} onChange={handleInputChange} branchId={branchId} departmentId={params.department_id} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-stairs me-2"></i>
                  Stage
                </Form.Label>
                <StageDropDown lesson={undefined} onChange={handleInputChange} branchId={branchId} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-chalkboard me-2"></i>
                  Class Name
                </Form.Label>
                <Form.Control 
                  type='text' 
                  value={formData.class_name} 
                  onChange={(e) => handleInputChange('class_name', e.target.value)}
                  className="org-form-control"
                  placeholder="Enter class name" 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-users me-2"></i>
                  Class Capacity
                </Form.Label>
                <Form.Control 
                  type='number'
                  value={formData.capacity} 
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  className="org-form-control"
                  placeholder="Enter capacity" 
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='mt-3'>
              <Button onClick={handleSubmit} className="btn-add-org-item">
                <i className="fas fa-plus-circle me-2"></i>
                Add New Class Group
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="org-items-list">
        {class_groups.map((clsGrp) => (
          <ClassGroupList key={clsGrp.id} params={params} class_group={clsGrp} />
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
          id="dropdown-items-per-page-class"
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

export default ClassGroupCard
