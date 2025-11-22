import React, { useContext, useEffect, useState, useCallback } from "react";
import { ToastContext } from "../utility/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getCategories,
  getLevels,
  getOwnershipCategories,
  getSchools,
} from "../redux/slices/schoolSlice";
import { SchoolParams } from "../models/school";
import { Card, Container, Dropdown, DropdownButton } from "react-bootstrap";
import SchoolCard from "./SchoolCard";
import SchoolDropdowns from "./SchoolDropdowns";
import Header from "./Header";
import PaginationComponent from "./PaginationComponent";
import { debounce } from "lodash";
import UserSession from "../utility/userSession";
import "./School.css";
import "../css/ModernFilters.css";

type AnyType = {
  [key: string]: string;
};

const School = () => {
  const { setShowToast } = useContext(ToastContext);
  const { schools, pagination, isLoading } = useSelector(
    (state: RootState) => state.school
  );
  const privileged_school_roles = [
    "owner",
    "admin",
    "staff",
    "secretary",
    "principal",
    "vice_principal",
  ];
  const [roles, setRoles] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // Initial parameters
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
    },
  });

  const tags = [
    "Calendar",
    "Admissions",
    "Students",
    "Staff",
    "Organisation/Structures",
    "Academics",
  ];

  // Debounced API call
  const debouncedGetSchools = useCallback(
    debounce((updatedParams) => {
      dispatch(getSchools(updatedParams));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedGetSchools(params);
    const user_roles = UserSession.getroles();
    setRoles(user_roles);
  }, [params, debouncedGetSchools]); // Runs on parameter changes

  // Handle filter/input changes
  const handleInputChange = <T extends AnyType>(
    field: keyof T,
    value: string
  ) => {
    switch (field) {
      case "religious_affiliation_id":
        dispatch(getCategories());
        break;
      case "category_id":
        dispatch(getOwnershipCategories());
        break;

      case "ownership_category_id":
        dispatch(getLevels());
        break;
    }
    setParams((prevParams) => ({
      ...prevParams,
      [field]: value,
    }));
  };

  // Handle pagination changes
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

  return (
    <>
      <Header />
      <div className="schools-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-school"></i>
              </div>
              <h1 className="page-title-modern">
                {!roles.some((role) => privileged_school_roles.includes(role)) ? 
                  "Discover Schools" : 
                  "My Schools"
                }
              </h1>
              <p className="page-subtitle-modern">
                {!roles.some((role) => privileged_school_roles.includes(role)) ?
                  "Find the perfect educational institution for your child" :
                  "Manage your educational institutions"
                }
              </p>
            </div>
          </div>

          {!roles.some((role) => privileged_school_roles.includes(role)) && (
            <Card className="filter-card-modern">
              <Card.Body>
                <div className="filter-header">
                  <div className="filter-icon-wrapper">
                    <i className="fas fa-filter"></i>
                  </div>
                  <h5>Filter Schools</h5>
                </div>
                <SchoolDropdowns onChange={handleInputChange} />
              </Card.Body>
            </Card>
          )}

          <div className="schools-grid-modern">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner-modern"></div>
                <p>Loading schools...</p>
              </div>
            ) : schools.length > 0 ? (
              schools.map((school, index) => {
                const schoolWithTags = { ...school, tags };
                return (
                  <SchoolCard key={index} params={params} school={schoolWithTags} />
                );
              })
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-school"></i>
                </div>
                <h3>No Schools Found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>

          {schools.length > 0 && (
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
                  <DropdownButton
                    className="items-per-page-modern"
                    id="dropdown-items-per-page"
                    title={`${params.pagination?.per_page} per page`}
                    variant="outline-primary"
                  >
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>
                      5 per page
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>
                      10 per page
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>
                      20 per page
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>
    </>
  );
};

export default School;
