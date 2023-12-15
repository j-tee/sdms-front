import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import UserSession from '../utility/userSession';
import { useAuth } from '../utility/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getSchools } from '../redux/slices/schoolSlice';
import { SchoolParams } from '../models/school';
import { Card, Container } from 'react-bootstrap';
import SchoolCard from './SchoolCard';
import SchoolDropdowns from './SchoolDropdowns';
import LocationDropDown from './LocationDropDown';
import Header from './Header';

const School = () => {
  const { setShowToast } = useContext(ToastContext);
  const { schools, isLoading } = useSelector((state: RootState) => state.school)
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const { openLoginModal, closeLoginModal } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  // const [schoolData, setSchoolData] = useState<School>({
  //   level_id: 0,
  //   category_id: 0,
  //   religious_affiliation_id: 0,
  //   ownership_category_id: 0,
  //   school_name: '',
  //   crest_image: null,
  //   background_picture_image: null,
  // });
  const [params, setParams] = useState<SchoolParams>({
    school_id: 0,
    level_id: 0,
    category_id: 0,
    ownership_category_id: 0,
    religious_affiliation_id: 0,
    region_id: 0,
    district_id: 0,
    circuit_id: 0,
    user_id: 0,
    parent_id: 0,
    student_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
    }
  })
  const tags = ['Calendar', 'Admissions', 'Students', 'Staff', 'Organisation/Structures', 'Academics']
  const getAllSchools = useCallback(() => {
    dispatch(getSchools(params));
  }, [dispatch, params]);

  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));

  };
  useEffect(() => {
    dispatch(getSchools({ ...params, school_id: 0 }));
  }, [dispatch, params])

  return (
    <>
      <Header />
      <Container style={{ marginTop: '3rem' }}>
        &nbsp;
      </Container>
      <Card className='border-0 shadow-sm d-flex flex-md-column'>
        <Card.Header>
          <span className='text-muted fs-1'>Schools</span>
        </Card.Header>
        <Card.Body>
          <SchoolDropdowns onChange={handleInputChange} />
          {/* <LocationDropDown onLocationChange={handleInputChange} /> */}
        </Card.Body>

        {schools.map((school, index) => {
          // Manually add tags to each school object
          const schoolWithTags = { ...school, tags };

          return (
            <SchoolCard school={schoolWithTags} />
          );
        })}
      </Card>
    </>


  )
}

export default School
