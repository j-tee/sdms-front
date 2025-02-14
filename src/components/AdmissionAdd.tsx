/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row, Container, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getStudentById } from '../redux/slices/studentSlice'
import { showToastify } from '../utility/Toastify'
import { ToastContext } from '../utility/ToastContext'
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import StageDropDown from './StageDropDown';
import { Admission, AdmissionViewModel } from '../models/admission';
import DepartmentDropDown from './DepartmentDropDown';
import ProgramDropDown from './ProgramDropDown';
import { getDepartments } from '../redux/slices/departmentSlice';
import { DepartmentParams } from '../models/department';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { addAdmission, getAdmissions, getVacancies } from '../redux/slices/admissionSlice';
import { ParamObject } from '../models/params';
import AdmissionList from './AdmissionList';
import PaginationComponent from './PaginationComponent';
import { StudentViewModel } from '../models/student';
import AcademicYearDropDown from './AcademicYearDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';

const AdmissionAdd = (props: any) => {
  const { index, schoolId, branchId, onSuccess, resetState } = props;

  const { admissions, pagination } = useSelector((state: RootState) => state.admission)
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { vacancies } = useSelector((state: RootState) => state.admission)
  const { student, std_message, std_status } = useSelector((state: RootState) => state.student)
  const [studentInfo, setStudentInfo] = useState<StudentViewModel>({
    id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    other_names: '',
    nationality: '',
    parent_id: 0,
    student_id: '',
    image_url: '',
    fathers_name: '',
    mothers_name: '',
    contact_number: '',
    email_address: '',
  })

  // const [student_id, setStudent_id] = useState('')

  const [params, setParams] = useState<ParamObject>({
    academic_term_id: 0,
    stage_id: 0,
    student_id: '',
    admission_date: '',
    branch_id: branchId,
    program_id: 0,
    department_id: 0,
    category: '',
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0
    },
    paginate: true
  })

  const getStudent = (studentId: string) => {
    // setStudent_id(studentId);  // Assuming you have a state variable setEmail for storing the email
    if (studentId) {
      dispatch(getStudentById(encodeURIComponent(studentId)))
        .then((res: any) => {
          setShowToast(true);
          showToastify(std_message, std_status);
        })
      // dispatch(getStudentById(studentId))
      //   .then((res: any) => {
      //     setStudentInfo(res.payload.student)
      //   })
    }
  }
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    if (field !== 'branch_id') {
      setParams((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
    switch (field) {
      case 'department_id': {
        dispatch(getPrograms({ ...params, branch_id: branchId, department_id: parseInt(value), paginate: false }))
        break;
      }
      case 'program_id': {
        if (branchId) {
          dispatch(getStages({ ...params, branch_id: branchId, department_id: params.department_id, program_id: parseInt(value), paginate: false }))
        }
        break;
      }
    }

    // dispatch(getAdmissions({ ...params, school_id: schoolId, branch_id: branchId, paginate: true }))
  };

  useEffect(() => {
    setParams((prevData) => ({
      ...prevData,
      academic_term_id: academic_term.id,
      branch_id: branchId
    }));
  }, [academic_term.id, branchId, dispatch])

  useEffect(() => {
    setShowToast(true)
    let student = null;
    try {
      student = JSON.parse(sessionStorage.getItem('student') || 'null');
    } catch (error) {
      showToastify('Failed to parse student data from sessionStorage:', 'warning');
    }
    setStudentInfo(student);

    dispatch(getCurrentTerm(branchId));

    const deptParams: DepartmentParams = {
      ...params,
      school_id: schoolId,
      branch_id: branchId,
      paginate: false
    };
    dispatch(getDepartments(deptParams));
  }, [branchId, dispatch, schoolId]);


  useEffect(() => {
    dispatch(getAdmissions({ ...params, school_id: schoolId, branch_id: branchId, stage_id: params.stage_id, program_id: params.program_id, academic_term_id: academic_term.id, department_id: params.department_id }))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
    dispatch(getVacancies({ ...params, school_id: schoolId, branch_id: branchId, stage_id: params.stage_id, program_id: params.program_id, academic_term_id: academic_term.id, department_id: params.department_id }))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
  }, [dispatch, index, params])

  useEffect(() => {
    if (resetState) {
      setStudentInfo({
        id: 0,
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        other_names: '',
        nationality: '',
        parent_id: 0,
        student_id: '',
        image_url: '',
        fathers_name: '',
        mothers_name: '',
        contact_number: '',
        email_address: '',
      });
      setParams({
        academic_term_id: 0,
        stage_id: 0,
        student_id: '',
        admission_date: '',
        branch_id: branchId,
        program_id: 0,
        department_id: 0,
        category: '',
        pagination: { current_page: 1, per_page: 10, total_items: 0, total_pages: 0 },
        paginate: true
      });
    }
  }, [resetState]);
  const handleSubmit = () => {
    const admissionObject: Admission = {
      academic_term_id: params?.academic_term_id ?? 0,
      stage_id: params?.stage_id ?? 0,
      student_id: student.id ?? 0,
      admission_date: params?.admission_date ?? "",
      // branch_id: params.branch_id ?? 0,
      program_id: params.program_id ?? 0,
      category: params.category ?? ""
    }
    dispatch(addAdmission(admissionObject))
      .then((res: any) => {
        sessionStorage.removeItem('student');
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
        if (res.payload.status === 'success') {
          onSuccess(); // Reset parent state
      }
        dispatch(getAdmissions({ ...params, school_id: schoolId, branch_id: branchId, paginate: true }))
      }
      )
  }

  const handlePageChange = (page: number): void => {
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  }
  const handleItemsPerPageChange = (perPage: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
        current_page: 1,
      },
    }));
  }
  return (
    <Card>
      <Card.Header>Admission Details for {studentInfo && studentInfo.student_id} {studentInfo && studentInfo.last_name} {studentInfo && studentInfo.first_name}</Card.Header>
      <Container className='mt-5'>
        <Card>
          <Card.Header>Enrolement Data</Card.Header>
          <Card.Body>

            <Row className='gap-2 d-flex flex-flex-wrap flex-lg-row justify-content-center'>
              <Col className='gap-2 d-flex flex-column justify-content-center'>
                <span>Vacancies</span>
                <span>{vacancies?.places}</span>
              </Col>
              <Col className='gap-2 d-flex flex-column'>
                <span>Admitted</span>
                <span>{vacancies?.admitted}</span>
              </Col>
              <Col className='gap-2 d-flex flex-column'>
                <span>Capacity</span>
                <span>{vacancies?.capacity}</span>
              </Col>
              <Col className='gap-2 d-flex flex-column'>
                <span>Registered</span>
                <span>{vacancies?.registered}</span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Card.Body>
        {(student) && <Card.Img variant='top' style={{ width: "100px" }} src={student.image_url} />}
        {!(student && student.student_id) && (
          <Row className='my-3 d-flex flex-row justify-content-center'>
            <Col>
              <Form>
                <Form.Group className='d-flex flex-lg-row flex-column justify-content-center gap-3'>
                  <Form.Label>Find Student</Form.Label>
                  <Form.Control
                    // value={student.student_id}
                    style={{ width: '70%' }}
                    placeholder='Enter student ID'
                    type='text'
                    onFocus={(e) => getStudent(e.target.value)}
                    onBlur={(e) => getStudent(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        )}

        <Form name='admission_form'>
          <Row className='d-flex flex-column flex-lg-row'>
            <Col>
              <DepartmentDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} />
            </Col>
            <Col>
              <ProgramDropDown onChange={handleInputChange} departmentId={params.department_id} branchId={branchId} admission={undefined} />
            </Col>
            <Col>
              <StageDropDown admission={undefined} lesson={undefined} branchId={branchId} onChange={handleInputChange} />
            </Col>
          </Row>
          <Row className='my-4 d-flex flex-column flex-lg-row'>
            <Col>
              <AcademicYearDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
            </Col>
            <Col>
              <AcademicTermDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} yearId={undefined} />
            </Col>
          </Row>
          <Row className='my-4 d-flex flex-column flex-lg-row'>
            <Col>
              <Form.Group controlId='admissionDate'>
                <Form.Label>AdmissionDate</Form.Label>
                <Form.Control type='date' value={params.admission_date}
                  onChange={(e) => handleInputChange('admission_date', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='category'>
                <Form.Label>Admission Category</Form.Label>
                <Form.Control as={'select'} value={params.category} onChange={(e) => handleInputChange('category', e.target.value)}>
                  <option value={''}>---Select category</option>
                  <option value={'Transfer'}>Transfer</option>
                  <option value={'Non-Transfer'}>Non-Transfer</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
        <Card.Header className='mt-4'>Admission List</Card.Header>
        {admissions && admissions.map((admission: AdmissionViewModel) => (
          <AdmissionList params={params} setParams={setParams} onChange={handleInputChange} key={admission.id} admission={admission} schoolId={schoolId} branchId={branchId} />
        ))}
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
            title={`Items per page: ${pagination?.per_page}`}
          >
            <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
          </DropdownButton>
        </div>
      </Card.Body>
    </Card>
  )
}

export default AdmissionAdd
