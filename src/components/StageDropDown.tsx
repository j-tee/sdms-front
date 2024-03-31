import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { getStages } from '../redux/slices/stageSlice';
import { StageParams } from '../models/stage';
import { Form } from 'react-bootstrap';

type AnyType = {
  [key: string]: string;
};
interface StageDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  branchId: any
  lesson: any
}
const StageDropDown: React.FC<StageDropDownProps> = ({ onChange, branchId, lesson }) => {
  const { stages, message, status } = useSelector((state: RootState) => state.stage)
  const { showToast, setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<StageParams>({
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
  const handleStageChange = (e: React.ChangeEvent<any>) => {
    const selectedStageId = e.target.value;
    setParams({
      ...params,
      program_id: 0,
      stage_id: selectedStageId,
      department_id: 0,
    });
    onChange('stage_id', selectedStageId);
  };
  useEffect(() => {
    console.log('lesson from timetable editmodal open==========', lesson)
    if(branchId)
    dispatch(getStages({ ...params, branch_id: branchId }))
  }, [branchId, dispatch, params, lesson])
  useEffect(() => {
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <Form.Group controlId="branch">
      <Form.Label>Stages / Levels / Years</Form.Label>
      <Form.Select as="select" onChange={handleStageChange} value={params.stage_id}>
      <option value={lesson ? lesson.stage_id : ''}>{lesson ? lesson.stage_name : "-----Select Stage----"}</option>
        {stages.map((stage) => (<option key={stage.id} value={stage.id}>
          {stage.stage_name}
        </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default StageDropDown
