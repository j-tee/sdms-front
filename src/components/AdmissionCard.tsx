import React, { useContext, useEffect, useState } from 'react';
import ParentCard from './ParentCard';
import StudentDetails from './StudentDetails';
import AdmissionAdd from './AdmissionAdd';
import { Button, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ParamObject } from '../models/params';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { DepartmentParams } from '../models/department';
import { getDepartments } from '../redux/slices/departmentSlice';
import { getAdmissions, getVacancies } from '../redux/slices/admissionSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { AdmissionViewModel } from '../models/admission';
import AdmissionList from './AdmissionList';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import DepartmentDropDown from './DepartmentDropDown';
import AcademicYearDropDown from './AcademicYearDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';
import '../css/AdmissionList.css';
import StageDropDown from './StageDropDown';
import NewAdmissionModal from './NewAdmissionModal';
import PaginationComponent from './PaginationComponent';


type AnyType = {
  [key: string]: string;
};

const AdmissionCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { setShowToast } = useContext(ToastContext)
  const { admissions, pagination } = useSelector((state: RootState) => state.admission)
  const dispatch = useDispatch<AppDispatch>()
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const [NewAdmissionModalOpen, setNewAdmissionModalOpen] = useState(false)
  const [step, setStep] = useState(0); // 0 for ParentCard, 1 for StudentDetails, 2 for AdmissionAdd

  const [params, setParams] = useState<ParamObject>({
    academic_year_id: 0,
    academic_term_id: academic_term.id,
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

  useEffect(() => {
    if(!academic_term){
      dispatch(getCurrentTerm(branchId))
    }
    if (tabIndex === 'first') {
      
      const deptParams: DepartmentParams = {
        ...params,
        school_id: schoolId,
        branch_id: branchId,
        paginate: false
      }
      dispatch(getDepartments(deptParams))
    }

  }, [academic_term, branchId, dispatch, params, schoolId, tabIndex])

  useEffect(() => {
   if(tabIndex === 'first'){
    dispatch(getAdmissions({ ...params, school_id: schoolId, branch_id: branchId, stage_id: params.stage_id, program_id: params.program_id, department_id: params.department_id }))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
    dispatch(getVacancies({ ...params, school_id: schoolId, branch_id: branchId, stage_id: params.stage_id, program_id: params.program_id, department_id: params.department_id }))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
   }
  }, [dispatch, params])

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const openNewAdmission = (event: any): void => {
    setNewAdmissionModalOpen(true)
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
      },
    }));
  };
  return (
    <div>
      <Row>
        <Col><DepartmentDropDown onChange={handleInputChange} branchId={0} schoolId={0} /></Col>
        <Col><AcademicYearDropDown onChange={handleInputChange} schoolId={undefined} branchId={undefined} /></Col>
        <Col><AcademicTermDropDown onChange={handleInputChange} schoolId={undefined} branchId={undefined} yearId={undefined} /></Col>
        <Col><StageDropDown onChange={handleInputChange} branchId={undefined} lesson={undefined} /></Col>
      </Row>
      <div className='mt-4'>
        <Button onClick={openNewAdmission} className='new-admission-btn'>
          <i className="fas fa-plus-circle"></i>
          New Admission
        </Button>
      </div>
      {admissions && admissions.map((admission: AdmissionViewModel) => (
        <AdmissionList params={params} setParams={setParams} onChange={handleInputChange} key={admission.id} admission={admission} schoolId={schoolId} branchId={branchId} />
      ))}
      <NewAdmissionModal schoolId={schoolId}
        branchId={branchId}
        isOpen={NewAdmissionModalOpen}
        setNewAdmissionModalOpen={setNewAdmissionModalOpen}
        onRequestClose={setNewAdmissionModalOpen} />
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
        </DropdownButton>
      </div>
    </div>
  );
};

export default AdmissionCard;
