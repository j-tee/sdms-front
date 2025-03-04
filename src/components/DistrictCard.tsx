import React, { useContext, useEffect, useState } from "react";
import { Root } from "react-dom/client";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { District, DistrictViewModel } from "../models/district";
import { addDistrict, deleteDistrict, getDistricts } from "../redux/slices/districtSlice";
import { showToastify } from "../utility/Toastify";
import { Button, Dropdown, DropdownButton, Form, Tab, Table } from "react-bootstrap";
import { getRegions } from "../redux/slices/regionSlice";
import DistrictEditModal from "./DistrictEditModal";
import DistrictDeleteModal from "./DistrictDeleteModal";
import PaginationComponent from "./PaginationComponent";
import { PaginationParams } from "../models/pagination";

const DistrictCard = (props: any) => {
  const {index} = props;
  const { districts, pagination} = useSelector((state: RootState) => state.district);
  const { regions } = useSelector((state: RootState) => state.region);
  const {setShowToast} = useContext(ToastContext)
  const [formData, setFormData] = useState<District>({} as District);
  const dispatch = useDispatch<AppDispatch>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [params, setParams] = useState({
    per_page: 10,
    current_page: 1,
    total_items: 0,
    total_pages: 0,
    paginate: true,
  });

  type AnyType = {
    [key: string]: string;
  };
  
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setFormData({ ...formData, [field]: value });
    dispatch(getDistricts({...params, region_id: parseInt(value)}));
  };
  const handleSubmit = (e: any) =>{
    e.preventDefault()
    setShowToast(true)
    dispatch(addDistrict(formData)).then((res: any) => {
      showToastify(res.payload.message, res.payload.status);
      dispatch(getDistricts(params));
    })
  }

  const handleDelete = (district: District) => {
    const {id, name, region_id} = district;
    setFormData({id, name, region_id} as District);
    setDeleteModalOpen(true);
  }

  const handleEdit = (district: District) => {
    const {id, name, region_id} = district;
    setFormData({id, name, region_id} as District);
    setEditModalOpen(true);
  }

  useEffect(() => {
    if(index === 'district') {
      dispatch(getDistricts({...params,paginate:true, region_id: formData.region_id}));
    dispatch(getRegions({...params, paginate: false}));
    }
    
  }, [params, index]);

  const handlePageChange = (pageNumber: number) => {
    setParams({...params, current_page: pageNumber});
  }
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setParams({...params, per_page: itemsPerPage});
  }
  return (
    <div>
      <h1>Districts/Municipalities</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Region</Form.Label>
          <Form.Control as="select" onChange={(e) =>
              handleInputChange('region_id', e.target.value)
            }>
            <option>Select Region</option>
            {regions.map((region: any) => (
              <option value={region.id}>{region.name}</option>
            ))}
          </Form.Control>          
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </Form.Group>       
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
      <Table striped size='sm' hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Region</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district: DistrictViewModel) => (
            <tr>
              <td>{district.id}</td>
              <td>{district.name}</td>
              <td>{district.region_name}</td>
              <td>
                <Button onClick={() => handleDelete(district)} variant='link'>Delete</Button>
                <Button onClick={() => handleEdit(district)} variant='link'>Edit</Button>
              </td>
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
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>50</Dropdown.Item>
            </DropdownButton>
          </div>
      <DistrictEditModal
      params={params}
        // show={editModalOpen}
        isOpen={editModalOpen}
        setEditModalOpen = {setEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        district={formData}
      />

      <DistrictDeleteModal
        params={params}
        isOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        district={formData} 
      />
    </div>
  );
};

export default DistrictCard;
