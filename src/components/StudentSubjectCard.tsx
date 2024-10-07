import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import AcademicYearDropDown from './AcademicYearDropDown'
import AcademicTermDropDown from './AcademicTermDropDown';

type AnyType = {
  [key: string]: string;
};
const StudentSubjectCard = (props: any) => {
  const [params, setParams] = useState({
    academic_year_id: 0,
    school_id: 0,
    branch_id: 0,
    academic_term_id: 0
  });
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));

  };
    const { schoolId, branchId, tabIndex } = props;
  return (
    <>
        <Row>
            <Col>
                <AcademicYearDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />
            </Col>
            <Col>
                <AcademicTermDropDown schoolId={schoolId} branchId={branchId} yearId={params.academic_year_id} onChange={handleInputChange} />
            </Col>
        </Row>
    </>
  )
}

export default StudentSubjectCard