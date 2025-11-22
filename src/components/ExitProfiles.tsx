import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getExitProfiles } from "../redux/slices/exitProfileSlice";
import { getRegisteredStudents } from "../redux/slices/studentRegSlice";
import ExitProfileCard from "./ExitProfileCard";
import { Col, Row } from "react-bootstrap";
import AcademicYearDropDown from "./AcademicYearDropDown";
import AcademicTermDropDown from "./AcademicTermDropDown";
import ClassGroupDropDown from "./ClassGroupDropDown";
import '../css/ExitProfiles.css';

type AnyType = {
  [key: string]: string;
};

const ExitProfiles = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { exitProfiles, exitProfile } = useSelector(
    (state: RootState) => state.exitProfile
  );
  const { registrations } = useSelector((state: RootState) => state.studentReg);
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState({
    branch_id: branchId,
    school_id: schoolId,
    academic_term_id: 0,
    academic_year_id: 0,
    class_group_id: 0,
    paginate: false,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0,
    },
  });
  const handleInputChange = <T extends AnyType>(
    field: keyof T,
    value: string
  ) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (tabIndex === "third") {
      dispatch(getRegisteredStudents({ ...params }));
    }
  }, [dispatch, schoolId, branchId, tabIndex, params]);
  return (
    <>
      <div className='exit-profiles-header'>
        <h1 className='exit-profiles-title'>
          <i className="fas fa-sign-out-alt"></i> Exit Profiles
        </h1>
      </div>
      
      <div className='exit-profiles-filters'>
        <div className="filter-section-title">
          <i className="fas fa-sliders-h"></i>
          Filter Exit Profiles
        </div>
        <Row className='exit-profiles-filter-row'>
          <Col md={4}>
            <AcademicYearDropDown
              schoolId={schoolId}
              branchId={branchId}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <AcademicTermDropDown
              schoolId={schoolId}
              branchId={branchId}
              yearId={params.academic_term_id}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4}>
            <ClassGroupDropDown
              programId={0}
              stageId={0}
              departmentId={0}
              lesson={undefined}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
      </div>

      {registrations && registrations.length > 0 ? (
        registrations.map((reg: any) => (
          <ExitProfileCard
            tabIndex={tabIndex}
            params={params}
            key={reg.id}
            student={reg}
          />
        ))
      ) : (
        <div className='exit-profiles-empty-state'>
          <div className='exit-profiles-empty-icon'>
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className='exit-profiles-empty-title'>No Students Found</div>
          <div className='exit-profiles-empty-text'>
            Select filters above to view students and add exit profiles
          </div>
        </div>
      )}
    </>
  );
};

export default ExitProfiles;
