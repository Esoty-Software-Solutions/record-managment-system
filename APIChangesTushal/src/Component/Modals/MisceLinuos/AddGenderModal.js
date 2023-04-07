import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { AddGender } from "../../../redux/actions/action";
import ErrorComponent from "../../../Utils/ErrorComponent";

function AddGenderModal(props) {
  const dispatch = useDispatch();
  // console.log(props.specialLists);
  const handleSubmit = (values) => {
    dispatch(AddGender(values));
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="add-medi-cntr"
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene institution">
          <h4>Add New Gender</h4>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  EnglishName: "",
                  backendName: "",
                  ArabicName: "",
                }}
                onSubmit={handleSubmit}
                // validationSchema={DoctorForm}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <div className="add-denefi-marker">
                    <div className="add-form p-0">
                      <form id="form-data" onSubmit={handleSubmit}>
                        <Row>
                          <Col md={6}>
                            <div className="form-group">
                              <label>English Name: </label>
                              <input
                                type="text"
                                name="EnglishName"
                                value={values.EnglishName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="English Name"
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.EnglishName &&
                                touched.EnglishName &&
                                errors.EnglishName
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>Backend Name: </label>
                              <input
                                type="text"
                                placeholder="Backend Name"
                                name="backendName"
                                value={values.backendName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.backendName &&
                                touched.backendName &&
                                errors.backendName
                              }
                            />
                          </Col>

                          <Col md={6}>
                            <div className="form-group">
                              <label>Arabic Name: </label>
                              <input
                                type="text"
                                placeholder="Arabic Name"
                                name="ArabicName"
                                value={values.ArabicName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.ArabicName &&
                                touched.ArabicName &&
                                errors.ArabicName
                              }
                            />
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="can-sve mt-0">
          <button onClick={props.onHide} className="cls-btn-btn">
            Cancel
          </button>
          <button className="add-fmy-btn" type="submit" form="form-data">
            Add
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddGenderModal;
