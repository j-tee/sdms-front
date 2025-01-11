import React, { useContext, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { Button, Form, Modal } from "react-bootstrap";
import { Circuit } from "../models/circuit";
import { showToastify } from "../utility/Toastify";
import { getCircuits, updateCircuit } from "../redux/slices/circuitSlice";
import { Region } from "../models/region";
import { District } from "../models/district";
import { getDistricts } from "../redux/slices/districtSlice";
import { getRegions } from "../redux/slices/regionSlice";

const CircuitEditModal = (props: any) => {
  const { isOpen, onRequestClose, setEditModalOpen, params, circuit } = props;
  const { regions } = useSelector((state: RootState) => state.region);
  const { districts } = useSelector((state: RootState) => state.district);
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
	const [formData, setFormData] = useState<Circuit>({} as Circuit);
	const handleSubmit = (e: any) => {
		e.preventDefault();
		setShowToast(true);
		const circuit = {
			id: formData.id,
			name: formData.name,
			district_id: parseInt(formData.district_id as unknown as string),
		};
		dispatch(updateCircuit({circuit})).then((res: any) => {
			showToastify(res.payload.message, res.payload.status);
			dispatch(getCircuits(params));
		});
	};
	const handleInputChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
		switch (field) {
			case "region_id":
				dispatch(getDistricts({ ...params, paginate: false, region_id: parseInt(value) }));
				break;
			case "district_id":
				break;
			default:
				break;
		}
	}
	useEffect(() => {
		setFormData(circuit);
		dispatch(getRegions({...params, paginate: false}));
	}, [params, dispatch, circuit]);
  return (
	<Modal show={isOpen} onHide={onRequestClose}>
		<Modal.Header closeButton>
			<Modal.Title>Edit Circuit</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Circuit Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Circuit Name"
						value={formData.name}
						onChange={(e) => handleInputChange("name", e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Region</Form.Label>
					<Form.Control
						as="select"
						value={formData.region_id}
						onChange={(e) => handleInputChange("region_id", e.target.value)}
					>
						<option value="">Select Region</option>
						{regions.map((region: Region) => (
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
						onChange={(e) => handleInputChange("district_id", e.target.value)}
					>
						<option value="">Select District</option>
						{districts.map((district: District) => (
							<option key={district.id} value={district.id}>
								{district.name}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Button variant="primary" type="submit">
					Save Changes
				</Button>
			</Form>
		</Modal.Body>
	</Modal>
	);
};

export default CircuitEditModal;
