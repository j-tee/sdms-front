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
			<div className="org-item-card class-group-card">
				<div className="org-item-content">
					<div className="org-item-icon">
						<i className="fas fa-chalkboard-teacher"></i>
					</div>
					<div className="class-group-info">
						<span className="org-item-name">{class_group.stage_name} {class_group.class_name}</span>
						<span className="class-capacity-badge">
							<i className="fas fa-users me-1"></i>
							Capacity: {class_group.capacity}
						</span>
					</div>
				</div>
				<div className="org-item-actions">
					<button className="org-action-btn edit-btn-org" onClick={handleEdit}>
						<i className="fas fa-edit"></i>
						<span>Edit</span>
					</button>
					<button className="org-action-btn delete-btn-org" onClick={handleDelete}>
						<i className="fas fa-trash-alt"></i>
						<span>Delete</span>
					</button>
				</div>
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
