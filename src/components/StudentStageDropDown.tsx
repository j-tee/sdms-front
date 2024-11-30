import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { getStages } from '../redux/slices/stageSlice';
import { StageParams } from '../models/stage';
import { Form } from 'react-bootstrap';
import { getStudentClassGroup } from '../redux/slices/classGroupSlice';

type AnyType = {
  [key: string]: string;
};
interface StageDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params?: any;
}
const StudentStageDropDown: React.FC<StageDropDownProps> = ({ onChange, params }) => {
  const { stages} = useSelector((state: RootState) => state.stage)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleStageChange = (e: React.ChangeEvent<any>) => {
    const selectedStageId = e.target.value;
    dispatch(getStudentClassGroup({ ...params, stage_id: selectedStageId }))
    onChange('stage_id', selectedStageId);
  };
  
 
  return (
    <Form.Group controlId="branch">
      <Form.Label>Stages / Levels / Years</Form.Label>
      <Form.Select as="select" onChange={handleStageChange} value={params.stage_id}>
      {/* {lesson && <option value={lesson ? lesson.stage_id : ''}>{lesson ? lesson.stage_name : "-----Select Stage----"}</option>}
      {admission && <option value={admission ? admission.stage_id : ''}>{admission ? admission.admission_stage : "-----Select Stage----"}</option>} */}
        <option value="0">-----Select Stage----</option>
        {stages.map((stage) => (<option key={stage.id} value={stage.id}>
          {stage.stage_name}
        </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default StudentStageDropDown
