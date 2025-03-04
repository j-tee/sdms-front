import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getParents } from '../redux/slices/parentSlice'
import { ParentParams } from '../models/parent'
import { Button, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import PaginationComponent from './PaginationComponent'
import BranchDropDown from './BranchDropDown'
import { getBranches } from '../redux/slices/schoolSlice'
import ParentEditModal from './ParentEditModal'
type AnyType = {
    [key: string]: string;
  };
const ParentListCard = (props: any) => {
    const { tabIndex, schoolId, branchId } = props
    const { parents, pagination } = useSelector((state: RootState) => state.parent)
    const dispatch = useDispatch<AppDispatch>()
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const [parent, setParent] = useState(null)
    const [params, setParams] = useState<ParentParams>({
        school_id: schoolId,
        branch_id: branchId,
        pagination: {
            current_page: 1,
            per_page: 10,
            total_items: 0,
            total_pages: 0
        },// or appropriate default value
        paginate: true // or appropriate default value
    })
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
            current_page: 1,
          },
        }));
      };
    useEffect(() => {
        if (tabIndex === 'fifth') {
          dispatch(getBranches({ ...params }))
            dispatch(getParents({ ...params }))
        }
    }, [tabIndex, params, dispatch])

    const handleChange = <T extends AnyType>(field: keyof T, value: string) => {
        setParams((prevData) => ({
            ...prevData,
            [field]: value,
          }));
    }
    const handleEditModalOpen = (parent: any) => {
        setParent(parent)
        setEditModalOpen(true)
    }
    return (
        <>
        <BranchDropDown schoolId={schoolId} onChange={handleChange}/>
            <h1>Parent List</h1>
            <Table striped size="sm" hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Father's Name</th>
                        <th>Mother's Name</th>
                        <th>Father's Email</th>
                        <th>Mother's Email</th>
                        <th>Father's Contact</th>
                        <th>Mother's Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parents.map((parent, index) => (
                        <tr key={index}>
                            <td>{parent.id}</td>
                            <td>{parent.fathers_full_name}</td>
                            <td>{parent.mothers_full_name}</td>
                            <td>{parent.fathers_email_address}</td>
                            <td>{parent.mothers_email_address}</td>
                            <td>{parent.fathers_contact_number}</td>
                            <td>{parent.mothers_contact_number}</td>
                            <td className="d-flex flex-column flex-lg-row justify-content-center">
                                <Button size='sm' variant='link' onClick={() => handleEditModalOpen(parent)} className="m-1">
                                    Edit
                                </Button>
                                <Button variant='link' className="m-1" size="sm">
                                    View
                                </Button>
                                <Button variant='link' className="m-1" size="sm">
                                    Delete
                                </Button>
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
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>50</Dropdown.Item>
            </DropdownButton>
          </div>
          <ParentEditModal 
          branchId={branchId}
          schoolId={schoolId}
          isOpen={isEditModalOpen} 
          onRequestClose={() => setEditModalOpen(false)} 
          setEditModalOpen={setEditModalOpen}
          parent={parent} />
        </>
    )
}

export default ParentListCard