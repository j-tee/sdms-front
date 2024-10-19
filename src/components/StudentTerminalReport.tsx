import React, { useEffect, useRef, useState } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTerminalReport } from '../redux/slices/scoreSheetSlice';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import AcademicYearDropDown from './AcademicYearDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';

type AnyType = {
  [key: string]: string;
};

const StudentTerminalReport = (props: any) => {
  const { schoolId, branchId, student,class_group, index } = props;
  const { student_reports } = useSelector((state: RootState) => state.scoreSheet);
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
    if (index === 'tr') {
      dispatch(getTerminalReport({ ...params }));
    }
  }, [params, dispatch, index]);

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // console.log('params===>', params);
  } 
  return (
    <>
    {!student && 
    <Row className="mb-3">
      <Col><AcademicYearDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange}/></Col>
      <Col><AcademicTermDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} yearId={undefined}/></Col>
      <Col><ClassGroupDropDown programId={0} stageId={0} departmentId={0} lesson={undefined} onChange={handleInputChange}/></Col>
    </Row>}
      <div className="report-container" ref={componentRef}>
        {student_reports.map((report: any) => (
          
          <div className="page-break">
            <Card className="report-card" key={report.student_id}>
            <Card.Header className="card-header">
              <Card.Img
                src={report.branch.crest_url}
                variant="top"
                style={{ width: '100px', height: '100px' }}
                alt="Crest"
              />
              <Card.Title className="fs-2 text-muted">{report.branch.school_name}</Card.Title>
              <Card.Subtitle className="mt-2 text-muted">
                <h6>Terminal Report</h6>
                <ul className="list-style">
                  <li>{report.branch.email_address}</li>
                  <li>{report.branch.phone1}</li>
                  <li>{report.branch.phone2}</li>
                  <li>{report.branch.website}</li>
                </ul>
              </Card.Subtitle>
            </Card.Header>

            <Card.Body>
              <div className="flex-container">
                <div className="column first-column">
                  <Card.Subtitle className="mb-2 text-muted column">
                    <div>
                      <span>ID Number:</span> <span>{report.student.student_id}</span>
                    </div>
                    <div>
                      <span>Name:</span> <span>{report.student.first_name} {report.student.last_name}</span>
                    </div>
                    <div>
                      <span>Position In Class:</span> <span>{report.over_all_position}</span>
                    </div>
                    <div>
                      <span>Number on Roll:</span> <span>{report.num_roll}</span>
                    </div>
                    <div>
                      <span>Class:</span> <span>{report.class_name}</span>
                    </div>
                  </Card.Subtitle>
                </div>

                <div className="column third-column">
                  <div>
                    <span>Academic Year:</span> <span>{report.term.academic_year_name}</span>
                  </div>
                  <div>
                    <span>Term:</span> <span>{report.term.term_name}</span>
                  </div>
                  <div>
                    <span>Start Date:</span> <span>{report.term.start_date}</span>
                  </div>
                  <div>
                    <span>End Date:</span> <span>{report.term.end_date}</span>
                  </div>
                </div>
              </div>

              <Table
                size="sm"
                striped
                borderless
                hover
                responsive="sm"
                className="report-table"
              >
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>CA Score</th>
                    <th>TA Score</th>
                    <th>Total</th>
                    <th>Grade</th>
                    <th>Attendance</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {report.reports.map((subjectReport: any) => (
                    <tr key={subjectReport.id}>
                      <td>{subjectReport.subject_name}</td>
                      <td>{subjectReport.ca_score.toFixed(2)}</td>
                      <td>{subjectReport.ta_score.toFixed(2)}</td>
                      <td>{subjectReport.total.toFixed(2)}</td>
                      <td>{subjectReport.grade}</td>
                      <td>{subjectReport.attendance.present_lessons}/{subjectReport.attendance.total_lessons}</td>
                      <td>{subjectReport.remark}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3}>Total</td>
                    <td>{report.over_all_total.toFixed(2)}</td>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>

            <Card.Footer>
              <Card.Link href="#">View Details</Card.Link>
              <Card.Link href="#">Download PDF</Card.Link>
            </Card.Footer>
          </Card>
          </div>
          
        ))}
        
      </div>
      <Button onClick={() => handlePrint()}>Print out terminal reports!</Button>
    </>
  );
};

export default StudentTerminalReport;
