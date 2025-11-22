import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import AcademicYearList from './AcademicYearList'
import { AcademicYear, AcademicYearViewModel, YearParams } from '../models/calendar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { addAcademicYear, getAcademicYears } from '../redux/slices/calendarSlice'
import PaginationComponent from './PaginationComponent'
import UserSession from '../utility/userSession'
import { showToastify } from '../utility/Toastify'
import { ToastContext } from '../utility/ToastContext'

const AcademicYearCard = (props: any) => {
  const { branchId, schoolId, tabKey } = props;
  const {showToast,  setShowToast } = useContext(ToastContext)
  const { academic_years, pagination } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const [params, setParams] = useState<YearParams>({
    school_id: 0,
    branch_id: 0,
    paginate: true,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0
    }
  })
  const [formData, setFormData] = useState<AcademicYear>({
    branch_id: 0,
    start_date: '',
    end_date: '',
    // next_term_start_date: '',
  })
  const AddNewAcademicYear = () => {
    setShowToast(true)
    dispatch(addAcademicYear({ ...formData, branch_id: branchId && parseInt(branchId) })).then((res) => {
     
      showToastify(res.payload.message, res.payload.status)
      dispatch(getAcademicYears({ ...params, paginate: true, school_id: schoolId, branch_id: branchId }));
    }
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
      },
    }));
  };

  useEffect(() => {
    if (tabKey === 'ay') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      dispatch(getAcademicYears({ ...params, paginate: true, school_id: schoolId, branch_id: branchId }));
    }

  }, [schoolId, branchId, params]);

  return (
    <div>
      {(roles && privileged_school_roles.some(role => roles.includes(role))) && (
        <div className="academic-year-add-section">
          <div className="section-header-modern">
            <div className="section-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h3 className="section-title">Add New Academic Year</h3>
          </div>
          {branchId && parseInt(branchId) > 0 ? (
            <Form className="modern-form">
              <Row>
                <Col md={6}>
                  <Form.Group controlId='startDate' className="modern-form-group">
                    <Form.Label className="modern-form-label">
                      <i className="fas fa-calendar-day me-2"></i>
                      Start Date
                    </Form.Label>
                    <div style={{ position: 'relative', isolation: 'isolate', transform: 'translateZ(0)' }}>
                      <Form.Control 
                        type='date' 
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        className="modern-form-control" 
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='endDate' className="modern-form-group">
                    <Form.Label className="modern-form-label">
                      <i className="fas fa-calendar-check me-2"></i>
                      End Date
                    </Form.Label>
                    <div style={{ position: 'relative', isolation: 'isolate', transform: 'translateZ(0)' }}>
                      <Form.Control 
                        type='date' 
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        className="modern-form-control" 
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='mt-4'>
                  <Button onClick={AddNewAcademicYear} className="btn-add-academic-year">
                    <i className="fas fa-calendar-plus me-2"></i>
                    Add New Academic Year
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <div className="info-message-modern">
              <i className="fas fa-info-circle me-2"></i>
              Go to branches to add a new academic year
            </div>
          )}
        </div>
      )}
      <div className="section-header-modern mt-5">
        <div className="section-icon">
          <i className="fas fa-list"></i>
        </div>
        <h3 className="section-title">Academic Years</h3>
      </div>
      <div className="academic-years-list-container">
        {academic_years.length && academic_years.map((year: AcademicYearViewModel) => (
          <AcademicYearList key={year.id} schoolId={schoolId} branchId={branchId} academicYear={year} />
        ))}
      </div>
      <div className="pagination-controls-modern">
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
        <DropdownButton className="items-per-page-dropdown" id="dropdown-items-per-page" title={`Items per page: ${params.pagination?.per_page}`}>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default AcademicYearCard
