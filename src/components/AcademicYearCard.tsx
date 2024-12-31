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
    term_category: '',
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
      {(roles && privileged_school_roles.some(role => roles.includes(role))) && <Card.Header className='fs-3 text-muted mb-4'>Add New Academic Year</Card.Header>}
      {(roles && privileged_school_roles.some(role => roles.includes(role))) && <Card.Text>
        {branchId && parseInt(branchId) > 0 ?
          <Form>
            <Row>
              <Col>
                <Form.Group controlId='startDate'>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type='date' value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='endDate'>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type='date' value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='endDate'>
                  <Form.Label>Term Category</Form.Label>
                  <Form.Control as='select' type='text' value={formData.term_category}
                    onChange={(e) => setFormData({ ...formData, term_category: e.target.value })}>
                    <option value=''>---Select---</option>
                    <option value='semester'>Semester</option>
                    <option value='term'>Term</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='mt-2'>
                <Button onClick={AddNewAcademicYear} variant="primary">Add New Academic Year</Button>
              </Col>
            </Row>
          </Form> : "Go to branches to add a new academic year"}

      </Card.Text>}
      <Card.Header>
        <span className="text-muted fs-3">Academic Years</span>
      </Card.Header>
      {academic_years.length && academic_years.map((year: AcademicYearViewModel) => (
        <AcademicYearList schoolId={schoolId} branchId={branchId} academicYear={year} />
      ))}
      <div className="d-flex justify-content-between align-items-center">
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
        <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${params.pagination?.per_page}`}>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default AcademicYearCard
