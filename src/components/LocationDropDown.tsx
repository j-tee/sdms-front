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

  // Define state with proper default values
  const [params, setParams] = useState({
    region_id: 0,
    district_id: 0,
    circuit_id: 0,
    current_page: 1,
    per_page: 10,
  });

  // Correctly update the params with defaults
  useEffect(() => {
    if (params.region_id > 0) {
      // Make API call for districts if region is selected
      dispatch(getDistricts({ ...params }));
    }
  }, [dispatch, params.region_id]);

  useEffect(() => {
    if (params.district_id > 0) {
      // Make API call for circuits if district is selected
      dispatch(getCircuits({ ...params }));
    }
  }, [dispatch, params.district_id]);

  useEffect(() => {
    // Always make API call for regions when component loads or when current_page or per_page changes
    if (params.current_page && params.per_page) {
      dispatch(getRegions({ ...params }));
    }
  }, [dispatch, params.current_page, params.per_page]);

  const handleRegionChange = (e: React.ChangeEvent<any>) => {
    const selectedRegionId = e.target.value;
    setParams((prevParams) => ({
      ...prevParams,
      region_id: selectedRegionId,
      district_id: 0, // Reset district and circuit
      circuit_id: 0,
    }));
    onLocationChange('region_id', selectedRegionId);
  };

  const handleDistrictChange = (e: React.ChangeEvent<any>) => {
    const selectedDistrictId = e.target.value;
    setParams((prevParams) => ({
      ...prevParams,
      district_id: selectedDistrictId,
      circuit_id: 0, // Reset circuit
    }));
    onLocationChange('district_id', selectedDistrictId);
  };

  const handleCircuitChange = (e: React.ChangeEvent<any>) => {
    const selectedCircuitId = e.target.value;
    setParams((prevParams) => ({
      ...prevParams,
      circuit_id: selectedCircuitId,
    }));
    onLocationChange('circuit_id', selectedCircuitId);
  };

  return (
    <Container>
      <Row>
        <Col mg={4}>
          <Form.Group controlId="region">
            <Form.Label>Region</Form.Label>
            <Form.Control as="select" onChange={handleRegionChange} value={params.region_id}>
              <option value="0">---Select---</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
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
              <option value="0">---Select---</option>
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
              <option value="0">---Select---</option>
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
