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
      <h1>Exit Profiles</h1>
      <Row>
        <Col>
          <AcademicYearDropDown
            schoolId={schoolId}
            branchId={branchId}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <AcademicTermDropDown
            schoolId={schoolId}
            branchId={branchId}
            yearId={params.academic_term_id}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <ClassGroupDropDown
            programId={0}
            stageId={0}
            departmentId={0}
            lesson={undefined}
            onChange={handleInputChange}
          />
        </Col>
      </Row>

      {registrations &&
        registrations.map((reg: any) => (
          <ExitProfileCard
            tabIndex={tabIndex}
            params={params}
            key={reg.id}
            student={reg}
          />
        ))}
    </>
  );
};

export default ExitProfiles;
