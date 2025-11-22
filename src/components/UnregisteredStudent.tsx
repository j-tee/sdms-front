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
import CustomDatePicker from './CustomDatePicker';
import '../css/Registration.css';

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
    const filteredStudents = students.filter((student: StudentViewModel) => selectedCheckboxes.includes(student.id?.toString() ?? '')); 
    setClassParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'reg_date': {
        setFormData((prevData) => ({
          ...prevData,
          reg_date: value,
        }));
        setRegistrations((prevRegistrations) =>
          filteredStudents.map((student: StudentViewModel) => ({
            ...formData,
              student_id: student.id,
              class_group_id: classParams.class_group_id,
              academic_term_id: academic_term.id,
              reg_date: value,
            }))
        );
        
        break;
      }
      case 'stage_id': {
        dispatch(getClassGroups({ ...classParams, program_id: params.program_id, stage_id: parseInt(value), department_id: params.department_id } as ClassGroupParams))
        break;
      }
      case 'class_group_id': {
        setRegistrations((prevRegistrations) =>
          filteredStudents.map((student: StudentViewModel) => ({
            ...formData,
            student_id: student.id,
            class_group_id: parseInt(value),
            academic_term_id: academic_term.id,
          }))
        );
        break;
      }
    }

  };
  
  useEffect(() => {
    if (index === 'unregistered') {
      dispatch(getCurrentTerm(branchId))
      dispatch(gettermCount(branchId))
      dispatch(getRegistrationInformation({ ...params, branch_id: branchId, school_id: schoolId })) 
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
      student_registration: {
        registration: registrations.map((registration) => ({
          class_group_id: registration.class_group_id,
          student_id: registration.student_id,
          academic_term_id: academic_term.id,
          reg_date: registration.reg_date,
        })),
      },
    };
  
    dispatch(registerStudents(formattedPayload))
      .then((resp) => {
        if (resp.payload.status === "success") {
          setShowToast(true);
          showToastify(resp.payload.message, resp.payload.status);
  
          // Clear the registrations array and selected checkboxes
          setRegistrations([]);
          setSelectedCheckboxes([]);
          setSelectAllChecked(false);
  
          // Refresh the list of registered students
          dispatch(getRegisteredStudents({ ...params, branch_id: branchId, school_id: schoolId }));
          dispatch(getRegistrationInformation({ ...params, academic_term_id: academic_term.id, branch_id: branchId, school_id: schoolId }))
        } else {
          showToastify(resp.payload.message, "error");
        }
      })
      .catch((error) => {
        console.error("Error registering students:", error);
        showToastify("Failed to register students. Please try again.", "error");
      });
  };
  
  

  return (
    <Card className='unregistered-container'>
      <Card.Header className='unregistered-header'>
        <div className='unregistered-title'>Unregistered Students</div>
      </Card.Header>
      <Card.Body className='unregistered-body'>
        <form>
          <Row className='d-flex flex-column flex-lg-row registration-form-row'>
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
                <CustomDatePicker value={formData.reg_date} onChange={(date) => handleInputChange('reg_date', date)} placeholder="Enter Registration Date" />
              </Form.Group>
            </Col>
          </Row>
          <ListGroup className='student-list'>
            <ListGroup.Item className='select-all-item'>
              <div className='student-list-content'>
                <input 
                  onChange={selectAll} 
                  type="checkbox" 
                  checked={selectAllChecked}
                  className='student-checkbox'
                />
                <span><i className="fas fa-check-double"></i> Select All</span>
              </div>
            </ListGroup.Item>
            {students && students.map((student: StudentViewModel) => (
              <ListGroup.Item className='student-list-item' key={student.student_id}>
                <div className='student-list-content'>
                  <input
                    type="checkbox"
                    value={student.id}
                    checked={selectedCheckboxes.includes((student.id ?? '').toString())}
                    onChange={handleCheckboxChange}
                    className='student-checkbox'
                  />
                  <div className='student-name-group'>
                    <span>{student.student_id}</span>
                    <span>{student.last_name}</span>
                    <span>{student.first_name}</span>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </form>
        <Row><Col>
          <button 
            className='register-students-btn' 
            onClick={registerNewStudents}
            disabled={registrations.length === 0}
          >
            <i className="fas fa-user-check"></i>
            Register Selected Students ({registrations.length})
          </button>
        </Col></Row>
      </Card.Body>
    </Card>

  )
}

export default UnregisteredStudent
