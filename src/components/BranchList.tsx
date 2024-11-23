import React, { useEffect, useState } from 'react'
import { Card, Container, Dropdown, DropdownButton } from 'react-bootstrap'
import SchoolDropdowns from './SchoolDropdowns'
import { AppDispatch, RootState } from '../redux/store';
import { BranchParams } from '../models/branch';
import BranchCard from './BranchCard';
import { useDispatch, useSelector } from 'react-redux';
import LocationDropDown from './LocationDropDown';
import { getBranches } from '../redux/slices/schoolSlice';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import PaginationComponent from './PaginationComponent';

const BranchList = () => {
  const { branches, pagination } = useSelector((state: RootState) => state.school)
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
  const tags = ['Calendar', 'Enrolments', 'Staff', 'Organisation/Structures', 'Academics', 'Finance']
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
      },
    }));
  };

  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      school_id: school && school.id
    }));  
  }, [school])

  useEffect(() => {
    if (school) {
      if (params.school_id > 0) {
        dispatch(getBranches(params));
      }
    }
  }, [dispatch, params, school])
  return (
    <>
      <Header />
      <Container style={{ marginTop: '3rem' }}>
        &nbsp;
      </Container>
      <Card className='border-0 shadow-sm d-flex flex-md-column'>
        <Card.Header>
          <span className='text-muted fs-1'></span>
        </Card.Header>
        <Card.Body>
          <span className='d-flex flex-column align-items-center'>
            <Card.Title className='fs-1 text-muted'>{school && school.school_name}</Card.Title>
            <Card.Img variant="bottom" src={school && school.crest_image_url} alt={school && school.school_name} style={{ height: '10%', width: '10%' }} />
            <span className='fs-3 text-muted'>List of Branches</span>
          </span>
          <LocationDropDown onLocationChange={handleInputChange} />
        </Card.Body>

        {branches.map((branch) => {
          const branchWithTags = { ...branch, tags };
          return (
            <BranchCard params={params} branch={branchWithTags} />
          )
        })}
       <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={params}
              activePage={pagination?.current_page}
              itemsCountPerPage={pagination?.per_page}
              totalItemsCount={pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={pagination?.total_pages}
              hideDisabled={pagination?.total_pages === 0}
              hideNavigation={pagination?.total_pages === 1}
              onChange={handlePageChange}
            />
            <DropdownButton
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </DropdownButton>
          </div>
      </Card>
    </>
  )
}

export default BranchList
