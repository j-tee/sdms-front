import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Stage, StageParams } from '../models/stage';
import BranchDropDown from './BranchDropDown';
import { getBranches } from '../redux/slices/schoolSlice';
import { addStage, getStages } from '../redux/slices/stageSlice';
import { showToastify } from '../utility/Toastify';
import { ToastContext } from '../utility/ToastContext';
import { QueryParams } from '../models/queryParams';
import PaginationComponent from './PaginationComponent';
import StageEdit from './StageEdit';
import StageDelete from './StageDelete';

const StageCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { pagination, stages } = useSelector((state: RootState) => state.stage)
  const { showToast, setShowToast } = useContext(ToastContext)
  const [isStageEditModalOpen, setStageEditModalOpen] = useState(false);
  const [isStageDeleteModalOpen, setStageDeleteModalOpen] = useState(false);
  const [stage, setStage] = useState<Stage>({
    id: 0,
    stage_name: '',
    branch_id: 0,
  })
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<QueryParams>({
    school_id: 0,
    branch_id: 0,
    class_group_id: 0,
    program_id: 0,
    department_id: 0,
    stage_name: '',
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  useEffect(() => {
    if (tabIndex === 'third') {
      dispatch(getBranches({ ...params, school_id: schoolId }))
        .then((res: any) => {
          showToastify(res.payload.message, res.payload.status)
        })
      if(branchId)
      dispatch(getStages({ ...params, paginate: true, branch_id: branchId }))
    }
  }, [branchId, dispatch, schoolId, params, tabIndex])

  useEffect(() => {
    setParams((prevData) => ({
      ...prevData,
      branch_id: branchId,
      school_id: schoolId
    }))
  }, [branchId, schoolId])
  const handleStageSubmit = () => {
    setShowToast(true)
    const stage: Stage = {
      stage_name: params.stage_name || '',
      branch_id: branchId
    }
    dispatch(addStage(stage))
      .then((res: any) => {
        // showToastify(res.payload.message, res.payload.status)
        if(branchId)
        dispatch(getStages({ ...params, paginate: true, branch_id: branchId }))
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
  const handleDelete = (stage: Stage) => {
    setStage((prevData) => ({
      ...prevData,
      id: stage.id,
      stage_name: stage.stage_name,
      branch_id: stage.branch_id
    }))
    setStageDeleteModalOpen(true)
  }
  const handleEdit = (stage: Stage) => {
    setStage((prevData) => ({
      ...prevData,
      id: stage.id,
      stage_name: stage.stage_name,
      branch_id: stage.branch_id
    }))
    setStageEditModalOpen(true)
  }
  return (
    <div className="org-section-content">
      <div className="org-section-header">
        <div className="org-section-icon">
          <i className="fas fa-stairs"></i>
        </div>
        <h3 className="org-section-title">Stages</h3>
      </div>

      <div className="org-add-section">
        <Form className="org-add-form">
          <Row>
            <Col md={4}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-building me-2"></i>
                  Branch
                </Form.Label>
                <BranchDropDown onChange={handleInputChange} schoolId={schoolId} />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="org-form-group">
                <Form.Label className="org-form-label">
                  <i className="fas fa-level-up-alt me-2"></i>
                  Stage Name
                </Form.Label>
                <Form.Control 
                  placeholder='Enter stage name'
                  onChange={(e) => handleInputChange('stage_name', e.target.value)}
                  value={params.stage_name}
                  className="org-form-control" 
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <div className="org-form-group">
                <Form.Label className="org-form-label" style={{opacity: 0}}>Action</Form.Label>
                <Button onClick={handleStageSubmit} className="btn-add-org-item">
                  <i className="fas fa-plus-circle me-2"></i>
                  Add Stage
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="org-items-list">
        {stages && stages.map((stage) => (
          <div key={stage.id} className="org-item-card">
            <div className="org-item-content">
              <div className="org-item-icon">
                <i className="fas fa-stairs"></i>
              </div>
              <span className="org-item-name">{stage.stage_name}</span>
            </div>
            <div className="org-item-actions">
              <button className="org-action-btn edit-btn-org" onClick={() => handleEdit(stage)}>
                <i className="fas fa-edit"></i>
                <span>Edit</span>
              </button>
              <button className="org-action-btn delete-btn-org" onClick={() => handleDelete(stage)}>
                <i className="fas fa-trash-alt"></i>
                <span>Delete</span>
              </button>
            </div>
          </div>
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
        <DropdownButton
          className="items-per-page-dropdown"
          id="dropdown-items-per-page-stage"
          title={`Items per page: ${params.pagination?.per_page}`}
        >
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>

      <StageEdit isOpen={isStageEditModalOpen}
        stage={stage}
        params={params}
        branchId={branchId}
        schoolId={schoolId}
        onRequestClose={() => { setStageEditModalOpen(false) }}
        setStageEditModalOpen={setStageEditModalOpen} />
      <StageDelete isOpen={isStageDeleteModalOpen}
        stage={stage}
        params={params}
        branchId={branchId}
        schoolId={schoolId}
        onRequestClose={() => { setStageDeleteModalOpen(false) }}
        setStageDeleteModalOpen={setStageDeleteModalOpen} />
    </div>
  )
}

export default StageCard