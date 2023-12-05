import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import ParentDetails from './ParentDetails';
import StudentDetails from './StudentDetails';
import AdmissionDetails from './AdmissionDetails';

const AdmissionCard = (props:any) => {
    const {schoolId, branchId, tabIndex} = props;
    const [key, setKey] = useState<string>('parent');
  return (
    <Tabs
    id="controlled-tab-example"
    activeKey={key}
    onSelect={(k) => k && setKey(k)}
    className="mb-3"
  >
    <Tab eventKey="parent" title="Parent Details">
      <ParentDetails index={key} schoolId={schoolId} branchId={branchId}/>
    </Tab>
    <Tab eventKey="student" title="Student Information">
      <StudentDetails index={key} schoolId={schoolId} branchId={branchId} />
    </Tab>
    <Tab eventKey="admission" title="Admission Details">
      <AdmissionDetails />
    </Tab>
  </Tabs>
  )
}

export default AdmissionCard
