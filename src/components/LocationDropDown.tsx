import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getRegions } from '../redux/slices/regionSlice';
import { getDistricts } from '../redux/slices/districtSlice';
import { getCircuits } from '../redux/slices/circuitSlice';

type AnyType = {
  [key: string]: string;
};
interface LocationDropDownProps {
  onLocationChange: (field: keyof AnyType, value: string) => void;
}

const LocationDropDown: React.FC<LocationDropDownProps> = ({ onLocationChange }) => {
  const { regions } = useSelector((state: RootState) => state.region);
  const { districts } = useSelector((state: RootState) => state.district);
  const { circuits } = useSelector((state: RootState) => state.circuit);
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState({
    region_id: 0,
    district_id: 0,
    circuit_id: 0,
    current_page: 1,
    per_page: 10,
  });

  useEffect(() => {
    dispatch(getRegions(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (params.region_id !== 0) {
      dispatch(getDistricts(params))
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (params.district_id !== 0) {
      dispatch(getCircuits(params));
    }
  }, [dispatch, params]);

  const handleRegionChange = (e: React.ChangeEvent<any>) => {
    const selectedRegionId = e.target.value;
    setParams({
      ...params,
      region_id: selectedRegionId,
      district_id: 0,
      circuit_id: 0,
    });
    onLocationChange('region_id', selectedRegionId);
  };

  const handleDistrictChange = (e: React.ChangeEvent<any>) => {
    const selectedDistrictId = e.target.value;
    setParams({
      ...params,
      district_id: selectedDistrictId,
      circuit_id: 0,
    });
    onLocationChange('district_id', selectedDistrictId);
  };

  const handleCircuitChange = (e: React.ChangeEvent<any>) => {
    const selectedCircuitId = e.target.value;
    setParams({
      ...params,
      circuit_id: selectedCircuitId,
    });
    onLocationChange('circuit_id', selectedCircuitId);
  };

  return (
    <Container>
      <Row>
        <Col mg={4}>
          <Form.Group controlId="region">
            <Form.Label>Region</Form.Label>
            <Form.Control as="select" onChange={handleRegionChange} value={params.region_id}>
              <option value="">---Select---</option>
              {regions.map((region) => (<option key={region.id} value={region.id}>
                {region.name}
              </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control as="select" onChange={handleDistrictChange} value={params.district_id}>
              <option value="">---Select---</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="circuit">
            <Form.Label>Circuit</Form.Label>
            <Form.Control as="select" onChange={handleCircuitChange} value={params.circuit_id}>
              <option value="">---Select---</option>
              {circuits.map((circuit) => (
                <option key={circuit.id} value={circuit.id}>
                  {circuit.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default LocationDropDown;
