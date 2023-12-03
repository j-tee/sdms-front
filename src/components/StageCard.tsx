import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Stage, StageParams } from '../models/stage';
import BranchDropDown from './BranchDropDown';
import { getBranches } from '../redux/slices/schoolSlice';
import { addStage, getStages } from '../redux/slices/stageSlice';
import { showToastify } from '../utility/Toastify';
import { ToastContext } from '../utility/ToastContext';

const StageCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const {message, status, stages} = useSelector((state:RootState) => state.stage)
  const { showToast, setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState({
    school_id: 0,
    branch_id: 0,
    class_group_id: 0,
    program_id: 0,
    department_id: 0,
    stage_name: '',
  })
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  // useEffect(() => {
  //   if (tabIndex === 'third') {
  //     const dept_params: DepartmentParams = {
  //       branch_id: branchId,
  //       school_id: schoolId,
  //       paginate: false,
  //       pagination: {
  //         current_page: 1,
  //         per_page: 10000,
  //         total_items: 0,
  //         total_pages: 0,
  //       }
  //     }
  //     dispatch(getDepartments(dept_params))
  //   }
  // }, [branchId, dispatch, schoolId, tabIndex])
  useEffect(() => {
    if (tabIndex === 'third') {
      dispatch(getBranches({ ...params, school_id: schoolId }))
      const stage_params: StageParams = {
        stage_id: 0,
        program_id: 0,
        branch_id: params.branch_id,
        department_id: 0,
        pagination: {
          current_page: 1,
          per_page: 10,
          total_items: 0,
          total_pages: 0
        }
      }
      dispatch(getStages(stage_params))
      setShowToast(true)
      showToastify(message, status)
    }
  }, [branchId, dispatch, message, params, schoolId, setShowToast, status, tabIndex])
  
  useEffect(() => {
    setParams((prevData) => ({
      ...prevData,
      branch_id: branchId,
      school_id: schoolId
    }))
  }, [branchId, schoolId])
  const handleStageSubmit = () => {
    setShowToast(true)
    const stage: Stage = {
      stage_name: params.stage_name,
      branch_id: branchId
    }
    dispatch(addStage(stage))
    showToastify(message,status)
  }
  return (
    <>
    <Form>
      <Row className='d-flex flex-lg-row flex-column'>
        <Col>
          <BranchDropDown onChange={handleInputChange} schoolId={schoolId} />
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Stage Name</Form.Label>
            <Form.Control onChange={(e) => handleInputChange('stage_name', e.target.value)} value={params.stage_name} />
          </Form.Group>
        </Col>
        <Col className='pt-4'>
          <Button onClick={handleStageSubmit} className='mt-1'>Add New Stage</Button>
        </Col>
      </Row>
    </Form>
    {stages && stages.map((stage)=>(
      <div className='fs-5 text-muted p-2 border-bottom'>
      {stage.stage_name}      
    </div>
    ))}
    </>
  )
}

export default StageCard