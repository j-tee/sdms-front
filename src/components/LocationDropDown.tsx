import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getRegions } from '../redux/slices/regionSlice';
import { getDistricts } from '../redux/slices/districtSlice';
import { getCircuits } from '../redux/slices/circuitSlice';
import CustomSelect from './CustomSelect';

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

  const handleRegionChange = (value: string | number) => {
    const selectedRegionId = Number(value);
    setParams((prevParams) => ({
      ...prevParams,
      region_id: selectedRegionId,
      district_id: 0, // Reset district and circuit
      circuit_id: 0,
    }));
    onLocationChange('region_id', String(selectedRegionId));
  };

  const handleDistrictChange = (value: string | number) => {
    const selectedDistrictId = Number(value);
    setParams((prevParams) => ({
      ...prevParams,
      district_id: selectedDistrictId,
      circuit_id: 0, // Reset circuit
    }));
    onLocationChange('district_id', String(selectedDistrictId));
  };

  const handleCircuitChange = (value: string | number) => {
    const selectedCircuitId = Number(value);
    setParams((prevParams) => ({
      ...prevParams,
      circuit_id: selectedCircuitId,
    }));
    onLocationChange('circuit_id', String(selectedCircuitId));
  };

  // Prepare options for CustomSelect
  const regionOptions = [
    { value: 0, label: '---Select---' },
    ...regions.map(region => ({ value: region.id || 0, label: region.name || '' }))
  ];

  const districtOptions = [
    { value: 0, label: '---Select---' },
    ...districts.map(district => ({ value: district.id || 0, label: district.name || '' }))
  ];

  const circuitOptions = [
    { value: 0, label: '---Select---' },
    ...circuits.map(circuit => ({ value: circuit.id || 0, label: circuit.name || '' }))
  ];

  return (
    <div className="location-filter-grid">
      <div className="location-filter-column">
        <Form.Group controlId="region">
          <Form.Label>Region</Form.Label>
          <CustomSelect
            options={regionOptions}
            value={params.region_id}
            onChange={handleRegionChange}
            placeholder="---Select---"
            id="region"
          />
        </Form.Group>
      </div>
      <div className="location-filter-column">
        <Form.Group controlId="district">
          <Form.Label>District</Form.Label>
          <CustomSelect
            options={districtOptions}
            value={params.district_id}
            onChange={handleDistrictChange}
            placeholder="---Select---"
            id="district"
          />
        </Form.Group>
      </div>
      <div className="location-filter-column">
        <Form.Group controlId="circuit">
          <Form.Label>Circuit</Form.Label>
          <CustomSelect
            options={circuitOptions}
            value={params.circuit_id}
            onChange={handleCircuitChange}
            placeholder="---Select---"
            id="circuit"
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default LocationDropDown;
