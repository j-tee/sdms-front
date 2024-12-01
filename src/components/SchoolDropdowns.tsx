import React, { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getReligiousAffiliation } from '../redux/slices/schoolSlice';

type AnyType = {
  [key: string]: string;
};

interface SchoolDropdownsProps {
  onChange: (field: keyof AnyType, value: string) => void;
}

const SchoolDropdowns: React.FC<SchoolDropdownsProps> = ({ onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { levels, religions, categories, ownershipCategories, isLoading } = useSelector((state: RootState) => state.school);

  useEffect(() => {    
    if (religions.length === 0 && !isLoading) {      
      dispatch(getReligiousAffiliation());
    }
  }, [dispatch, religions, isLoading]); 

  return (
    <Container fluid className="border p-3">
      <Row>
        <Col md={6}>
          <Form.Group controlId="religiousAffiliation">
            <Form.Label>Religious Affiliation</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onChange('religious_affiliation_id', e.target.value)}
            >
              <option value="">---Select---</option>
              {religions.map((religion: any) => (
                <option key={religion.id} value={religion.id}>
                  {religion.religion}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onChange('category_id', e.target.value)}
            >
              <option value="">---Select---</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="ownershipCategory">
            <Form.Label>Ownership Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onChange('ownership_category_id', e.target.value)}
            >
              <option value="">---Select---</option>
              {ownershipCategories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.ownership}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => onChange('level_id', e.target.value)}
            >
              <option value="">---Select---</option>
              {levels.map((level: any) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default SchoolDropdowns;
