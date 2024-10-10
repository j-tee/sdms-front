import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getClassSubjectList } from '../redux/slices/subjectSlice';

const StudentSubjectCard = (props: any) => {
  const {subject_list} = useSelector((state:RootState) => state.subject)
  const { class_group, params, tabIndex } = props;
  const dispatch = useDispatch<AppDispatch>();  

  useEffect(() => {
    if(params.academic_year_id && params.academic_term_id && class_group && tabIndex === 'first') {
      dispatch(getClassSubjectList({ ...params, class_group_id: class_group.id }));
    }
  }, [class_group, dispatch, params, tabIndex])
   
  return (
    <>        
        <Row>
          <Col>
            <h3>{params.class_group && params.class_group.class_grp_name}</h3>
          </Col>
        </Row>
        <h3>Subjects</h3>
        <Row>
          {subject_list && subject_list.map((subject) => (
            <Col key={subject} md={3}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{subject}</h5>
                  
                </div>
              </div>
            </Col>
          ))}
        </Row>
    </>
  )
}

export default StudentSubjectCard