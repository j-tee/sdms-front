import React, { useContext, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addRegion, getRegions } from "../redux/slices/regionSlice";
import { Button, Dropdown, DropdownButton, Form, Table } from "react-bootstrap";
import { Region } from "../models/region";
import { ToastContext } from "../utility/ToastContext";
import { showToastify } from "../utility/Toastify";
import RegionEditModal from "./RegionEditModal";
import RegionalDeleteModal from "./RegionalDeleteModal";
import PaginationComponent from "./PaginationComponent";

const RegionCard = (props: any) => {
  const {index} = props;
  const dispatch = useDispatch<AppDispatch>();
  const { regions, pagination } = useSelector(
    (state: RootState) => state.region
  );
  const { setShowToast } = useContext(ToastContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState<Region>({} as Region);
  // const [region, setRegion] = useState<Region>({
  //   name: "",
  // });
  const [params, setParams] = useState({
    per_page: 10,
    current_page: 1,
    total_items: 0,
    total_pages: 0,
    paginate: true,
  });

  const handleDelete = (region: Region) => {
    setDeleteModalOpen(true);
    setFormData(region);
  };

  const handleEditModalOpen = (region: Region) => {
    setEditModalOpen(true);
    setFormData(region);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowToast(true);
    // const region = { region: { ...formData } };
    dispatch(addRegion(formData)).then((res: any) => {
      dispatch(getRegions(params));
      showToastify(res.payload.message, res.payload.status);
    });
  };

  useEffect(() => {
    if (index === 'region') {
      dispatch(getRegions(params));
    }
  }, [params, dispatch, index]);

  const handlePageChange = (pageNumber: number) => {
    setParams({ ...params, current_page: pageNumber });
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setParams({ ...params, per_page: perPage });
  };
  return (
    <>
      <h1>Regions</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Region Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Region Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
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
          {regions.map((region, index) => (
            <tr key={region.id}>
              <td>{index + 1}</td>
              <td>{region.name}</td>
              <th>
                <Button
                  onClick={() => handleEditModalOpen(region)}
                  variant="link"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(region)} variant="link">
                  Delete
                </Button>
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
        </DropdownButton>
      </div>
      <RegionEditModal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        setEditModalOpen={setEditModalOpen}
        region={formData}
        params={params}
      />

      <RegionalDeleteModal
        params={params}
        region={formData}
        isOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default RegionCard;
