import React, { useEffect, useState } from "react";
import UserSession from "../utility/userSession";
import Header from "./Header";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Setup from "./Setup";
import UserManagement from "./UserManagement";

const SystemAdmin = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [userCategory, setUserCategory] = useState<string>("");
  const [index, SetIndex] = useState<string | null>("first");
  useEffect(() => {
    const user_roles = UserSession.getroles();
    const user_category = UserSession.getUserInfo().userCategory;
    setUserCategory(user_category);
    setRoles(user_roles);
  }, []);  

  return <div>
     <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Card>
        <Card.Header>
          <Card.Title className='fs-1 text-muted'>System Admin</Card.Title>
        </Card.Header>
        <Card.Body>
          <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2} className='border-right'>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Setup</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">User Management</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"><Setup tabIndex={index} /></Tab.Pane>
                  <Tab.Pane eventKey="second"><UserManagement  tabIndex={index} /></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
        {/* <Navigation schoolId={schoolId} branchId={branchId} /> */}
  </div>;
};

export default SystemAdmin;
