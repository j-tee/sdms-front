import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';
import { getStudentTerminalReport } from '../redux/slices/scoreSheetSlice';
import { Button, Table } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const ReportCard = (props: any) => {
  const { params } = props;
  const { valid, subscription } = useSelector((state: RootState) => state.subscription)
  const { student_reports } = useSelector((state: RootState) => state.scoreSheet)
  const dispatch = useDispatch<AppDispatch>();
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  function RenderPosition({ position }: { position: string }) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: position,
        }}
      ></span>
    );
  }
 
  useEffect(() => {
    dispatch(getStudentTerminalReport({ ...params }));
  }, [dispatch, params]);


  return (
    <>
      {(subscription && subscription.valid_subscription) ? (<>{student_reports && student_reports.map((report: any) => (
        <div className="report-container" ref={componentRef}>
          <div className='mt-4 border-4 border-primary' key={report.student_id}>
            <div className="row justify-content-center align-items-start">
              {/* School Crest */}
              <div className="col-auto text-center">
                <img
                  src={report.branch.crest_url}
                  alt="School Crest"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>

              {/* School Details */}
              <div className="col-md-6 text-center">
                <div className="d-flex flex-column align-items-center">
                  <span className="fs-2 fw-bold">{report.branch.school_name}</span>
                  <span className="fs-6">{report.branch.branch_name}</span>
                  <span className="fs-6">{report.branch.email_address}</span>
                  <span className="fs-6">{report.branch.website}</span>
                  <span className="fs-6">{report.branch.phone1}</span>
                  <span className="fs-6">{report.branch.phone2}</span>
                </div>
              </div>

              {/* Student Picture */}
              <div className="col-auto text-center">
                <img
                  src={report.student.image_url}
                  alt="Student"
                  style={{ width: '100px', height: '100px' }}
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
              </span>
              <span className="flex-grow-1 text-center"></span>

              <span>
                <h6>{report.student.student_id}</h6>
                <h6>{report.student.first_name} {report.student.last_name}</h6>
                <h6><RenderPosition position={report.over_all_position} /></h6>
                <h6>{report.term.term_name}</h6>
                <h6>{report.class_name}</h6>
                <h6>{new Date(report.term.end_date).toDateString()}</h6>
              </span>
            </div>
            <Table size='sm' striped borderless hover>
              <thead>
                <tr style={{ borderBottom: '3px solid black' }}>
                  <th>Subject</th>
                  <th>CA Score</th>
                  <th>TA Score</th>
                  <th>Total</th>
                  <th>Position</th>
                  <th>Grade</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {report.reports.map((report: any) => (
                  <tr key={report.id}>
                    <td>{report.subject_name}</td>
                    <td>{parseFloat(report.ca_score.toString()).toFixed(2)}</td>
                    <td>{parseFloat(report.ta_score.toString()).toFixed(2)}</td>
                    <td>{parseFloat(report.total.toString()).toFixed(2)}</td>
                    <td><RenderPosition position={report.position_in_subject} /></td>
                    <td>{report.grade}</td>
                    <td>{report.remark}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '3px solid black',borderBottom: '3px solid black'}}>
                  <td className='fs-5' colSpan={3}>Total</td>
                  <td className='fs-5'>{parseFloat(report.over_all_total.toString()).toFixed(2)}</td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </Table>
          </div>    
          <Button className="no-print" onClick={() => handlePrint()}>Print out terminal reports!</Button>      
        </div>

      ))}</>) : (<div><h4>Select Your Wards to view terminal reports</h4></div>)}

    </>
  )
}

export default ReportCard