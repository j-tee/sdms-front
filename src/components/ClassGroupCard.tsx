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
    <div>
      <Card.Title className='d-flex justify-content-center'>
        Class Groups
      </Card.Title>
      <Card.Body>
        <Form>
          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <DepartmentDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} />
            </Col>
            <Col>
              <ProgramDropDown admission={undefined} onChange={handleInputChange} branchId={branchId} departmentId={params.department_id} />
            </Col>
            <Col>
              <StageDropDown lesson={undefined} onChange={handleInputChange} branchId={branchId} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Class Name</Form.Label>
                <Form.Control type='text' value={formData.class_name} onChange={(e) => handleInputChange('class_name', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Class Capacity</Form.Label>
                <Form.Control value={formData.capacity} onChange={(e) => handleInputChange('capacity', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='pt-4'>
              <Button onClick={handleSubmit} className='mt-2'>Add New Class</Button>
            </Col>
          </Row>
        </Form>
        {class_groups.map((clsGrp) => (
          <ClassGroupList params={params} class_group={clsGrp} />
        ))}
      </Card.Body>
      <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
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
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>50</Dropdown.Item>
            </DropdownButton>
          </div>
    </div>
  )
}

export default ClassGroupCard
