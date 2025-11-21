import React, { useEffect, useState } from 'react'
import { Card, Container, Dropdown, DropdownButton } from 'react-bootstrap'
import { AppDispatch, RootState } from '../redux/store';
import { BranchParams } from '../models/branch';
import BranchCard from './BranchCard';
import { useDispatch, useSelector } from 'react-redux';
import LocationDropDown from './LocationDropDown';
import { getBranches } from '../redux/slices/schoolSlice';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import PaginationComponent from './PaginationComponent';
import './BranchList.css';

const BranchList = () => {
  const { branches, pagination } = useSelector((state: RootState) => state.school)
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
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
  });

  const tags = ['Calendar', 'Enrolments', 'Staff', 'Organisation/Structures', 'Academics', 'Finance'];

  const handleInputChange = (field: string | number, value: string) => {
    if (typeof field === 'string' && field in params) {
      setParams((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handlePageChange = (page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
      },
    }));
  };

  useEffect(() => {
    if (school) {
      setParams((prevParams) => ({
        ...prevParams,
        school_id: school.id,
      }));
    }
  }, [school]);

  useEffect(() => {
    if (school && params.school_id > 0 && params.pagination.current_page && params.pagination.per_page) {
      // Check that school_id, current_page, and per_page are valid
      dispatch(getBranches(params));
    }
  }, [dispatch, params, school]);

  return (
    <>
      <Header />
      <div className="branch-list-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section text-center">
            <div className="hero-content-wrapper">
              {school && school.crest_image_url && (
                <div className="school-crest-wrapper">
                  <img src={school.crest_image_url} alt={school.school_name} className="school-crest-image" />
                </div>
              )}
              <div className="hero-icon">
                <i className="fas fa-building"></i>
              </div>
              <h1 className="page-title-modern">{school ? school.school_name : 'School Branches'}</h1>
              <p className="page-subtitle-modern">Explore all campus locations and facilities</p>
            </div>
          </div>

          <Card className="filter-card-modern">
            <Card.Body>
              <div className="filter-header">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Filter by Location</h5>
              </div>
              <LocationDropDown onLocationChange={handleInputChange} />
            </Card.Body>
          </Card>

          <div className="branches-grid-modern">
            {branches.map((branch) => {
              const branchWithTags = { ...branch, tags };
              return (
                <BranchCard key={branch.id} params={params} branch={branchWithTags} />
              )
            })}
          </div>

          {branches.length > 0 && (
            <Card className="pagination-card-modern">
              <Card.Body>
                <div className="pagination-wrapper-modern">
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
                  <div className="items-per-page-modern">
                    <DropdownButton
                      id="dropdown-items-per-page"
                      title={`${params.pagination?.per_page} per page`}
                      variant="outline-primary"
                    >
                      <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5 per page</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10 per page</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20 per page</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>
    </>
  );
};

export default BranchList;
