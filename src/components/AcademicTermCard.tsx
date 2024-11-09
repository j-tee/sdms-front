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
import AcademicTermDetails from './AcademicTermDetails';
import { QueryParams } from '../models/queryParams';
import UserSession from '../utility/userSession';
import AcademicYearDropDown from './AcademicYearDropDown';


type AnyType = {
  [key: string]: string;
};


const AcademicTermCard = (props: any) => {
  const { academic_terms, academic_year } = useSelector((state: RootState) => state.calendar)
  const { setShowToast } = useContext(ToastContext)
  const { branchId, tabKey, schoolId } = props;
  const dispatch = useDispatch<AppDispatch>()
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
    const user_roles = UserSession.getroles()
    setRoles(user_roles)
    dispatch(getCurrentAcademicYear(branchId))
    if (academic_year.id) {
      dispatch(getAcademicTerms({ ...params, academic_year_id: academic_year.id }))
    }
  }, [branchId, dispatch, tabKey, academic_year.id])

  const addNewTerm = async () => {
    setShowToast(true)
    await dispatch(addAcademicTerm({ ...formData, academic_year_id: academic_year.id })).then((res) => {
      showToastify(res.payload.message, res.payload.status)
      dispatch(getAcademicTerms({ ...params, year_id: academic_year.id }))
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
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  useEffect(() => {
    const user_roles = UserSession.getroles()
    setRoles(user_roles)
  }, [academic_year.id, dispatch, params])
  return (
    <div>
      {(roles && privileged_school_roles.some(role=>roles.includes(role))) && <Card.Header className='fs-3 text-muted mb-4'>Add New Academic Term</Card.Header>}
      {(roles && privileged_school_roles.some(role=>roles.includes(role))) && <Form>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <AcademicYearDropDown onChange={handleInputChange} schoolId={undefined} branchId={undefined} />
          </Col>
          <Col>
            <Form.Group controlId='termName'>
              <Form.Label>Term/Sem</Form.Label>
              <Form.Control type='text' value={formData.term_name}
                onChange={(e) => setFormData({ ...formData, term_name: e.target.value })} />
            </Form.Group>
          </Col>
          <Col><Form.Group controlId='startDate'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type='date' value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
          </Form.Group></Col>
          <Col><Form.Group controlId='endDate'>
            <Form.Label>End Date</Form.Label>
            <Form.Control type='date' value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
          </Form.Group></Col>
        </Row>
        <Row>
          <Col className='my-2'>
            <Button size='sm' onClick={addNewTerm}>Add New Term</Button>
          </Col>
        </Row>
      </Form>}
      <Card.Header className='fs-3 text-muted mb-4'>Academic Terms</Card.Header>
      <Table striped hover responsive bordered variant='dark' size='sm'>
        <thead>
          <tr>
            <th>Term / Semester</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {academic_terms && academic_terms.map((term: AcademicTermViewModel) => (
            <tr>
              <td>{term.term_name}</td>
              <td>{new Date(term.start_date ?? "").toDateString()}</td>
              <td>{new Date(term.end_date ?? "").toDateString()}</td>
              <td className='d-flex flex-lg-row flex-column gap-2'>
                <Button onClick={() => handleEdit(term)}><i className="fa fa-edit" aria-hidden="true">Edit</i></Button>
                <Button onClick={() => handleDelete(term)}><i className="fa fa-trash" aria-hidden="true">Delete</i></Button>
                <Button onClick={() => handleDetails(term)}><i className="fa fa-info-circle" aria-hidden="true">Details</i></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex px-2 justify-content-between align-items-center">
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
