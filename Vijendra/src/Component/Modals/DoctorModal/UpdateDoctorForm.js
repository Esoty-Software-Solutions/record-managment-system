import React from "react";
import {
  Tooltip,
  OverlayTrigger,
  Modal,
  Row,
  Col,
  Table,
} from "react-bootstrap";

import { TiTick } from "react-icons/ti";
import { Formik } from "formik";
import {
  createSchedulesByDoctor,
  UpdateDoc,
} from "../../../redux/actions/action";
import { useDispatch } from "react-redux";
import ErrorComponent from "../../../Utils/ErrorComponent";
function UpdateDoctorForm(props) {
  const dispatch = useDispatch();

  // console.log("props",props.medicaldata?.doctorId);
  const handleSubmit = (values) => {
    dispatch(UpdateDoc(values, props.medicaldata?.doctorId));
    // setTimeout(() => {
    // }, 1500);
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
          <h4>Update Doctor</h4>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  first: props?.medicaldata?.firstName,
                  middle: props?.medicaldata?.middleName,
                  last: props?.medicaldata?.lastName,
                  gender: props?.medicaldata?.gender,
                  birthdate: props?.medicaldata?.birthdate,
                  specialty: props?.medicaldata?.specialty,
                  level: props?.medicaldata?.level,
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
                          <Col md={4}>
                            <div className="form-group">
                              <label>First name: </label>
                              <input
                                type="text"
                                name="first"
                                value={values.first}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="First name"
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.first && touched.first && errors.first
                              }
                            />
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Middle Name: </label>
                              <input
                                type="text"
                                placeholder="Middle name"
                                name="middle"
                                value={values.middle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.middle && touched.middle && errors.middle
                              }
                            />
                          </Col>
                          <Col md={4}>
                            <div className="form-group">
                              <label>Last name: </label>
                              <input
                                type="text"
                                placeholder="Last name"
                                name="last"
                                value={values.last}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={errors.last && touched.last && errors.last}
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>Gender: </label>
                              <select
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                                  --Select Gender--
                                </option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                              </select>
                            </div>
                            <ErrorComponent
                              error={
                                errors.gender && touched.gender && errors.gender
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>Birthdate: </label>
                              <input
                                type="date"
                                placeholder="Birthdate:"
                                name="birthdate"
                                value={values.birthdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.birthdate &&
                                touched.birthdate &&
                                errors.birthdate
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>Speciality: </label>
                              <select
                                name="specialty"
                                value={values.specialty}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                                  --Select Speciality--
                                </option>

                                {props.specialLists &&
                                  props.specialLists?.map((v, ia) => (
                                    <option key={ia} value={v?.specialtyName}>
                                      {v?.specialtyName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <ErrorComponent
                              error={
                                errors.specialty &&
                                touched.specialty &&
                                errors.specialty
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>Level: </label>
                              <select
                                name="level"
                                value={values.level}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                                  --Select Level--
                                </option>
                                <option value="Intern">Intern</option>
                                <option value="General Doctor">
                                  General Doctor
                                </option>
                              </select>
                            </div>
                            <ErrorComponent
                              error={
                                errors.level && touched.level && errors.level
                              }
                            />
                          </Col>
                          <Col md={12}>
                            <div className="form-group">
                              <label>Description </label>
                              <textarea rows="3"></textarea>
                            </div>
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
            Update
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateDoctorForm;
