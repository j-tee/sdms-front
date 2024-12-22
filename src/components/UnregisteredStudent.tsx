import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { StudentRegParams, StudentRegistration, StudentViewModel } from '../models/student';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getCurrentTerm, gettermCount } from '../redux/slices/calendarSlice';
import StageDropDown from './StageDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import { getClassGroups } from '../redux/slices/classGroupSlice';
import { ClassGroupParams } from '../models/classGroup';
import { getRegisteredStudents, getRegistrationInformation, registerStudents } from '../redux/slices/studentRegSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

const UnregisteredStudent = (props: any) => {
  const { params, branchId, index, schoolId, students } = props;
  const { term_count } = useSelector((state: RootState) => state.calendar)
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>();
  const { showToast, setShowToast } = useContext(ToastContext)
  const [classParams, setClassParams] = useState<StudentRegParams>({
    ...params,
    reg_date: '',
    stage_id: term_count < 3 ? 0 : params.stage_id,
    program_id: params.program_id,
    department_id: params.department_id,
    branch_id: branchId,
    school_id: schoolId,
    academic_term_id: academic_term.id,
    class_group_id: 0,
    student_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0
    }
  });
  const [formData, setFormData] = useState<StudentRegistration>({
    student_id: 0,
    class_group_id: 0,
    academic_term_id: 0,
    reg_date: '',
  })
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([])
  
  type AnyType = {
    [key: string]: string;
  };

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (event.target.checked) {
        const newSelectedCheckboxes = [...prevSelectedCheckboxes, value];
        setRegistrations((prevRegistrations) =>
          newSelectedCheckboxes.map((student_id: string) => ({
            ...formData,
            student_id: parseInt(student_id),
            class_group_id: classParams.class_group_id,
            academic_term_id: academic_term.id,
          } as StudentRegistration))
        );
        return newSelectedCheckboxes;
      } else {
        const newSelectedCheckboxes = prevSelectedCheckboxes.filter((checkbox) => checkbox !== value);
        setRegistrations((prevRegistrations) =>
          newSelectedCheckboxes.map((student_id: string) => ({
            ...formData,
            student_id: parseInt(student_id),
          }))
        );
        return newSelectedCheckboxes;
      }
    });
  };


  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setClassParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'stage_id': {
        dispatch(getClassGroups({ ...classParams, program_id: params.program_id, stage_id: parseInt(value), department_id: params.department_id } as ClassGroupParams))
        break;
      }
      case 'class_group_id': {
        setClassParams((prevData) => ({
          ...prevData,
          class_group_id: parseInt(value),
        }));

        console.log('===academic_term.id=======>>>', academic_term.id)
        // dispatch(getRegistrationInformation({ ...classParams, class_group_id: parseInt(value) }))
        break;
      }
    }

  };
  useEffect(() => {
    if (index === 'unregistered') {
      dispatch(getCurrentTerm(branchId))
      dispatch(gettermCount(branchId))
      console.log('===params', params)
    }
  }, [branchId, params, dispatch, index, term_count])

  const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);
    setSelectedCheckboxes(isChecked ? students.map((student: StudentViewModel) => student.id ? student.id.toString() : '') : []);

    // Update registrations based on the "Select All" action
    setRegistrations((prevRegistrations) =>
      isChecked
        ? students.map((student: StudentViewModel) => ({
          ...formData,
          student_id: student.id,
          class_group_id: classParams.class_group_id,
          academic_term_id: academic_term.id,
        }))
        : []
    );
  };

  const registerNewStudents = () => {
    const formattedPayload = {
      student_registration: {  // This should match the "student_registration" required in Rails
        registration: registrations.map((registration) => ({
          class_group_id: registration.class_group_id,
          student_id: registration.student_id,
          academic_term_id: academic_term.id,
          reg_date: registration.reg_date,
        })),
      },
    };
    
    
    dispatch(registerStudents(formattedPayload)).then((resp) => {
      setShowToast(true);
      showToastify(resp.payload.message, resp.payload.status);
      // if(resp.payload.status === 'success'){
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 3000);
      // }
      dispatch(getRegisteredStudents({ ...params, branch_id: branchId, school_id: schoolId }))
    });
  };
  
  

  return (
    <Card>
      <Card.Header className='fs-3 text-muted'>
        Unregistered Students
      </Card.Header>
      <Card.Body>
        <form>
          <Row className='d-flex flex-column flex-lg-row'>
            <Col>
              <StageDropDown lesson={undefined} onChange={handleInputChange} branchId={branchId} />
            </Col>
            <Col>
              <ClassGroupDropDown onChange={handleInputChange}
              programId={params.program_id} stageId={params.stage_id}
              departmentId={params.department_id} lesson={undefined} />
            </Col>
            <Col>
              <Form.Group controlId="regDate">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control value={formData.reg_date} onChange={(e) => setFormData({ ...formData, reg_date: e.target.value })} type="date" placeholder="Enter Registration Date" />
              </Form.Group>
            </Col>
          </Row>
          <ListGroup>
            <ListGroup.Item className='py-0 my-2 fs-5 gap-2 d-flex border-bottom-1 border-left-0 border-right-0  border-top-1 border-dark'>
              <span className='d-flex gap-2'>
                <span>
                  <input onChange={selectAll} type="checkbox" checked={selectAllChecked} />
                </span>
                <span>Select All</span>
              </span>
            </ListGroup.Item>
            {students && students.map((student: StudentViewModel) => (
              <ListGroup.Item className='py-0 gap-2 d-flex' key={student.student_id}>
                <span>
                  <input
                    type="checkbox"
                    value={student.id}
                    checked={selectedCheckboxes.includes((student.id ?? '').toString())}
                    onChange={handleCheckboxChange}
                  />
                </span>
                <span className='d-flex gap-2'>
                  <span>{student.student_id}</span> <span>{student.last_name}</span> <span>{student.first_name}</span>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </form>
        <Row><Col>
          <button className='btn btn-primary mt-2' onClick={registerNewStudents}>Register</button>
        </Col></Row>
      </Card.Body>
    </Card>

  )
}

export default UnregisteredStudent
