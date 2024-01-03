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
          console.log(res)
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
    <>
      <Form>
        <Row className='d-flex flex-lg-row flex-column'>
          <Col>
            <BranchDropDown onChange={handleInputChange} schoolId={schoolId} />
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Stage Name</Form.Label>
              <Form.Control placeholder='Stage'
                onChange={(e) => handleInputChange('stage_name', e.target.value)}
                value={params.stage_name} />
            </Form.Group>
          </Col>
          <Col className='pt-4'>
            <Button onClick={handleStageSubmit} className='mt-1'>Add New Stage</Button>
          </Col>
        </Row>
      </Form>
      {stages && stages.map((stage) => (
        <div className='fs-5 text-muted p-2 border-bottom d-flex flex-row justify-content-between'>
          <span>{stage.stage_name} </span>
          <span><Card.Link onClick={() => handleEdit(stage)}>Edit</Card.Link>
          <Card.Link onClick={() => handleDelete(stage)}>Delete</Card.Link></span>
        </div>
      ))}
      <div className="d-flex px-2 justify-content-between align-items-center">
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
        <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${pagination?.per_page}`}>
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
    </>
  )
}

export default StageCard