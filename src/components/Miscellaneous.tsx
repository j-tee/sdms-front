import React, { useContext, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { ToastContext } from "../utility/ToastContext";
import {
  addCategory,
  addLevel,
  addOwnershipCategory,
  addReligiousAffiliation,
  deleteCategory,
  deleteLevel,
  deleteOwnershipCategory,
  deleteReligiousAffiliation,
  getCategories,
  getLevels,
  getOwnershipCategories,
  getReligiousAffiliation,
} from "../redux/slices/schoolSlice";
import { showToastify } from "../utility/Toastify";

const Miscellaneous = (props: any) => {
  const { index } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({});
  const { setShowToast } = useContext(ToastContext);
  const { religions, ownershipCategories, levels, categories } = useSelector(
    (state: RootState) => state.school
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(addReligiousAffiliation(formData)).then((res) => {
      setFormData({});
      setShowToast(true);
      dispatch(getReligiousAffiliation());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };

  const handleLevelSubmit = (event: any) => {
    event.preventDefault();
    dispatch(addLevel(formData)).then((res) => {
      setShowToast(true);
      setFormData({});
      dispatch(getLevels());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };
  const handleOwnershipCategorySubmit = (event: any) => {
    event.preventDefault();
    dispatch(addOwnershipCategory(formData)).then((res) => {
      setShowToast(true);
      setFormData({});
      dispatch(getOwnershipCategories());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };

  const handleCategorySubmit = (event: any) => {
    event.preventDefault();
    dispatch(addCategory(formData)).then((res) => {
      setShowToast(true);
      setFormData({});
      dispatch(getCategories());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };
  useEffect(() => {
    if (index === "religion") {
      // setFormData({});
      dispatch(getReligiousAffiliation());
      dispatch(getLevels());
      dispatch(getOwnershipCategories());
      dispatch(getCategories());
    }
  }, [index, dispatch]);
  const hanedleOwnershipDelete = (id: any): void => {
    dispatch(deleteOwnershipCategory(id)).then((res) => {
      setShowToast(true);
      dispatch(getOwnershipCategories());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };

  const hanedleOwnershipEdit = (id: any): void => {
    throw new Error("Function not implemented.");
  };

  const handleReligionDelete = (id: any): void => {
    dispatch(deleteReligiousAffiliation(id)).then((res) => {
      setShowToast(true);
      dispatch(getReligiousAffiliation());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };

  const handleLevelDelete = (id: any): void => {
    dispatch(deleteLevel(id)).then((res) => {
      setShowToast(true);
      dispatch(getLevels());
      showToastify(res.payload.messsage, res.payload.status);
    });
  };

  const hamdleLevelEdit = (id: any): void => {
   
  };

  const handleCategoryDelete = (id: any): void => {
    dispatch(deleteCategory(id)).then((res) => {
      setShowToast(true);
      dispatch(getCategories());
      showToastify(res.payload.messsage, res.payload.status);
    } );
  };

  const handleReligionEdit = (id: any): void => {
    throw new Error("Function not implemented.");
  };
  const handleCategoryEdit = (id: any): void => {
    throw new Error("Function not implemented.");
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h3>Add Religious Affiliation</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Religion"
                name="religion"
                onChange={(e) =>
                  setFormData({ ...formData, religion: e.target.value })
                }
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <ul
            className="ms-5 me-5 mt-3"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {religions.length > 0 &&
              religions.map((religion: any) => (
                <li
                  key={religion.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px", // Even vertical spacing
                  }}
                >
                  <span>{religion.religion}</span>
                  <div>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handleReligionEdit(religion.id)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleReligionDelete(religion.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Form onSubmit={handleLevelSubmit}>
            <Form.Group>
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Level"
                name="level"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <ul
            className="ms-5 me-5 mt-3"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {levels.length > 0 &&
              levels.map((level: any) => (
                <li
                  key={level.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px", // Even vertical spacing
                  }}
                >
                  <span>{level.name}</span>
                  <div>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => hamdleLevelEdit(level.id)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleLevelDelete(level.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h3>Add Ownership Category</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleOwnershipCategorySubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Ownership Category"
                name="ownership"
                onChange={(e) =>
                  setFormData({ ...formData, ownership: e.target.value })
                }
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <ul
            className="ms-5 me-5 mt-3"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {ownershipCategories.length > 0 &&
              ownershipCategories.map((ownership: any) => (
                <li
                  key={ownership.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px", // Even vertical spacing
                  }}
                >
                  <span>{ownership.ownership}</span>
                  <div>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => hanedleOwnershipEdit(ownership.id)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => hanedleOwnershipDelete(ownership.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h3>Add Category</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleCategorySubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                name="category"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <ul
            className="ms-5 me-5 mt-3"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {categories.length > 0 &&
              categories.map((category: any) => (
                <li
                  key={category.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px", // Even vertical spacing
                  }}
                >
                  <span>{category.name}</span>
                  <div>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handleCategoryEdit(category.id)}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCategoryDelete(category.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default Miscellaneous;
