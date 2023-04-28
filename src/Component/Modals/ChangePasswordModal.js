import { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";

import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordAPI } from "../../redux/actions/action";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import ErrorComponent from "@/Utils/ErrorComponent";
function ChangePassword(props) {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleSubmit = (values) => {
    if (props?.useridforpasswordchange) {
      dispatch(ChangePasswordAPI(values, props?.useridforpasswordchange?._id));
    } else {
      let id = localStorage.getItem("Zept_UserId");
      dispatch(ChangePasswordAPI(values, id));
    }
  };

  const { formatMessage: covert } = useIntl();
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
        <Row>
          <Col md={12}>
            <>
              <Modal.Header closeButton className="mb-4">
                <Modal.Title>{covert({ id: "changePassword" })}</Modal.Title>
              </Modal.Header>
              <div className="add-denefi-markers">
                <div className="add-form p-0">
                  <Formik
                    initialValues={{
                      currentPassword: "",
                      newPassword: "",
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
                                  <label>
                                    {covert({ id: "currentPassword" })}
                                  </label>
                                  <input
                                    type="text"
                                    name="currentPassword"
                                    value={values.currentPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={covert({
                                      id: "currentPassword",
                                    })}
                                  />
                                </div>
                                <ErrorComponent
                                  error={
                                    errors.currentPassword &&
                                    touched.currentPassword &&
                                    errors.currentPassword
                                  }
                                />
                              </Col>
                              <Col md={6}>
                                <div className="form-group">
                                  <label>{covert({ id: "newPassword" })}</label>
                                  <input
                                    type="text"
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={covert({ id: "newPassword" })}
                                  />
                                </div>
                                <ErrorComponent
                                  error={
                                    errors.newPassword &&
                                    touched.newPassword &&
                                    errors.newPassword
                                  }
                                />
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </div>
                    )}
                  </Formik>
                </div>

                <div className="can-sve mt-0">
                  <button
                    onClick={() => props.onHide()}
                    className="cls-btn-btn"
                  >
                    {covert({ id: "Cancel" })}
                  </button>
                  <button
                    className="add-fmy-btn"
                    // type="submit"
                    onClick={handleSubmit}
                    form="form-data"
                  >
                    {covert({ id: "Submit" })}
                  </button>
                </div>
              </div>
            </>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default ChangePassword;
