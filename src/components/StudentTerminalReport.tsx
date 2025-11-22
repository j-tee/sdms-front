import React, { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getTerminalReport } from "../redux/slices/scoreSheetSlice";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import AcademicYearDropDown from "./AcademicYearDropDown";
import ClassGroupDropDown from "./ClassGroupDropDown";
import AcademicTermDropDown from "./AcademicTermDropDown";

type AnyType = {
  [key: string]: string;
};

const StudentTerminalReport = (props: any) => {
  const { schoolId, branchId, student, class_group, index } = props;
  const { student_reports } = useSelector(
    (state: RootState) => state.scoreSheet
  );
  const { academic_term } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch<AppDispatch>();

  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });
  const [params, setParams] = useState({
    program_id: 0,
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
    class_group_id: 0,
    subject_id: 0,
    academic_term_id: academic_term.id,
    student_id: student ? student.id : 0,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0,
    },
  });

  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      branch_id: branchId ? branchId : class_group ? class_group.branch_id : 0,
      school_id: schoolId,
      academic_term_id: academic_term.id,
      student_id: student ? student.id : 0,
    }));
  }, [branchId, schoolId, academic_term.id, student, class_group]);

  useEffect(() => {
    if (index === "tr") {
      dispatch(getTerminalReport({ ...params }));
    }
  }, [params, dispatch, index]);

  const handleInputChange = <T extends AnyType>(
    field: keyof T,
    value: string
  ) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  function RenderPosition({ position }: { position: string }) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: position,
        }}
      ></span>
    );
  }

  return (
    <div className="academic-section-content">
      {/* Filter Section */}
      {!student && (
        <div className="filter-card-modern mb-4">
          <div className="filter-header">
            <div className="filter-icon-wrapper">
              <i className="fas fa-filter"></i>
            </div>
            <h5>Filter Terminal Reports</h5>
          </div>
          <div className="card-body">
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
                onChange={handleInputChange}
                yearId={undefined}
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
          </div>
        </div>
      )}

      {/* Terminal Report */}
      <div className="terminal-report-wrapper">
        <div className="report-container" ref={componentRef}>
        {student_reports.map((report: any) => (
          <div className="mt-6 pt-6 border-4 border-primary page-break" key={report.student_id}>
            <div className="row justify-content-center align-items-start">
              {/* School Crest */}
              <div className="col-auto text-center pt-5">
                <img
                  src={report.branch.crest_url}
                  alt="School Crest"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              {/* School Details */}
              <div className="col-auto text-center">
                <div className="d-flex flex-column align-items-center">
                  <span className="fs-1 fw-bold">
                    {report.branch?.school_name || ''}
                  </span>
                  <span className="fs-6">{report.branch?.branch_name || ''}</span>
                  <span className="fs-6">{report.branch?.email_address || ''}</span>
                  <span className="fs-6">{report.branch?.website || ''}</span>
                  <span className="fs-6">{report.branch?.phone1 || ''}</span>
                  <span className="fs-6">{report.branch?.phone2 || ''}</span>
                </div>
              </div>

              {/* Student Picture */}
              <div className="col-auto text-center pt-5">
                <img
                  src={report.student?.image_url || ''}
                  alt="Student"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
            <div className="d-flex ms-5 me-5 mt-4 justify-content-between align-items-center">
              <span>
                <h6>ID Number</h6>
                <h6>Name</h6>
                <h6>Position In Class</h6>
                <h6>Term</h6>
                <h6>Class</h6>
                <h6>Vacation</h6>
                <h6>Re-opening Date</h6>
              </span>
              <span className="flex-grow-1 text-center"></span>

              <span>
                <h6>{report.student?.student_id || ''}</h6>
                <h6>
                  {report.student?.first_name || ''} {report.student?.last_name || ''}
                </h6>
                <h6>
                  <RenderPosition position={report.over_all_position || ''} />
                </h6>
                <h6>{report.term?.term_name || ''}</h6>
                <h6>{report.class_group?.class_grp_name || ''}</h6>
                <h6>{report.term?.end_date ? new Date(report.term.end_date).toDateString() : ''}</h6>
                <h6>
                  {report.term?.next_term_start_date ? new Date(report.term.next_term_start_date).toDateString() : ''}
                </h6>
              </span>
            </div>
            <Table size="sm" striped borderless hover>
              <thead>
                <tr style={{ borderBottom: "3px solid black" }}>
                  <th>Subject</th>
                  <th>CA Score</th>
                  <th>TA Score</th>
                  <th>Total</th>
                  <th>Position</th>
                  <th>Grade</th>
                  <th>Remark</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {report.reports?.map((report: any) => (
                  <tr key={report.id}>
                    <td>{report.subject_name || ''}</td>
                    <td>{report.ca_score ? parseFloat(report.ca_score.toString()).toFixed(2) : '0.00'}</td>
                    <td>{report.ta_score ? parseFloat(report.ta_score.toString()).toFixed(2) : '0.00'}</td>
                    <td>{report.total ? parseFloat(report.total.toString()).toFixed(2) : '0.00'}</td>
                    <td>
                      <RenderPosition position={report.position_in_subject || ''} />
                    </td>
                    <td>{report.grade || ''}</td>
                    <td>{report.remark || ''}</td>
                    <td>{report.attendance?.present_lessons || 0}/{report.attendance?.total_lessons || 0}</td>
                  </tr>
                )) || []}
                <tr
                  style={{
                    borderTop: "3px solid black",
                    borderBottom: "3px solid black",
                  }}
                >
                  <td className="fs-5" colSpan={3}>
                    Total
                  </td>
                  <td className="fs-5">
                    {report.over_all_total ? parseFloat(report.over_all_total.toString()).toFixed(2) : '0.00'}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
        </div>
        
        {student_reports && student_reports.length > 0 && (
          <div className="text-center mt-4 no-print">
            <Button className="btn-add-academic-item" onClick={() => handlePrint()}>
              <i className="fas fa-print me-2"></i>
              Print Terminal Reports
            </Button>
          </div>
        )}
        
        {(!student_reports || student_reports.length === 0) && (
          <div className="empty-state-full">
            <i className="fas fa-file-invoice fa-3x mb-3"></i>
            <p>No terminal reports found</p>
            <small>Select academic year, term, and class group to view reports</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTerminalReport;
