import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import AcademicYearList from './AcademicYearList'
import { AcademicYear, AcademicYearViewModel, YearParams } from '../models/calendar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { addAcademicYear, getAcademicYears } from '../redux/slices/calendarSlice'
import PaginationComponent from './PaginationComponent'

const AcademicYearCard = (props: any) => {
  const { branchId, schoolId } = props;
  const { academic_years } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [params, setParams] = useState<YearParams>({
    school_id: 0,
    branch_id: 0,
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
    dispatch(addAcademicYear({ ...formData, branch_id: branchId && parseInt(branchId) })).then((res) => {
      dispatch(getAcademicYears({ ...params, school_id: schoolId, branch_id: branchId }));
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
    setParams((prevParams) => ({
      ...prevParams,
      school_id: typeof schoolId === 'number' ? schoolId : prevParams.school_id,
    }));
    dispatch(getAcademicYears({ ...params, school_id: schoolId, branch_id: branchId }));
  }, [schoolId, branchId]);

  return (
    <div>
      <Card.Header className='fs-3 text-muted mb-4'>Add New Academic Year</Card.Header>
      <Card.Text>
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

      </Card.Text>
      <Card.Header>
        <span className="text-muted fs-3">Academic Years</span>
      </Card.Header>
      {academic_years.length && academic_years.map((year: AcademicYearViewModel) => (
        <AcademicYearList schoolId={schoolId} branchId={branchId} academicYear={year} />
      ))}
      <div className="d-flex justify-content-between align-items-center">
        <PaginationComponent
          params={params}
          activePage={params.pagination?.current_page}
          itemsCountPerPage={params.pagination?.per_page}
          totalItemsCount={params.pagination?.total_items || 0}
          pageRangeDisplayed={5}
          totalPages={params.pagination?.total_pages}
          hideDisabled={params.pagination?.total_pages === 0}
          hideNavigation={params.pagination?.total_pages === 1}
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
