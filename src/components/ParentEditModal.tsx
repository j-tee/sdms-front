import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Parent } from "../models/parent";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { showToastify } from "../utility/Toastify";
import { getParents, updateParent } from "../redux/slices/parentSlice";

const ParentEditModal = (props: any) => {
  const { isOpen, onRequestClose, branchId, schoolId,setEditModalOpen, parent, params } = props;
  const [formData, setFormData] = useState<Parent>({} as Parent);
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);

  const handleSubmit = (event: any): void => {
		event.preventDefault();
		// Handle form submission
		dispatch(updateParent({ ...formData })).then((res: any) => {
			setShowToast(true);
			showToastify(res.payload.message, res.payload.status);
			if (res.payload.status === "success") {
				setEditModalOpen(false);
				dispatch(getParents({ ...params }));
			}
		})
	};

  useEffect(() => {
    if (parent) {
      setFormData(parent);
    }
  }, [parent]);
  return (
    <Modal show={isOpen} onHide={onRequestClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Parent</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} id="editParentForm">
        <Modal.Body>
					<Row>
              <Form.Group as={Col} controlId="fathersFullName">
                <Form.Label>Father's Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fathersFullName"
                  value={formData.fathers_full_name}
                  onChange={(e) => setFormData({ ...formData, fathers_full_name: e.target.value })}
                />
              </Form.Group>
							<Form.Group as={Col} controlId="mothersFullName">
								<Form.Label>Mother's Full Name</Form.Label>
								<Form.Control
									type="text"
									name="mothersFullName"
									value={formData.mothers_full_name}
									onChange={(e) => setFormData({ ...formData, mothers_full_name: e.target.value })}
								/>
							</Form.Group>
            </Row>
						<Row>
							<Form.Group as={Col} controlId="fathersOccupation">
								<Form.Label>Father's Occupation</Form.Label>
								<Form.Control
									type="text"
									name="fathersOccupation"
									value={formData.fathers_occupation}
									onChange={(e) => setFormData({ ...formData, fathers_occupation: e.target.value })}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="mothersOccupation">
								<Form.Label>Mother's Occupation</Form.Label>
								<Form.Control
									type="text"
									name="mothersOccupation"
									value={formData.mothers_occupation}
									onChange={(e) => setFormData({ ...formData, mothers_occupation: e.target.value })}
								/>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} controlId="fathersEmailAddress">
								<Form.Label>Father's Email Address</Form.Label>
								<Form.Control
									type="email"
									name="fathersEmailAddress"
									value={formData.fathers_email_address}
									onChange={(e) => setFormData({ ...formData, fathers_email_address: e.target.value })}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="mothersEmailAddress">
								<Form.Label>Mother's Email Address</Form.Label>
								<Form.Control
									type="email"
									name="mothersEmailAddress"
									value={formData.mothers_email_address}
									onChange={(e) => setFormData({ ...formData, mothers_email_address: e.target.value })}
								/>
							</Form.Group>	
						</Row>
						<Row>
							<Form.Group as={Col} controlId="fathersContact">
								<Form.Label>Father's Contact</Form.Label>
								<Form.Control
									type="text"
									name="fathersContact"
									value={formData.fathers_contact_number}
									onChange={(e) => setFormData({ ...formData, fathers_contact_number: e.target.value })}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="mothersContact">
								<Form.Label>Mother's Contact</Form.Label>
								<Form.Control
									type="text"
									name="mothersContact"
									value={formData.mothers_contact_number}
									onChange={(e) => setFormData({ ...formData, mothers_contact_number: e.target.value })}
								/>
							</Form.Group>	
						</Row>
						<Row>
							<Form.Group as={Col} controlId="residential_address">
								<Form.Label>Father's Address</Form.Label>
								<Form.Control
									type="text"
									name="residential_address"
									value={formData.residential_address}
									onChange={(e) => setFormData({ ...formData, residential_address: e.target.value })}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="postal_address">
								<Form.Label>Mother's Address</Form.Label>
								<Form.Control
									type="text"
									name="postal_address"
									value={formData.postal_address}
									onChange={(e) => setFormData({ ...formData, postal_address: e.target.value })}
								/>
							</Form.Group>	
						</Row>
						<Row>
							<Form.Group as={Col} controlId="fathers_ghana_card_number">
								<Form.Label>Father's Ghana Card Number</Form.Label>
								<Form.Control
									type="text"
									name="fathers_ghana_card_number"
									value={formData.fathers_ghana_card_number}
									onChange={(e) => setFormData({ ...formData, fathers_ghana_card_number: e.target.value })}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="mothers_ghana_card_number">
								<Form.Label>Mother's Ghana Card Number</Form.Label>
								<Form.Control
									type="text"
									name="mothers_ghana_card_number"
									value={formData.mothers_ghana_card_number}
									onChange={(e) => setFormData({ ...formData, mothers_ghana_card_number: e.target.value })}
								/>
							</Form.Group>
						</Row>
				</Modal.Body>
        <Modal.Footer>
					<Button variant="secondary" onClick={handleSubmit}>
						Submit
					</Button>
				</Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ParentEditModal;
