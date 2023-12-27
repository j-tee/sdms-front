import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import ClassGroupEdit from './ClassGroupEdit';
import ClassGroupDelete from './ClassGroupDelete';

const ClassGroupList = (props: any) => {
	const { class_group, params, branchId, schoolId } = props;
	const [isClassGroupEditModalOpen, setClassGroupEditModalOpen] = useState(false)	
	const [isClassGroupDeleteModalOpen, setClassGroupDeleteModalOpen] = useState(false)	
	const handleEdit = () => {
		setClassGroupEditModalOpen(true)
	}
	const handleDelete = () => {
		setClassGroupDeleteModalOpen(true)
	}
	return (
		<>
			<div className='fs-5 text-muted pt-1 border-bottom d-flex flex-row justify-content-between'>
				<span>{class_group.stage_name} {class_group.class_name} - Capacity: {class_group.capacity}</span>
				<span>
					<Card.Footer className='p-0 m-0 fs-6 d-flex flex-row'>
						<Card.Link onClick={handleEdit}>Edit</Card.Link>
						<Card.Link onClick={handleDelete}>Delete</Card.Link>
					</Card.Footer>
				</span>
			</div>
		<ClassGroupEdit isOpen={isClassGroupEditModalOpen}
			onRequestClose={() => { setClassGroupEditModalOpen(false) }}
			setClassGroupEditModalOpen={setClassGroupEditModalOpen}
			params={params}
			schoolId={schoolId}
			branchId={branchId}
			classGroup={class_group} />
		<ClassGroupDelete isOpen={isClassGroupDeleteModalOpen}
		params={params}
		branchId={branchId}
		schoolId={schoolId}
		onRequestClose={() => { setClassGroupDeleteModalOpen(false) }}
		setClassGroupDeleteModalOpen={setClassGroupDeleteModalOpen}
		classGroup={class_group} />
		</>
	)
}

export default ClassGroupList
