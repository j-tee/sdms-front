import React from 'react'
import { Card } from 'react-bootstrap'

const ClassGroupList = (props: any) => {
const {class_group} = props;
	return (
		<Card.Header>
			<Card.Title>
				{class_group.stage_name} {class_group.class_name}
			</Card.Title>
			<Card.Subtitle>{class_group.dept_name} Department</Card.Subtitle>
		</Card.Header>
	)
}

export default ClassGroupList
