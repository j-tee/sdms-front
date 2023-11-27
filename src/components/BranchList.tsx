import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import SchoolDropdowns from './SchoolDropdowns'
import { AppDispatch, RootState } from '../redux/store';
import { BranchParams } from '../models/branch';
import BranchCard from './BranchCard';
import { useDispatch, useSelector } from 'react-redux';
import LocationDropDown from './LocationDropDown';
import { getBranches } from '../redux/slices/schoolSlice';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const BranchList = () => {
  const { branches } = useSelector((state: RootState) => state.school)
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  // const { school } = location.state;
  const school = location.state ? location.state.school : null;
  const [params, setParams] = useState<BranchParams>({
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
  const tags = ['Calendar', 'Enrolments', 'Staff', 'Dept/Programs', 'Lessons & Coursework']
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  useEffect(() => {
    // console.log('===========school.id', school.id, )
    dispatch(getBranches({ ...params, school_id: school && school.id }))
  }, [dispatch, params, school])
  return (
    <>
      <Header />
      <Container style={{ marginTop: '3rem' }}>
        &nbsp;
      </Container>
      <Card className='border-0 shadow-sm d-flex flex-md-column mt-2'>
        <Card.Body>
          <span className='d-flex flex-column align-items-center'>
            <Card.Title className='fs-1 text-muted'>{school && school.school_name}</Card.Title>
            <Card.Img variant="bottom" src={school && school.crest_image_url} alt={school && school.school_name} style={{ height: '10%', width: '10%' }} />
            <span className='fs-3 text-muted'>List of Branches</span>
          </span>
          <LocationDropDown onLocationChange={handleInputChange} />
        </Card.Body>
      </Card>
      {branches.map((branch) => {
        const branchWithTags = { ...branch, tags };
        return (
          <BranchCard branch={branchWithTags} />
        )
      })}

    </>
  )
}

export default BranchList
