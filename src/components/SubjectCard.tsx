import React, { useEffect, useState } from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap';
import AddSubject from './AddSubject';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SubjectParams } from '../models/subject';
import { getSubjects } from '../redux/slices/subjectSlice';
import SubjectDetails from './SubjectDetails';
import CourseOption from './CourseOption';

const SubjectCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const [tabKey, setTabKey] = useState<string>('subject');
  const dispatch = useDispatch<AppDispatch>();
  const { subjects } = useSelector((state: RootState) => state.subject);
  const [params, setParams] = useState<SubjectParams>({
    school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10 }, paginate: true
  } as SubjectParams);
  useEffect(() => {
    console.log('tabIndex', tabIndex);
    if (tabIndex === 'first') {
      dispatch(getSubjects({ ...params, school_id: schoolId, branch_id: branchId }))
    }
  }, [branchId, dispatch, params, schoolId, tabIndex]);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={tabKey}
      onSelect={(k) => k && setTabKey(k)}
      className="mb-3"
    >
      <Tab eventKey="subject" title="Subjects">
        <AddSubject params={params} schoolId={schoolId} branchId={branchId} />
        <Card.Header>
          <Card.Title className='fs-4 text-muted'>Subject List</Card.Title>
        </Card.Header>
        {subjects && subjects.map((subject, index) => (
          <SubjectDetails key={index} subject={subject} />
        ))}
      </Tab>
      <Tab eventKey="course-options" title="Course Options">
        <CourseOption tabKey={tabKey} params={params} schoolId={schoolId} branchId={branchId} />  
      </Tab>
      <Tab eventKey="registration" title="Course Registration">
        <h3>Course Registrations</h3>
      </Tab>
    </Tabs>
  )
}

export default SubjectCard
