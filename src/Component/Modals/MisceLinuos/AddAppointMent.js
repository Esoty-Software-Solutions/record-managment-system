import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { AddAppointmentStatus, AddCity, UpdateAppointmentStatus } from "../../../redux/actions/action";
import ErrorComponent from "../../../Utils/ErrorComponent";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

function AddAppointmentModal(props) {
  const { formatMessage: covert } = useIntl();
  const dispatch = useDispatch();
  // console.log(props.specialLists);
  const handleSubmit = (values) => {
    if (props?.data?._id) {
      dispatch(UpdateAppointmentStatus(values, props?.data?._id));
    } else {
      dispatch(AddAppointmentStatus(values));
    }

    // setTimeout(() => {

    // }, 1500);
    props.onHide();
  };

  const { locale } = useRouter();
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
          <h4></h4>
          <h4>
            {props?.data?._id
              ? covert({ id: "UpdateMedical" })
              : covert({ id: "Add New AppointMent" })}
          </h4>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  englishName: props?.data?.englishName
                    ? props?.data?.englishName
                    : "",
                  backendName: props?.data?.backendName
                    ? props?.data?.backendName
                    : "",
                  arabicName: props?.data?.arabicName
                    ? props?.data?.arabicName
                    : "",
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
                              <label>{covert({ id: "englishName" })}</label>
                              <input
                                type="text"
                                name="englishName"
                                value={values.englishName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={covert({ id: "englishName" })}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.englishName &&
                                touched.englishName &&
                                errors.englishName
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <label>{covert({ id: "bankendName" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "bankendName" })}
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
                              <label>{covert({ id: "arabicName" })} </label>
                              <input
                                type="text"
                                placeholder={covert({ id: "arabicName" })}
                                name="arabicName"
                                value={values.arabicName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <ErrorComponent
                              error={
                                errors.arabicName &&
                                touched.arabicName &&
                                errors.arabicName
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
            {covert({ id: "Cancel" })}
          </button>
          <button className="add-fmy-btn" type="submit" form="form-data">
            {props?.data?._id
              ? covert({ id: "onlyUpdate" })
              : covert({ id: "add" })}{" "}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddAppointmentModal;
