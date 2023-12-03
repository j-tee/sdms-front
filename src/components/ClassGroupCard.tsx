import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
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

const ClassGroupCard = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stages } = useSelector((state: RootState) => state.stage)
  const { class_groups, class_group, message, status } = useSelector((state: RootState) => state.classGroup)
  const { schoolId, branchId, tabIndex } = props;
  const { showToast, setShowToast } = useContext(ToastContext)
  const [update, setUpdate] = useState(0)

  const [clsGrpParams, setClsGrpParams] = useState({
    stage_id: 0,
    class_group_id: 0,
    department_id: 0,
    branch_id: 0,
    program_id: 0,
    school_id: 0,
    paginate: true,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const [stageParams, setStageParams] = useState<StageParams>({
    stage_id: 0,
    program_id: 0,
    branch_id: 0,
    department_id: 0,
    pagination: {
      per_page: 10000,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const [progParams, setProgParams] = useState<ProgramParams>({
    paginate: false,
    branch_id: 0,
    department_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10000,
      total_items: 0,
      total_pages: 0,
    }
  })
  const [params, setParams] = useState({
    capacity: 0,
    stage_id: 0,
    class_name: '',
    school_id: 0,
    branch_id: branchId,
    class_group_id: 0,
    program_id: 0,
    department_id: 0,
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
  };

  useEffect(() => {
    if (tabIndex === 'fourth') {
      setClsGrpParams((prevData) => ({
        ...prevData, stage_id: params.stage_id,
        program_id: params.program_id,
        branch_id: branchId,
        school_id: schoolId,
        paginate: true,
        pagination: {
          current_page: 1,
          total_items: 0,
          per_page: 10,
          total_pages: 0
        }
      }))
      dispatch(getClassGroups({ ...clsGrpParams, branch_id: branchId, school_id: schoolId,stage_id:params.stage_id, department_id: params.department_id }))
      dispatch(getPrograms({ ...progParams, department_id: params.department_id }))
      if (stages.length === 0) {
        dispatch(getStages({ ...stageParams, branch_id: branchId, department_id: params.department_id }))
      }
      // setShowToast(true)
      // showToastify(message, status)
      // console.log('message========status=======', message, status)
    }
  }, [branchId, dispatch, params.department_id, progParams, stageParams])

  useEffect(() => {
    if (tabIndex === 'fourth') {

      setProgParams((prevData) => ({
        paginate: false,
        branch_id: params.branch_id,
        department_id: params.department_id,
        pagination: {
          current_page: 1,
          per_page: 10000,
          total_items: 0,
          total_pages: 0,
        }
      }))
    }

  }, [branchId, dispatch, params, tabIndex])

  const handleSubmit = () => {
    setShowToast(true)
    const clsGrp: ClassGroup = {
      class_name: params.class_name,
      capacity: params.capacity,
      program_id: params.program_id,
      stage_id: params.stage_id,
    }
    dispatch(addClassGroup(clsGrp)).then((res: any) => (showToastify(message, status)))
  }
  return (
    <div>
      <Card.Title className='d-flex justify-content-center'>
        Class Groups
      </Card.Title>
      <Card.Body>
        <Form>
          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <DepartmentDropDown onChange={handleInputChange} branchId={params.branch_id} schoolId={params.school_id} />
            </Col>
            <Col>
              <ProgramDropDown onChange={handleInputChange} branchId={params.branch_id} departmentId={params.department_id} />
            </Col>
            <Col>
              <StageDropDown onChange={handleInputChange} branchId={params.branch_id} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Class Name</Form.Label>
                <Form.Control type='text' value={params.class_name} onChange={(e) => handleInputChange('class_name', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Class Capacity</Form.Label>
                <Form.Control value={params.capacity} onChange={(e) => handleInputChange('capacity', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='pt-4'>
              <Button onClick={handleSubmit} className='mt-2'>Add New Stage</Button>
            </Col>
          </Row>
        </Form>
        {class_groups.map((clsGrp) => (
          <ClassGroupList class_group={clsGrp} />
        ))}
      </Card.Body>
    </div>
  )
}

export default ClassGroupCard
