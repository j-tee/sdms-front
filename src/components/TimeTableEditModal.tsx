import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { Lesson } from '../models/Lesson';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { getSubjects } from '../redux/slices/subjectSlice';
import StaffDropDown from './StaffDropDown';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import ProgramSubjectDropDown from './ProgramSubjectDropDown';
import DayOfWeekDropDown from './DayOfWeekDropDown';
import { getClassGroups } from '../redux/slices/classGroupSlice';
import { getStages } from '../redux/slices/stageSlice';
import TimePicker from 'react-time-picker';
import { ClassGroupParams } from '../models/classGroup';
import { showToastify } from '../utility/Toastify';
import { getLessons, updateLesson } from '../redux/slices/lessonSlice';

const TimeTableEditModal = (props: any) => {
    const { lesson, schoolId, branchId, isOpen, params, onRequestClose, setEditModalOpen } = props;
    const { subjects } = useSelector((state: any) => state.subject)
    const dispatch = useDispatch<AppDispatch>()
    const { setShowToast } = useContext(ToastContext)
    const [programId, setProgramId] = useState<number>(0);
    const [stageId, setStageId] = useState<number>(0);
    const [departmentId, setDepartmentId] = useState<number>(0);
    const [classGroupId, setClassGroupId] = useState<number>(0);
    const [staffId, setStaffId] = useState<number>(0);
    const [programSubjectId, setProgramSubjectId] = useState<number>(0);
    const [dayOfWeek, setDayOfWeek] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('7:45');
    const [endTime, setEndTime] = useState<string>('9:15');


    const [formData, setFormData] = useState<Lesson>({
        class_group_id: 0,
        staff_id: 0,
        program_subject_id: 0,
        day_of_week: '',
        start_time: '',
        end_time: '',
    })

    useEffect(() => {
        dispatch(getSubjects({
            ...params, school_id: schoolId, branch_id: branchId, pagination: {
                per_page: 100000,
                current_page: 1,
                total_items: 0,
                total_pages: 0
            }
        }))
        setFormData((prevData) => ({
            ...prevData,
            class_group_id: lesson.class_group_id,
            staff_id: lesson.staff_id,
            program_subject_id: lesson.program_subject_id,
            day_of_week: lesson.day_of_week,
            start_time: lesson.start_time,
            end_time: lesson.end_time,
        }))
    }, [branchId, dispatch, lesson, params, schoolId])

    type AnyType = {
        [key: string]: string;
    };

    const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
        // Update the formData state with the new value
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        switch (field) {
            case 'stage_id':
                setStageId(parseInt(value));
                dispatch(getClassGroups({ school_id: schoolId, branch_id: branchId, program_id: programId, stage_id: parseInt(value), department_id: departmentId, pagination: { current_page: 1, per_page: 10000 }, paginate: false } as ClassGroupParams))
                break;
            case 'day_of_week':
                setDayOfWeek(value);
                break;
            case 'program_id':
                setProgramId(parseInt(value));
                if (branchId)
                    dispatch(getStages({ school_id: schoolId, branch_id: branchId, program_id: parseInt(value), pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
                break;
            case 'staff_id':
                setStaffId(parseInt(value));
                break;
            case 'program_subject_id':
                setProgramSubjectId(parseInt(value));
                break;
            case 'class_group_id':
                setClassGroupId(parseInt(value));
                break;
            default:
                break;
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateLesson({ ...formData, start_time: startTime, end_time: endTime }))
          .then((res) => {
            setShowToast(true);
            showToastify(res.payload.message, res.payload.status);
            dispatch(getLessons({
              school_id: schoolId,
              branch_id: branchId,
              program_id: programId,
              stage_id: stageId,
              department_id: departmentId,
              class_group_id: classGroupId,
              staff_id: staffId,
              program_subject_id: programSubjectId,
              day_of_week: dayOfWeek,
              pagination: params.pagination, paginate: true
            }))
              .then((res) => {
                setShowToast(true);
                showToastify(res.payload.message, res.payload.status);
              })
          }
          )
      }
    return (
        <Modal animation show={isOpen} centered onHide={onRequestClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit: {lesson.class_group_name} - {lesson.program_subject_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className='d-flex flex-column flex-lg-row'>
                        <Col>
                            <StaffDropDown onChange={handleInputChange} branchId={0} schoolId={0} />
                        </Col>
                        <Col>
                            <ProgramDropDown onChange={handleInputChange} departmentId={undefined} branchId={0} />
                        </Col>
                        <Col>
                            <StageDropDown onChange={handleInputChange} branchId={0} />
                        </Col>
                    </Row>
                    <Row className='d-flex flex-column flex-lg-row'>
                        <Col>
                            <ClassGroupDropDown onChange={handleInputChange} programId={programId} stageId={stageId} departmentId={departmentId} />
                        </Col>
                        <Col>
                            <ProgramSubjectDropDown onChange={handleInputChange} />
                        </Col>
                        <Col>
                            <DayOfWeekDropDown onChange={handleInputChange} />
                        </Col>
                    </Row>
                    <Row className='d-flex flex-column flex-lg-row justify-content-between mt-2'>
                        <Col md={4} className='d-flex flex-row gap-5'>
                            <span className='pt-2'>Start Time</span>
                            <span> <TimePicker
                                onChange={(e) => setStartTime(e as string)}
                                value={startTime}
                            /></span>
                        </Col>
                        <Col md={4} className='d-flex flex-row gap-5'>
                            &nbsp;
                        </Col>
                        <Col md={4} className='d-flex flex-row gap-5'>
                            <span className='pt-2'>End Time</span>
                            <span><TimePicker
                                onChange={(e) => setEndTime(e as string)}
                                value={endTime}
                            /></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button type="submit" className="btn btn-primary mt-2">Save</button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default TimeTableEditModal
