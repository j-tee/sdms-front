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
import '../css/ParentList.css'
import '../css/ModernFilters.css'
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
            <div className="parent-list-header">
                <h1 className="parent-list-title">
                    <i className="fas fa-users"></i>
                    Parent List
                </h1>
                {pagination && pagination.total_items && pagination.total_items > 0 && (
                    <div className="parent-count-badge">
                        <i className="fas fa-user-friends"></i>
                        Total Parents: {pagination.total_items}
                    </div>
                )}
            </div>

            <div className="parent-list-filters">
                <BranchDropDown schoolId={schoolId} onChange={handleChange}/>
            </div>

            <div className="parent-list-table-container">
                {parents && parents.length > 0 ? (
                    <table className="parent-list-table">
                        <thead>
                            <tr>
                                <th><i className="fas fa-hashtag"></i> #</th>
                                <th><i className="fas fa-male"></i> Father's Name</th>
                                <th><i className="fas fa-female"></i> Mother's Name</th>
                                <th><i className="fas fa-envelope"></i> Father's Email</th>
                                <th><i className="fas fa-envelope"></i> Mother's Email</th>
                                <th><i className="fas fa-phone"></i> Father's Contact</th>
                                <th><i className="fas fa-phone"></i> Mother's Contact</th>
                                <th><i className="fas fa-cog"></i> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parents.map((parent, index) => (
                                <tr key={index}>
                                    <td className="parent-id-cell">{parent.id}</td>
                                    <td>{parent.fathers_full_name}</td>
                                    <td>{parent.mothers_full_name}</td>
                                    <td>
                                        <a href={`mailto:${parent.fathers_email_address}`} className="parent-email">
                                            {parent.fathers_email_address}
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`mailto:${parent.mothers_email_address}`} className="parent-email">
                                            {parent.mothers_email_address}
                                        </a>
                                    </td>
                                    <td className="parent-contact">{parent.fathers_contact_number}</td>
                                    <td className="parent-contact">{parent.mothers_contact_number}</td>
                                    <td>
                                        <div className="parent-action-buttons">
                                            <button 
                                                className="parent-action-btn parent-action-btn-edit" 
                                                onClick={() => handleEditModalOpen(parent)}
                                            >
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </button>
                                            <button className="parent-action-btn parent-action-btn-view">
                                                <i className="fas fa-eye"></i>
                                                View
                                            </button>
                                            <button className="parent-action-btn parent-action-btn-delete">
                                                <i className="fas fa-trash-alt"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="parent-list-empty">
                        <div className="parent-list-empty-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="parent-list-empty-title">No Parents Found</div>
                        <div className="parent-list-empty-text">
                            No parent records available at the moment
                        </div>
                    </div>
                )}
            </div>
            {parents && parents.length > 0 && (
                <div className="parent-list-pagination">
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
                        className="parent-items-per-page-dropdown"
                        id="dropdown-items-per-page"
                        title={`Items per page: ${params.pagination?.per_page}`}
                    >
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
                    </DropdownButton>
                </div>
            )}
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