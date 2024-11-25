import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import UserSession from '../utility/userSession';
import { useAuth } from '../utility/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getSchools } from '../redux/slices/schoolSlice';
import { SchoolParams } from '../models/school';
import { Card, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import SchoolCard from './SchoolCard';
import SchoolDropdowns from './SchoolDropdowns';
import LocationDropDown from './LocationDropDown';
import Header from './Header';
import PaginationComponent from './PaginationComponent';

const School = () => {
  const { setShowToast } = useContext(ToastContext);
  const { schools,pagination, isLoading } = useSelector((state: RootState) => state.school)
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const { openLoginModal, closeLoginModal } = useAuth();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
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
    paginate: true,
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
    dispatch(getSchools({ ...params, paginate: true, school_id: 0 }));
  }, [dispatch, params])

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
            <SchoolCard params={params} school={schoolWithTags} />
          );
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

export default School
