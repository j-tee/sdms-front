import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ToastContext } from '../utility/ToastContext'
import { Circuit } from '../models/circuit'
import { addCircuit, getCircuits } from '../redux/slices/circuitSlice'
import { showToastify } from '../utility/Toastify'
import { getDistricts } from '../redux/slices/districtSlice'
import { Button, Dropdown, DropdownButton, Form, Table } from 'react-bootstrap'
import { getRegions } from '../redux/slices/regionSlice'
import CircuitEditModal from './CircuitEditModal'
import CircuitDeleteModal from './CircuitDeleteModal'
import PaginationComponent from './PaginationComponent'

const CircuitCard = (props: any) => {
  const {index} = props
  const {circuits, pagination} = useSelector((state: RootState) => state.circuit)
  const {regions} = useSelector((state: RootState) => state.region)
  const {districts} = useSelector((state: RootState) => state.district)
  const dispatch = useDispatch<AppDispatch>();
  const {setShowToast} = useContext(ToastContext)
  const [formData, setFormData] = useState<Circuit>({} as Circuit);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [params, setParams] = useState({
    per_page: 10,
    current_page: 1,
    total_items: 0,
    total_pages: 0,
    paginate: true,
  });
  const handleDelete = (circuit: Circuit) => {
    setDeleteModalOpen(true)
    setFormData(circuit)
  }
  const handleEdit = (circuit: Circuit) => {
    setEditModalOpen(true)
    setFormData(circuit)
  }
  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value})
    setParams((prev)=>({...prev, [field]: parseInt(value)}))
    switch (field) {
      case 'region_id':
        dispatch(getDistricts({...params,paginate:false, region_id: parseInt(value)}))
        break
      case 'district_id':
        dispatch(getCircuits({...params, paginate:true, district_id: parseInt(value)}))
        break
      default:
        break
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setShowToast(true)
    const circuit = {
      name: formData.name,      
      district_id: parseInt(formData.district_id as unknown as string)
    }
    dispatch(addCircuit({circuit})).then((res: any) => {
      showToastify(res.payload.message, res.payload.status)
      dispatch(getCircuits(params))
    })
  }
  useEffect(() => {
   if(index === 'circuit') {
     dispatch(getCircuits({...params, paginate: true}))
     dispatch(getRegions({...params, paginate: false}))
   }
  }, [params, index])
  const handlePageChange = (pageNumber: number) => {
    setParams({...params, current_page: pageNumber})
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setParams({...params, per_page: itemsPerPage})
  }
  return (
    <div>
      <h1>Circuits</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Circuit Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Circuit Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Region</Form.Label>
          <Form.Control
            as="select"
            value={formData.region_id}
            onChange={(e) => handleInputChange('region_id', e.target.value)}
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>District</Form.Label>
          <Form.Control
            as="select"
            value={formData.district_id}
            onChange={(e) => handleInputChange('district_id', e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {circuits.map((circuit, index) => (
            <tr key={circuit.id}>
              <td>{index + 1}</td>
              <td>{circuit.name}</td>
              <th>
                <Button variant='link' onClick={() => handleEdit(circuit)}>Edit</Button>
                <Button variant='link' onClick={() => handleDelete(circuit)}>Delete</Button>
              </th>
            </tr>
          ))}
        </tbody>  
      </Table>
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
          title={`Items per page: ${params.per_page}`}
        >
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>
            5
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>
            10
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>
            20
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>50</Dropdown.Item>
        </DropdownButton>
      </div>
          <CircuitEditModal
            isOpen={editModalOpen}
            onRequestClose={() => setEditModalOpen(false)}
            setEditModalOpen={setEditModalOpen}
            circuit={formData}
            params={params}
          />
          <CircuitDeleteModal
            isOpen={deleteModalOpen}
            onRequestClose={() => setDeleteModalOpen(false)}
            setDeleteModalOpen={setDeleteModalOpen}
            circuit={formData}
            params={params}
          />
    </div>
  )
}

export default CircuitCard
