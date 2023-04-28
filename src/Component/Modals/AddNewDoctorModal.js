import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { AddDoctors } from "../../redux/actions/action";
import ErrorComponent from "../../Utils/ErrorComponent";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

function AddNewDoctorModal(props) {
  const dispatch = useDispatch();
  // console.log(props.specialLists);
  const handleSubmit = (values) => {
    dispatch(AddDoctors(values));
    // setTimeout(() => {

    // }, 1500);
    props.onHide();
  };

  const { formatMessage: covert } = useIntl();
  const {locale} = useRouter()
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={locale == "ar" ? "add-medi-cntr new-rtl" : "add-medi-cntr"}
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene institution">
          <h4>{covert({ id: "AddNewDoctor" })}</h4>
          {/* <h4>Add New Doctor</h4> */}
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  first: "",
                  second:"",
                  // middle: "",
                  last: "",
                  gender: "",
                  birthdate: "",
                  specialtyId: "",
                  level: "",
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
                              <label>{covert({ id: "fname" })}</label>
                              <input
                                type="text"
                                name="first"
                                value={values.first}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={covert({ id: "fname" })}
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
                              <label>{covert({ id: "secondName" })}</label>
                              <input
                                type="text"
                                name="second"
                                value={values.second}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={covert({ id: "secondName" })}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.second && touched.second && errors.second
                              }
                            />
                          </Col>
                          {/* <Col md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "mname" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "mname" })}
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
                          </Col> */}
                          <Col md={4}>
                            <div className="form-group">
                              <label>{covert({ id: "lname" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "lname" })}
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
                              <label>{covert({ id: "gender" })} </label>
                              <select
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                  <option value="" selected>
                                  --Select Gender--
                                </option>

                                {props.genderList &&
                                  props.genderList?.map((v, ia) => (
                                    <option key={ia} value={v?._id}>
                                      {locale == "ar"
                                        ? v?.arabicName
                                        : v?.englishName}
                                    </option>
                                  ))} 
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
                              <label>{covert({ id: "onlydob" })}</label>
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
                              <label>{covert({ id: "Speciality" })}</label>
                              <select
                                name="specialtyId"
                                value={values.specialtyId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" selected>
                                  --Select Speciality--
                                </option>

                                {props.specialLists &&
                                  props.specialLists?.map((v, ia) => (
                                    <option key={ia} value={v?._id}>
                                      {locale == "ar"
                                        ? v?.arabicName
                                        : v?.englishName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <ErrorComponent
                              error={
                                errors.specialtyId &&
                                touched.specialtyId &&
                                errors.specialtyId
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <div className="form-group">
                              <label>{covert({ id: "level" })}</label>
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
                          {/* <Col md={12}>
                            <div className="form-group">
                              <label>{covert({ id: "Description" })} </label>
                              <textarea rows="3"></textarea>
                            </div>
                          </Col> */}
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
            {covert({ id: "Cancel" })}
          </button>
          <button className="add-fmy-btn" type="submit" form="form-data">
            {covert({ id: "onlyadd" })}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewDoctorModal;
