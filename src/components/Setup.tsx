import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import RegionCard from "./RegionCard";
import DistrictCard from "./DistrictCard";
import CircuitCard from "./CircuitCard";

const Setup = (props: any) => {
  const [key, setKey] = React.useState("region");
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="region" title="Regions">
					<RegionCard index={key}/>
				</Tab>
				<Tab eventKey="district" title="Districts / Municipalities">
					<DistrictCard index={key}/>
				</Tab>
				<Tab eventKey="circuit" title="Circuit">
					<CircuitCard index={key}/>
				</Tab>
      </Tabs>
    </>
  );
};

export default Setup;
