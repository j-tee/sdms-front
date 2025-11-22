import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { AcademicTerm, AcademicTermViewModel, TermParams } from '../models/calendar';
import { addAcademicTerm, getAcademicTerms, getCurrentAcademicYear } from '../redux/slices/calendarSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import PaginationComponent from './PaginationComponent';
import AcademicTermEdit from './AcademicTermEdit';
import AcademicTermDelete from './AcademicTermDelete';
import CustomDatePicker from './CustomDatePicker';
import AcademicTermDetails from './AcademicTermDetails';
import { QueryParams } from '../models/queryParams';
import UserSession from '../utility/userSession';
import AcademicYearDropDown from './AcademicYearDropDown';


type AnyType = {
  [key: string]: string;
};


const AcademicTermCard = (props: any) => {
  const { academic_terms, pagination, academic_year } = useSelector((state: RootState) => state.calendar)
  const { setShowToast } = useContext(ToastContext)
  const { branchId, tabKey, schoolId } = props;
  const dispatch = useDispatch<AppDispatch>()
  const [yearId, setYearId] = useState(0)
  const [isAcdemicTermDetailsModalOpen, setAcademicTermDetailsModalOpen] = useState(false)
  const [isAcademicTermEditModalOpen, setAcademicTermEditModalOpen] = useState(false)
  const [isAcademicTermDeleteModalOpen, setAcademicTermDeleteModalOpen] = useState(false)
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const [term, setTerm] = useState<AcademicTermViewModel>({
    id: 0,
    term_name: '',
    start_date: '',
    end_date: '',
    completed: false,
    academic_year_id: 0,
    academic_year_name: '',
  })

  const handleEdit = (term: AcademicTermViewModel) => {
    setTerm((prevParams) => ({
      ...prevParams,
      id: term.id,
      term_name: term.term_name ?? '',
      start_date: term.start_date ?? '',
      end_date: term.end_date ?? '',
      completed: term.completed !== undefined ? term.completed : false,
      academic_year_id: term.academic_year_id || 0,
      academic_year_name: term.academic_year_name ?? '',
       next_term_start_date: term.next_term_start_date ?? '',
    }))
    setAcademicTermEditModalOpen(true)
  }
  const [params, setParams] = useState<QueryParams>({
    academic_year_id: 0,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })

  const [formData, setFormData] = useState<AcademicTerm>({
    term_name: '',
    start_date: '',
    end_date: '',
    completed: false,
    academic_year_id: 0,
  })

  useEffect(() => {
   if(tabKey === 'at'){
    const user_roles = UserSession.getroles()
    setRoles(user_roles)
    dispatch(getCurrentAcademicYear(branchId))
    if (academic_year.id) {
      dispatch(getAcademicTerms({ ...params, academic_year_id: academic_year.id }))
    }
   }
  }, [branchId, dispatch, tabKey, academic_year.id])

  const addNewTerm = async () => {
    setShowToast(true)
    await dispatch(addAcademicTerm({ ...formData, academic_year_id: yearId ? yearId : academic_year.id })).then((res) => {
      showToastify(res.payload.message, res.payload.status)
      dispatch(getAcademicTerms({ ...params }))
    })
  }
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
  const handleDetails = (term: AcademicTermViewModel) => {
    setTerm((prevParams) => ({
      ...prevParams,
      id: term.id,
      term_name: term.term_name ?? '',
      start_date: term.start_date ?? '',
      end_date: term.end_date ?? '',
      completed: term.completed !== undefined ? term.completed : false,
      academic_year_id: term.academic_year_id || 0,
      academic_year_name: term.academic_year_name ?? '',
      next_term_start_date: term.next_term_start_date ?? '',
    }))
    setAcademicTermDetailsModalOpen(true)
  }
  const handleDelete = (term: AcademicTermViewModel) => {
    setTerm((prevParams) => ({
      ...prevParams,
      id: term.id,
      term_name: term.term_name ?? '',
      start_date: term.start_date ?? '',
      end_date: term.end_date ?? '',
      completed: term.completed !== undefined ? term.completed : false,
      academic_year_id: term.academic_year_id || 0,
      academic_year_name: term.academic_year_name ?? '',
    }))
    setAcademicTermDeleteModalOpen(true)
  }
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'academic_year_id':
        setYearId(parseInt(value))
        break
      default:
    }
  };
  useEffect(() => {
    const user_roles = UserSession.getroles()
    setRoles(user_roles)
  }, [academic_year.id, dispatch, params, yearId])
  return (
    <div>
      {(roles && privileged_school_roles.some(role => roles.includes(role))) && (
        <div className="academic-term-add-section">
          <div className="section-header-modern">
            <div className="section-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h3 className="section-title">Add New Academic Term</h3>
          </div>
          <Form className="modern-form">
            <Row>
              <Col lg={12}>
                <Form.Group className="modern-form-group">
                  <Form.Label className="modern-form-label">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Academic Year
                  </Form.Label>
                  <AcademicYearDropDown onChange={handleInputChange} schoolId={undefined} branchId={undefined} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={3}>
                <Form.Group controlId='termName' className="modern-form-group">
                  <Form.Label className="modern-form-label">
                    <i className="fas fa-bookmark me-2"></i>
                    Term/Semester
                  </Form.Label>
                  <Form.Control 
                    type='text' 
                    value={formData.term_name}
                    onChange={(e) => setFormData({ ...formData, term_name: e.target.value })}
                    className="modern-form-control"
                    placeholder="e.g., Term 1, Fall Semester"
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={3}>
                <Form.Group controlId='startDate' className="modern-form-group">
                  <Form.Label className="modern-form-label">
                    <i className="fas fa-calendar-day me-2"></i>
                    Start Date
                  </Form.Label>
                  <CustomDatePicker
                    value={formData.start_date}
                    onChange={(date) => setFormData({ ...formData, start_date: date })}
                    className="modern-form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={3}>
                <Form.Group controlId='endDate' className="modern-form-group">
                  <Form.Label className="modern-form-label">
                    <i className="fas fa-calendar-check me-2"></i>
                    End Date
                  </Form.Label>
                  <CustomDatePicker
                    value={formData.end_date}
                    onChange={(date) => setFormData({ ...formData, end_date: date })}
                    className="modern-form-control" 
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={3}>
                <Form.Group controlId='nextTermStartDate' className="modern-form-group">
                  <Form.Label className="modern-form-label">
                    <i className="fas fa-calendar-plus me-2"></i>
                    Next Term Start
                  </Form.Label>
                  <CustomDatePicker
                    value={formData.next_term_start_date}
                    onChange={(date) => setFormData({ ...formData, next_term_start_date: date })}
                    className="modern-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='mt-3'>
                <Button onClick={addNewTerm} className="btn-add-academic-year">
                  <i className="fas fa-calendar-week me-2"></i>
                  Add New Term
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )}
      <div className="section-header-modern mt-5">
        <div className="section-icon">
          <i className="fas fa-list"></i>
        </div>
        <h3 className="section-title">Academic Terms</h3>
      </div>
      <div className="academic-terms-table-wrapper">
        <Table responsive className="academic-terms-table-modern">
          <thead>
            <tr>
              <th>
                <i className="fas fa-bookmark me-2"></i>
                Term / Semester
              </th>
              <th>
                <i className="fas fa-calendar-day me-2"></i>
                Start Date
              </th>
              <th>
                <i className="fas fa-calendar-check me-2"></i>
                End Date
              </th>
              <th>
                <i className="fas fa-calendar-plus me-2"></i>
                Next Term Start
              </th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {academic_terms && academic_terms.map((term: AcademicTermViewModel, index: number) => (
              <tr key={term.id || index}>
                <td className="term-name-cell">
                  <div className="term-badge">{term.term_name}</div>
                </td>
                <td>{new Date(term.start_date ?? "").toDateString()}</td>
                <td>{new Date(term.end_date ?? "").toDateString()}</td>
                <td>{new Date(term.next_term_start_date ?? "").toDateString()}</td>
                <td className="actions-cell">
                  <div className="table-action-buttons">
                    <button className="table-action-btn edit-btn-table" onClick={() => handleEdit(term)}>
                      <i className="fa fa-edit"></i>
                      <span>Edit</span>
                    </button>
                    <button className="table-action-btn details-btn-table" onClick={() => handleDetails(term)}>
                      <i className="fa fa-info-circle"></i>
                      <span>Details</span>
                    </button>
                    <button className="table-action-btn delete-btn-table" onClick={() => handleDelete(term)}>
                      <i className="fa fa-trash"></i>
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
        <DropdownButton
          className="items-per-page-dropdown"
          id="dropdown-items-per-page-terms"
          title={`Items per page: ${params.pagination?.per_page}`}
        >
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
      <AcademicTermDetails
        schoolId={schoolId} branchId={branchId} term={term}
        params={params}
        isOpen={isAcdemicTermDetailsModalOpen}
        setAcademicTermDetailsModalOpen={setAcademicTermDetailsModalOpen}
        onRequestClose={() => setAcademicTermDetailsModalOpen(false)}
      />
      <AcademicTermDelete
        schoolId={schoolId} branchId={branchId} term={term}
        params={params}
        isOpen={isAcademicTermDeleteModalOpen}
        setAcademicTermDeleteModalOpen={setAcademicTermDeleteModalOpen}
        onRequestClose={() => setAcademicTermDeleteModalOpen(false)}
      />
      <AcademicTermEdit
        schoolId={schoolId} branchId={branchId} term={term}
        params={params}
        isOpen={isAcademicTermEditModalOpen}
        setAcademicTermEditModalOpen={setAcademicTermEditModalOpen}
        onRequestClose={() => setAcademicTermEditModalOpen(false)}
      />
    </div>
  )
}

export default AcademicTermCard
